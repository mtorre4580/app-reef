import Head from 'next/head';
import Router from 'next/router';
import styles from '../styles/login.module.scss';
import { Link, withTranslation } from '../i18n';

function Login({ t }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    Router.push('/discovery');
  };

  return (
    <>
      <Head>
        <title>{t('login')}</title>
      </Head>
      <section className={styles.login}>
        <div className={styles.content}>
          <img className={styles.logoApp} src="/assets/img/coral.svg" alt="reefCorals" />
          <h1 className={styles.titleSection}>{t('reef_corals')}</h1>
          <p className={styles.titleSubtitle}>{t('enjoy_buy')}</p>
        </div>
        <form className={styles.formLogin} onSubmit={handleSubmit}>
          <input className={styles.form} type="email" placeholder="email" />
          <input className={styles.form} type="password" placeholder="password" />
          <button className={`${styles.form} ${styles.formBtn}`}>{t('login')}</button>
        </form>
        <div className={styles.register}>
          <Link href="/register">
            <a>{t('new_account')}</a>
          </Link>
        </div>
      </section>
    </>
  );
}

Login.getInitialProps = async () => ({
  namespacesRequired: ['login'],
});

export default withTranslation('login')(Login);
