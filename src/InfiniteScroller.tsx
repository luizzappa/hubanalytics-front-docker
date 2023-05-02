// 3rd's
import React, { useCallback, useState, MouseEvent, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Spinner from 'react-bootstrap/Spinner';

// locals
import "./InfiniteScroller.css";
import TheFilter from './TheFilter';
import Card from './Card';
import endpoints from './env';

export interface ICardInfo {
  id: string,
  titulo: string,
  url: string,
  visitas: number,
  likes: number,
  tags: string[],
  descricao: string,
  isLiked: boolean,
  isFav: boolean,
  images: string[]
}

export interface ICardProps {
  cards: ICardInfo,
  removerItem: (e: MouseEvent<HTMLButtonElement>) => void,
  toggleFav?: (e: MouseEvent<HTMLSpanElement>) => void,
  toggleLike?: (e: MouseEvent<HTMLSpanElement>) => void,
}

export interface IFilters {
  isFav: boolean,
  tags: string[]
}


function InfiniteScroller(props: {
  searchTerms: string
}) {
  const [items, setItems] = useState<ICardInfo[]>([]),
    [fetching, setFetching] = useState(false),
    [hasMore, setHasMore] = useState(true),
    [offset, setOffset] = useState<number>(0),
    [filters, setFilters] = useState<IFilters>({
      isFav: false,
      tags: []
    });

  const toggleFav = (idx: number) =>
    (e: MouseEvent<HTMLSpanElement>) => {
      fetch(`${endpoints.patch_painel}${items[idx].id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          ...items[idx],
          tags: items[idx].tags.join(';'),
          isFav: !items[idx].isFav
        })
      })
      const itemsCopy = items.slice();
      itemsCopy[idx].isFav = !itemsCopy[idx].isFav;
      setItems(itemsCopy);
    };

  const toggleLike = (idx: number) =>
    (e: MouseEvent<HTMLSpanElement>) => {
      const newLikeValue = items[idx].likes + (items[idx].isLiked ? -1 : 1),
        newIsLiked = !items[idx].isLiked;

      fetch(`${endpoints.patch_painel}${items[idx].id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          ...items[idx],
          tags: items[idx].tags.join(';'),
          likes: newLikeValue,
          isLiked: newIsLiked
        })
      })
      const itemsCopy = items.slice();
      itemsCopy[idx].likes = newLikeValue;
      itemsCopy[idx].isLiked = newIsLiked;
      setItems(itemsCopy);
    };

  const resetScroller = () => {
    setItems([]);
    setOffset(0);
    setHasMore(true);
  };

  const removerItem = (idx: number) => (e: MouseEvent<HTMLButtonElement>) => {
    fetch(`${endpoints.delete_painel}${items[idx].id}`,{
      method: 'DELETE'
    });
    setItems(items.filter(item => item.id !== items[idx].id));
  };

  const fetchItems = useCallback(async () => {
    if (fetching) return;

    setFetching(true);

    try {
      const favQueryString = filters.isFav ? '&isFav=true' : '',
        tagsQueryString = filters.tags.length !== 0 ? `&tags=${filters.tags.join(';')}` : '',
        searchQueryString = props.searchTerms ? `&search=${props.searchTerms}` : '',
        response = await fetch(`${endpoints.get_paineis}?offset=${offset}${favQueryString}${tagsQueryString}${searchQueryString}`),
        responseItems = await response.json();
      if (responseItems.length === 0) {
        setHasMore(false)
      } else {
        setItems([
          ...items,
          ...responseItems.map((item: any) => {
            item.tags = [...new Set(item.tags.split(';'))]
            return item
          })
        ]);
        setOffset(responseItems[responseItems.length - 1].id + 1);
      }
    } finally {
      setFetching(false);
    }
  }, [items, fetching, filters, offset, props.searchTerms]);

  const loader = (
    <div key="loader" className="loader pt-4">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Carregando...</span>
      </Spinner>
    </div>
  );

  useEffect(() => {
    resetScroller()
  }, [props.searchTerms]);

  return (
    <>
      <TheFilter 
        resetScroller={resetScroller}
        setFilters={setFilters} 
        filters={filters} 
      />
      <InfiniteScroll
        loadMore={fetchItems}
        hasMore={hasMore}
        loader={loader}
      >
        <div className="infinitescroller-wrapper">
          <div className="cards-wrapper">
            {items.map((item, idx) => (
              <Card 
                key={item.id} 
                cards={item} 
                toggleFav={toggleFav(idx)} 
                toggleLike={toggleLike(idx)} 
                removerItem={removerItem(idx)}
              />
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}

export default InfiniteScroller;