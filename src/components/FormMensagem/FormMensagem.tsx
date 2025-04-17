"use client";

import { useState } from "react";
import { salvarMensagem } from "../../lib/salvarMensagem";

export default function FormMensagem() {
  const [nome, setNome] = useState("");
  const [frase, setFrase] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);

    try {
      await salvarMensagem({ nome, frase });
      alert("Mensagem salva com sucesso!");
      setNome("");
      setFrase("");
    } catch (error) {
      alert("Erro ao salvar a mensagem.");
    }

    setCarregando(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col text-black gap-4 max-w-sm mx-auto">
      <input
        type="text"
        placeholder="Seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="border p-2"
        required
      />
      <textarea
        placeholder="Sua frase"
        value={frase}
        onChange={(e) => setFrase(e.target.value)}
        className="border p-2"
        required
      />
      <button type="submit" disabled={carregando} className="bg-blue-500 text-white p-2">
        {carregando ? "Salvando..." : "Enviar"}
      </button>
    </form>
  );
}
