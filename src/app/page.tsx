"use client";
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth } from '@/firebase/firebaseAppConfig';
import { db } from '@/firebase/firebaseAppConfig';
import Image from 'next/image';
import ProfileModal from '../components/ProfileModal/ProfileModal';
import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";
import { PiChurch } from "react-icons/pi";
import { BiBible } from "react-icons/bi";





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

      <div className='w-full h-16 bg-black flex justify-between items-center mb-4 p-2 '>
        <h1 className='text-white text-2xl font-bold'>ID Cristã</h1>
        <button onClick={() => logout()} className="cursor-pointer text-white border-2 bg-black py-2 px-5 rounded-full">Sair</button>
      </div>

      <div className="max-w-[100%] lg:max-w-5xl mx-auto p-4">

        <div className='w-full flex flex-col justify-center items-center'>

          <div className="w-full flex justify-between items-center mt-7">
            {userData.fotoURL ? (
              <Image
                src={userData.fotoURL}
                alt="Foto de perfil"
                width={100}
                height={100}
                className="rounded-full object-cover inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-300 p-1 mb-4 w-[100px] h-[100px]"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <span className="text-gray-400">Sem foto</span>
              </div>
            )}

            <div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer border-2 border-[#1083fe] py-2 px-3 flex justify-center items-center gap-2 text-[#1083fe] rounded-full text-sm"
              >

                Editar Perfil
              </button>
            </div>

          </div>


          <div className='w-full flex justify-between items-center'>
            <div className='w-full'>
              <p className='text-gray-500'>Nome:</p>
              <h1 className="text-2xl text-black font-bold mb-2">
                {userData.nome || '...'}
              </h1>
            </div>

            <h1 className='text-black'>Desde:</h1>

          </div>



          <div className='mt-6'>

            <div className='w-full'>
              <p className='text-gray-500 flex items-center gap-2'><PiChurch size={20} />Igreja:</p>
              <p className="text-2xl font-bold gap-2 flex items-center  text-black rounded-2xl p-3 mb-2">
                {userData.igreja || '...'}
              </p>
            </div>

            <div className='w-full'>
              <p className='text-gray-500 flex items-center gap-2'><BiBible size={20} /> Um versículo:</p>
              <p className="text-[18px] bg-amber-50 font-normal gap-2 flex items-center text-black  rounded-2xl p-4 mb-2">
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