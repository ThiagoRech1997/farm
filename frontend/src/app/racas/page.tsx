import React from 'react';
import Link from 'next/link';

type Raca = {
  ID: number;
  Nome: string;
  Descricao: string;
};

async function getRacas(): Promise<Raca[]> {
  const res = await fetch('http://localhost:3000/racas', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar dados das raças');
  }

  return res.json();
}

export default async function RacasPage() {
  const racas = await getRacas();

  return (
    <main className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Gerenciamento de Raças</h1>
        <Link href="/racas/novo">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
            Cadastrar Nova Raça
          </button>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Lista de Raças</h2>
        <ul className="divide-y divide-gray-200">
          {racas.length > 0 ? (
            racas.map((raca) => (
              <li key={raca.ID} className="py-4">
                <p className="font-semibold text-lg">{raca.Nome}</p>
                <p className="text-gray-600">{raca.Descricao}</p>
              </li>
            ))
          ) : (
            <p>Nenhuma raça cadastrada.</p>
          )}
        </ul>
      </div>
    </main>
  );
} 