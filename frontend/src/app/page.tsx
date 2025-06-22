import React from 'react';
import Link from 'next/link';

type Animal = {
  ID: number;
  Nome: string;
  Cor: string;
  Sexo: string;
  Data_Nascimento: string;
  Observacoes: string;
};

async function getAnimais(): Promise<Animal[]> {
  // Certifique-se de que sua API NestJS está rodando em http://localhost:3000
  const res = await fetch('http://localhost:3000/animais', {
    cache: 'no-store', // Garante que os dados sejam sempre buscados do servidor
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar dados da API');
  }

  return res.json();
}

export default async function Home() {
  const animais = await getAnimais();

  return (
    <main className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Gerenciamento da Fazenda</h1>
        <div className="flex flex-wrap gap-4">
          <Link href="/historico-saude">
            <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200">
              Histórico de Saúde
            </button>
          </Link>
          <Link href="/pesagens">
            <button className="bg-lime-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-lime-600 transition duration-200">
              Gerenciar Pesagens
            </button>
          </Link>
          <Link href="/vacinas">
            <button className="bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-600 transition duration-200">
              Gerenciar Vacinas
            </button>
          </Link>
          <Link href="/relacionamentos">
            <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-200">
              Gerenciar Relacionamentos
            </button>
          </Link>
          <Link href="/ninhadas">
            <button className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-200">
              Gerenciar Ninhadas
            </button>
          </Link>
          <Link href="/reprodutores">
            <button className="bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-200">
              Gerenciar Reprodutores
            </button>
          </Link>
          <Link href="/racas">
            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
              Gerenciar Raças
            </button>
          </Link>
          <Link href="/animais/novo">
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
              Cadastrar Novo Animal
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-semibold mb-4">Lista de Animais</h2>
        <ul className="divide-y divide-gray-200">
          {animais.length > 0 ? (
            animais.map((animal) => (
              <li key={animal.ID} className="py-4">
                <p className="font-semibold text-lg">{animal.Nome}</p>
                <p className="text-gray-600">
                  {animal.Cor} - {animal.Sexo}
                </p>
                <p className="text-sm text-gray-500">
                  Nascimento: {new Date(animal.Data_Nascimento).toLocaleDateString()}
                </p>
              </li>
            ))
          ) : (
            <p>Nenhum animal cadastrado.</p>
          )}
        </ul>
      </div>
    </main>
  );
} 