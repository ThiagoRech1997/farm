import React from 'react';
import Link from 'next/link';

type Pesagem = {
  ID: number;
  Animal_ID: number;
  Data_Pesagem: string;
  Peso: number;
};

async function getPesagens(): Promise<Pesagem[]> {
  const res = await fetch('http://localhost:3000/pesagens', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar dados das pesagens');
  }

  return res.json();
}

export default async function PesagensPage() {
  const pesagens = await getPesagens();

  return (
    <main className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Gerenciamento de Pesagens</h1>
        <Link href="/pesagens/novo">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
            Registrar Nova Pesagem
          </button>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Registros de Pesagem</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pesagens.length > 0 ? (
            pesagens.map((pesagem) => (
              <div key={pesagem.ID} className="p-4 border rounded-lg shadow-sm text-center">
                <p className="text-sm text-gray-600">Animal ID: {pesagem.Animal_ID}</p>
                <p className="font-bold text-2xl my-2">{pesagem.Peso} kg</p>
                {pesagem.Data_Pesagem && (
                  <p className="text-sm text-gray-500">
                    {new Date(pesagem.Data_Pesagem).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p>Nenhuma pesagem registrada.</p>
          )}
        </div>
      </div>
    </main>
  );
} 