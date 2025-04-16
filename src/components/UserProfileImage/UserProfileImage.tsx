import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth } from '@/firebase/firebaseAppConfig';
import { db, storage } from '@/firebase/firebaseAppConfig';
import Image from 'next/image';

interface UserData {
  nome?: string;
  fotoURL?: string;
}

export default function ProfileImageUploadenv() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [nome, setNome] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Carrega os dados do usuário ao entrar na página
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userDocRef = doc(db, 'usuarios', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data() as UserData;
        if (data.fotoURL) {
          setSelectedImage(data.fotoURL);
        }
        if (data.nome) {
          setNome(data.nome);
        }
      }
    };

    fetchUserData();
  }, []);

  // Manipula seleção da imagem
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadToFirebase(file);
  };

  // Manipula mudança no input do nome
  const handleNomeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
  };

  // Salva o nome no Firebase
  const saveNome = async () => {
    const user = auth.currentUser;
    if (!user || !nome.trim()) return;

    setLoading(true);
    try {
      await updateDoc(doc(db, 'usuarios', user.uid), {
        nome: nome.trim()
      });
      // Opcional: mostrar mensagem de sucesso
    } catch (error) {
      console.error('Erro ao salvar nome:', error);
    } finally {
      setLoading(false);
    }
  };

  // Faz upload no Storage e salva no Firestore
  const uploadToFirebase = async (file: File) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const imageRef = ref(storage, `imagens/${user.uid}/foto-perfil.png`);
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);

      // Atualiza Firestore com a nova imagem e mantém o nome existente
      await setDoc(doc(db, 'usuarios', user.uid), {
        fotoURL: downloadURL,
        nome: nome || '' // Mantém o nome se já existir
      }, { merge: true }); // O merge evita sobrescrever outros campos

      setSelectedImage(downloadURL);
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      

      <div className="mb-4">
       
        {selectedImage && (
          <div className="mb-2">
            <Image
              src={selectedImage}
              alt="Foto de perfil"
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
        <div className="flex">
          <input
            type="text"
            value={nome}
            onChange={handleNomeChange}
            className="flex-1 p-2 rounded-md"
            placeholder="Digite seu nome"
          />
          <button
            onClick={saveNome}
            disabled={loading || !nome.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  );
}