'use client';

import axios from 'axios';

export default function Home() {

  async function getData() {
    try {

      const data = await axios.get('http://localhost:8080');

    } catch (err) {

      console.error('Erro ao fazer a requisição:', err);
    }
  }


  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <div className="flex justify-center items-center h-screen">
          <button
            onClick={() => getData()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Clique aqui
          </button>

        </div>


      </main>
    </div>
  );
}
