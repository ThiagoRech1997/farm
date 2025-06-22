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
              ) : filteredAnimais.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredAnimais.map((animal, index) => (
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
                        <button 
                          className="flex-1 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 text-sm btn-hover"
                          onClick={() => info('Funcionalidade de edição em desenvolvimento')}
                        >
                          Editar
                        </button>
                        <button 
                          className="flex-1 bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 text-sm btn-hover"
                          onClick={() => handleDeleteClick(animal)}
                        >
                          Excluir
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
    </div>
  );
} 