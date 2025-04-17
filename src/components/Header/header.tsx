'use client'
import { useEffect } from 'react';
import { useAuthContext } from "../../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { IoNotifications } from "react-icons/io5"; // Corrigido de "react-icons/ios"
import { FaReadme } from "react-icons/fa6"; // Corrigido de "react-icons/fab"
import { BiLogOut } from "react-icons/bi"; // Corrigido de "react-icons/bi"
import Link from 'next/link'; // Corrigido de 'link'

export default function Header() {
  const { userAuth, logout } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname(); // Hook para obter a rota atual

  useEffect(() => {
    if (userAuth === null) {
      router.push('/signin');
    }
  }, [userAuth, router]);

  return (
    <div className="fixed top-0 left-0 right-0 w-full h-16 bg-[#262831] flex justify-between items-center p-4 z-50">
    <Link href="/" passHref>
      <h1 className="text-white text-2xl font-bold">ID Cristão</h1>
      </Link>
      <div className="flex items-center gap-3">
        {/* Ícone 1 - Daily */}
        <Link href="/daily" passHref>
          <button className={`cursor-pointer rounded-full p-2 transition-colors ${
            pathname === '/daily' ? ' bg-white/10' : 'text-white'
          }`}>
            <FaReadme size={25} />
          </button>
        </Link>

        {/* Ícone 2 - Notificações */}
        <Link href="/notificacao" passHref>
          <button className={`cursor-pointer rounded-full p-2 transition-colors ${
            pathname === '/notificacao' ? ' bg-white/10' : 'text-white'
          }`}>
            <IoNotifications size={25} />
          </button>
        </Link>

        {/* Ícone 3 - Logout (sem Link, apenas ação) */}
        <button
          onClick={() => logout()}
          className="cursor-pointer text-white rounded-full  "
        >
          <BiLogOut size={25} />
        </button>
      </div>
    </div>
  );
}