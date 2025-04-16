'use client'

import React from "react";
import signUp from "../../firebase/auth/signUp";
import { useRouter } from 'next/navigation';


export default function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event: React.FormEvent) => {
        event.preventDefault()

        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/")
    }
    return (
        <div className="max-w-7xl bg-black h-screen m-auto flex justify-center items-center">
            <section >
                <h1 >Cadastro</h1>
                <form onSubmit={handleForm} >
                    <label htmlFor="email" >
                        <p>Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email"  placeholder="example@mail.com" />
                    </label>
                    <label htmlFor="password">
                        <p>Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password"  placeholder="password" />
                    </label>
                    <div className="flex gap-6 mt-7">
                    <button type="submit" className="cursor-pointer">Cadastrar</button>
                    <button type="button" onClick={() => router.push("/signIn")} className="cursor-pointer">Entrar</button>
                    </div>
                </form>
            </section>
        </div>
    );
}

