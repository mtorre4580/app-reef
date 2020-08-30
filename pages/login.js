import Head from 'next/head';
import Router from 'next/router';
import { useState } from 'react';
import styles from '../styles/login.module.scss';
import { Link, withTranslation } from '../i18n';
import { login } from '../services/auth';
import FormAuth from '../components/FormAuth';
import Snackbar from '../components/Snackbar';

/**
 * View: Login Page
 * @param {object} params
 */
function Login({ t }) {
  const [showError, setShowError] = useState('');

  /**
   * Event to handle auth user and redirect to discovery section
   * @param {object} user
   * @returns {void}
   */
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

export async function getServerSideProps() {
  return {
    props: {
      namespacesRequired: ['login'],
    },
  };
}

export default withTranslation('login')(Login);
