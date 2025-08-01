'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function NovoReprodutorPage() {
  const [nome, setNome] = useState('');
  const [matrizId, setMatrizId] = useState('');
  const [dataConcepcao, setDataConcepcao] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [ninhadaDescricao, setNinhadaDescricao] = useState('');
  const [perdas, setPerdas] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novoReprodutor = {
      Nome: nome,
      Matriz_ID: matrizId ? parseInt(matrizId, 10) : undefined,
      Data_Concepcao: dataConcepcao,
      Data_Nascimento: dataNascimento,
      Ninhada_Descricao: ninhadaDescricao,
      Perdas: perdas,
    };

    try {
      const res = await fetch('http://localhost:3000/reprodutores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoReprodutor),
      });

      if (!res.ok) {
        throw new Error('Falha ao cadastrar reprodutor');
      }

      router.push('/reprodutores');
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Cadastrar Novo Reprodutor</h1>
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
          <label htmlFor="matrizId" className="block text-gray-700 font-semibold mb-2">ID da Matriz</label>
          <input
            type="number"
            id="matrizId"
            value={matrizId}
            onChange={(e) => setMatrizId(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dataConcepcao" className="block text-gray-700 font-semibold mb-2">Data da Concepção</label>
          <input
            type="date"
            id="dataConcepcao"
            value={dataConcepcao}
            onChange={(e) => setDataConcepcao(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dataNascimento" className="block text-gray-700 font-semibold mb-2">Data de Nascimento da Ninhada</label>
          <input
            type="date"
            id="dataNascimento"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ninhadaDescricao" className="block text-gray-700 font-semibold mb-2">Descrição da Ninhada</label>
          <textarea
            id="ninhadaDescricao"
            value={ninhadaDescricao}
            onChange={(e) => setNinhadaDescricao(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            rows={3}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="perdas" className="block text-gray-700 font-semibold mb-2">Perdas</label>
          <textarea
            id="perdas"
            value={perdas}
            onChange={(e) => setPerdas(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            rows={2}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Cadastrar Reprodutor
        </button>
      </form>
    </main>
  );
} 