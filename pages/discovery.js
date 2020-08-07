import styles from '../styles/discovery.module.scss';
import InfiniteScroll from '../components/InfiniteScroll';
import SearchBox from '../components/SearchBox';
import { getAll, getMore, filterByType, search } from '../services/items';

export default function Discovery({ items, paging }) {
  const [state, setState] = React.useState({
    limit: paging.limit,
    total: paging.total,
    offset: paging.offset,
    hasNextPage: items.length < paging.total,
    isNextPageLoading: false,
    items,
    isFilter: false,
  });

  const loadNextPage = async () => {
    if (state.items.length >= state.total) {
      setState({ ...state, hasNextPage: false, isNextPageLoading: false });
      return;
    }
    try {
      setState({ ...state, isNextPageLoading: true });
      const response = await getMore({ limit: state.limit, offset: state.offset + state.limit });
      setState({
        ...state,
        items: [...state.items, ...response.items],
        offset: response.paging.offset,
        isNextPageLoading: false,
      });
    } catch (err) {
      setState({ ...state, isNextPageLoading: false });
    }
  };

  const applyFilter = async (type) => {
    try {
      setState({ ...state, isFilter: true });
      const response = await filterByType(type);
      setState({ ...state, items: response.items, offset: 0, total: response.paging.total, isNextPageLoading: false });
    } catch (err) {}
  };

  const handleSearch = async (query) => {
    try {
      setState({ ...state, isFilter: true });
      const response = await search(query);
      setState({ ...state, items: response.items, offset: 0, total: response.paging.total, isNextPageLoading: false });
    } catch (err) {}
  };

  const handleOnClear = async () => {
    try {
      setState({ ...state, isFilter: true });
      const response = await getAll();
      setState({ ...state, items: response.items, offset: 0, total: response.paging.total, isNextPageLoading: false });
    } catch (err) {}
  };

  return (
    <section className={styles.discovery}>
      <header className={styles.header}>
        <h1 className={styles.title}>Corals</h1>
        <SearchBox onSubmit={handleSearch} onClear={handleOnClear} />
      </header>
      <section className={styles.items}>
        <InfiniteScroll
          hasNextPage={state.hasNextPage}
          isNextPageLoading={state.isNextPageLoading}
          items={state.items}
          loadNextPage={loadNextPage}
          onClick={applyFilter}
          isFilter={state.isFilter}
        />
      </section>
    </section>
  );
}

export async function getStaticProps() {
  try {
    const response = await getAll();
    return {
      props: response,
    };
  } catch (err) {
    return {
      props: null,
    };
  }
}
