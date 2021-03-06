import { createRef, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { withTranslation } from '../i18n';
import Header from '../components/Header';
import FormParam from '../components/FormParam';
import { getAquarium, registerParameters } from '../services/aquariums';
import Snackbar from '../components/Snackbar';

function Parameters({ t, _id }) {
  const ref = createRef();
  const router = useRouter();
  const [showError, setShowError] = useState('');

  const handleOnSubmit = async ({ date, params }) => {
    try {
      await registerParameters(_id, date, params);
      setShowError('');
      router.push('/aquarium');
    } catch (err) {
      setShowError(t('error_register_params'));
    }
  };

  if (!_id) {
    return <div>No posees aquarium</div>;
  }

  return (
    <>
      <Head>
        <title>{t('parameters')}</title>
      </Head>
      <section ref={ref}>
        <Header title={t('parameters')} refSection={ref} showDrawer={false} showBack={{ path: '/aquarium' }} />
        <FormParam onSubmit={handleOnSubmit} t={t} />
        {showError && <Snackbar onClose={() => setShowError('')}>{showError}</Snackbar>}
      </section>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const cookies = ctx.req.headers.cookie;
  const response = await getAquarium(cookies);
  return {
    props: {
      ...response,
      namespacesRequired: ['parameters'],
    },
  };
}

export default withTranslation('parameters')(Parameters);
