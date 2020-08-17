import React from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import CoralItem from '../CoralItem';
import Spinner from '../Spinner';
import Shorcuts from '../Shorcuts';

const appendComponentToList = (onClick, filterApplied) => {
  return React.memo(
    React.forwardRef(({ style, children, ...othersProps }, ref) => {
      return (
        <ol ref={ref} style={style} {...othersProps}>
          <Shorcuts onClick={onClick} filterApplied={filterApplied} />
          {children}
        </ol>
      );
    }),
  );
};

export default function InfiniteScroll({
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
  onClick,
  isFilter,
  t,
  onAddFavorite,
  filterApplied,
  width,
}) {
  const itemCount = hasNextPage ? items.length + 1 : items.length;
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
  const isItemLoaded = (index) => !hasNextPage || index < items.length;
  const innerElementType = appendComponentToList(onClick, filterApplied);
  const sizeItem = width > 681 ? 180 : 160;
  const paddingTop = 100;

  const Row = ({ index, style }) => {
    let item = items[index];
    if (!isItemLoaded(index)) {
      return <Spinner style={{ ...style, textAlign: 'center' }} />;
    }
    return (
      <CoralItem
        item={item}
        isFilter={isFilter}
        style={{ ...style, top: style.top + paddingTop, height: style.height - 10 }}
        t={t}
        onAddFavorite={onAddFavorite}
      />
    );
  };

  return (
    <>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadMoreItems}>
            {({ onItemsRendered, ref }) => (
              <List
                itemCount={itemCount}
                itemSize={sizeItem}
                onItemsRendered={onItemsRendered}
                ref={ref}
                height={height}
                width={width}
                innerElementType={innerElementType}
              >
                {Row}
              </List>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </>
  );
}
