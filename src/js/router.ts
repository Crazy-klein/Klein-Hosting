/**
 * KURONA STAND NAVIGATION ROUTER
 * Helpers for programmatic navigation and route definitions
 */

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    PAYMENT: '/payment',
    DEPLOY: '/deploy',
    SERVER: (id: string) => `/server/${id}`,
    CHAT: '/chat',
    FORUM: '/forum',
    MARKETPLACE: '/marketplace',
    SHOP: (username: string) => `/shop/${username}`,
    PANEL_ADMIN: '/panel-admin',
    SUPERADMIN: '/superadmin',
    PROFILE: '/profile',
    REFERRAL: '/referral',
    SUBSCRIPTION: '/subscription',
    STATUS: '/status',
    LEADERBOARD: '/leaderboard',
    FORGOT_PASSWORD: '/forgot-password',
    VERIFY_EMAIL: '/email-verification',
};

export const navigateTo = (path: string) => {
    window.location.href = path;
};
