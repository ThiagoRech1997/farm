'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useToast } from '../../../hooks/useToast';

export default function NovoUsuarioPage() {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nivelAcesso, setNivelAcesso] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const novoUsuario = {
      Nome_Usuario: nomeUsuario,
      Email: email,
      Senha: senha,
      Nivel_Acesso: nivelAcesso,
    };
    try {
      const res = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoUsuario),
      });
      if (!res.ok) {
        throw new Error('Falha ao cadastrar usuário');
      }
      success('Usuário cadastrado com sucesso!');
      router.push('/usuarios');
      router.refresh();
    } catch (err) {
      error('Erro ao cadastrar usuário');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Cadastrar Novo Usuário</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="nomeUsuario" className="block text-gray-700 font-semibold mb-2">Nome de Usuário</label>
          <input
            type="text"
            id="nomeUsuario"
            value={nomeUsuario}
            onChange={(e) => setNomeUsuario(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="senha" className="block text-gray-700 font-semibold mb-2">Senha</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="nivelAcesso" className="block text-gray-700 font-semibold mb-2">Nível de Acesso</label>
          <input
            type="text"
            id="nivelAcesso"
            value={nivelAcesso}
            onChange={(e) => setNivelAcesso(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="admin, user, etc."
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 btn-hover flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading && <span className="loading-spinner mr-2"></span>}
          Cadastrar Usuário
        </button>
      </form>
    </main>
  );
} 