'use client';

import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const statusColors: Record<string, string> = {
  'Crítico': 'bg-red-500 text-white',
  'Atrasado': 'bg-yellow-500 text-white',
  'Ativo': 'bg-green-500 text-white',
  'Inativo': 'bg-gray-400 text-white',
  'Admin': 'bg-yellow-600 text-white',
  'Operador': 'bg-blue-600 text-white',
  'Pendente': 'bg-orange-500 text-white',
  'Ok': 'bg-green-600 text-white',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const color = statusColors[status] || 'bg-gray-300 text-gray-800';
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold shadow-sm ${color}`}>{status}</span>
  );
};

export default StatusBadge; 