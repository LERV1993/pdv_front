// src/components/shared/Loader.jsx
import React from 'react';

// Un loader simple para centrar en la pantalla
export const FullScreenLoader = () => (
  <div className="min-h-full h-full flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
);

// Un loader más pequeño para botones
export const InlineLoader = () => (
  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block"></div>
);