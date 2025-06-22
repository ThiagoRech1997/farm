'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Toast from '../components/Toast';
import Particles from '../components/Particles';
import { SkeletonGrid, StatsSkeleton } from '../components/LoadingSkeleton';
import Modal from '../components/Modal';
import { useToast } from '../hooks/useToast';

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

export default function Home() {
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [activeTab, setActiveTab] = useState('animais');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showParticles, setShowParticles] = useState(true);
  const { toasts, removeToast, success, error, info, warning } = useToast();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animalToDelete, setAnimalToDelete] = useState<Animal | null>(null);

  useEffect(() => {
    fetchAnimais();
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
  const animaisFemeas = animais.filter(animal => animal.Sexo?.toLowerCase() === 'f' || animal.Sexo?.toLowerCase() === 'femea' || animal.Sexo?.toLowerCase() === 'femea');
  
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="glass p-6 rounded-2xl shadow-lg border-l-4 border-green-800 text-center card-glow hover-3d">
                    <span className="text-4xl font-bold text-green-800 block count-up">{animais.length}</span>
                    <div className="text-gray-600 text-lg mt-2">Total de Animais</div>
                  </div>
                  <div className="glass p-6 rounded-2xl shadow-lg border-l-4 border-blue-800 text-center card-glow hover-3d">
                    <span className="text-4xl font-bold text-blue-800 block count-up">{animaisMachos.length}</span>
                    <div className="text-gray-600 text-lg mt-2">Machos</div>
                  </div>
                  <div className="glass p-6 rounded-2xl shadow-lg border-l-4 border-pink-800 text-center card-glow hover-3d">
                    <span className="text-4xl font-bold text-pink-800 block count-up">{animaisFemeas.length}</span>
                    <div className="text-gray-600 text-lg mt-2">Femeas</div>
                  </div>
                  <div className="glass p-6 rounded-2xl shadow-lg border-l-4 border-purple-800 text-center card-glow hover-3d">
                    <span className="text-4xl font-bold text-purple-800 block count-up">{animais.filter(a => !a.Sexo).length}</span>
                    <div className="text-gray-600 text-lg mt-2">Nao Definido</div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/animais/cadastro-unificado">
                  <button className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-4 px-8 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg btn-hover animate-shimmer">
                    ➕ Cadastrar Animal Completo
                  </button>
                </Link>
                <Link href="/animais/novo">
                  <button className="bg-white/20 text-white border-2 border-white/50 font-bold py-4 px-8 rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:-translate-y-1 shadow-lg btn-hover">
                    ➕ Cadastrar Animal Simples
                  </button>
                </Link>
                <Link href="/pesagens">
                  <button className="bg-white/20 text-white border-2 border-white/50 font-bold py-4 px-8 rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:-translate-y-1 shadow-lg btn-hover">
                    ⚖️ Gerenciar Pesagens
                  </button>
                </Link>
                <Link href="/vacinas">
                  <button className="bg-white/20 text-white border-2 border-white/50 font-bold py-4 px-8 rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:-translate-y-1 shadow-lg btn-hover">
                    💉 Gerenciar Vacinas
                  </button>
                </Link>
              </div>

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
              <h2 className="text-3xl font-bold text-green-800 mb-6">🐣 Controle de Ninhadas</h2>
              <Link href="/ninhadas">
                <button className="bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold py-4 px-8 rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg mb-8 btn-hover">
                  ➕ Registrar Nova Ninhada
                </button>
              </Link>
              <div className="text-center py-12 text-gray-600">
                <div className="text-6xl mb-4 animate-float">🐣</div>
                <p className="text-xl">Funcionalidade de ninhadas em desenvolvimento</p>
              </div>
            </div>
          )}

          {activeTab === 'pesagem' && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-green-800 mb-6">⚖️ Controle de Pesagem</h2>
              <Link href="/pesagens">
                <button className="bg-gradient-to-r from-lime-600 to-lime-700 text-white font-bold py-4 px-8 rounded-xl hover:from-lime-700 hover:to-lime-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg mb-8 btn-hover">
                  ➕ Registrar Pesagem
                </button>
              </Link>
              <div className="text-center py-12 text-gray-600">
                <div className="text-6xl mb-4 animate-float">⚖️</div>
                <p className="text-xl">Acesse a seção de pesagens para gerenciar os pesos dos animais</p>
              </div>
            </div>
          )}

          {activeTab === 'vacinas' && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold text-green-800 mb-6">💉 Controle de Vacinas</h2>
              <Link href="/vacinas">
                <button className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-bold py-4 px-8 rounded-xl hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg mb-8 btn-hover">
                  ➕ Registrar Vacinação
                </button>
              </Link>
              <div className="text-center py-12 text-gray-600">
                <div className="text-6xl mb-4 animate-float">💉</div>
                <p className="text-xl">Acesse a seção de vacinas para gerenciar o calendário vacinal</p>
              </div>
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