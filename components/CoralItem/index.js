import React from 'react';
import Link from 'next/link';
import styles from './style.module.scss';

export default function CoralItem({ item, style, isFilter, t }) {
  if (isFilter) {
    return <div className={`${styles.box} ${styles.shine}`}></div>;
  }

  return (
    <section style={style} className={styles.row}>
      <Link href={`/detail/${item._id}`}>
        <a>
          <article className={styles.item} key={item._id}>
            <img className={styles.itemImg} src={item.img} alt={item.title} />
            <div className={styles.itemDescription}>
              <h1 className={styles.itemTitle}>{item.title}</h1>
              <p className={styles.itemSubtitle}>
                {t('price')} {item.price.coin} {item.price.value}
              </p>
              <p className={styles.itemSubtitle}>
                {t('size')}: {item.size.toLowerCase()}
              </p>
              {item.free_shipping && <p className={styles.free_shipping}>{t('free_shipping')}</p>}
            </div>
          </article>
        </a>
      </Link>
    </section>
  );
}
