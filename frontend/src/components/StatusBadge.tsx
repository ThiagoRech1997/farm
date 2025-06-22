'use client';

import React from 'react';

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'warning' | 'success' | 'error' | 'pending';
  text: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function StatusBadge({ 
  status, 
  text, 
  size = 'md', 
  animated = true 
}: StatusBadgeProps) {
  const getStatusStyles = () => {
    const baseStyles = "inline-flex items-center px-3 py-1 rounded-full font-medium text-sm status-badge";
    
    const sizeStyles = {
      sm: "px-2 py-1 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-2 text-base"
    };

    const statusStyles = {
      active: "bg-gradient-to-r from-green-500 to-green-600 text-white",
      inactive: "bg-gradient-to-r from-gray-500 to-gray-600 text-white",
      warning: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white",
      success: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white",
      error: "bg-gradient-to-r from-red-500 to-red-600 text-white",
      pending: "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
    };

    return `${baseStyles} ${sizeStyles[size]} ${statusStyles[status]} ${animated ? 'animate-pulse' : ''}`;
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'active':
        return '🟢';
      case 'inactive':
        return '⚫';
      case 'warning':
        return '🟡';
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'pending':
        return '⏳';
      default:
        return '•';
    }
  };

  return (
    <span className={getStatusStyles()}>
      <span className="mr-1">{getStatusIcon()}</span>
      {text}
    </span>
  );
}

// Componente para múltiplos badges em linha
export function StatusBadgeGroup({ badges }: { badges: Array<{ status: StatusBadgeProps['status'], text: string }> }) {
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge, index) => (
        <StatusBadge
          key={index}
          status={badge.status}
          text={badge.text}
          size="sm"
        />
      ))}
    </div>
  );
} 