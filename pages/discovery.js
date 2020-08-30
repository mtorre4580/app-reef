import styles from '../styles/discovery.module.scss';
import { useState, createRef } from 'react';
import { getAll, getMore, filterByType, search } from '../services/items';
import { addFavorite } from '../services/favorites';
import { useWindowSize } from '../hooks/useWindowSize';
import { withTranslation } from '../i18n';
import InfiniteScroll from '../components/InfiniteScroll';
import SearchBox from '../components/SearchBox';
import Header from '../components/Header';
import Snackbar from '../components/Snackbar';

/**
 * View: Discovery
 * @param {object} params
 */
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

  /**
   * Event to handle if exists items to fetch again (InfiniteScroll)
   * @returns {Promise<void>}
   */
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

  /**
   * Event to handle when the user click in any filter from navigation shorcut
   * @param {string} type
   * @returns {Promise<void>}
   */
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

  /**
   * Event to handle when user is click searching box
   * @param {string} query
   * @returns {Promise<void>}
   */
  const handleSearch = async (query) => {
    try {
      setState({ ...state, isFilter: true });
      const response = await search(query);
      setState({ ...state, items: response.items, offset: 0, total: response.paging.total, isNextPageLoading: false });
    } catch (err) {
      setShowError(t('error_searching'));
    }
  };

  /**
   * Event to handle when user clear the current search, fetch all items again
   * @returns {Promise<void>}
   */
  const handleOnClear = async () => {
    try {
      setState({ ...state, isFilter: true });
      const response = await getAll();
      setState({ ...state, items: response.items, offset: 0, total: response.paging.total, isNextPageLoading: false });
    } catch (err) {
      setShowError(t('error_clear'));
    }
  };

  /**
   * Event to add the item to favorite for user
   * @param {string} id
   * @returns {Promise<void>}
   */
  const handleFavorite = async (id) => {
    try {
      await addFavorite(id);
    } catch (err) {
      setShowError(t('error_favorite'));
    }
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

export async function getServerSideProps(ctx) {
  const cookies = ctx.req.headers.cookie;
  const response = await getAll(cookies);
  return {
    props: {
      ...response,
      namespacesRequired: ['discovery'],
    },
  };
}

export default withTranslation('discovery')(Discovery);
