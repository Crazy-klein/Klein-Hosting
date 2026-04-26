import express from "express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import { createServer as createViteServer } from "vite";
import db from "./database";

import fs from "fs";

const JWT_SECRET = process.env.JWT_SECRET || "kurona_secret_key_2025_secure";

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new SocketIOServer(httpServer, {
    cors: { origin: "*" }
  });

  const PORT = 3000;

  app.use(helmet({
    contentSecurityPolicy: false, // Disable for dev/vite
  }));
  app.use(cors());
  app.use(express.json());
  app.use('/uploads', express.static('uploads'));

  // --- UTILS ---
  const handlePaymentCoins = (userId: number, coins: number, method: string, amount: number) => {
    db.prepare(`INSERT INTO transactions (user_id, amount, currency, coins, method, status) VALUES (?, ?, 'USD', ?, ?, 'completed')`).run(userId, amount, coins, method);
    db.prepare('UPDATE users SET coins = coins + ? WHERE id = ?').run(coins, userId);
  };

  // --- API ROUTES ---

  // Multi-Payment Routes (Orange, MTN, Wave)
  app.post("/api/payment/orange", authenticateToken, (req: any, res: any) => {
    const { amount, coins, phone } = req.body;
    // Mock API call to provider
    handlePaymentCoins(req.user.id, coins, 'Orange Money', amount);
    res.json({ status: 'success', message: 'Paiement Orange Money validé' });
  });

  app.post("/api/payment/mtn", authenticateToken, (req: any, res: any) => {
    const { amount, coins, phone } = req.body;
    handlePaymentCoins(req.user.id, coins, 'MTN Money', amount);
    res.json({ status: 'success', message: 'Paiement MTN Money validé' });
  });

  app.post("/api/payment/wave", authenticateToken, (req: any, res: any) => {
    const { amount, coins } = req.body;
    handlePaymentCoins(req.user.id, coins, 'Wave', amount);
    res.json({ status: 'success', message: 'Lien Wave généré et payé' });
  });

  // Reseller API
  app.get("/api/reseller/stats", authenticateToken, (req: any, res: any) => {
    const profile = db.prepare('SELECT * FROM reseller_profiles WHERE user_id = ?').get(req.user.id);
    if (!profile) return res.status(404).json({ error: "Pas un revendeur" });
    const clients = db.prepare('SELECT COUNT(*) as count FROM users WHERE id IN (SELECT user_id FROM transactions WHERE method = "Reseller")').get();
    res.json({ profile, clients });
  });

  app.post("/api/reseller/withdraw", authenticateToken, (req: any, res: any) => {
    const { amount, method, details } = req.body;
    const profile = db.prepare('SELECT balance FROM reseller_profiles WHERE user_id = ?').get(req.user.id) as any;
    if (!profile || profile.balance < amount) return res.status(400).json({ error: "Solde insuffisant" });
    
    db.prepare('UPDATE reseller_profiles SET balance = balance - ? WHERE user_id = ?').run(amount, req.user.id);
    db.prepare('INSERT INTO withdrawal_requests (user_id, amount, method, details) VALUES (?, ?, ?, ?)').run(req.user.id, amount, method, details);
    res.json({ status: 'pending' });
  });

  // Marketplace Expansion
  app.post("/api/marketplace/create", authenticateToken, (req: any, res: any) => {
    const { title, description, price, category, content_url } = req.body;
    const result = db.prepare(`
      INSERT INTO marketplace_listings (user_id, title, description, price, category, content_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(req.user.id, title, description, price, category, content_url);
    res.json({ id: result.lastInsertRowid });
  });

  app.get("/api/marketplace/shop/:username", (req: any, res: any) => {
    const user = db.prepare('SELECT id, username, avatar FROM users WHERE username = ?').get(req.params.username) as any;
    if (!user) return res.status(404).json({ error: "Boutique introuvable" });
    const listings = db.prepare('SELECT * FROM marketplace_listings WHERE user_id = ?').all(user.id);
    res.json({ user, listings });
  });

  // Subscriptions
  app.post("/api/subscriptions/subscribe", authenticateToken, (req: any, res: any) => {
    const { plan } = req.body;
    const next_billing = new Date();
    next_billing.setMonth(next_billing.getMonth() + 1);
    db.prepare('INSERT INTO subscriptions (user_id, plan, status, next_billing) VALUES (?, ?, "active", ?)').run(req.user.id, plan, next_billing.toISOString());
    res.json({ status: 'active' });
  });

  // Leaderboard & Global Info
  app.get("/api/leaderboard", (req: any, res: any) => {
    const topUsers = db.prepare('SELECT username, coins, avatar FROM users ORDER BY coins DESC LIMIT 10').all();
    res.json(topUsers);
  });

  app.get("/api/status", (req: any, res: any) => {
    res.json({
      web: "online",
      database: "online",
      node_01: "online",
      node_02: "online",
      sftp: "online",
      last_check: new Date().toISOString()
    });
  });

  app.get("/api/referral", authenticateToken, (req: any, res: any) => {
    res.json({
      code: `KURONA-${req.user.id}`,
      total_referrals: 0,
      total_earned: 0
    });
  });

  // Auth & 2FA Setup
  app.post("/api/2fa/setup", authenticateToken, (req: any, res: any) => {
    // Generate TOTP secret (Mock)
    res.json({ secret: "JBSWY3DPEHPK3PXP", qr_code: "https://api.qrserver.com/v1/create-qr-code/?data=otpauth%3A%2F%2Ftotp%2FKurona%3Atest%3Fsecret%3DJBSWY3DPEHPK3PXP%26issuer%3DKurona" });
  });

  // Auth Middleware
  function authenticateToken(req: any, res: any, next: any) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }

  const isAdmin = (req: any, res: any, next: any) => {
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') return res.sendStatus(403);
    next();
  };

  // --- API ROUTES ---

  // Auth
  app.post("/api/auth/register", [
    body('username').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ], (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, email, password } = req.body;
    try {
      const hashedPassword = bcrypt.hashSync(password, 12);
      const result = db.prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)').run(username, email, hashedPassword);
      res.json({ id: result.lastInsertRowid });
    } catch (e: any) {
      res.status(400).json({ error: "Username or email already exists" });
    }
  });

  app.post("/api/auth/login", (req: any, res: any) => {
    const { username, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE username = ? OR email = ?').get(username, username) as any;
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, username: user.username, role: user.role, coins: user.coins } });
  });

  app.get("/api/user/profile", authenticateToken, (req: any, res: any) => {
    const user = db.prepare('SELECT id, username, email, role, coins, daily_streak, last_daily_claim, verified, avatar FROM users WHERE id = ?').get(req.user.id);
    res.json(user);
  });

  // Daily Reward
  app.post("/api/user/daily-reward", authenticateToken, (req: any, res: any) => {
    const user = db.prepare('SELECT last_daily_claim, daily_streak, coins FROM users WHERE id = ?').get(req.user.id) as any;
    const now = new Date();
    const lastClaim = user.last_daily_claim ? new Date(user.last_daily_claim) : null;

    if (lastClaim && (now.getTime() - lastClaim.getTime()) < 20 * 60 * 60 * 1000) {
      return res.status(400).json({ error: "Reward not ready yet" });
    }

    let streak = user.daily_streak || 0;
    if (lastClaim && (now.getTime() - lastClaim.getTime()) > 48 * 60 * 60 * 1000) {
      streak = 1;
    } else {
      streak++;
    }

    let reward = 10 + (streak * 2);
    if (streak === 7) reward += 50;
    if (streak === 100) reward += 1000;

    db.prepare('UPDATE users SET coins = coins + ?, daily_streak = ?, last_daily_claim = ? WHERE id = ?')
      .run(reward, streak, now.toISOString(), req.user.id);

    res.json({ reward, streak });
  });

  // Servers
  app.get("/api/servers", authenticateToken, (req: any, res: any) => {
    const servers = db.prepare('SELECT * FROM servers WHERE user_id = ?').all(req.user.id);
    res.json(servers);
  });

  app.post("/api/servers/create", authenticateToken, (req: any, res: any) => {
    const { name, type, plan } = req.body;
    const plans: any = {
      'Starter': { coins: 100, memory: 1024, cpu: 1, disk: 10 },
      'Pro': { coins: 500, memory: 4096, cpu: 2, disk: 40 },
      'Business': { coins: 1500, memory: 8192, cpu: 4, disk: 100 }
    };
    const selectedPlan = plans[plan];
    if (!selectedPlan) return res.status(400).json({ error: "Invalid plan" });

    const user = db.prepare('SELECT coins FROM users WHERE id = ?').get(req.user.id) as any;
    if (user.coins < selectedPlan.coins) return res.status(400).json({ error: "Insufficient coins" });

    db.prepare('UPDATE users SET coins = coins - ? WHERE id = ?').run(selectedPlan.coins, req.user.id);

    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 1);

    const result = db.prepare(`
      INSERT INTO servers (user_id, name, type, plan, memory, cpu, disk, expires_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(req.user.id, name, type, plan, selectedPlan.memory, selectedPlan.cpu, selectedPlan.disk, expiresAt.toISOString());

    res.json({ id: result.lastInsertRowid });
  });

  // Payments (Mock real integration calls)
  app.post("/api/payments/create", authenticateToken, (req: any, res: any) => {
    const { amount, method, coins } = req.body;
    const result = db.prepare(`
      INSERT INTO transactions (user_id, amount, currency, coins, method, status)
      VALUES (?, ?, 'USD', ?, ?, 'completed')
    `).run(req.user.id, amount, coins, method);

    db.prepare('UPDATE users SET coins = coins + ? WHERE id = ?').run(coins, req.user.id);

    res.json({ status: 'success', transactionId: result.lastInsertRowid });
  });

  // Chat Socket
  io.on('connection', (socket) => {
    socket.on('join-room', (room) => {
      socket.join(room);
    });

    socket.on('send-message', async (data) => {
      const { user_id, message, type, reply_to } = data;
      const result = db.prepare('INSERT INTO chat_messages (user_id, message, type, reply_to) VALUES (?, ?, ?, ?)').run(user_id, message, type, reply_to);
      const msg = db.prepare(`
        SELECT cm.*, u.username, u.avatar 
        FROM chat_messages cm 
        JOIN users u ON cm.user_id = u.id 
        WHERE cm.id = ?
      `).get(result.lastInsertRowid);
      io.emit('new-message', msg);
    });
  });

  // Chat API
  app.get("/api/chat/history", authenticateToken, (req: any, res: any) => {
    const messages = db.prepare(`
      SELECT cm.*, u.username, u.avatar 
      FROM chat_messages cm 
      JOIN users u ON cm.user_id = u.id 
      ORDER BY cm.created_at DESC LIMIT 50
    `).all();
    res.json(messages.reverse());
  });

  // Forum API
  app.get("/api/forum/threads", (req: any, res: any) => {
    const threads = db.prepare(`
      SELECT ft.*, u.username, (SELECT COUNT(*) FROM forum_posts WHERE thread_id = ft.id) as post_count
      FROM forum_threads ft
      JOIN users u ON ft.user_id = u.id
      ORDER BY ft.is_pinned DESC, ft.created_at DESC
    `).all();
    res.json(threads);
  });

  app.post("/api/forum/threads", authenticateToken, (req: any, res: any) => {
    const { title, category, content } = req.body;
    const threadResult = db.prepare('INSERT INTO forum_threads (user_id, title, category) VALUES (?, ?, ?)').run(req.user.id, title, category);
    db.prepare('INSERT INTO forum_posts (thread_id, user_id, content) VALUES (?, ?, ?)').run(threadResult.lastInsertRowid, req.user.id, content);
    res.json({ id: threadResult.lastInsertRowid });
  });

  // Marketplace
  app.get("/api/marketplace", (req: any, res: any) => {
    const listings = db.prepare(`
      SELECT ml.*, u.username
      FROM marketplace_listings ml
      JOIN users u ON ml.user_id = u.id
      ORDER BY ml.created_at DESC
    `).all();
    res.json(listings);
  });

  // Superadmin Stats
  app.get("/api/admin/stats", authenticateToken, isAdmin, (req: any, res: any) => {
    const totalUsers = db.prepare('SELECT COUNT(*) as count FROM users').get() as any;
    const totalServers = db.prepare('SELECT COUNT(*) as count FROM servers').get() as any;
    const totalRevenue = db.prepare('SELECT SUM(amount) as sum FROM transactions WHERE status = "completed"').get() as any;
    const activeSubscriptions = db.prepare('SELECT COUNT(*) as count FROM subscriptions WHERE status = "active"').get() as any;
    
    res.json({
      users: totalUsers.count,
      servers: totalServers.count,
      revenue: totalRevenue.sum || 0,
      subscriptions: activeSubscriptions.count
    });
  });

  // UI Fallback
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
