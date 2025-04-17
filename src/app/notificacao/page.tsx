'use client'
import { MdArrowBackIos } from "react-icons/md";
import Link from 'next/link'

export default function Notificacao()  {
 
    return (

        <>
        <div className="w-full h-16 flex items-center p-2 bg-[#262831]">

<Link className="flex items-center" href="/" passHref>
<MdArrowBackIos size={25}/>
<h1 className="text-white text-2xl font-bold">Notificações</h1>
</Link>

</div>
      <div className="max-w-[100%] lg:max-w-5xl flex flex-col justify-center items-center mt-14 mx-auto p-4">
        
        <div className="w-full h-48 flex flex-col justify-center items-center gap-3">
        <h1 className="text-3xl">🚧 Página em construção</h1>
        <p className="text-center">Aqui você poderá ver novos eventos e compartilhar nas sua redes para seus amigos! </p>
     
        </div>
      </div>
      </>
    )
 
}