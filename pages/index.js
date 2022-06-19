import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import emailjs from '@emailjs/browser';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmSub, setConfirmSub] = useState(false)

  const templateParams = {
          name: name,
          email: email
      };

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
    emailjs.send(process.env.NEXT_PUBLIC_SERVICE_ID,process.env.NEXT_PUBLIC_TEMPLATE_ID,templateParams,process.env.NEXT_PUBLIC_PUBLIC_KEY_EMAILJS);
    setName("");
    setEmail("");
    setConfirmSub(true)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Newsletter do Jess</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>O que foi do fim de semana</h1>
        <h2 className={styles.subtitle}>A Newsletter do Jess</h2>
        {confirmSub? <span>Obrigado por se inscrever</span>:
        <form action="#" method="POST" onSubmit={(e) => handleSubmit(e)} className={styles.formulary}>
          <label htmlFor="name">Nome
            <input
              required
              placeholder='Arthur Dent'
              type="text"
              name="name"
              id="name"
              autoComplete="given-name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="input-field"
              />
          </label>
          <label htmlFor="email">
            Email
            <input
              required
              placeholder='compre@kombi.com.br'
              type="email"
              name="email"
              id="email"
              autoComplete="given-email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="input-field"
              />
          </label>
          <button type='submit'>Inscrever</button>
        </form>
         }
      </main>

      <footer className={styles.footer}>
        <span>De acordo com a</span>
        <span>LGPD - Legal Guardar Pra Depois</span>
      </footer>
    </div>
  )
}
