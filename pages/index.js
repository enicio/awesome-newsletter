import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const handleSubmit = async(e) => {
    e.preventDefault();
    const body = {name, email}
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
    });
    if (response.status !== 200){
      console.log("something went wrong");
      //set an error banner here
    } else {
      resetForm();
      console.log("form submitted successfully !!!")
      //set a success banner here
    }
    //check response, if success is false, dont take them to success page
    } catch (error) {
      console.log("there was an error submitting", error);

    }
  }

  const resetForm = () => {
    setName("");
    setEmail("");
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Compre uma Kombi</h1>
        <form action="#" method="POST" onSubmit={(e) => handleSubmit(e)}>
          <label>Nome</label>
          <input
            required
            type="text"
            name="name"
            id="name"
            autoComplete="given-name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="bg-zinc-300 py-3 px-4 block w-full shadow-sm text-gray-200-900 focus:ring-indigo-400 focus:border-indigo-400 border-warm-gray-300 rounded-md"
            />
            <label>Email</label>
          <input
            required
            type="email"
            name="email"
            id="email"
            autoComplete="given-email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="bg-zinc-300 py-3 px-4 block w-full shadow-sm text-gray-200-900 focus:ring-indigo-400 focus:border-indigo-400 border-warm-gray-300 rounded-md"
            />
            <button type='submit'>Inscrever</button>
        </form>
      </main>

      <footer className={styles.footer}>
        <span>LGPD - Legal Guardar Pra Depois</span>
      </footer>
    </div>
  )
}