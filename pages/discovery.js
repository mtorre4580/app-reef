import styles from '../styles/discovery.module.scss';
import { useState, createRef } from 'react';
import { getAll, getMore, filterByType, search } from '../services/items';
import { addFavorite } from '../services/favorites';
import { withTranslation } from '../i18n';
import InfiniteScroll from '../components/InfiniteScroll';
import SearchBox from '../components/SearchBox';
import Header from '../components/Header';
import Snackbar from '../components/Snackbar';
import { useWindowSize } from '../hooks/useWindowSize';

function Discovery({ items, paging, t }) {
  const { width } = useWindowSize();
  const ref = createRef();
  const [showError, setShowError] = useState('');
  const [state, setState] = useState({
    limit: paging.limit,
    total: paging.total,
    offset: paging.offset,
    hasNextPage: items.length < paging.total,
    isNextPageLoading: false,
    items,
    isFilter: false,
    filterApplied: null,
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
      setState({
        ...state,
        items: response.items,
        offset: 0,
        total: response.paging.total,
        isNextPageLoading: false,
        filterApplied: type,
      });
    } catch (err) {
      setShowError(t('error_filter'));
    }
  };

  const handleSearch = async (query) => {
    try {
      setState({ ...state, isFilter: true });
      const response = await search(query);
      setState({ ...state, items: response.items, offset: 0, total: response.paging.total, isNextPageLoading: false });
    } catch (err) {
      setShowError(t('error_searching'));
    }
  };

  const handleOnClear = async () => {
    try {
      setState({ ...state, isFilter: true });
      const response = await getAll();
      setState({ ...state, items: response.items, offset: 0, total: response.paging.total, isNextPageLoading: false });
    } catch (err) {
      setShowError(t('error_clear'));
    }
  };

  const handleFavorite = async (id) => {
    try {
      await addFavorite(id);
    } catch (err) {}
  };

  return (
    <section className={styles.discovery} ref={ref}>
      <Header title={t('corals')} refSection={ref} fixed={false}>
        <SearchBox onSubmit={handleSearch} onClear={handleOnClear} t={t} />
      </Header>
      {showError && <Snackbar onClose={() => setShowError('')}>{showError}</Snackbar>}
      <section className={styles.items}>
        <InfiniteScroll
          hasNextPage={state.hasNextPage}
          isNextPageLoading={state.isNextPageLoading}
          items={state.items}
          loadNextPage={loadNextPage}
          onClick={applyFilter}
          onAddFavorite={handleFavorite}
          isFilter={state.isFilter}
          filterApplied={state.filterApplied}
          t={t}
          width={width}
        />
      </section>
    </section>
  );
}

Discovery.getInitialProps = async (ctx) => {
  try {
    const response = await getAll();
    return {
      ...response,
      namespacesRequired: ['discovery'],
    };
  } catch (err) {
    return {
      props: null,
    };
  }
};

export default withTranslation('discovery')(Discovery);
