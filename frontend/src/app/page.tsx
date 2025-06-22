'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Toast from '../components/Toast';
import Particles from '../components/Particles';
import { SkeletonGrid, StatsSkeleton } from '../components/LoadingSkeleton';

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

interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export default function Home() {
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [activeTab, setActiveTab] = useState('animais');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [showParticles, setShowParticles] = useState(true);

  useEffect(() => {
    fetchAnimais();
    // Desabilitar partículas em dispositivos móveis para performance
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
        addToast('Animais carregados com sucesso!', 'success');
      }
    } catch (error) {
      console.error('Erro ao buscar animais:', error);
      addToast('Erro ao carregar animais', 'error');
    } finally {
      setLoading(false);
    }
  };

  const addToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const animaisMachos = animais.filter(animal => animal.Sexo?.toLowerCase() === 'm' || animal.Sexo?.toLowerCase() === 'macho');
  const animaisFemeas = animais.filter(animal => animal.Sexo?.toLowerCase() === 'f' || animal.Sexo?.toLowerCase() === 'femea' || animal.Sexo?.toLowerCase() === 'femea');
  
  const filteredAnimais = animais.filter(animal =>
    animal.Nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.Cor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.Especie_Nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.Raca_Nome?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4 relative overflow-hidden">
      {/* Partículas Flutuantes */}
      {showParticles && <Particles />}
      
      {/* Container Principal com Glassmorphism */}
      <div className="max-w-7xl mx-auto glass rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Header com Animação Bounce */}
        <div className="relative bg-gradient-to-r from-green-800 to-green-600 text-white p-8 text-center">
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-6xl animate-bounce-gentle">
            🐄
          </div>
          <h1 className="text-5xl font-bold mb-4 text-shadow-lg">Gerenciamento da Fazenda</h1>
          <p className="text-xl opacity-90">Sistema completo para controle de animais, ninhadas, pesagem e vacinas</p>
        </div>

        {/* Navigation Tabs com Micro-interações */}
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

        {/* Content */}
        <div className="p-8">
          {/* Tab Animais */}
          {activeTab === 'animais' && (
            <div className="animate-fadeIn">
              {/* Stats Grid com Count-up Animation */}
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

              {/* Action Buttons com Shimmer Effect */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/animais/cadastro-unificado">
                  <button className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-4 px-8 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg btn-hover animate-shimmer">
                    ➕ Cadastrar Animal Completo
                  </button>
                </Link>
                <Link href="/animais/novo">
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg btn-hover">
                    ➕ Cadastrar Animal Simples
                  </button>
                </Link>
                <Link href="/pesagens">
                  <button className="bg-gradient-to-r from-lime-600 to-lime-700 text-white font-bold py-4 px-8 rounded-xl hover:from-lime-700 hover:to-lime-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg btn-hover">
                    ⚖️ Gerenciar Pesagens
                  </button>
                </Link>
                <Link href="/vacinas">
                  <button className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-bold py-4 px-8 rounded-xl hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg btn-hover">
                    💉 Gerenciar Vacinas
                  </button>
                </Link>
              </div>

              {/* Search Box com Ícone Integrado */}
              <div className="mb-8 search-container">
                <div className="relative">
                  <span className="search-icon text-xl">🔍</span>
                  <input
                    type="text"
                    placeholder="Buscar animal por nome, cor, espécie ou raça..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-4 pl-12 border-2 border-gray-200 rounded-2xl text-lg focus:border-green-600 focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>

              {/* Animals Grid com Loading Skeleton */}
              {loading ? (
                <SkeletonGrid count={6} />
              ) : filteredAnimais.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAnimais.map((animal, index) => (
                    <div 
                      key={animal.ID} 
                      className="glass rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 card-glow hover-3d"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <h3 className="text-xl font-bold text-green-800 mb-4">{animal.Nome}</h3>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <span className="bg-white bg-opacity-80 px-3 py-2 rounded-lg text-sm font-medium">
                          <strong>Cor:</strong> {animal.Cor || 'N/A'}
                        </span>
                        <span className="bg-white bg-opacity-80 px-3 py-2 rounded-lg text-sm font-medium">
                          <strong>Sexo:</strong> {animal.Sexo || 'N/A'}
                        </span>
                        <span className="bg-white bg-opacity-80 px-3 py-2 rounded-lg text-sm font-medium">
                          <strong>Nascimento:</strong> {animal.Data_Nascimento ? new Date(animal.Data_Nascimento).toLocaleDateString('pt-BR') : 'N/A'}
                        </span>
                        <span className="bg-white bg-opacity-80 px-3 py-2 rounded-lg text-sm font-medium">
                          <strong>ID:</strong> #{animal.ID}
                        </span>
                        {animal.Especie_Nome && (
                          <span className="bg-white bg-opacity-80 px-3 py-2 rounded-lg text-sm font-medium">
                            <strong>Espécie:</strong> {animal.Especie_Nome}
                          </span>
                        )}
                        {animal.Raca_Nome && (
                          <span className="bg-white bg-opacity-80 px-3 py-2 rounded-lg text-sm font-medium">
                            <strong>Raça:</strong> {animal.Raca_Nome}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className="flex-1 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 text-sm btn-hover"
                          onClick={() => addToast('Funcionalidade de edição em desenvolvimento', 'info')}
                        >
                          Editar
                        </button>
                        <button 
                          className="flex-1 bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 text-sm btn-hover"
                          onClick={() => addToast('Funcionalidade de exclusão em desenvolvimento', 'warning')}
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

          {/* Tab Ninhadas */}
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

          {/* Tab Pesagem */}
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

          {/* Tab Vacinas */}
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

      {/* Toast Notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
} 