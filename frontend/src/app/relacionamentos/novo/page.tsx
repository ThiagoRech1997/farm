'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function NovoRelacionamentoPage() {
  const [paiId, setPaiId] = useState('');
  const [maeId, setMaeId] = useState('');
  const [filhoteId, setFilhoteId] = useState('');
  const [tipoRelacao, setTipoRelacao] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novoRelacionamento = {
      Animal_Pai_ID: paiId ? parseInt(paiId, 10) : undefined,
      Animal_Mae_ID: maeId ? parseInt(maeId, 10) : undefined,
      Filhote_ID: filhoteId ? parseInt(filhoteId, 10) : undefined,
      Tipo_Relacao: tipoRelacao,
    };

    try {
      const res = await fetch('http://localhost:3000/relacionamentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoRelacionamento),
      });

      if (!res.ok) {
        throw new Error('Falha ao cadastrar relacionamento');
      }

      router.push('/relacionamentos');
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Cadastrar Novo Relacionamento</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="paiId" className="block text-gray-700 font-semibold mb-2">ID do Pai</label>
          <input
            type="number"
            id="paiId"
            value={paiId}
            onChange={(e) => setPaiId(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="maeId" className="block text-gray-700 font-semibold mb-2">ID da Mãe</label>
          <input
            type="number"
            id="maeId"
            value={maeId}
            onChange={(e) => setMaeId(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="filhoteId" className="block text-gray-700 font-semibold mb-2">ID do Filhote</label>
          <input
            type="number"
            id="filhoteId"
            value={filhoteId}
            onChange={(e) => setFilhoteId(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tipoRelacao" className="block text-gray-700 font-semibold mb-2">Tipo da Relação</label>
          <input
            type="text"
            id="tipoRelacao"
            value={tipoRelacao}
            onChange={(e) => setTipoRelacao(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Pai, Mãe, etc."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Cadastrar Relacionamento
        </button>
      </form>
    </main>
  );
} 