'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Toast from '../../../components/Toast';
import { useToast } from '../../../hooks/useToast';

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
  const [loadingData, setLoadingData] = useState(true);
  const { toasts, removeToast, success, error } = useToast();
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
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        error('Erro ao carregar dados iniciais');
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);

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
      success('Animal cadastrado com sucesso!');
      
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

    } catch (err) {
      console.error(err);
      error(`Erro: ${err instanceof Error ? err.message : 'Erro desconhecido'}`);
    } finally {
      setLoading(false);
    }
  };

  const animaisMachos = animais.filter(animal => animal.Sexo?.toLowerCase() === 'm' || animal.Sexo?.toLowerCase() === 'macho');
  const animaisFemeas = animais.filter(animal => {
    const sexoSemAcento = (animal.Sexo || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return sexoSemAcento === 'f' || sexoSemAcento === 'femea';
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="max-w-4xl mx-auto glass rounded-3xl shadow-2xl overflow-hidden">
        {/* Header com Animação */}
        <div className="relative bg-gradient-to-r from-green-800 to-green-600 text-white p-8 text-center">
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-5xl animate-bounce-gentle">
            🐄
          </div>
          <h1 className="text-4xl font-bold mb-2 text-shadow-lg">Cadastrar Novo Animal</h1>
          <p className="text-lg opacity-90">Formulário completo com peso inicial e parentesco</p>
        </div>

        {/* Content */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Seção 1: Informações Básicas */}
            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-2 border-green-200 rounded-2xl">
              <legend className="text-xl font-bold text-green-800 px-4">Informações Básicas</legend>
              <div>
                <label htmlFor="nome" className="block text-gray-800 font-bold mb-2">Nome do Animal</label>
                <input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full p-3 bg-white/60 text-gray-900 placeholder:text-gray-600 border-gray-300/50 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  required
                />
              </div>
              <div>
                <label htmlFor="cor" className="block text-gray-800 font-bold mb-2">Cor</label>
                <input
                  id="cor"
                  type="text"
                  value={cor}
                  onChange={(e) => setCor(e.target.value)}
                  className="w-full p-3 bg-white/60 text-gray-900 placeholder:text-gray-600 border-gray-300/50 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label htmlFor="sexo" className="block text-gray-800 font-bold mb-2">Sexo</label>
                <select
                  id="sexo"
                  value={sexo}
                  onChange={(e) => setSexo(e.target.value)}
                  className="w-full p-3 bg-white/60 text-gray-900 border-gray-300/50 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                >
                  <option value="">Selecione...</option>
                  <option value="Macho">Macho</option>
                  <option value="Femea">Fêmea</option>
                </select>
              </div>
              <div>
                <label htmlFor="dataNascimento" className="block text-gray-800 font-bold mb-2">Data de Nascimento</label>
                <input
                  id="dataNascimento"
                  type="date"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                  className="w-full p-3 bg-white/60 text-gray-900 placeholder:text-gray-600 border-gray-300/50 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>
            </fieldset>

            {/* Seção 2: Espécie e Raça */}
            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-2 border-blue-200 rounded-2xl">
              <legend className="text-xl font-bold text-blue-800 px-4">Classificação</legend>
              <div>
                <label htmlFor="especieId" className="block text-gray-800 font-bold mb-2">Espécie</label>
                <select
                  id="especieId"
                  value={especieId}
                  onChange={(e) => setEspecieId(e.target.value)}
                  className="w-full p-3 bg-white/60 text-gray-900 border-gray-300/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  disabled={loadingData}
                >
                  <option value="">{loadingData ? 'Carregando...' : 'Selecione a Espécie'}</option>
                  {especies.map(e => <option key={e.ID} value={e.ID}>{e.Nome}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="racaId" className="block text-gray-800 font-bold mb-2">Raça</label>
                <select
                  id="racaId"
                  value={racaId}
                  onChange={(e) => setRacaId(e.target.value)}
                  className="w-full p-3 bg-white/60 text-gray-900 border-gray-300/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  disabled={loadingData}
                >
                  <option value="">{loadingData ? 'Carregando...' : 'Selecione a Raça'}</option>
                  {racas.map(r => <option key={r.ID} value={r.ID}>{r.Nome}</option>)}
                </select>
              </div>
            </fieldset>
            
            {/* Seção 3: Pesagem Inicial */}
            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-2 border-purple-200 rounded-2xl">
              <legend className="text-xl font-bold text-purple-800 px-4">Pesagem Inicial</legend>
              <div>
                <label htmlFor="pesoInicial" className="block text-gray-800 font-bold mb-2">Peso Inicial (kg)</label>
                <input
                  id="pesoInicial"
                  type="number"
                  step="0.01"
                  value={pesoInicial}
                  onChange={(e) => setPesoInicial(e.target.value)}
                  className="w-full p-3 bg-white/60 text-gray-900 placeholder:text-gray-600 border-gray-300/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder='Ex: 5.5'
                />
              </div>
              <div>
                <label htmlFor="dataPesagem" className="block text-gray-800 font-bold mb-2">Data da Pesagem</label>
                <input
                  id="dataPesagem"
                  type="date"
                  value={dataPesagem}
                  onChange={(e) => setDataPesagem(e.target.value)}
                  className="w-full p-3 bg-white/60 text-gray-900 placeholder:text-gray-600 border-gray-300/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </div>
            </fieldset>

            {/* Seção 4: Parentesco */}
            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-2 border-orange-200 rounded-2xl">
              <legend className="text-xl font-bold text-orange-800 px-4">Parentesco</legend>
              <div>
                <label htmlFor="animalPaiId" className="block text-gray-800 font-bold mb-2">Pai</label>
                <select
                  id="animalPaiId"
                  value={animalPaiId}
                  onChange={(e) => setAnimalPaiId(e.target.value)}
                  className="w-full p-3 bg-white/60 text-gray-900 border-gray-300/50 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  disabled={loadingData}
                >
                  <option value="">{loadingData ? 'Carregando...' : 'Selecione o Pai'}</option>
                  {animaisMachos.map(animal => (
                    <option key={animal.ID} value={animal.ID}>
                      {animal.Nome} (Espécie: {animal.Especie_Nome}, Raça: {animal.Raca_Nome})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="animalMaeId" className="block text-gray-800 font-bold mb-2">Mãe</label>
                <select
                  id="animalMaeId"
                  value={animalMaeId}
                  onChange={(e) => setAnimalMaeId(e.target.value)}
                  className="w-full p-3 bg-white/60 text-gray-900 border-gray-300/50 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  disabled={loadingData}
                >
                  <option value="">{loadingData ? 'Carregando...' : 'Selecione a Mãe'}</option>
                  {animaisFemeas.map(animal => (
                    <option key={animal.ID} value={animal.ID}>
                      {animal.Nome} (Espécie: {animal.Especie_Nome}, Raça: {animal.Raca_Nome})
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>

            {/* Seção 5: Observações */}
             <fieldset className="p-6 border-2 border-gray-200 rounded-2xl">
              <legend className="text-xl font-bold text-gray-800 px-4">Observações</legend>
              <textarea
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                rows={4}
                className="w-full p-3 bg-white/60 text-gray-900 placeholder:text-gray-600 border-gray-300/50 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
                placeholder="Qualquer informação adicional sobre o animal..."
              />
            </fieldset>

            <div className="flex items-center justify-between">
              <button 
                type="button" 
                onClick={() => router.back()}
                className="bg-gray-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors duration-300"
              >
                Voltar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-8 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Cadastrando...' : 'Cadastrar Animal'}
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
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
} 