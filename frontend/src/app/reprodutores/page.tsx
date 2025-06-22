'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ResumoReprodutorCard from '../../components/ResumoReprodutorCard';
import AlertCard from '../../components/AlertCard';

type Reprodutor = {
  ID: number;
  Nome: string;
  Matriz_ID: number;
  Data_Concepcao: string;
  Data_Nascimento: string;
  Ninhada_Descricao: string;
  Perdas: string;
};

export default function ReprodutoresPage() {
  const [reprodutores, setReprodutores] = useState<Reprodutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchReprodutores = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:3000/reprodutores', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setReprodutores(data);
        }
      } catch (err) {
        // erro silencioso
      } finally {
        setLoading(false);
      }
    };
    fetchReprodutores();
  }, []);

  // Cálculos para os resumos
  const total = reprodutores.length;
  const ativos = reprodutores.filter(r => {
    // Considera ativo se tem ninhada recente (últimos 180 dias)
    if (!r.Data_Nascimento) return false;
    const dias = (new Date().getTime() - new Date(r.Data_Nascimento).getTime()) / (1000*60*60*24);
    return dias <= 180;
  }).length;
  const inativos = total - ativos;

  // Cálculos para alertas
  const idadeAvancada = reprodutores.filter(r => {
    if (!r.Data_Nascimento) return false;
    const anos = (new Date().getTime() - new Date(r.Data_Nascimento).getTime()) / (1000*60*60*24*365.25);
    return anos >= 5;
  });
  const semNinhadaRecente = reprodutores.filter(r => {
    if (!r.Data_Nascimento) return false;
    const dias = (new Date().getTime() - new Date(r.Data_Nascimento).getTime()) / (1000*60*60*24);
    return dias > 180;
  });

  const filteredReprodutores = reprodutores.filter(r => {
    const term = searchTerm.toLowerCase();
    return (
      r.Nome.toLowerCase().includes(term) ||
      r.ID.toString().includes(term) ||
      r.Matriz_ID.toString().includes(term) ||
      (r.Ninhada_Descricao && r.Ninhada_Descricao.toLowerCase().includes(term)) ||
      (r.Data_Nascimento && new Date(r.Data_Nascimento).toLocaleDateString('pt-BR').includes(term))
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto glass rounded-3xl shadow-2xl overflow-hidden relative">
        <div className="relative bg-gradient-to-r from-green-800 to-green-600 text-white p-8 text-center mb-8">
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-6xl animate-bounce-gentle">🐗</div>
          <h1 className="text-5xl font-bold mb-4 text-shadow-lg">Gerenciamento de Reprodutores</h1>
          <p className="text-xl opacity-90">Controle de reprodutores, ninhadas e desempenho</p>
        </div>
        <div className="p-8">
          <div className="flex justify-end mb-8">
            <Link href="/reprodutores/novo">
              <button className="bg-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-purple-700 transition duration-200">
                ➕ Cadastrar Novo Reprodutor
              </button>
            </Link>
          </div>
          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ResumoReprodutorCard titulo="Total de Reprodutores" valor={total} icone={<span>🐗</span>} cor="border-purple-600" />
            <ResumoReprodutorCard titulo="Ativos" valor={ativos} icone={<span>✅</span>} cor="border-green-500" />
            <ResumoReprodutorCard titulo="Inativos" valor={inativos} icone={<span>⏸️</span>} cor="border-gray-400" />
          </div>
          {/* Alertas */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-700 mb-4 flex items-center gap-2"><span>⚠️</span> Alertas de Reprodutores</h2>
            <AlertCard
              icone={<span>🎂</span>}
              titulo="Idade Avançada"
              descricao={`Existem ${idadeAvancada.length} reprodutores com mais de 5 anos de idade.`}
              cor="border-red-500"
            />
            <AlertCard
              icone={<span>⏳</span>}
              titulo="Sem ninhada recente"
              descricao={`Existem ${semNinhadaRecente.length} reprodutores sem ninhada nos últimos 180 dias.`}
              cor="border-yellow-500"
            />
          </div>
          {/* Busca */}
          <div className="mb-8 max-w-xl mx-auto">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Buscar por nome, ID, matriz, descrição ou data..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full p-4 pl-12 pr-12 border-2 border-gray-200 rounded-2xl text-lg focus:border-purple-600 focus:outline-none transition-all duration-300"
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
          {/* Lista de Reprodutores */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Lista de Reprodutores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <p>Carregando...</p>
              ) : filteredReprodutores.length > 0 ? (
                filteredReprodutores.map((reprodutor) => (
                  <div key={reprodutor.ID} className="p-4 border rounded-lg shadow-sm">
                    <p className="font-semibold text-lg">{reprodutor.Nome}</p>
                    <p className="text-sm text-gray-600">Matriz ID: {reprodutor.Matriz_ID}</p>
                    {reprodutor.Data_Nascimento && (
                      <p className="text-sm text-gray-500">
                        Nascimento da Ninhada: {new Date(reprodutor.Data_Nascimento).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">{reprodutor.Ninhada_Descricao}</p>
                  </div>
                ))
              ) : (
                <p>Nenhum reprodutor cadastrado.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 