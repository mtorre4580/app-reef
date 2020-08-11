import React, { useState, memo } from 'react';
import Link from 'next/link';
import styles from './style.module.scss';
import { IconFavorite, IconFavoriteAdded } from '../Icons';
import { useCurrentUser } from '../../hooks/useCurrentUser';

function CoralItem({ item, style = {}, isFilter, t, onAddFavorite }) {
  const [user] = useCurrentUser();
  const [favorite, setFavorite] = useState(item.isFavorite || false);

  if (isFilter) {
    return <div className={`${styles.box} ${styles.shine}`}></div>;
  }

  const addToFavorite = () => {
    setFavorite(!favorite);
    onAddFavorite(item._id);
  };

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
      {user && (
        <button onClick={addToFavorite}>
          {favorite && <IconFavoriteAdded className={styles.favorite} color="#9c27b0" />}
          {!favorite && <IconFavorite className={styles.favorite} color="#9c27b0" />}
        </button>
      )}
    </section>
  );
}

export default memo(CoralItem);
