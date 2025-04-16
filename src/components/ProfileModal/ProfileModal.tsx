import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, setDoc} from 'firebase/firestore';
import { auth } from '@/firebase/firebaseAppConfig';
import { db, storage } from '@/firebase/firebaseAppConfig';
import Image from 'next/image';

interface UserData {
  nome?: string;
  igreja?: string;
  frase?: string;
  fotoURL?: string | null;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: UserData) => void;
}

export default function ProfileModal({ isOpen, onClose, onSave }: ProfileModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [nome, setNome] = useState<string>('');
  const [frase, setFrase] = useState<string>('');
  const [igreja, setIgreja] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userDocRef = doc(db, 'usuarios', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data() as UserData;
        if (data.fotoURL) setSelectedImage(data.fotoURL);
        if (data.nome) setNome(data.nome);
        if (data.igreja) setIgreja(data.igreja);
        if (data.frase) setFrase(data.frase);
      }
    };

    fetchUserData();
  }, [isOpen]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadToFirebase(file);
  };

  const handleNomeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
    
  };

  const handleFraseChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFrase(e.target.value);
  };

  const handleIgrejaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIgreja(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const user = auth.currentUser;
      if (!user) return;

      // Se tem imagem selecionada mas ainda não fez upload
      if (selectedImage && !selectedImage.startsWith('http')) {
        // Aguarda o upload da imagem antes de salvar
        return;
      }

      await setDoc(doc(db, 'usuarios', user.uid), {
        nome: nome.trim(),
        igreja: igreja.trim(),
        frase: frase.trim(),
        fotoURL: selectedImage || ''
      }, { merge: true });

      onSave({ nome, igreja, frase, fotoURL: selectedImage });
      onClose();
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadToFirebase = async (file: File) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      setLoading(true);
      const imageRef = ref(storage, `imagens/${user.uid}/foto-perfil.png`);
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);
      setSelectedImage(downloadURL);
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Editar Perfil</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col justify-start items-start gap-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Foto de Perfil</label>
            {selectedImage && (
              <div className="mb-2 flex justify-center">
                <Image
                  src={selectedImage}
                  alt="Foto de perfil"
                  width={100}
                  height={100}
                  className="rounded-full object-cover mb-4 w-[100px] h-[100px]"
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
            <label className="block text-sm text-black font-medium  mb-1">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={handleNomeChange}
              className="w-full p-2 border text-black border-gray-300 rounded-md"
              placeholder="Digite seu nome"
              required
            />
          </div>


          <div className="mb-4">
            <label className="block text-sm text-black font-medium  mb-1">Minha igreja</label>
            <input
              type="text"
              value={igreja}
              onChange={handleIgrejaChange}
              className="w-full p-2 border text-black border-gray-300 rounded-md"
              placeholder="Qual é a sua igreja ?"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-black font-medium  mb-1">Um versículo</label>
            <input
              type="text"
              value={frase}
              onChange={handleFraseChange}
              className="w-full p-2 border text-black border-gray-300 rounded-md"
              placeholder="Digite um versículo"
              required
            />
          </div>

         

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}