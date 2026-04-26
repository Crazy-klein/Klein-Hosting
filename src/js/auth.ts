export const auth = {
  getToken: () => localStorage.getItem('kurona_token'),
  setToken: (token: string) => localStorage.setItem('kurona_token', token),
  removeToken: () => localStorage.removeItem('kurona_token'),
  
  isAuthenticated: () => !!localStorage.getItem('kurona_token'),
  
  getUser: () => {
    const user = localStorage.getItem('kurona_user');
    return user ? JSON.parse(user) : null;
  },
  
  setUser: (user: any) => localStorage.setItem('kurona_user', JSON.stringify(user))
};
