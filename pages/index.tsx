import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
            <Link href="/.well-known/assetlinks.json" className={styles.card}>

            <h3>Assetlink &rarr;</h3>
            <p>click here to access json file</p>
            </Link>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn: External link &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

         
       
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
