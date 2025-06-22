'use client';

import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Aguarda a animação de saída
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyles = () => {
    const baseStyles = "fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg max-w-sm transform transition-all duration-300 ease-out";
    
    switch (type) {
      case 'success':
        return `${baseStyles} bg-gradient-to-r from-green-500 to-green-600 text-white border-l-4 border-green-400`;
      case 'error':
        return `${baseStyles} bg-gradient-to-r from-red-500 to-red-600 text-white border-l-4 border-red-400`;
      case 'warning':
        return `${baseStyles} bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-l-4 border-yellow-400`;
      case 'info':
        return `${baseStyles} bg-gradient-to-r from-blue-500 to-blue-600 text-white border-l-4 border-blue-400`;
      default:
        return `${baseStyles} bg-gradient-to-r from-gray-500 to-gray-600 text-white border-l-4 border-gray-400`;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '💬';
    }
  };

  return (
    <div className={`${getToastStyles()} ${isVisible ? 'toast' : 'toast-exit'}`}>
      <div className="flex items-center space-x-3">
        <span className="text-xl">{getIcon()}</span>
        <p className="font-medium">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="ml-auto text-white hover:text-gray-200 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
} 