import Head from 'next/head';
import Router from 'next/router';
import { useState } from 'react';
import { withTranslation } from '../i18n';
import { create } from '../services/users';
import FormAuth from '../components/FormAuth';
import Header from '../components/Header';
import Snackbar from '../components/Snackbar';
import styles from '../styles/register.module.scss';

function Register({ t }) {
  const [showError, setShowError] = useState('');

  const handleSubmit = async (user) => {
    try {
      await create(user);
      Router.push('/discovery');
    } catch (err) {
      const emailUsed = err.response && err.response.status === 403;
      setShowError(emailUsed ? t('email_already_use') : t('error_register'));
    }
  };

  return (
    <>
      <Head>
        <title>{t('register')}</title>
      </Head>
      <section className={styles.register}>
        <Header title={t('register')} showDrawer={false} />
        <p className={styles.description}>{t('description_register')}</p>
        <FormAuth onSubmit={handleSubmit} actionTitle={t('register')} />
        {showError && <Snackbar onClose={() => setShowError('')}>{showError}</Snackbar>}
      </section>
    </>
  );
}

Register.getInitialProps = async () => ({
  namespacesRequired: ['register'],
});

export default withTranslation('register')(Register);
