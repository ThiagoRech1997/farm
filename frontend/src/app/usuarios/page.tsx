import React from 'react';
import Link from 'next/link';

type Usuario = {
  id: number;
  Nome_Usuario: string;
  Email: string;
  Nivel_Acesso: string;
};

async function getUsuarios(): Promise<Usuario[]> {
  const res = await fetch('http://localhost:3000/usuarios', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar dados dos usuários');
  }

  return res.json();
}

export default async function UsuariosPage() {
  const usuarios = await getUsuarios();

  return (
    <main className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Gerenciamento de Usuários</h1>
        <Link href="/usuarios/novo">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
            Cadastrar Novo Usuário
          </button>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Lista de Usuários</h2>
        <div className="space-y-4">
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <div key={usuario.id} className="p-4 border rounded-lg shadow-sm">
                <p className="font-semibold text-lg">{usuario.Nome_Usuario}</p>
                <p className="text-sm text-gray-600">{usuario.Email}</p>
                <p className="text-sm text-gray-500 mt-1">Nível de Acesso: {usuario.Nivel_Acesso}</p>
              </div>
            ))
          ) : (
            <p>Nenhum usuário cadastrado.</p>
          )}
        </div>
      </div>
    </main>
  );
} 