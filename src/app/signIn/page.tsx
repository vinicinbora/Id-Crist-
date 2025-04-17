'use client'

import { useState, FormEvent } from "react";
import { FirebaseError } from "firebase/app";
import signIn from "../../firebase/auth/signIn";
import { useRouter } from 'next/navigation';


export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleForm = async (event: FormEvent) => {
        event.preventDefault()
        try {
            const { result, error } = await signIn(email, password);

            
            if (error) {
                const firebaseError = error as FirebaseError;
                if (firebaseError.message) {
                    console.log(firebaseError.message);
                    throw new Error(firebaseError.message);
                } else {
                    console.log('Unknown Error:', firebaseError);
                    throw new Error('Unknown Error');
                }
            }

            console.log(result)
            return router.push("/");
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    return (
        <div className="max-w-7xl bg-black h-screen m-auto flex justify-center items-center">
            <section >
                <h1>SignIn</h1>
                <form onSubmit={handleForm}>
                    <label htmlFor="email" className="text-black" >
                        <p>Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email"  placeholder="example@mail.com" />
                    </label>
                    <label htmlFor="password" >
                        <p>Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password"  placeholder="password" />
                    </label>
                    <div className="flex gap-6 mt-10">
                    <button type="submit" className="cursor-pointer text-white">Entrar</button>
                    <button type="button" onClick={() => router.push("/signup")} className="cursor-pointer">Cadastrar</button>
                    </div>
                </form>
                
            </section>
        </div>
    );
}

