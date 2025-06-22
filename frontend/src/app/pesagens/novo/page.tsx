'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useToast } from '../../../hooks/useToast';

export default function NovaPesagemPage() {
  const [animalId, setAnimalId] = useState('');
  const [dataPesagem, setDataPesagem] = useState('');
  const [peso, setPeso] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const novaPesagem = {
      Animal_ID: parseInt(animalId, 10),
      Data_Pesagem: dataPesagem,
      Peso: parseFloat(peso),
    };
    try {
      const res = await fetch('http://localhost:3000/pesagens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaPesagem),
      });
      if (!res.ok) {
        throw new Error('Falha ao registrar pesagem');
      }
      success('Pesagem registrada com sucesso!');
      router.push('/pesagens');
      router.refresh();
    } catch (err) {
      error('Erro ao registrar pesagem');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Registrar Nova Pesagem</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="animalId" className="block text-gray-700 font-semibold mb-2">ID do Animal</label>
          <input
            type="number"
            id="animalId"
            value={animalId}
            onChange={(e) => setAnimalId(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="peso" className="block text-gray-700 font-semibold mb-2">Peso (kg)</label>
          <input
            type="number"
            step="0.01"
            id="peso"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dataPesagem" className="block text-gray-700 font-semibold mb-2">Data da Pesagem</label>
          <input
            type="date"
            id="dataPesagem"
            value={dataPesagem}
            onChange={(e) => setDataPesagem(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 btn-hover flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading && <span className="loading-spinner mr-2"></span>}
          Registrar Pesagem
        </button>
      </form>
    </main>
  );
} 