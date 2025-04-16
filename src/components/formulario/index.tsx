"use client"

import { useState } from 'react';

export function Fomulario() {


    const [name, setName] = useState<string>('');
    const [conj, setConj] = useState<string>('');
    

    // Usando ChangeEvent para tipar o evento do input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value); // Atualiza o estado com o valor do input
    };

    // Usando ChangeEvent para tipar o evento do input
    const handleInputChangeConj = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConj(e.target.value); // Atualiza o estado com o valor do input
    };





    return (

        <div className="w-full flex flex-col lg:flex lg:flex-row justify-center lg:justify-end gap-4">
            <form className='lg:w-3xl'>
                <div>
                    <div className="space-y-4">

                        <label className="block">
                           
                            <input
                                type="text"
                                value={name}
                                id='name'
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-2xl shadow-sm focus:border-love-500 focus:ring focus:ring-love-200 focus:ring-opacity-50 px-4 py-4 bg-[#1e1e1e] text-white"
                                placeholder="Como você se chama?"
                            />
                        </label>


                        <label className="block">
                            
                            <input
                                type="text"
                                value={conj}
                                id='conj'
                                onChange={handleInputChangeConj}

                                className="mt-1 block w-full rounded-2xl  shadow-sm focus:border-love-500 focus:ring focus:ring-love-200 focus:ring-opacity-50 px-4 py-4 bg-[#1e1e1e]  border-gray-500 text-white"
                                placeholder="De qual igreja você é?"
                            />
                        </label>

                        <label className="block">
                            
                            <textarea


                                rows={5}
                                className="mt-1 block w-full rounded-2xl border-gray-500 shadow-sm focus:border-love-500 focus:ring focus:ring-love-200 focus:ring-opacity-50 px-4 py-4 bg-[#1e1e1e]  text-white"
                                placeholder="Deixe uma mensagem ou um versículo"
                            />
                        </label>
                    </div>

                </div>


            </form>


            <div className="w-full border-4 border-gray-500 h-[600px] flex justify-center rounded-3xl bg-[#1e1e1e]  lg:w-3xl">

               
                    <div className=' h-12 bg-neutral-100 mt-4 p-4 flex justify-center items-center rounded-3xl gap-4'>
                    <p className="text-gray-700 font-bold">De: {name}</p>
                    <p className="text-gray-700 font-bold">Para: {conj}</p>
                    </div>
          

            </div>




        </div>

    );
}