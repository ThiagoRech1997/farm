'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ResumoNinhadaCard from '../../components/ResumoNinhadaCard';
import AlertCard from '../../components/AlertCard';

type Ninhada = {
  ID: number;
  Matriz_ID: number;
  Reprodutor_ID: number;
  Data_Concepcao: string;
  Data_Nascimento: string;
  Descricao: string;
  Perdas: string;
};

export default function NinhadasPage() {
  const [ninhadas, setNinhadas] = useState<Ninhada[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchNinhadas = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:3000/ninhadas', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setNinhadas(data);
        }
      } catch (err) {
        // erro silencioso
      } finally {
        setLoading(false);
      }
    };
    fetchNinhadas();
  }, []);

  // Cálculos para os resumos
  const total = ninhadas.length;
  const comPerdas = ninhadas.filter(n => n.Perdas && n.Perdas.trim() !== '').length;
  const ativas = ninhadas.filter(n => !n.Perdas || n.Perdas.trim() === '').length;

  // Alertas
  const hoje = new Date();
  const proximasDoParto = ninhadas.filter(n => {
    if (!n.Data_Concepcao) return false;
    const concepcao = new Date(n.Data_Concepcao);
    const previsao = new Date(concepcao.getTime() + 115 * 24 * 60 * 60 * 1000);
    const diff = (previsao.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 7;
  });
  const perdasRecentes = ninhadas.filter(n => {
    if (!n.Perdas || !n.Data_Nascimento) return false;
    const nascimento = new Date(n.Data_Nascimento);
    const diff = (hoje.getTime() - nascimento.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 15;
  });

  const filteredNinhadas = ninhadas.filter(n => {
    const term = searchTerm.toLowerCase();
    return (
      n.ID.toString().includes(term) ||
      n.Matriz_ID.toString().includes(term) ||
      n.Reprodutor_ID.toString().includes(term) ||
      (n.Descricao && n.Descricao.toLowerCase().includes(term))
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4 relative overflow-hidden">
      {/* Se desejar, pode adicionar partículas aqui também */}
      <div className="max-w-7xl mx-auto glass rounded-3xl shadow-2xl overflow-hidden relative">
        <div className="relative bg-gradient-to-r from-green-800 to-green-600 text-white p-8 text-center mb-8">
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-6xl animate-bounce-gentle">🐣</div>
          <h1 className="text-5xl font-bold mb-4 text-shadow-lg">Gerenciamento de Ninhadas</h1>
          <p className="text-xl opacity-90">Controle completo de ninhadas, partos e perdas</p>
        </div>
        <div className="p-8">
          <div className="flex justify-end mb-8">
            <Link href="/ninhadas/novo">
              <button className="bg-blue-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-600 transition duration-200">
                ➕ Cadastrar Nova Ninhada
              </button>
            </Link>
          </div>
          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ResumoNinhadaCard titulo="Total de Ninhadas" valor={total} icone={<span>🐣</span>} cor="border-orange-500" />
            <ResumoNinhadaCard titulo="Ativas" valor={ativas} icone={<span>✅</span>} cor="border-green-500" />
            <ResumoNinhadaCard titulo="Com Perdas" valor={comPerdas} icone={<span>☠️</span>} cor="border-red-500" />
          </div>
          {/* Alertas */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-700 mb-4 flex items-center gap-2"><span>⚠️</span> Alertas de Ninhadas</h2>
            <AlertCard
              icone={<span>🍼</span>}
              titulo="Ninhadas próximas do parto"
              descricao={`Existem ${proximasDoParto.length} ninhadas com nascimento previsto nos próximos 7 dias.`}
              cor="border-yellow-500"
            />
            <AlertCard
              icone={<span>☠️</span>}
              titulo="Perdas Recentes"
              descricao={`Foram registradas perdas em ${perdasRecentes.length} ninhadas nos últimos 15 dias.`}
              cor="border-red-500"
            />
          </div>
          {/* Busca */}
          <div className="mb-8 max-w-xl mx-auto">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Buscar por ID, matriz, reprodutor ou descrição..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full p-4 pl-12 pr-12 border-2 border-gray-200 rounded-2xl text-lg focus:border-orange-500 focus:outline-none transition-all duration-300"
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
          {/* Lista de Ninhadas */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Lista de Ninhadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <p>Carregando...</p>
              ) : filteredNinhadas.length > 0 ? (
                filteredNinhadas.map((ninhada) => {
                  const ativa = !ninhada.Perdas || ninhada.Perdas.trim() === '';
                  return (
                    <div key={ninhada.ID} className={`p-5 rounded-2xl shadow-lg border-l-4 ${ativa ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'} flex flex-col gap-2 relative`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">🐣</span>
                        <span className="font-bold text-lg">Ninhada #{ninhada.ID}</span>
                        <span className={`ml-auto px-3 py-1 rounded-full text-xs font-bold ${ativa ? 'bg-green-200 text-green-900' : 'bg-red-200 text-red-900'}`}>{ativa ? 'Ativa' : 'Com Perdas'}</span>
                      </div>
                      <div className="text-sm text-gray-700">
                        <strong>Matriz ID:</strong> {ninhada.Matriz_ID} <br/>
                        <strong>Reprodutor ID:</strong> {ninhada.Reprodutor_ID}
                      </div>
                      <div className="text-sm text-gray-700">
                        <strong>Concepção:</strong> {ninhada.Data_Concepcao ? new Date(ninhada.Data_Concepcao).toLocaleDateString('pt-BR') : 'N/A'}<br/>
                        <strong>Nascimento:</strong> {ninhada.Data_Nascimento ? new Date(ninhada.Data_Nascimento).toLocaleDateString('pt-BR') : 'N/A'}
                      </div>
                      {ninhada.Perdas && ninhada.Perdas.trim() !== '' && (
                        <div className="text-sm text-red-700 bg-red-100 rounded px-2 py-1 mt-1">
                          <strong>Perdas:</strong> {ninhada.Perdas}
                        </div>
                      )}
                      {ninhada.Descricao && (
                        <div className="text-xs text-gray-500 mt-1 italic">{ninhada.Descricao}</div>
                      )}
                      <div className="flex gap-2 mt-3">
                        <button className="flex-1 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition text-sm" title="Visualizar" disabled>👁️</button>
                        <button className="flex-1 bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition text-sm" title="Editar" disabled>✏️</button>
                        <button className="flex-1 bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition text-sm" title="Excluir" disabled>🗑️</button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>Nenhuma ninhada cadastrada.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 