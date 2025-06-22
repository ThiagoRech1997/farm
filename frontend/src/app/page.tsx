'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Toast from '../components/Toast';
import Particles from '../components/Particles';
import { SkeletonGrid, StatsSkeleton } from '../components/LoadingSkeleton';
import Modal from '../components/Modal';
import { useToast } from '../hooks/useToast';
import ResumoCard from '../components/ResumoCard';
import AlertCard from '../components/AlertCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

type Animal = {
  ID: number;
  Nome: string;
  Cor: string;
  Sexo: string;
  Data_Nascimento: string;
  Observacoes: string;
  Especie_Nome?: string;
  Raca_Nome?: string;
};

type Pesagem = {
  ID: number;
  Animal_ID: number;
  Animal_Nome?: string;
  Data_Pesagem: string;
  Peso: number;
};

type Ninhada = {
  ID: number;
  Matriz_ID: number;
  Reprodutor_ID: number;
  Data_Concepcao: string;
  Data_Nascimento: string;
  Descricao: string;
  Perdas: string;
};

type Vacina = {
  ID: number;
  Animal_ID: number;
  Nome_Vacina: string;
  Data_Aplicacao: string;
  Proxima_Aplicacao: string;
  Veterinario: string;
};

export default function Home() {
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [pesagens, setPesagens] = useState<Pesagem[]>([]);
  const [ninhadas, setNinhadas] = useState<Ninhada[]>([]);
  const [vacinas, setVacinas] = useState<Vacina[]>([]);
  const [activeTab, setActiveTab] = useState('animais');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showParticles, setShowParticles] = useState(true);
  const { toasts, removeToast, success, error, info, warning } = useToast();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animalToDelete, setAnimalToDelete] = useState<Animal | null>(null);
  const [especieFiltro, setEspecieFiltro] = useState<string>('');
  const [periodo, setPeriodo] = useState<'todos' | 'ano' | 'mes' | 'personalizado'>('todos');
  const [anoSelecionado, setAnoSelecionado] = useState<string>('');
  const [mesSelecionado, setMesSelecionado] = useState<string>('');
  const [dataInicio, setDataInicio] = useState<string>('');
  const [dataFim, setDataFim] = useState<string>('');

  const [isSaidaModalOpen, setIsSaidaModalOpen] = useState(false);
  const [animalSaida, setAnimalSaida] = useState<Animal | null>(null);
  const [tipoSaida, setTipoSaida] = useState('');
  const [dataSaida, setDataSaida] = useState('');
  const [observacaoSaida, setObservacaoSaida] = useState('');
  const [comprador, setComprador] = useState('');
  const [valor, setValor] = useState('');
  const [motivoPerda, setMotivoPerda] = useState('');
  const [loadingSaida, setLoadingSaida] = useState(false);

  // Gerar lista de espécies únicas presentes nos animais
  const especiesUnicas = React.useMemo(() => {
    const nomes = new Set<string>();
    animais.forEach(a => { if (a.Especie_Nome) nomes.add(a.Especie_Nome); });
    return Array.from(nomes).sort();
  }, [animais]);

  // Gerar dados de evolução do rebanho por mês
  const rebanhoPorMes = React.useMemo(() => {
    const meses: { [key: string]: number } = {};
    animais.forEach(animal => {
      if (animal.Data_Nascimento) {
        const data = new Date(animal.Data_Nascimento);
        const mesAno = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;
        meses[mesAno] = (meses[mesAno] || 0) + 1;
      }
    });
    // Acumular total de animais ao longo dos meses
    const ordenado = Object.keys(meses).sort();
    let acumulado = 0;
    return ordenado.map(mes => {
      acumulado += meses[mes];
      return { mes, total: acumulado };
    });
  }, [animais]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [animaisRes, pesagensRes, ninhadasRes, vacinasRes] = await Promise.all([
          fetch('http://localhost:3000/animais', { cache: 'no-store' }),
          fetch('http://localhost:3000/pesagens/com-nomes', { cache: 'no-store' }),
          fetch('http://localhost:3000/ninhadas', { cache: 'no-store' }),
          fetch('http://localhost:3000/vacinas', { cache: 'no-store' }),
        ]);

        if (animaisRes.ok) {
          const data = await animaisRes.json();
          setAnimais(data);
          success('Animais carregados com sucesso!');
        } else {
          error('Erro ao carregar animais');
        }

        if (pesagensRes.ok) {
          const data = await pesagensRes.json();
          setPesagens(data);
        } else {
          console.error('Erro ao carregar pesagens');
        }

        if (ninhadasRes.ok) {
          const data = await ninhadasRes.json();
          setNinhadas(data);
        } else {
          console.error('Erro ao carregar ninhadas');
        }

        if (vacinasRes.ok) {
          const data = await vacinasRes.json();
          setVacinas(data);
        } else {
          console.error('Erro ao carregar vacinas');
        }

      } catch (err) {
        console.error('Erro ao buscar dados:', err);
        error('Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    if (window.innerWidth < 768) {
      setShowParticles(false);
    }
  }, []);

  const fetchAnimais = async () => {
    try {
      const res = await fetch('http://localhost:3000/animais', {
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        setAnimais(data);
        success('Animais carregados com sucesso!');
      }
    } catch (err) {
      console.error('Erro ao buscar animais:', err);
      error('Erro ao carregar animais');
    } finally {
      setLoading(false);
    }
  };

  const getSexoLabel = (sexo: string) => {
    if (!sexo) return 'Não Definido';
    const s = sexo.toLowerCase();
    if (s === 'm' || s === 'macho') return 'Macho';
    if (s === 'f' || s === 'femea') return 'Fêmea';
    return 'Não Definido';
  };

  const handleDeleteClick = (animal: Animal) => {
    setAnimalToDelete(animal);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (!animalToDelete) return;

    console.log('Excluindo animal:', animalToDelete.ID);
    
    setAnimais(prev => prev.filter(a => a.ID !== animalToDelete.ID));

    setIsModalOpen(false);
    setAnimalToDelete(null);
    warning(`Animal "${animalToDelete.Nome}" excluído com sucesso (simulação).`);
  };

  const animaisMachos = animais.filter(animal => animal.Sexo?.toLowerCase() === 'm' || animal.Sexo?.toLowerCase() === 'macho');
  const animaisFemeas = animais.filter(animal => {
    const sexoSemAcento = (animal.Sexo || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return sexoSemAcento === 'f' || sexoSemAcento === 'femea';
  });
  
  const filteredAnimais = animais.filter(animal => {
    const term = searchTerm.toLowerCase();
    return (
      animal.Nome.toLowerCase().includes(term) ||
      animal.Cor?.toLowerCase().includes(term) ||
      animal.Especie_Nome?.toLowerCase().includes(term) ||
      animal.Raca_Nome?.toLowerCase().includes(term) ||
      animal.ID.toString().includes(term)
    );
  });

  // Filtrar animais por espécie e período
  const animaisFiltrados = React.useMemo(() => {
    let filtrados = especieFiltro ? animais.filter(a => a.Especie_Nome === especieFiltro) : animais;
    if (periodo === 'ano' && anoSelecionado) {
      filtrados = filtrados.filter(a => a.Data_Nascimento && new Date(a.Data_Nascimento).getFullYear().toString() === anoSelecionado);
    } else if (periodo === 'mes' && anoSelecionado && mesSelecionado) {
      filtrados = filtrados.filter(a => {
        if (!a.Data_Nascimento) return false;
        const data = new Date(a.Data_Nascimento);
        return (
          data.getFullYear().toString() === anoSelecionado &&
          (data.getMonth() + 1).toString().padStart(2, '0') === mesSelecionado
        );
      });
    } else if (periodo === 'personalizado' && dataInicio && dataFim) {
      const inicio = new Date(dataInicio);
      const fim = new Date(dataFim);
      filtrados = filtrados.filter(a => {
        if (!a.Data_Nascimento) return false;
        const data = new Date(a.Data_Nascimento);
        return data >= inicio && data <= fim;
      });
    }
    return filtrados;
  }, [animais, especieFiltro, periodo, anoSelecionado, mesSelecionado, dataInicio, dataFim]);

  // Gerar anos e meses disponíveis
  const anosDisponiveis = React.useMemo(() => {
    const anos = new Set<string>();
    animais.forEach(a => {
      if (a.Data_Nascimento) anos.add(new Date(a.Data_Nascimento).getFullYear().toString());
    });
    return Array.from(anos).sort();
  }, [animais]);
  const mesesDisponiveis = [
    { value: '01', label: 'Janeiro' },
    { value: '02', label: 'Fevereiro' },
    { value: '03', label: 'Março' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Maio' },
    { value: '06', label: 'Junho' },
    { value: '07', label: 'Julho' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' },
  ];

  // Gerar dados de evolução do rebanho por mês considerando o filtro
  const rebanhoPorMesFiltrado = React.useMemo(() => {
    const meses: { [key: string]: number } = {};
    animaisFiltrados.forEach(animal => {
      if (animal.Data_Nascimento) {
        const data = new Date(animal.Data_Nascimento);
        const mesAno = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;
        meses[mesAno] = (meses[mesAno] || 0) + 1;
      }
    });
    // Acumular total de animais ao longo dos meses
    const ordenado = Object.keys(meses).sort();
    let acumulado = 0;
    return ordenado.map(mes => {
      acumulado += meses[mes];
      return { mes, total: acumulado };
    });
  }, [animaisFiltrados]);

  // Dados para gráfico de pizza de distribuição por espécie
  const dadosPorEspecie = React.useMemo(() => {
    const contagem: { [key: string]: number } = {};
    animaisFiltrados.forEach(a => {
      if (a.Especie_Nome) contagem[a.Especie_Nome] = (contagem[a.Especie_Nome] || 0) + 1;
    });
    return Object.entries(contagem).map(([nome, total]) => ({ nome, total }));
  }, [animaisFiltrados]);
  const coresEspecies = ['#16a34a', '#f59e42', '#3b82f6', '#e11d48', '#a21caf', '#fbbf24', '#0ea5e9', '#6366f1', '#f43f5e', '#84cc16'];

  const abrirModalSaida = (animal: Animal) => {
    setAnimalSaida(animal);
    setIsSaidaModalOpen(true);
    setTipoSaida('');
    setDataSaida('');
    setObservacaoSaida('');
    setComprador('');
    setValor('');
    setMotivoPerda('');
  };

  const registrarSaida = async () => {
    if (!animalSaida || !tipoSaida || !dataSaida) return;
    setLoadingSaida(true);
    try {
      const body: any = {
        Animal_ID: animalSaida.ID,
        Tipo_Saida: tipoSaida,
        Data_Saida: dataSaida,
        Observacao: observacaoSaida,
      };
      if (tipoSaida === 'venda') {
        body.Comprador = comprador;
        body.Valor = valor ? parseFloat(valor) : undefined;
      }
      if (tipoSaida === 'perda') {
        body.Motivo_Perda = motivoPerda;
      }
      await fetch('http://localhost:3000/animais/saida', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      success('Saída registrada com sucesso!');
      setIsSaidaModalOpen(false);
      setAnimalSaida(null);
      fetchAnimais();
    } catch (err) {
      error('Erro ao registrar saída');
    } finally {
      setLoadingSaida(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4 relative overflow-hidden">
      {showParticles && <Particles />}
      
      <div className="max-w-7xl mx-auto glass rounded-3xl shadow-2xl overflow-hidden relative">
        <div className="relative bg-gradient-to-r from-green-800 to-green-600 text-white p-8 text-center">
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-6xl animate-bounce-gentle">
            🐄
          </div>
          <h1 className="text-5xl font-bold mb-4 text-shadow-lg">Gerenciamento da Fazenda</h1>
          <p className="text-xl opacity-90">Sistema completo para controle de animais, ninhadas, pesagem e vacinas</p>
        </div>

        <div className="flex bg-gray-50 border-b-4 border-gray-200">
          {[
            { id: 'animais', icon: '🐄', label: 'Animais' },
            { id: 'ninhadas', icon: '👶', label: 'Ninhadas' },
            { id: 'pesagem', icon: '⚖️', label: 'Pesagem' },
            { id: 'vacinas', icon: '💉', label: 'Vacinas' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 p-6 text-lg font-bold transition-all duration-300 relative hover-3d ${
                activeTab === tab.id 
                  ? 'bg-white text-green-800 border-b-4 border-green-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl mr-3">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-8">
          {activeTab === 'animais' && (
            <div className="animate-fadeIn">
              {loading ? (
                <StatsSkeleton />
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <ResumoCard titulo="Total de Animais" valor={animais.length} icone={<span>🐄</span>} cor="border-green-800" />
                    <ResumoCard titulo="Machos" valor={animaisMachos.length} icone={<span>♂️</span>} cor="border-blue-800" />
                    <ResumoCard titulo="Fêmeas" valor={animaisFemeas.length} icone={<span>♀️</span>} cor="border-pink-800" />
                    <ResumoCard titulo="Não Definido" valor={animais.filter(a => !a.Sexo).length} icone={<span>❓</span>} cor="border-purple-800" />
                  </div>
                  <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
                    <label className="font-semibold text-green-900">Filtrar por espécie:</label>
                    <select
                      value={especieFiltro}
                      onChange={e => setEspecieFiltro(e.target.value)}
                      className="p-3 rounded-lg border border-green-300 bg-white/80 text-green-900 focus:ring-2 focus:ring-green-500 focus:border-transparent transition w-full md:w-auto"
                    >
                      <option value="">Todas as espécies</option>
                      {especiesUnicas.map(nome => (
                        <option key={nome} value={nome}>{nome}</option>
                      ))}
                    </select>
                    <label className="font-semibold text-green-900 ml-0 md:ml-8">Período:</label>
                    <select
                      value={periodo}
                      onChange={e => setPeriodo(e.target.value as any)}
                      className="p-3 rounded-lg border border-green-300 bg-white/80 text-green-900 focus:ring-2 focus:ring-green-500 focus:border-transparent transition w-full md:w-auto"
                    >
                      <option value="todos">Todos</option>
                      <option value="ano">Ano</option>
                      <option value="mes">Mês</option>
                      <option value="personalizado">Personalizado</option>
                    </select>
                    {periodo === 'ano' && (
                      <select
                        value={anoSelecionado}
                        onChange={e => setAnoSelecionado(e.target.value)}
                        className="p-3 rounded-lg border border-green-300 bg-white/80 text-green-900 focus:ring-2 focus:ring-green-500 focus:border-transparent transition w-full md:w-auto"
                      >
                        <option value="">Selecione o ano</option>
                        {anosDisponiveis.map(ano => (
                          <option key={ano} value={ano}>{ano}</option>
                        ))}
                      </select>
                    )}
                    {periodo === 'mes' && (
                      <>
                        <select
                          value={anoSelecionado}
                          onChange={e => setAnoSelecionado(e.target.value)}
                          className="p-3 rounded-lg border border-green-300 bg-white/80 text-green-900 focus:ring-2 focus:ring-green-500 focus:border-transparent transition w-full md:w-auto"
                        >
                          <option value="">Ano</option>
                          {anosDisponiveis.map(ano => (
                            <option key={ano} value={ano}>{ano}</option>
                          ))}
                        </select>
                        <select
                          value={mesSelecionado}
                          onChange={e => setMesSelecionado(e.target.value)}
                          className="p-3 rounded-lg border border-green-300 bg-white/80 text-green-900 focus:ring-2 focus:ring-green-500 focus:border-transparent transition w-full md:w-auto"
                        >
                          <option value="">Mês</option>
                          {mesesDisponiveis.map(mes => (
                            <option key={mes.value} value={mes.value}>{mes.label}</option>
                          ))}
                        </select>
                      </>
                    )}
                    {periodo === 'personalizado' && (
                      <>
                        <input
                          type="date"
                          value={dataInicio}
                          onChange={e => setDataInicio(e.target.value)}
                          className="p-3 rounded-lg border border-green-300 bg-white/80 text-green-900 focus:ring-2 focus:ring-green-500 focus:border-transparent transition w-full md:w-auto"
                        />
                        <span className="mx-2">até</span>
                        <input
                          type="date"
                          value={dataFim}
                          onChange={e => setDataFim(e.target.value)}
                          className="p-3 rounded-lg border border-green-300 bg-white/80 text-green-900 focus:ring-2 focus:ring-green-500 focus:border-transparent transition w-full md:w-auto"
                        />
                      </>
                    )}
                  </div>
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-green-900"><span>📈</span> Evolução do Rebanho</h2>
                    <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={rebanhoPorMesFiltrado} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                          <Tooltip formatter={(value) => `${value} animais`} labelFormatter={l => `Mês: ${l}`} />
                          <Line type="monotone" dataKey="total" stroke="#16a34a" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-green-900"><span>🥧</span> Distribuição por Espécie</h2>
                    <div className="bg-white/80 rounded-2xl p-6 shadow-lg flex flex-col md:flex-row items-center justify-center">
                      <ResponsiveContainer width={350} height={300}>
                        <PieChart>
                          <Pie
                            data={dadosPorEspecie}
                            dataKey="total"
                            nameKey="nome"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#16a34a"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {dadosPorEspecie.map((entry, idx) => (
                              <Cell key={`cell-${idx}`} fill={coresEspecies[idx % coresEspecies.length]} />
                            ))}
                          </Pie>
                          <Legend />
                          <Tooltip formatter={(value) => `${value} animais`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  {/* Seção de Alertas e Pendências */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-yellow-700 mb-4 flex items-center gap-2"><span>⚠️</span> Alertas e Pendências</h2>
                    <AlertCard
                      icone={<span>💉</span>}
                      titulo="Vacinas Pendentes"
                      descricao={`Existem ${vacinas.filter(v => new Date(v.Proxima_Aplicacao) < new Date()).length} vacinas atrasadas ou próximas do vencimento.`}
                      cor="border-yellow-500"
                    />
                    <AlertCard
                      icone={<span>⚖️</span>}
                      titulo="Pesagens Atrasadas"
                      descricao={`Existem ${pesagens.filter(p => {
                        const dias = (new Date().getTime() - new Date(p.Data_Pesagem).getTime()) / (1000*60*60*24);
                        return dias > 30;
                      }).length} animais sem pesagem há mais de 30 dias.`}
                      cor="border-orange-500"
                    />
                    <AlertCard
                      icone={<span>☠️</span>}
                      titulo="Perdas Recentes"
                      descricao={`Verifique as últimas perdas registradas nas ninhadas.`}
                      cor="border-red-500"
                    />
                  </div>
                  {/* Seção de Ações Rápidas */}
                  <div className="flex flex-wrap gap-4 mb-8 justify-center">
                    <Link href="/animais/cadastro-unificado">
                      <button className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-4 px-8 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg btn-hover animate-shimmer flex items-center gap-2">
                        <span className="text-2xl">➕</span> Cadastrar Animal Completo
                      </button>
                    </Link>
                    <Link href="/animais/novo">
                      <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-600 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg btn-hover flex items-center gap-2">
                        <span className="text-2xl">➕</span> Cadastrar Animal Simples
                      </button>
                    </Link>
                    <Link href="/pesagens/novo">
                      <button className="bg-gradient-to-r from-lime-600 to-lime-700 text-white font-bold py-4 px-8 rounded-xl hover:from-lime-700 hover:to-lime-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg btn-hover flex items-center gap-2">
                        <span className="text-2xl">⚖️</span> Registrar Pesagem
                      </button>
                    </Link>
                    <Link href="/vacinas/novo">
                      <button className="bg-gradient-to-r from-pink-500 to-pink-700 text-white font-bold py-4 px-8 rounded-xl hover:from-pink-600 hover:to-pink-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg btn-hover flex items-center gap-2">
                        <span className="text-2xl">💉</span> Registrar Vacina
                      </button>
                    </Link>
                  </div>
                </>
              )}

              <div className="mb-8 search-container">
                <div className="relative">
                  <span className="search-icon text-xl">🔍</span>
                  <input
                    type="text"
                    placeholder="Buscar por nome, cor, espécie, raça ou ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-4 pl-12 pr-12 border-2 border-gray-200 rounded-2xl text-lg focus:border-green-600 focus:outline-none transition-all duration-300"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                      aria-label="Limpar busca"
                    >
                      &times;
                    </button>
                  )}
                </div>
              </div>

              {loading ? (
                <SkeletonGrid count={6} />
              ) : animaisFiltrados.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {animaisFiltrados.map((animal, index) => (
                    <div 
                      key={animal.ID} 
                      className="glass rounded-2xl p-7 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 card-glow hover-3d"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <h3 className="text-2xl font-bold text-green-900 mb-4">{animal.Nome}</h3>
                      <div className="grid grid-cols-2 gap-4 mb-5 text-gray-800">
                        <span className="bg-white/70 px-3 py-2 rounded-lg text-sm font-medium">
                          <strong className="text-gray-900 block">Cor:</strong> {animal.Cor || 'N/A'}
                        </span>
                        <span className="bg-white/70 px-3 py-2 rounded-lg text-sm font-medium">
                          <strong className="text-gray-900 block">Sexo:</strong> {getSexoLabel(animal.Sexo)}
                        </span>
                        <span className="bg-white/70 px-3 py-2 rounded-lg text-sm font-medium">
                          <strong className="text-gray-900 block">Nascimento:</strong> {animal.Data_Nascimento ? new Date(animal.Data_Nascimento).toLocaleDateString('pt-BR') : 'N/A'}
                        </span>
                        <span className="bg-white/70 px-3 py-2 rounded-lg text-sm font-medium">
                          <strong className="text-gray-900 block">ID:</strong> #{animal.ID}
                        </span>
                        {animal.Especie_Nome && (
                          <span className="bg-white/70 px-3 py-2 rounded-lg text-sm font-medium col-span-1">
                            <strong className="text-gray-900 block">Espécie:</strong> {animal.Especie_Nome}
                          </span>
                        )}
                        {animal.Raca_Nome && (
                          <span className="bg-white/70 px-3 py-2 rounded-lg text-sm font-medium col-span-1">
                            <strong className="text-gray-900 block">Raça:</strong> {animal.Raca_Nome}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/animais/editar/${animal.ID}`} legacyBehavior>
                          <a className="flex-1 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 text-sm btn-hover text-center">Editar</a>
                        </Link>
                        <button 
                          className="flex-1 bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 text-sm btn-hover"
                          onClick={() => abrirModalSaida(animal)}
                        >
                          Remover do Rebanho
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-6xl mb-4 animate-float">🐄</div>
                  <p className="text-xl text-gray-600 mb-4">
                    {searchTerm ? 'Nenhum animal encontrado para sua busca' : 'Nenhum animal cadastrado ainda'}
                  </p>
                  <p className="text-gray-500">Clique em "Cadastrar Animal Completo" para começar</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'ninhadas' && (
            <div className="animate-fadeIn">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-green-800">🐣 Controle de Ninhadas</h2>
                <Link href="/ninhadas/novo">
                  <button className="bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold py-3 px-6 rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg btn-hover">
                    ➕ Registrar Nova Ninhada
                  </button>
                </Link>
              </div>
              {loading ? (
                <SkeletonGrid count={3} />
              ) : ninhadas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ninhadas.map((ninhada) => (
                    <div key={ninhada.ID} className="glass p-6 rounded-2xl shadow-lg card-glow hover-3d">
                      <p className="font-semibold text-lg text-green-900">Ninhada ID: {ninhada.ID}</p>
                      <p className="text-sm text-gray-700">Matriz ID: {ninhada.Matriz_ID}</p>
                      <p className="text-sm text-gray-700">Reprodutor ID: {ninhada.Reprodutor_ID}</p>
                      {ninhada.Data_Nascimento && (
                        <p className="text-sm text-gray-500">
                          Nascimento: {new Date(ninhada.Data_Nascimento).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 mt-2">{ninhada.Descricao}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-6xl mb-4 animate-float">🐣</div>
                  <p className="text-xl text-gray-600 mb-4">Nenhuma ninhada cadastrada ainda.</p>
                  <p className="text-gray-500">Clique em "Registrar Nova Ninhada" para começar.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'pesagem' && (
            <div className="animate-fadeIn">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-green-800">⚖️ Registros de Pesagem</h2>
                <Link href="/pesagens/novo">
                  <button className="bg-gradient-to-r from-lime-600 to-lime-700 text-white font-bold py-3 px-6 rounded-xl hover:from-lime-700 hover:to-lime-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg btn-hover">
                    ➕ Registrar Pesagem
                  </button>
                </Link>
              </div>

              {loading ? (
                 <SkeletonGrid count={3} />
              ) : pesagens.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {pesagens.map((pesagem) => (
                    <div key={pesagem.ID} className="glass p-6 rounded-2xl shadow-lg text-center card-glow hover-3d">
                       <p className="text-lg font-bold text-green-900">{pesagem.Animal_Nome || `Animal ID: ${pesagem.Animal_ID}`}</p>
                       <p className="font-black text-4xl text-purple-800 my-2 count-up">{pesagem.Peso.toFixed(2)} kg</p>
                       <p className="text-sm text-gray-700">
                         {new Date(pesagem.Data_Pesagem).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
                       </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-6xl mb-4 animate-float">⚖️</div>
                  <p className="text-xl text-gray-600 mb-4">Nenhuma pesagem registrada ainda.</p>
                  <p className="text-gray-500">Clique em "Registrar Pesagem" para começar.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'vacinas' && (
            <div className="animate-fadeIn">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-green-800">💉 Controle de Vacinas</h2>
                <Link href="/vacinas/novo">
                  <button className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-bold py-3 px-6 rounded-xl hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg btn-hover">
                    ➕ Registrar Nova Vacina
                  </button>
                </Link>
              </div>
              {loading ? (
                <SkeletonGrid count={3} />
              ) : vacinas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vacinas.map((vacina) => (
                    <div key={vacina.ID} className="glass p-6 rounded-2xl shadow-lg card-glow hover-3d">
                      <p className="font-semibold text-lg text-green-900">{vacina.Nome_Vacina}</p>
                      <p className="text-sm text-gray-700">Animal ID: {vacina.Animal_ID}</p>
                      {vacina.Data_Aplicacao && (
                        <p className="text-sm text-gray-500">
                          Aplicada em: {new Date(vacina.Data_Aplicacao).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                      {vacina.Proxima_Aplicacao && (
                        <p className="text-sm text-gray-500">
                          Próxima dose: {new Date(vacina.Proxima_Aplicacao).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 mt-2">Vet: {vacina.Veterinario}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-6xl mb-4 animate-float">💉</div>
                  <p className="text-xl text-gray-600 mb-4">Nenhuma vacina registrada ainda.</p>
                  <p className="text-gray-500">Clique em "Registrar Nova Vacina" para começar.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirmar Exclusão"
        description={`Tem certeza que deseja excluir o animal "${animalToDelete?.Nome}"? Esta ação não pode ser desfeita.`}
        onConfirm={confirmDelete}
        confirmText="Sim, Excluir"
        cancelText="Cancelar"
      />

      <Modal
        isOpen={isSaidaModalOpen}
        onClose={() => setIsSaidaModalOpen(false)}
        title="Remover do Rebanho"
        confirmText={loadingSaida ? 'Removendo...' : 'Confirmar Saída'}
        cancelText="Cancelar"
        onConfirm={registrarSaida}
        showCloseButton={!loadingSaida}
      >
        <div className="space-y-4">
          <label className="block font-semibold">Tipo de Saída:</label>
          <select value={tipoSaida} onChange={e => setTipoSaida(e.target.value)} className="w-full p-2 border rounded-lg">
            <option value="">Selecione...</option>
            <option value="venda">Venda</option>
            <option value="perda">Perda (Falecimento)</option>
            <option value="abate">Abate</option>
          </select>
          <label className="block font-semibold">Data da Saída:</label>
          <input type="date" value={dataSaida} onChange={e => setDataSaida(e.target.value)} className="w-full p-2 border rounded-lg" />
          <label className="block font-semibold">Observação:</label>
          <textarea value={observacaoSaida} onChange={e => setObservacaoSaida(e.target.value)} className="w-full p-2 border rounded-lg" rows={2} />
          {tipoSaida === 'venda' && (
            <>
              <label className="block font-semibold">Comprador:</label>
              <input type="text" value={comprador} onChange={e => setComprador(e.target.value)} className="w-full p-2 border rounded-lg" />
              <label className="block font-semibold">Valor (R$):</label>
              <input type="number" value={valor} onChange={e => setValor(e.target.value)} className="w-full p-2 border rounded-lg" min="0" step="0.01" />
            </>
          )}
          {tipoSaida === 'perda' && (
            <>
              <label className="block font-semibold">Motivo da Perda:</label>
              <input type="text" value={motivoPerda} onChange={e => setMotivoPerda(e.target.value)} className="w-full p-2 border rounded-lg" />
            </>
          )}
        </div>
      </Modal>
    </div>
  );
} 