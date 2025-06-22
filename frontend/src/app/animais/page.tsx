import Link from 'next/link';

<button 
  className="flex-1 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 text-sm btn-hover"
  // onClick={() => info('Funcionalidade de edição em desenvolvimento')}
>
  <Link href={`/animais/editar/${animal.ID}`}>Editar</Link>
</button> 