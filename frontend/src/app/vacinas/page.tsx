'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ResumoVacinaCard from '../../components/ResumoVacinaCard';
import AlertCard from '../../components/AlertCard';
import StatusBadge from '../../components/StatusBadge';

type Vacina = {
  ID: number;
  Animal_ID: number;
  Nome_Vacina: string;
  Data_Aplicacao: string;
  Proxima_Aplicacao: string;
  Veterinario: string;
};

export default function VacinasPage() {
  const [vacinas, setVacinas] = useState<Vacina[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchVacinas = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:3000/vacinas', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setVacinas(data);
        }
      } catch (err) {
        // erro silencioso
      } finally {
        setLoading(false);
      }
    };
    fetchVacinas();
  }, []);

  // Cálculos para os resumos
  const total = vacinas.length;
  const ultimoMes = vacinas.filter(v => {
    const dias = (new Date().getTime() - new Date(v.Data_Aplicacao).getTime()) / (1000*60*60*24);
    return dias <= 30;
  }).length;
  const pendentes = vacinas.filter(v => {
    if (!v.Proxima_Aplicacao) return false;
    const dias = (new Date(v.Proxima_Aplicacao).getTime() - new Date().getTime()) / (1000*60*60*24);
    return dias >= 0 && dias <= 7;
  }).length;

  // Cálculos para alertas
  const vencidas = vacinas.filter(v => v.Proxima_Aplicacao && new Date(v.Proxima_Aplicacao) < new Date());
  const proximas = vacinas.filter(v => {
    if (!v.Proxima_Aplicacao) return false;
    const dias = (new Date(v.Proxima_Aplicacao).getTime() - new Date().getTime()) / (1000*60*60*24);
    return dias > 0 && dias <= 7;
  });

  const term = (searchTerm || '').toLowerCase();
  const filteredVacinas = vacinas.filter(v => {
    return (
      (v.Nome_Vacina || '').toLowerCase().includes(term) ||
      v.Animal_ID.toString().includes(term) ||
      (v.Data_Aplicacao && new Date(v.Data_Aplicacao).toLocaleDateString('pt-BR').includes(term)) ||
      (v.Proxima_Aplicacao && new Date(v.Proxima_Aplicacao).toLocaleDateString('pt-BR').includes(term)) ||
      (v.Veterinario || '').toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto glass rounded-3xl shadow-2xl overflow-hidden relative">
        <div className="relative bg-gradient-to-r from-green-800 to-green-600 text-white p-8 text-center mb-8">
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-6xl animate-bounce-gentle">💉</div>
          <h1 className="text-5xl font-bold mb-4 text-shadow-lg">Gerenciamento de Vacinas</h1>
          <p className="text-xl opacity-90">Controle e histórico de vacinação dos animais</p>
        </div>
        <div className="p-8">
          <div className="flex justify-end mb-8">
            <Link href="/vacinas/novo">
              <button className="bg-cyan-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-cyan-700 transition duration-200">
                ➕ Registrar Nova Vacina
              </button>
            </Link>
          </div>
          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ResumoVacinaCard titulo="Total de Vacinas" valor={total} icone={<span>💉</span>} cor="border-cyan-600" />
            <ResumoVacinaCard titulo="Último mês" valor={ultimoMes} icone={<span>📅</span>} cor="border-blue-500" />
            <ResumoVacinaCard titulo="Pendentes/Próximas" valor={pendentes} icone={<span>⏳</span>} cor="border-yellow-500" />
          </div>
          {/* Alertas */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-700 mb-4 flex items-center gap-2"><span>⚠️</span> Alertas de Vacinação</h2>
            <AlertCard
              icone={<span>⏰</span>}
              titulo="Vacinas vencidas"
              descricao={`Existem ${vencidas.length} vacinas vencidas ou atrasadas para aplicação.`}
              cor="border-red-500"
            />
            <AlertCard
              icone={<span>🕒</span>}
              titulo="Vacinas próximas do vencimento"
              descricao={`Existem ${proximas.length} vacinas com aplicação prevista nos próximos 7 dias.`}
              cor="border-yellow-500"
            />
          </div>
          {/* Busca */}
          <div className="mb-8 max-w-xl mx-auto">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Buscar por vacina, animal, data ou veterinário..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full p-4 pl-12 pr-12 border-2 border-gray-200 rounded-2xl text-lg focus:border-cyan-600 focus:outline-none transition-all duration-300"
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
          {/* Lista de Vacinas */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Registros de Vacinação</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <p>Carregando...</p>
              ) : filteredVacinas.length > 0 ? (
                filteredVacinas.map((vacina) => {
                  let status = 'Ok';
                  if (vacina.Proxima_Aplicacao) {
                    const dias = (new Date(vacina.Proxima_Aplicacao).getTime() - new Date().getTime()) / (1000*60*60*24);
                    if (new Date(vacina.Proxima_Aplicacao) < new Date()) status = 'Atrasado';
                    else if (dias >= 0 && dias <= 7) status = 'Pendente';
                  }
                  return (
                    <div key={vacina.ID} className="p-4 border rounded-lg shadow-sm flex flex-col gap-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-lg">{vacina.Nome_Vacina}</p>
                          <p className="text-sm text-gray-600">Animal ID: {vacina.Animal_ID}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <StatusBadge status={status} />
                        </div>
                      </div>
                      {vacina.Data_Aplicacao && (
                        <p className="text-sm text-gray-500">Aplicada em: {new Date(vacina.Data_Aplicacao).toLocaleDateString('pt-BR')}</p>
                      )}
                      {vacina.Proxima_Aplicacao && (
                        <p className="text-sm text-gray-500">Próxima dose: {new Date(vacina.Proxima_Aplicacao).toLocaleDateString('pt-BR')}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-2">Vet: {vacina.Veterinario}</p>
                    </div>
                  );
                })
              ) : (
                <p>Nenhuma vacina registrada.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 