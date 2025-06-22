import React from 'react';

interface AlertCardProps {
  icone: React.ReactNode;
  titulo: string;
  descricao: string;
  cor?: string;
}

const AlertCard: React.FC<AlertCardProps> = ({ icone, titulo, descricao, cor }) => {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl shadow-md bg-white bg-opacity-90 border-l-4 ${cor || 'border-yellow-500'} mb-2`}> 
      <div className="text-3xl">{icone}</div>
      <div>
        <div className="font-bold text-lg text-gray-800">{titulo}</div>
        <div className="text-gray-600 text-sm">{descricao}</div>
      </div>
    </div>
  );
};

export default AlertCard; 