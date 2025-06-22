'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function NovaVacinaPage() {
  const [animalId, setAnimalId] = useState('');
  const [nomeVacina, setNomeVacina] = useState('');
  const [dataAplicacao, setDataAplicacao] = useState('');
  const [proximaAplicacao, setProximaAplicacao] = useState('');
  const [veterinario, setVeterinario] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novaVacina = {
      Animal_ID: parseInt(animalId, 10),
      Nome_Vacina: nomeVacina,
      Data_Aplicacao: dataAplicacao,
      Proxima_Aplicacao: proximaAplicacao,
      Veterinario: veterinario,
    };

    try {
      const res = await fetch('http://localhost:3000/vacinas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaVacina),
      });

      if (!res.ok) {
        throw new Error('Falha ao registrar vacina');
      }

      router.push('/vacinas');
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Registrar Nova Vacina</h1>
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
          <label htmlFor="nomeVacina" className="block text-gray-700 font-semibold mb-2">Nome da Vacina</label>
          <input
            type="text"
            id="nomeVacina"
            value={nomeVacina}
            onChange={(e) => setNomeVacina(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dataAplicacao" className="block text-gray-700 font-semibold mb-2">Data da Aplicação</label>
          <input
            type="date"
            id="dataAplicacao"
            value={dataAplicacao}
            onChange={(e) => setDataAplicacao(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="proximaAplicacao" className="block text-gray-700 font-semibold mb-2">Próxima Aplicação</label>
          <input
            type="date"
            id="proximaAplicacao"
            value={proximaAplicacao}
            onChange={(e) => setProximaAplicacao(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="veterinario" className="block text-gray-700 font-semibold mb-2">Veterinário</label>
          <input
            type="text"
            id="veterinario"
            value={veterinario}
            onChange={(e) => setVeterinario(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Registrar Vacina
        </button>
      </form>
    </main>
  );
} 