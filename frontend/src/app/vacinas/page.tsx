import React from 'react';
import Link from 'next/link';

type Vacina = {
  ID: number;
  Animal_ID: number;
  Nome_Vacina: string;
  Data_Aplicacao: string;
  Proxima_Aplicacao: string;
  Veterinario: string;
};

async function getVacinas(): Promise<Vacina[]> {
  const res = await fetch('http://localhost:3000/vacinas', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar dados das vacinas');
  }

  return res.json();
}

export default async function VacinasPage() {
  const vacinas = await getVacinas();

  return (
    <main className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Gerenciamento de Vacinas</h1>
        <Link href="/vacinas/novo">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
            Registrar Nova Vacina
          </button>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Registros de Vacinação</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vacinas.length > 0 ? (
            vacinas.map((vacina) => (
              <div key={vacina.ID} className="p-4 border rounded-lg shadow-sm">
                <p className="font-semibold text-lg">{vacina.Nome_Vacina}</p>
                <p className="text-sm text-gray-600">Animal ID: {vacina.Animal_ID}</p>
                {vacina.Data_Aplicacao && (
                  <p className="text-sm text-gray-500">
                    Aplicada em: {new Date(vacina.Data_Aplicacao).toLocaleDateString()}
                  </p>
                )}
                 {vacina.Proxima_Aplicacao && (
                  <p className="text-sm text-gray-500">
                    Próxima dose: {new Date(vacina.Proxima_Aplicacao).toLocaleDateString()}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-2">Vet: {vacina.Veterinario}</p>
              </div>
            ))
          ) : (
            <p>Nenhuma vacina registrada.</p>
          )}
        </div>
      </div>
    </main>
  );
} 