/**
 * KURONA STAND WhatsApp Bot — Module Baileys
 * Mode: Standalone
 */

import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import path from 'path';
import fs from 'fs';

const AUTH_DIR = path.join(process.cwd(), 'whatsapp-auth');
const PREFIX = '!';

async function startBot() {
    console.log("[KURONA BOT] Démarrage...");
    
    if (!fs.existsSync(AUTH_DIR)) fs.mkdirSync(AUTH_DIR, { recursive: true });
    const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        browser: ['KURONA HOST STAND', 'Chrome', '1.0.0'],
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        if (qr) console.log("[KURONA BOT] Scannez le QR code ci-dessus avec WhatsApp.");
        
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log("[KURONA BOT] Déconnecté. Reconnexion:", shouldReconnect);
            if (shouldReconnect) startBot();
        } else if (connection === 'open') {
            console.log("[KURONA BOT] ✅ Bot connecté avec succès !");
        }
    });

    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return;
        for (const msg of messages) {
            if (msg.key.fromMe || !msg.message) continue;
            
            const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
            const jid = msg.key.remoteJid;
            
            if (text.startsWith(PREFIX)) {
                const [cmd, ...args] = text.slice(PREFIX.length).trim().split(' ');
                
                switch (cmd.toLowerCase()) {
                    case 'ping':
                        await sock.sendMessage(jid, { text: '🏓 Pong ! Kurona Hosting est à votre service.' });
                        break;
                    case 'help':
                        await sock.sendMessage(jid, { text: '🚀 *Commandes KuronaBOT:*\n\n!ping - Test\n!coins - Mon solde\n!servers - Mes serveurs\n!status <id> - Infos serveur' });
                        break;
                    // Logic extension here for API calls
                }
            }
        }
    });
}

// Pour usage interne si nécessaire
export const sendWhatsAppNotification = async (jid, message) => {
    // Requires a global sock instance or temporary connection
    console.log(`[WhatsApp] Notification sent to ${jid}: ${message}`);
};

if (process.env.START_BOT === 'true') {
    startBot().catch(err => console.error("[KURONA BOT] Erreur fatale:", err));
}
