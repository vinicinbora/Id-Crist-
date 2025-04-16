"use client";

export default function Eventos() {

    return (
        <div className="max-w-[90%] mx-auto h-screen pt-8 flex flex-col gap-2 lg:w-3xl">

            <div>
                <h1 className="text-black">Próximos eventos</h1>
            </div>

            <div className="bg-[url('https://comunhao.com.br/wp-content/uploads/2019/05/Isa%C3%ADas-Saad.jpg')] bg-cover bg-center h-64 rounded-3xl flex items-end p-4 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)] border border-gray-200">

                <div className="flex justify-between items-center w-full">
                    <div>
                        <h1 className="font-bold rounded-3xl text-black">03/05/2025</h1>
                    </div>
                    <div>
                        <button className="bg-emerald-400 py-2 px-4 rounded-full">Registrar</button>
                    </div>

                </div>
            </div>
        </div>
    )

}
