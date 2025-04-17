import { db } from "@/firebase/firebaseAppConfig";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

type Mensagem = {
  nome: string;
  frase: string;
};

export const salvarMensagem = async ({ nome, frase }: Mensagem) => {
  const auth = getAuth();
  const uid = auth.currentUser?.uid;

  if (!uid) {
    throw new Error("Usuário não autenticado");
  }

  try {
    // Cria ou substitui o documento com o ID do usuário
    const userDocRef = doc(db, "usuarios", uid);
    await setDoc(userDocRef, {
      nome,
      frase,
    });

    console.log("Mensagem salva/substituída com sucesso.");
  } catch (error) {
    console.error("Erro ao salvar mensagem:", error);
    throw error;
  }
};
