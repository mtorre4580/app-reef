import Head from 'next/head';
import Router from 'next/router';
import { useState } from 'react';
import styles from '../styles/login.module.scss';
import { Link, withTranslation } from '../i18n';
import { login } from '../services/auth';
import FormAuth from '../components/FormAuth';
import Snackbar from '../components/Snackbar';

function Login({ t }) {
  const [showError, setShowError] = useState('');

  const handleSubmit = async (user) => {
    try {
      await login(user);
      Router.push('/discovery');
    } catch (err) {
      const status = (err.response && err.response.status) || 500;
      const messageError = status === 500 ? t('error_login') : t('invalid_credentials');
      setShowError(messageError);
    }
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
        <FormAuth onSubmit={handleSubmit} actionTitle={t('login')} />
        <div className={styles.register}>
          <Link href="/register">
            <a>{t('new_account')}</a>
          </Link>
        </div>
        {showError && <Snackbar onClose={() => setShowError('')}>{showError}</Snackbar>}
      </section>
    </>
  );
}

Login.getInitialProps = async () => ({
  namespacesRequired: ['login'],
});

export default withTranslation('login')(Login);
