import React from 'react';

interface ResumoNinhadaCardProps {
  titulo: string;
  valor: string | number;
  icone: React.ReactNode;
  cor?: string;
}

const ResumoNinhadaCard: React.FC<ResumoNinhadaCardProps> = ({ titulo, valor, icone, cor }) => {
  return (
    <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg p-6 min-w-[140px] bg-white bg-opacity-80 backdrop-blur-md border-b-4 ${cor || 'border-orange-400'}`}> 
      <div className="text-4xl mb-2">{icone}</div>
      <div className="text-2xl font-bold text-gray-800">{valor}</div>
      <div className="text-md text-gray-600 mt-1">{titulo}</div>
    </div>
  );
};

export default ResumoNinhadaCard; 