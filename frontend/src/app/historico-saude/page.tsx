import React from 'react';
import Link from 'next/link';

type HistoricoSaude = {
  ID: number;
  Animal_ID: number;
  Data_Evento: string;
  Descricao: string;
  Tratamento: string;
  Veterinario: string;
};

async function getHistoricoSaude(): Promise<HistoricoSaude[]> {
  const res = await fetch('http://localhost:3000/historico-saude', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar dados do histórico de saúde');
  }

  return res.json();
}

export default async function HistoricoSaudePage() {
  const historico = await getHistoricoSaude();

  return (
    <main className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Histórico de Saúde</h1>
        <Link href="/historico-saude/novo">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
            Adicionar Evento de Saúde
          </button>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Registros de Saúde</h2>
        <div className="space-y-4">
          {historico.length > 0 ? (
            historico.map((evento) => (
              <div key={evento.ID} className="p-4 border rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-lg">{evento.Descricao}</p>
                    <p className="text-sm text-gray-600">Animal ID: {evento.Animal_ID}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(evento.Data_Evento).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-sm text-gray-700 mt-2">Tratamento: {evento.Tratamento}</p>
                <p className="text-sm text-gray-500 mt-1">Vet: {evento.Veterinario}</p>
              </div>
            ))
          ) : (
            <p>Nenhum evento de saúde registrado.</p>
          )}
        </div>
      </div>
    </main>
  );
} 