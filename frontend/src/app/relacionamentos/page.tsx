import React from 'react';
import Link from 'next/link';

type Relacionamento = {
  ID: number;
  Animal_Pai_ID: number;
  Animal_Mae_ID: number;
  Filhote_ID: number;
  Tipo_Relacao: string;
};

async function getRelacionamentos(): Promise<Relacionamento[]> {
  const res = await fetch('http://localhost:3000/relacionamentos', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar dados dos relacionamentos');
  }

  return res.json();
}

export default async function RelacionamentosPage() {
  const relacionamentos = await getRelacionamentos();

  return (
    <main className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Gerenciamento de Relacionamentos</h1>
        <Link href="/relacionamentos/novo">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
            Cadastrar Novo Relacionamento
          </button>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Lista de Relacionamentos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relacionamentos.length > 0 ? (
            relacionamentos.map((rel) => (
              <div key={rel.ID} className="p-4 border rounded-lg shadow-sm">
                <p className="font-semibold text-lg">Relação ID: {rel.ID}</p>
                <p className="text-sm text-gray-600">Tipo: {rel.Tipo_Relacao}</p>
                <p className="text-sm text-gray-500">Pai ID: {rel.Animal_Pai_ID}</p>
                <p className="text-sm text-gray-500">Mãe ID: {rel.Animal_Mae_ID}</p>
                <p className="text-sm text-gray-500">Filhote ID: {rel.Filhote_ID}</p>
              </div>
            ))
          ) : (
            <p>Nenhum relacionamento cadastrado.</p>
          )}
        </div>
      </div>
    </main>
  );
} 