import styles from '../../styles/detail.module.scss';
import { createRef } from 'react';
import { withTranslation } from '../../i18n';
import { getDetail } from '../../services/items';
import Head from 'next/head';
import Header from '../../components/Header';
import CarouselImages from '../../components/CarouselImages';

/**
 * View: Detail Page
 * @param {object} params
 */
function Detail({ t, item }) {
  const ref = createRef();
  return (
    <section className={styles.detail} ref={ref}>
      <Head>
        <title>{t('detail')}</title>
      </Head>
      <Header title={t('detail')} refSection={ref} showDrawer={false} showBack={{ path: '/discovery' }} />
      <div className={styles.ctn}>
        <CarouselImages imgs={item.imgs} img={item.img} />
        <div className={styles.ctnDescription}>
          <div>
            <h2 className={styles.titleCoral}>{item.title}</h2>
            <p>{item.description}</p>
          </div>
          <div className={styles.detailCoral}>
            <h2 className={styles.title}>{t('price')}</h2>
            <p className={styles.price}>
              {item.price.coin}
              {item.price.value}
            </p>
          </div>
          <div className={styles.detailCoral}>
            <h2 className={styles.title}>{t('size')}</h2>
            <p>{item.size}</p>
          </div>
          <div className={styles.actions}>
            <button className={styles.btn}>{t('buy')}</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  const item = await getDetail(id);
  return {
    props: {
      item,
      namespacesRequired: ['detail'],
    },
  };
}

export default withTranslation('detail')(Detail);
