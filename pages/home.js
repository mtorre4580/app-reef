import { createRef } from 'react';
import Head from 'next/head';
import Header from '../components/Header';

function Home() {
  const ref = createRef();

  return (
    <>
      <Head>
        <title>Inicio</title>
      </Head>
      <section ref={ref}>
        <Header title="Inicio" refSection={ref} />
      </section>
    </>
  );
}

export default Home;
