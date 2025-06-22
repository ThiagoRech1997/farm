'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Toast from '../../../components/Toast';

interface Animal {
  ID: number;
  Nome: string;
  Sexo: string;
  Data_Nascimento: string;
  Especie_Nome?: string;
  Raca_Nome?: string;
}

interface Especie {
  ID: number;
  Nome: string;
  Nome_Cientifico?: string;
  Descricao?: string;
  Tipo_Animal?: string;
}

interface Raca {
  ID: number;
  Nome: string;
  Descricao?: string;
}

interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export default function CadastroUnificadoPage() {
  const [nome, setNome] = useState('');
  const [cor, setCor] = useState('');
  const [sexo, setSexo] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [especieId, setEspecieId] = useState('');
  const [racaId, setRacaId] = useState('');
  const [pesoInicial, setPesoInicial] = useState('');
  const [dataPesagem, setDataPesagem] = useState('');
  const [animalPaiId, setAnimalPaiId] = useState('');
  const [animalMaeId, setAnimalMaeId] = useState('');
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [especies, setEspecies] = useState<Especie[]>([]);
  const [racas, setRacas] = useState<Raca[]>([]);
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [animaisRes, especiesRes, racasRes] = await Promise.all([
          fetch('http://localhost:3000/animais-unificado/pais'),
          fetch('http://localhost:3000/especies'),
          fetch('http://localhost:3000/racas')
        ]);

        if (animaisRes.ok) {
          const animaisData = await animaisRes.json();
          setAnimais(animaisData);
        }

        if (especiesRes.ok) {
          const especiesData = await especiesRes.json();
          setEspecies(especiesData);
        }

        if (racasRes.ok) {
          const racasData = await racasRes.json();
          setRacas(racasData);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        addToast('Erro ao carregar dados iniciais', 'error');
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);

  const addToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const novoAnimal = {
      Nome: nome,
      Cor: cor,
      Sexo: sexo,
      Data_Nascimento: dataNascimento,
      Observacoes: observacoes,
      Especie_ID: especieId ? parseInt(especieId) : undefined,
      Raca_ID: racaId ? parseInt(racaId) : undefined,
      PesoInicial: parseFloat(pesoInicial),
      DataPesagem: dataPesagem || new Date().toISOString().split('T')[0],
      Animal_Pai_ID: animalPaiId ? parseInt(animalPaiId) : undefined,
      Animal_Mae_ID: animalMaeId ? parseInt(animalMaeId) : undefined,
    };

    try {
      const res = await fetch('http://localhost:3000/animais-unificado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoAnimal),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Falha ao cadastrar animal');
      }

      const result = await res.json();
      addToast('Animal cadastrado com sucesso!', 'success');
      
      setNome('');
      setCor('');
      setSexo('');
      setDataNascimento('');
      setObservacoes('');
      setEspecieId('');
      setRacaId('');
      setPesoInicial('');
      setDataPesagem('');
      setAnimalPaiId('');
      setAnimalMaeId('');

      setTimeout(() => {
        router.push('/');
        router.refresh();
      }, 2000);

    } catch (error) {
      console.error(error);
      addToast(`Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const animaisMachos = animais.filter(animal => animal.Sexo?.toLowerCase() === 'm' || animal.Sexo?.toLowerCase() === 'macho');
  const animaisFemeas = animais.filter(animal => animal.Sexo?.toLowerCase() === 'f' || animal.Sexo?.toLowerCase() === 'femea');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="max-w-4xl mx-auto glass rounded-3xl shadow-2xl overflow-hidden">
        {/* Header com Animação */}
        <div className="relative bg-gradient-to-r from-green-800 to-green-600 text-white p-8 text-center">
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-5xl animate-bounce-gentle">
            🐄
          </div>
          <h1 className="text-4xl font-bold mb-2 text-shadow-lg">Cadastrar Novo Animal</h1>
          <p className="text-lg opacity-90">Formulario completo com peso inicial e parentesco</p>
        </div>

        {/* Content */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Dados do Animal */}
            <div className="glass rounded-2xl p-6 card-glow">
              <h2 className="text-2xl font-bold text-green-800 mb-6 border-b-2 border-green-200 pb-2">
                🐄 Dados do Animal
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nome" className="block text-gray-700 font-bold mb-3 text-lg">Nome *</label>
                  <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-green-600 focus:outline-none transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="cor" className="block text-gray-700 font-bold mb-3 text-lg">Cor</label>
                  <input
                    type="text"
                    id="cor"
                    value={cor}
                    onChange={(e) => setCor(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-green-600 focus:outline-none transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="sexo" className="block text-gray-700 font-bold mb-3 text-lg">Sexo</label>
                  <select
                    id="sexo"
                    value={sexo}
                    onChange={(e) => setSexo(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-green-600 focus:outline-none transition-all duration-300"
                  >
                    <option value="">Selecione...</option>
                    <option value="M">Macho</option>
                    <option value="F">Femea</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="dataNascimento" className="block text-gray-700 font-bold mb-3 text-lg">Data de Nascimento</label>
                  <input
                    type="date"
                    id="dataNascimento"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-green-600 focus:outline-none transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="especie" className="block text-gray-700 font-bold mb-3 text-lg">Espécie</label>
                  <select
                    id="especie"
                    value={especieId}
                    onChange={(e) => setEspecieId(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-green-600 focus:outline-none transition-all duration-300"
                    disabled={loadingData}
                  >
                    <option value="">
                      {loadingData ? 'Carregando...' : 'Selecione a espécie...'}
                    </option>
                    {especies.map((especie) => (
                      <option key={especie.ID} value={especie.ID}>
                        {especie.Nome} {especie.Nome_Cientifico && `(${especie.Nome_Cientifico})`}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="raca" className="block text-gray-700 font-bold mb-3 text-lg">Raça</label>
                  <select
                    id="raca"
                    value={racaId}
                    onChange={(e) => setRacaId(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-green-600 focus:outline-none transition-all duration-300"
                    disabled={loadingData}
                  >
                    <option value="">
                      {loadingData ? 'Carregando...' : 'Selecione a raça...'}
                    </option>
                    {racas.map((raca) => (
                      <option key={raca.ID} value={raca.ID}>
                        {raca.Nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="observacoes" className="block text-gray-700 font-bold mb-3 text-lg">Observacoes</label>
                  <textarea
                    id="observacoes"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-green-600 focus:outline-none transition-all duration-300"
                    rows={3}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Peso Inicial */}
            <div className="glass rounded-2xl p-6 card-glow">
              <h2 className="text-2xl font-bold text-blue-800 mb-6 border-b-2 border-blue-200 pb-2">
                ⚖️ Peso Inicial
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="pesoInicial" className="block text-gray-700 font-bold mb-3 text-lg">Peso (kg) *</label>
                  <input
                    type="number"
                    id="pesoInicial"
                    value={pesoInicial}
                    onChange={(e) => setPesoInicial(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-600 focus:outline-none transition-all duration-300"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="dataPesagem" className="block text-gray-700 font-bold mb-3 text-lg">Data da Pesagem</label>
                  <input
                    type="date"
                    id="dataPesagem"
                    value={dataPesagem}
                    onChange={(e) => setDataPesagem(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-600 focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Relacionamentos */}
            <div className="glass rounded-2xl p-6 card-glow">
              <h2 className="text-2xl font-bold text-purple-800 mb-6 border-b-2 border-purple-200 pb-2">
                👨‍👩‍👧‍👦 Parentesco (Opcional)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="animalPai" className="block text-gray-700 font-bold mb-3 text-lg">Pai</label>
                  <select
                    id="animalPai"
                    value={animalPaiId}
                    onChange={(e) => setAnimalPaiId(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-purple-600 focus:outline-none transition-all duration-300"
                    disabled={loadingData}
                  >
                    <option value="">
                      {loadingData ? 'Carregando...' : 'Selecione o pai...'}
                    </option>
                    {animaisMachos.map((animal) => (
                      <option key={animal.ID} value={animal.ID}>
                        {animal.Nome} {animal.Especie_Nome && `(${animal.Especie_Nome})`} {animal.Data_Nascimento && `- ${animal.Data_Nascimento}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="animalMae" className="block text-gray-700 font-bold mb-3 text-lg">Mae</label>
                  <select
                    id="animalMae"
                    value={animalMaeId}
                    onChange={(e) => setAnimalMaeId(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-purple-600 focus:outline-none transition-all duration-300"
                    disabled={loadingData}
                  >
                    <option value="">
                      {loadingData ? 'Carregando...' : 'Selecione a mae...'}
                    </option>
                    {animaisFemeas.map((animal) => (
                      <option key={animal.ID} value={animal.ID}>
                        {animal.Nome} {animal.Especie_Nome && `(${animal.Especie_Nome})`} {animal.Data_Nascimento && `- ${animal.Data_Nascimento}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold py-4 px-8 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg btn-hover"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-4 px-8 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed btn-hover"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="loading-spinner mr-2"></div>
                    Cadastrando...
                  </div>
                ) : (
                  '🐄 Cadastrar Animal'
                )}
              </button>
            </div>
          </form>
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