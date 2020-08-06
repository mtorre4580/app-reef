import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import styles from '../styles/login.module.scss';

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    Router.push('/discovery');
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <section className={styles.login}>
        <div className={styles.content}>
          <img className={styles.logoApp} src="/assets/img/coral.svg" alt="reefCorals" />
          <h1 className={styles.titleSection}>freeCoral</h1>
          <p className={styles.titleSubtitle}>Comprá de la forma mas sencilla</p>
        </div>
        <form className={styles.formLogin} onSubmit={handleSubmit}>
          <input className={styles.form} type="email" placeholder="email" />
          <input className={styles.form} type="password" placeholder="contraseña" />
          <button className={`${styles.form} ${styles.formBtn}`}>Acceder</button>
        </form>
        <div className={styles.register}>
          <Link href="/register">
            <a>Crear una nueva cuenta</a>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Login;
