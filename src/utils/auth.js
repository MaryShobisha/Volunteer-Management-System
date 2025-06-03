import {jwtDecode} from 'jwt-decode';

export const getUserFromToken = () => {
  const token = localStorage.getItem('jwtToken');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded; 
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('jwtToken');
  return Boolean(token);
};

export const getUserType = () => {
  const user = getUserFromToken();
  return user?.userType || null;
};
