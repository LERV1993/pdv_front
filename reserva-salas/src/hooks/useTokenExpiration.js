// src/hooks/useTokenExpiration.js
import { useEffect, useState } from 'react';
import { authService } from '../services/authService';

export const useTokenExpiration = () => {
  const [tokenInfo, setTokenInfo] = useState(null);

  useEffect(() => {
    const checkToken = () => {
      const info = authService.getTokenInfo();
      setTokenInfo(info);

      if (info && info.expiresInMinutes < 2 && info.expiresInMinutes > 0) {
        console.warn(`Token expira en ${info.expiresInMinutes} minuto(s)`);
      }

      if (info && info.isExpired) {
        console.error('Token expirado, cerrando sesión...');
        authService.logout();
        window.location.href = '/';
      }
    };

    checkToken();
    const interval = setInterval(checkToken, 30000);

    return () => clearInterval(interval);
  }, []);

  return tokenInfo;
};
