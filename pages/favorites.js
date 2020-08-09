import Head from 'next/head';
import { createRef } from 'react';
import Header from '../components/Header';

function Favorites() {
  const ref = createRef();
  return (
    <>
      <Head>
        <title>Favoritos</title>
      </Head>
      <section ref={ref}>
        <Header title="Favoritos" refSection={ref} />
      </section>
    </>
  );
}

export default Favorites;
