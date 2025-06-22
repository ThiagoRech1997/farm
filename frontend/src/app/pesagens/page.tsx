'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ResumoPesagemCard from '../../components/ResumoPesagemCard';
import AlertCard from '../../components/AlertCard';

type Pesagem = {
  ID: number;
  Animal_ID: number;
  Animal_Nome?: string;
  Data_Pesagem: string;
  Peso: number;
};

export default function PesagensPage() {
  const [pesagens, setPesagens] = useState<Pesagem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPesagens = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:3000/pesagens/com-nomes', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setPesagens(data);
        }
      } catch (err) {
        // erro silencioso
      } finally {
        setLoading(false);
      }
    };
    fetchPesagens();
  }, []);

  // Cálculo de animais sem pesagem há 30+ dias
  const semPesagem30 = pesagens.filter(p => {
    const dias = (new Date().getTime() - new Date(p.Data_Pesagem).getTime()) / (1000*60*60*24);
    return dias > 30;
  });

  const term = (searchTerm || '').toLowerCase();
  const filteredPesagens = pesagens.filter(p => {
    return (
      (p.Animal_Nome || '').toLowerCase().includes(term) ||
      p.Animal_ID.toString().includes(term) ||
      p.Peso.toString().includes(term) ||
      (p.Data_Pesagem && new Date(p.Data_Pesagem).toLocaleDateString('pt-BR').includes(term))
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto glass rounded-3xl shadow-2xl overflow-hidden relative">
        <div className="relative bg-gradient-to-r from-green-800 to-green-600 text-white p-8 text-center mb-8">
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-6xl animate-bounce-gentle">⚖️</div>
          <h1 className="text-5xl font-bold mb-4 text-shadow-lg">Gerenciamento de Pesagens</h1>
          <p className="text-xl opacity-90">Controle e histórico de pesagens dos animais</p>
        </div>
        <div className="p-8">
          <div className="flex justify-end mb-8">
            <Link href="/pesagens/novo">
              <button className="bg-lime-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-lime-700 transition duration-200">
                ➕ Registrar Nova Pesagem
              </button>
            </Link>
          </div>
          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ResumoPesagemCard titulo="Total de Pesagens" valor={pesagens.length} icone={<span>⚖️</span>} cor="border-lime-600" />
            <ResumoPesagemCard titulo="Último mês" valor={pesagens.filter(p => {
              const dias = (new Date().getTime() - new Date(p.Data_Pesagem).getTime()) / (1000*60*60*24);
              return dias <= 30;
            }).length} icone={<span>📅</span>} cor="border-blue-500" />
            <ResumoPesagemCard titulo="Sem pesagem há 30+ dias" valor={semPesagem30.length} icone={<span>⏰</span>} cor="border-red-500" />
          </div>
          {/* Alertas */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-700 mb-4 flex items-center gap-2"><span>⚠️</span> Alertas de Pesagem</h2>
            <AlertCard
              icone={<span>⏰</span>}
              titulo="Animais sem pesagem recente"
              descricao={`Existem ${semPesagem30.length} registros de animais sem pesagem há mais de 30 dias.`}
              cor="border-red-500"
            />
          </div>
          {/* Busca */}
          <div className="mb-8 max-w-xl mx-auto">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Buscar por animal, ID, data ou peso..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full p-4 pl-12 pr-12 border-2 border-gray-200 rounded-2xl text-lg focus:border-lime-600 focus:outline-none transition-all duration-300"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                  aria-label="Limpar busca"
                >
                  &times;
                </button>
              )}
            </div>
          </div>
          {/* Lista de Pesagens */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Registros de Pesagem</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading ? (
                <p>Carregando...</p>
              ) : filteredPesagens.length > 0 ? (
                filteredPesagens.map((pesagem) => (
                  <div key={pesagem.ID} className="p-4 border rounded-lg shadow-sm text-center">
                    <p className="text-sm text-gray-600">Animal: {pesagem.Animal_Nome || pesagem.Animal_ID}</p>
                    <p className="font-bold text-2xl my-2">{pesagem.Peso} kg</p>
                    {pesagem.Data_Pesagem && (
                      <p className="text-sm text-gray-500">
                        {new Date(pesagem.Data_Pesagem).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p>Nenhuma pesagem registrada.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 