"use client";
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth } from '@/firebase/firebaseAppConfig';
import { db } from '@/firebase/firebaseAppConfig';
import Image from 'next/image';
import Link from "next/link";
import ProfileModal from '../components/ProfileModal/ProfileModal';
import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";
import { IoNotifications } from "react-icons/io5";
import { FaReadme } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";









// Use a mesma interface do ProfileModal para consistência
interface UserData {
  nome?: string;
  igreja?: string;
  frase?: string;
  fotoURL?: string | null;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname(); // Hook para obter a rota atual

  const { userAuth, logout } = useAuthContext();
  const router = useRouter();

  console.log(userAuth);

  useEffect(() => {
    if (userAuth === null) {
      router.push('/signIn');
    }
  }, [userAuth, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userDocRef = doc(db, 'usuarios', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        }
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Função corrigida para aceitar UserData
  const handleSave = (data: UserData) => {
    setUserData(data);
  };

  if (loading) return <div className="text-center py-8">Carregando...</div>;

  return (
    <>


<div className="fixed top-0 left-0 right-0 w-full h-16 bg-[#262831] flex justify-between items-center p-4 z-50">
      <h1 className="text-white text-2xl font-bold">ID Cristão</h1>
      <div className="flex items-center gap-3">
        {/* Ícone 1 - Daily */}
        <Link href="/daily" passHref>
          <button className={`cursor-pointer rounded-full p-2 transition-colors ${
            pathname === '/daily' ? 'text-blue-400 bg-white/10' : 'text-white'
          }`}>
            <FaReadme size={25} />
          </button>
        </Link>

        {/* Ícone 2 - Notificações */}
        <Link href="/notificacao" passHref>
          <button className={`cursor-pointer rounded-full p-2 transition-colors ${
            pathname === '/notifications' ? 'text-blue-400 bg-white/10' : 'text-white'
          }`}>
            <IoNotifications size={25} />
          </button>
        </Link>

        {/* Ícone 3 - Logout (sem Link, apenas ação) */}
        <button
          onClick={() => logout()}
          className="cursor-pointer text-white rounded-full p-2 hover:bg-white/10"
        >
          <BiLogOut size={25} />
        </button>
      </div>
    </div>

      <div className="max-w-[100%] lg:max-w-5xl mt-14 mx-auto p-4">

        <div className='w-full flex flex-col justify-center items-center'>

          <div className="inset-0 bg-cover bg-center w-full h-36 rounded-2xl overflow-hidden"
            style={{ backgroundImage: `url(${userData.fotoURL})` }}
          >



          </div>

          <div className="w-full flex justify-between mb-3 -mt-9 items-end ">
            {userData.fotoURL ? (
              <Image
                src={userData.fotoURL}
                alt="Foto de perfil"
                width={100}
                height={100}
                className=" rounded-full object-cover w-[100px] h-[100px]  inset-0 bg-gradient-to-r from-blue-500 via-blue-800 to-blue-300 p-1"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <span className="text-gray-400">Sem foto</span>
              </div>
            )}

            <div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer border-2 bg-[#262831]  px-2 py-1 flex justify-center items-center gap-2 text-white rounded-full text-sm"
              >

                Editar Perfil
              </button>
            </div>

          </div>


          <div className='w-full flex justify-between items-center'>
            <div className='w-full'>
              <p className='text-gray-500'>Nome:</p>
              <h1 className="text-2xl text-white font-bold mb-2">
                {userData.nome || '...'}
              </h1>
            </div>



          </div>



          <div className='w-full mt-6'>

            <div className='w-full'>
              <p className='text-gray-500 flex items-center gap-2'><span>⛪</span>Igreja:</p>
              <p className="text-[18px] font-bold gap-2 flex items-center  text-white rounded-2xl p-3 mb-2">
                {userData.igreja || '...'}
              </p>
            </div>

            <div className='w-full'>
              <p className='text-gray-500 flex items-center mb-1 gap-2'><span>📖</span>O que Jesus é para mim:</p>
              <p className="text-[18px]  font-normal gap-2 flex items-center text-white rounded-2xl p-4 mb-2">
                {userData.frase || '...'}
              </p>
            </div>
          </div>



        </div>

        <ProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave} // Agora compatível com ProfileModalProps
        />



      </div>
    </>
  );
}