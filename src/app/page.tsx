"use client";
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth } from '@/firebase/firebaseAppConfig';
import { db } from '@/firebase/firebaseAppConfig';
import Image from 'next/image';
import ProfileModal from '../components/ProfileModal/ProfileModal';
import Header from '@/components/Header/header';











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

      <Header/>
      

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