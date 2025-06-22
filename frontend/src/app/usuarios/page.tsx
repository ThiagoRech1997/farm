'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ResumoUsuarioCard from '../../components/ResumoUsuarioCard';
import StatusBadge from '../../components/StatusBadge';

type Usuario = {
  id: number;
  Nome_Usuario: string;
  Email: string;
  Nivel_Acesso: string;
};

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:3000/usuarios', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setUsuarios(data);
        }
      } catch (err) {
        // erro silencioso
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  // Cálculos para os resumos
  const total = usuarios.length;
  const admins = usuarios.filter(u => u.Nivel_Acesso.toLowerCase() === 'admin').length;
  const operadores = usuarios.filter(u => u.Nivel_Acesso.toLowerCase() === 'operador').length;

  const filteredUsuarios = usuarios.filter(u => {
    const term = searchTerm.toLowerCase();
    return (
      u.Nome_Usuario.toLowerCase().includes(term) ||
      u.Email.toLowerCase().includes(term) ||
      u.Nivel_Acesso.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto glass rounded-3xl shadow-2xl overflow-hidden relative">
        <div className="relative bg-gradient-to-r from-green-800 to-green-600 text-white p-8 text-center mb-8">
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-6xl animate-bounce-gentle">👤</div>
          <h1 className="text-5xl font-bold mb-4 text-shadow-lg">Gerenciamento de Usuários</h1>
          <p className="text-xl opacity-90">Controle de usuários, permissões e acessos</p>
        </div>
        <div className="p-8">
          <div className="flex justify-end mb-8">
            <Link href="/usuarios/novo">
              <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition duration-200">
                ➕ Cadastrar Novo Usuário
              </button>
            </Link>
          </div>
          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ResumoUsuarioCard titulo="Total de Usuários" valor={total} icone={<span>👤</span>} cor="border-blue-600" />
            <ResumoUsuarioCard titulo="Admins" valor={admins} icone={<span>⭐</span>} cor="border-yellow-500" />
            <ResumoUsuarioCard titulo="Operadores" valor={operadores} icone={<span>🛠️</span>} cor="border-green-500" />
          </div>
          {/* Busca */}
          <div className="mb-8 max-w-xl mx-auto">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Buscar por nome, email ou nível de acesso..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full p-4 pl-12 pr-12 border-2 border-gray-200 rounded-2xl text-lg focus:border-blue-600 focus:outline-none transition-all duration-300"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                  aria-label="Limpar busca"
                >
                  &times;
                </button>
              )}
            </div>
          </div>
          {/* Lista de Usuários */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Lista de Usuários</h2>
            <div className="space-y-4">
              {loading ? (
                <p>Carregando...</p>
              ) : filteredUsuarios.length > 0 ? (
                filteredUsuarios.map((usuario) => (
                  <div key={usuario.id} className="p-4 border rounded-lg shadow-sm flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-lg">{usuario.Nome_Usuario}</p>
                        <p className="text-sm text-gray-600">{usuario.Email}</p>
                      </div>
                      <StatusBadge status={usuario.Nivel_Acesso.charAt(0).toUpperCase() + usuario.Nivel_Acesso.slice(1).toLowerCase()} />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Nível de Acesso: {usuario.Nivel_Acesso}</p>
                  </div>
                ))
              ) : (
                <p>Nenhum usuário cadastrado.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 