import React from 'react';
import Link from 'next/link';

type Reprodutor = {
  ID: number;
  Nome: string;
  Matriz_ID: number;
  Data_Concepcao: string;
  Data_Nascimento: string;
  Ninhada_Descricao: string;
  Perdas: string;
};

async function getReprodutores(): Promise<Reprodutor[]> {
  const res = await fetch('http://localhost:3000/reprodutores', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar dados dos reprodutores');
  }

  return res.json();
}

export default async function ReprodutoresPage() {
  const reprodutores = await getReprodutores();

  return (
    <main className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Gerenciamento de Reprodutores</h1>
        <Link href="/reprodutores/novo">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
            Cadastrar Novo Reprodutor
          </button>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Lista de Reprodutores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reprodutores.length > 0 ? (
            reprodutores.map((reprodutor) => (
              <div key={reprodutor.ID} className="p-4 border rounded-lg shadow-sm">
                <p className="font-semibold text-lg">{reprodutor.Nome}</p>
                <p className="text-sm text-gray-600">Matriz ID: {reprodutor.Matriz_ID}</p>
                {reprodutor.Data_Nascimento && (
                  <p className="text-sm text-gray-500">
                    Nascimento da Ninhada: {new Date(reprodutor.Data_Nascimento).toLocaleDateString()}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-2">{reprodutor.Ninhada_Descricao}</p>
              </div>
            ))
          ) : (
            <p>Nenhum reprodutor cadastrado.</p>
          )}
        </div>
      </div>
    </main>
  );
} 