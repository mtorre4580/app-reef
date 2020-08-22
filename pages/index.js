import Head from 'next/head';
import styles from '../styles/index.module.scss';
import { IconCheck, IconFacebook, IconInstagram } from '../components/Icons';
import { withTranslation } from '../i18n';
import Link from 'next/link';

function Landing({ t }) {
  return (
    <>
      <Head>
        <title>{t('reef_corals')}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://reef-corals.vercel.app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta property="og:title" content="Reef-Corals" />
        <meta property="og:description" content="Reef-Corals, compra y venta de corales" />
        <meta property="og:image" content="/assets/img/meta.png" />
        <meta property="og:url" content="https://reef-corals.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es-AR" />
        <meta property="og:site_name" content="Reef-Corals" />
        <meta name="theme-color" content="#9c27b0" />
      </Head>
      <main>
        <section className={styles.principal}>
          <header className={styles.headerPrincipal}>
            <h1 className={styles.titleApp}>{t('reef_corals')}</h1>
            <nav className={styles.navigation}>
              <ol>
                <li>
                  <Link href="/login">{t('login')}</Link>
                </li>
                <li>
                  <a id="features">{t('features')}</a>
                </li>
                <li>
                  <a id="origin">{t('origin')}</a>
                </li>
                <li>
                  <a id="download">{t('download')}</a>
                </li>
              </ol>
            </nav>
          </header>
          <div className={`${styles.wave} ${styles.v1}`} />
          <div className={`${styles.wave} ${styles.v2}`} />
          <div className={`${styles.wave} ${styles.v3}`} />
          <div className={`${styles.wave} ${styles.v4}`} />
          <section className={styles.ctnDescriptions}>
            <div>
              <div id="#features" className={styles.features}>
                <h2>{t('features')}</h2>
                <ol>
                  <li>
                    <IconCheck />
                    <span>{t('buy_and_sell')}</span>
                  </li>
                  <li>
                    <IconCheck />
                    <span>{t('measure')}</span>
                  </li>
                  <li>
                    <IconCheck />
                    <span>{t('find_near')}</span>
                  </li>
                </ol>
              </div>
              <div id="#origin" className={styles.originAndDownload}>
                <h2>{t('origin')}</h2>
                <p>{t('description_origin')}</p>
              </div>
              <div id="#download" className={styles.originAndDownload}>
                <h2>{t('download')}</h2>
                <p>{t('description_download')}</p>
              </div>
            </div>
            <div className={styles.imgContainer}>
              <img className={styles.logo} src="/assets/img/coral.svg" alt="reefCorals" />
            </div>
          </section>
        </section>
      </main>
      <footer>
        <div className={styles.ctnFooter}>
          <div>
            <a className={styles.iconsSocial}>
              <IconFacebook color="#3586ff" />
            </a>
            <a className={styles.iconsSocial}>
              <IconInstagram color="#3586ff" />
            </a>
          </div>
        </div>
        <p className={styles.legals}>{t('reef_corals')}</p>
      </footer>
    </>
  );
}

Landing.getInitialProps = async () => ({
  namespacesRequired: ['landing'],
});

export default withTranslation('landing')(Landing);
