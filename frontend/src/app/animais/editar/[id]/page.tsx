"use client";

import { useRouter, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useToast } from '../../../../hooks/useToast';

interface AnimalCompleto {
  ID: number;
  Nome: string;
  Cor: string;
  Sexo: string;
  Data_Nascimento: string;
  Observacoes: string;
  Especie_ID?: number;
  Especie_Nome?: string;
  Raca_ID?: number;
  Raca_Nome?: string;
}

interface Especie {
  ID: number;
  Nome: string;
}

interface Raca {
  ID: number;
  Nome: string;
}

export default function EditarAnimalPage() {
  const router = useRouter();
  const params = useParams();
  const { success, error } = useToast();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [animal, setAnimal] = useState<AnimalCompleto | null>(null);
  const [nome, setNome] = useState("");
  const [cor, setCor] = useState("");
  const [sexo, setSexo] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [especieId, setEspecieId] = useState("");
  const [racaId, setRacaId] = useState("");
  const [especies, setEspecies] = useState<Especie[]>([]);
  const [racas, setRacas] = useState<Raca[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      try {
        const [animalRes, especiesRes, racasRes] = await Promise.all([
          fetch(`http://localhost:3000/animais-unificado/${params.id}/completo`),
          fetch('http://localhost:3000/especies'),
          fetch('http://localhost:3000/racas')
        ]);
        if (animalRes.ok) {
          const animalData = await animalRes.json();
          setAnimal(animalData);
          setNome(animalData.Nome || "");
          setCor(animalData.Cor || "");
          setSexo(animalData.Sexo || "");
          setDataNascimento(animalData.Data_Nascimento ? animalData.Data_Nascimento.split('T')[0] : "");
          setObservacoes(animalData.Observacoes || "");
          setEspecieId(animalData.Especie_ID ? String(animalData.Especie_ID) : "");
          setRacaId(animalData.Raca_ID ? String(animalData.Raca_ID) : "");
        } else {
          error("Erro ao carregar dados do animal");
        }
        if (especiesRes.ok) {
          setEspecies(await especiesRes.json());
        }
        if (racasRes.ok) {
          setRacas(await racasRes.json());
        }
      } catch (err) {
        error("Erro ao carregar dados iniciais");
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/animais/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Nome: nome,
          Cor: cor,
          Sexo: sexo,
          Data_Nascimento: dataNascimento,
          Observacoes: observacoes,
          Especie_ID: especieId ? parseInt(especieId) : undefined,
          Raca_ID: racaId ? parseInt(racaId) : undefined,
        })
      });
      if (!res.ok) throw new Error('Falha ao atualizar animal');
      success('Animal atualizado com sucesso!');
      setTimeout(() => {
        router.push('/');
        router.refresh();
      }, 1500);
    } catch (err) {
      error('Erro ao atualizar animal');
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return <div className="p-8 text-center">Carregando dados...</div>;
  }

  if (!animal) {
    return <div className="p-8 text-center text-red-600">Animal não encontrado.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="max-w-4xl mx-auto glass rounded-3xl shadow-2xl overflow-hidden">
        <div className="relative bg-gradient-to-r from-green-800 to-green-600 text-white p-8 text-center">
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-5xl animate-bounce-gentle">🐄</div>
          <h1 className="text-4xl font-bold mb-2 text-shadow-lg">Editar Animal</h1>
          <p className="text-lg opacity-90">Atualize as informações do animal</p>
        </div>
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-2 border-green-200 rounded-2xl">
              <legend className="text-xl font-bold text-green-800 px-4">Informações Básicas</legend>
              <div>
                <label htmlFor="nome" className="block text-gray-800 font-bold mb-2">Nome do Animal</label>
                <input id="nome" type="text" value={nome} onChange={e => setNome(e.target.value)} className="w-full p-3 bg-white/60 text-gray-900 placeholder:text-gray-600 border-gray-300/50 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition" required />
              </div>
              <div>
                <label htmlFor="cor" className="block text-gray-800 font-bold mb-2">Cor</label>
                <input id="cor" type="text" value={cor} onChange={e => setCor(e.target.value)} className="w-full p-3 bg-white/60 text-gray-900 placeholder:text-gray-600 border-gray-300/50 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition" />
              </div>
              <div>
                <label htmlFor="sexo" className="block text-gray-800 font-bold mb-2">Sexo</label>
                <select id="sexo" value={sexo} onChange={e => setSexo(e.target.value)} className="w-full p-3 bg-white/60 text-gray-900 border-gray-300/50 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition">
                  <option value="">Selecione...</option>
                  <option value="Macho">Macho</option>
                  <option value="Femea">Fêmea</option>
                </select>
              </div>
              <div>
                <label htmlFor="dataNascimento" className="block text-gray-800 font-bold mb-2">Data de Nascimento</label>
                <input id="dataNascimento" type="date" value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} className="w-full p-3 bg-white/60 text-gray-900 border-gray-300/50 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="observacoes" className="block text-gray-800 font-bold mb-2">Observações</label>
                <textarea id="observacoes" value={observacoes} onChange={e => setObservacoes(e.target.value)} className="w-full p-3 bg-white/60 text-gray-900 border-gray-300/50 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition" rows={2} />
              </div>
            </fieldset>
            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-2 border-blue-200 rounded-2xl">
              <legend className="text-xl font-bold text-blue-800 px-4">Classificação</legend>
              <div>
                <label htmlFor="especieId" className="block text-gray-800 font-bold mb-2">Espécie</label>
                <select id="especieId" value={especieId} onChange={e => setEspecieId(e.target.value)} className="w-full p-3 bg-white/60 text-gray-900 border-gray-300/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                  <option value="">Selecione a Espécie</option>
                  {especies.map(e => <option key={e.ID} value={e.ID}>{e.Nome}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="racaId" className="block text-gray-800 font-bold mb-2">Raça</label>
                <select id="racaId" value={racaId} onChange={e => setRacaId(e.target.value)} className="w-full p-3 bg-white/60 text-gray-900 border-gray-300/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                  <option value="">Selecione a Raça</option>
                  {racas.map(r => <option key={r.ID} value={r.ID}>{r.Nome}</option>)}
                </select>
              </div>
            </fieldset>
            <div className="flex justify-end">
              <button type="submit" className="bg-green-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-green-700 transition-all duration-200 btn-hover flex items-center gap-2" disabled={loading}>
                {loading && <span className="loading-spinner mr-2"></span>}
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 