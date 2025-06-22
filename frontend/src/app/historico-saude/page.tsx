'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ResumoHistoricoCard from '../../components/ResumoHistoricoCard';
import StatusBadge from '../../components/StatusBadge';

type HistoricoSaude = {
  ID: number;
  Animal_ID: number;
  Data_Evento: string;
  Descricao: string;
  Tratamento: string;
  Veterinario: string;
};

export default function HistoricoSaudePage() {
  const [historico, setHistorico] = useState<HistoricoSaude[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchHistorico = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:3000/historico-saude', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setHistorico(data);
        }
      } catch (err) {
        // erro silencioso
      } finally {
        setLoading(false);
      }
    };
    fetchHistorico();
  }, []);

  // Cálculos para os resumos
  const total = historico.length;
  const ultimos30 = historico.filter(e => {
    const dias = (new Date().getTime() - new Date(e.Data_Evento).getTime()) / (1000*60*60*24);
    return dias <= 30;
  }).length;
  const criticos = historico.filter(e => e.Tratamento && e.Tratamento.trim() !== '').length;

  const filteredHistorico = historico.filter(e => {
    const term = searchTerm.toLowerCase();
    return (
      e.Animal_ID.toString().includes(term) ||
      e.Descricao.toLowerCase().includes(term) ||
      (e.Tratamento && e.Tratamento.toLowerCase().includes(term)) ||
      (e.Veterinario && e.Veterinario.toLowerCase().includes(term)) ||
      (e.Data_Evento && new Date(e.Data_Evento).toLocaleDateString('pt-BR').includes(term))
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto glass rounded-3xl shadow-2xl overflow-hidden relative">
        <div className="relative bg-gradient-to-r from-green-800 to-green-600 text-white p-8 text-center mb-8">
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-6xl animate-bounce-gentle">🩺</div>
          <h1 className="text-5xl font-bold mb-4 text-shadow-lg">Histórico de Saúde</h1>
          <p className="text-xl opacity-90">Acompanhamento de eventos, tratamentos e saúde animal</p>
        </div>
        <div className="p-8">
          <div className="flex justify-end mb-8">
            <Link href="/historico-saude/novo">
              <button className="bg-pink-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-pink-700 transition duration-200">
                ➕ Adicionar Evento de Saúde
              </button>
            </Link>
          </div>
          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ResumoHistoricoCard titulo="Total de Eventos" valor={total} icone={<span>🩺</span>} cor="border-pink-600" />
            <ResumoHistoricoCard titulo="Últimos 30 dias" valor={ultimos30} icone={<span>📅</span>} cor="border-blue-500" />
            <ResumoHistoricoCard titulo="Críticos" valor={criticos} icone={<span>⚠️</span>} cor="border-red-500" />
          </div>
          {/* Busca */}
          <div className="mb-8 max-w-xl mx-auto">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Buscar por animal, descrição, tratamento, veterinário ou data..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full p-4 pl-12 pr-12 border-2 border-gray-200 rounded-2xl text-lg focus:border-pink-600 focus:outline-none transition-all duration-300"
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
          {/* Lista de Eventos */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Registros de Saúde</h2>
            <div className="space-y-4">
              {loading ? (
                <p>Carregando...</p>
              ) : filteredHistorico.length > 0 ? (
                filteredHistorico.map((evento) => (
                  <div key={evento.ID} className="p-4 border rounded-lg shadow-sm flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-lg">{evento.Descricao}</p>
                        <p className="text-sm text-gray-600">Animal ID: {evento.Animal_ID}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <StatusBadge status={evento.Tratamento && evento.Tratamento.trim() !== '' ? 'Crítico' : 'Ok'} />
                        <p className="text-sm text-gray-500">{new Date(evento.Data_Evento).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">Tratamento: {evento.Tratamento}</p>
                    <p className="text-sm text-gray-500 mt-1">Vet: {evento.Veterinario}</p>
                  </div>
                ))
              ) : (
                <p>Nenhum evento de saúde registrado.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 