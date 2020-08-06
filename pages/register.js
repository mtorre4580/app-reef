import Head from 'next/head';
import styles from '../styles/register.module.scss';

function Register() {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <section className={styles.register}>
        <h1 className={styles.title}>Registrarse</h1>
        <p className={styles.description}>Al estar registrado podrás comprar de manera digital</p>
        <form>
          <input type="text" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Registrarse</button>
        </form>
      </section>
    </>
  );
}

export default Register;
