
import { useEffect } from 'react';
import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { IoNotifications } from "react-icons/io5";
import { FaReadme } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import Link from 'next/link';

export default function Header() {

    const { userAuth, logout } = useAuthContext();
      const router = useRouter();
    
      console.log(userAuth);

      useEffect(() => {
          if (userAuth === null) {
            router.push('/signIn');
          }
        }, [userAuth, router]);
  
    return (
        <div className="fixed top-0 left-0 right-0 w-full h-16 bg-[#262831] flex justify-between items-center p-4 z-50">
        <h1 className="text-white text-2xl font-bold">ID Cristão</h1>
        <div className="flex items-center gap-3">
          <button className="cursor-pointer text-white rounded-full">
            <Link href="/daily"> {/* Altere "/perfil" para o caminho desejado */}
              <FaReadme size={25} />
            </Link>
          </button>
          <button className="cursor-pointer text-white">
            <IoNotifications size={25} /> {/* Ícone de notificações */}
          </button>
          <button
            onClick={() => logout()}
            className="cursor-pointer text-white rounded-full"
          >
            <BiLogOut size={25} /> {/* Ícone de logout */}
          </button>
        </div>
      </div>
    )
 
}
