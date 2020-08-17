import { createRef } from 'react';
import Head from 'next/head';
import Header from '../components/Header';

function Parameters() {
  const ref = createRef();

  return (
    <>
      <Head>
        <title>Parametros</title>
      </Head>
      <section ref={ref}>
        <Header title="Parametros" refSection={ref} showDrawer={false} />
      </section>
    </>
  );
}

export default Parameters;
