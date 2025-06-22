'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useToast } from '../../../hooks/useToast';

export default function NovoAnimalPage() {
  const [nome, setNome] = useState('');
  const [cor, setCor] = useState('');
  const [sexo, setSexo] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { success, error } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const novoAnimal = {
      Nome: nome,
      Cor: cor,
      Sexo: sexo,
      Data_Nascimento: dataNascimento,
      Observacoes: observacoes,
    };
    try {
      const res = await fetch('http://localhost:3000/animais', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoAnimal),
      });
      if (!res.ok) {
        throw new Error('Falha ao cadastrar animal');
      }
      success('Animal cadastrado com sucesso!');
      router.push('/');
      router.refresh();
    } catch (err) {
      error('Erro ao cadastrar animal');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Cadastrar Novo Animal</h1>
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
          <label htmlFor="cor" className="block text-gray-700 font-semibold mb-2">Cor</label>
          <input
            type="text"
            id="cor"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="sexo" className="block text-gray-700 font-semibold mb-2">Sexo</label>
          <input
            type="text"
            id="sexo"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dataNascimento" className="block text-gray-700 font-semibold mb-2">Data de Nascimento</label>
          <input
            type="date"
            id="dataNascimento"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="observacoes" className="block text-gray-700 font-semibold mb-2">Observações</label>
          <textarea
            id="observacoes"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            rows={3}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 btn-hover flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading && <span className="loading-spinner mr-2"></span>}
          Cadastrar Animal
        </button>
      </form>
    </main>
  );
} 