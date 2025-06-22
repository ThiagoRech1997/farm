'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function NovaRacaPage() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novaRaca = {
      Nome: nome,
      Descricao: descricao,
    };

    try {
      const res = await fetch('http://localhost:3000/racas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaRaca),
      });

      if (!res.ok) {
        throw new Error('Falha ao cadastrar raça');
      }

      router.push('/racas');
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Cadastrar Nova Raça</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="nome" className="block text-gray-700 font-semibold mb-2">Nome</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
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
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Cadastrar Raça
        </button>
      </form>
    </main>
  );
} 