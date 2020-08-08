import React from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import CoralItem from '../CoralItem';
import Spinner from '../Spinner';
import Shorcuts from '../Shorcuts';

const SIZE_ITEM = 180;
const PADDING_TOP = 100;

const appendComponentToList = (onClick) => {
  return React.memo(
    React.forwardRef(({ style, children, ...othersProps }, ref) => {
      return (
        <section ref={ref} style={style} {...othersProps}>
          <Shorcuts onClick={onClick} />
          {children}
        </section>
      );
    }),
  );
};

export default function InfiniteScroll({ hasNextPage, isNextPageLoading, items, loadNextPage, onClick, isFilter, t }) {
  const itemCount = hasNextPage ? items.length + 1 : items.length;
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
  const isItemLoaded = (index) => !hasNextPage || index < items.length;
  const innerElementType = appendComponentToList(onClick);
  const Row = ({ index, style }) => {
    let item = items[index];
    if (!isItemLoaded(index)) {
      return <Spinner style={{ ...style, textAlign: 'center' }} />;
    }
    return <CoralItem item={item} isFilter={isFilter} style={{ ...style, top: style.top + PADDING_TOP }} t={t} />;
  };

  return (
    <>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadMoreItems}>
            {({ onItemsRendered, ref }) => (
              <List
                itemCount={itemCount}
                itemSize={SIZE_ITEM}
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
