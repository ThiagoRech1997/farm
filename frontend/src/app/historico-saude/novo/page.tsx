'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function NovoHistoricoSaudePage() {
  const [animalId, setAnimalId] = useState('');
  const [dataEvento, setDataEvento] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tratamento, setTratamento] = useState('');
  const [veterinario, setVeterinario] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novoEvento = {
      Animal_ID: parseInt(animalId, 10),
      Data_Evento: dataEvento,
      Descricao: descricao,
      Tratamento: tratamento,
      Veterinario: veterinario,
    };

    try {
      const res = await fetch('http://localhost:3000/historico-saude', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoEvento),
      });

      if (!res.ok) {
        throw new Error('Falha ao registrar evento de saúde');
      }

      router.push('/historico-saude');
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Adicionar Evento de Saúde</h1>
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
          <label htmlFor="dataEvento" className="block text-gray-700 font-semibold mb-2">Data do Evento</label>
          <input
            type="date"
            id="dataEvento"
            value={dataEvento}
            onChange={(e) => setDataEvento(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="descricao" className="block text-gray-700 font-semibold mb-2">Descrição</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            rows={3}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="tratamento" className="block text-gray-700 font-semibold mb-2">Tratamento</label>
          <textarea
            id="tratamento"
            value={tratamento}
            onChange={(e) => setTratamento(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            rows={3}
          ></textarea>
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
          Adicionar Evento
        </button>
      </form>
    </main>
  );
} 