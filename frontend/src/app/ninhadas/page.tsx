import React from 'react';
import Link from 'next/link';

type Ninhada = {
  ID: number;
  Matriz_ID: number;
  Reprodutor_ID: number;
  Data_Concepcao: string;
  Data_Nascimento: string;
  Descricao: string;
  Perdas: string;
};

async function getNinhadas(): Promise<Ninhada[]> {
  const res = await fetch('http://localhost:3000/ninhadas', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar dados das ninhadas');
  }

  return res.json();
}

export default async function NinhadasPage() {
  const ninhadas = await getNinhadas();

  return (
    <main className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Gerenciamento de Ninhadas</h1>
        <Link href="/ninhadas/novo">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
            Cadastrar Nova Ninhada
          </button>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Lista de Ninhadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ninhadas.length > 0 ? (
            ninhadas.map((ninhada) => (
              <div key={ninhada.ID} className="p-4 border rounded-lg shadow-sm">
                <p className="font-semibold text-lg">Ninhada ID: {ninhada.ID}</p>
                <p className="text-sm text-gray-600">Matriz ID: {ninhada.Matriz_ID}</p>
                <p className="text-sm text-gray-600">Reprodutor ID: {ninhada.Reprodutor_ID}</p>
                {ninhada.Data_Nascimento && (
                  <p className="text-sm text-gray-500">
                    Nascimento: {new Date(ninhada.Data_Nascimento).toLocaleDateString()}
                  </p>
                )}
                 <p className="text-sm text-gray-500 mt-2">{ninhada.Descricao}</p>
              </div>
            ))
          ) : (
            <p>Nenhuma ninhada cadastrada.</p>
          )}
        </div>
      </div>
    </main>
  );
} 