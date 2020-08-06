import styles from "../styles/discovery.module.scss";
import itemsService from "./api/services/items";

export default function Discovery({ items }) {
  const applyFilter = (type) => {
      console.log('aplicar filtro...', type);
  };

  return (
    <section className={styles.discovery}>
      <header className={styles.header}>
        <h1 className={styles.title}>Corales</h1>
        <nav className={styles.navCorals}>
          <button className={styles.type} onClick={() => applyFilter("SPS")}>
            <h2 className={styles.filter}>SPS</h2>
          </button>
          <button className={styles.type} onClick={() => applyFilter("LPS")}>
            <h2 className={styles.filter}>LPS</h2>
          </button>
          <button className={styles.type} onClick={() => applyFilter("SOFT")}>
            <h2 className={styles.filter}>Soft</h2>
          </button>
        </nav>
      </header>
      <section className={styles.items}>
        <div className={styles.row}>
          {items.map((item) => {
            return (
              <article className={styles.item} key={item.id}>
                <img className={styles.itemImg} src={item.img} alt="img" />
                <div className={styles.itemDescription}>
                  <h1 className={styles.itemTitle}>{item.title}</h1>
                  <p>{item.price.value}</p>
                  <p>{item.size}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
}

export async function getStaticProps() {
  const items = await itemsService.all();

  return {
    props: {
      items,
    },
  };
}
