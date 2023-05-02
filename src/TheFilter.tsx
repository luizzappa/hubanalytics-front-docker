// 3rd's
import {useState, ChangeEvent, useEffect, Dispatch, SetStateAction} from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
// @ts-ignore
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

// locals
import './TheFilter.css';
import { IFilters } from "./InfiniteScroller"
import endpoints from './env';

export interface IFilterOptions {
  resetScroller: () => void,
  filters: IFilters,
  setFilters: Dispatch<SetStateAction<IFilters>>
}

function TheFilter(props: IFilterOptions) {
  const [show, setShow] = useState<boolean>(false),
    [tagsOption, setTagsOption] = useState<string[]>(),
    openOffCanvas = () => setShow(true),
    closeOffCanvas = () => setShow(false);

  const updateTag = (selected: string[]) => {
      props.setFilters({
        ...props.filters,
        tags: selected
      });
      props.resetScroller();
    },
    updateFav = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = (e.target as HTMLInputElement).checked;
      props.setFilters({
        ...props.filters,
        isFav: newValue
      });
      props.resetScroller();
    };

  const fetchTagsOption = () => {
    fetch(endpoints.get_unique_tags)
      .then(r => r.json())
      .then(data => setTagsOption(data.split(';')))
  };

  useEffect(() => {
    fetchTagsOption()
  }, []);

  return (
    <>
      <a 
        onClick={openOffCanvas}
        href="#FilterMenu" 
        aria-label="Abrir filtro" 
        className="fab-filter"
      >
          <img src="./imgs/filter.png" width="32" height="32" alt='Filter'/>
      </a>
      <Offcanvas show={show} onHide={closeOffCanvas} scroll={true}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filtros</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='filter-menu-tags'>
            <DropdownMultiselect
              placeholder="Seleciona uma(s) tag(s).."
              placeholderMultipleChecked="Multiplas seleções"
              selectDeselectLabel="Selecionar/Deselecionar tudo"
              handleOnChange={updateTag}
              options={tagsOption}
              selected={props.filters.tags}
              name="tags"
            />
          </div>
          <div className="filter-menu-switches">
            <Form>
              <Form.Check
                type="switch"
                id="favoritos"
                label="Apenas favoritos"
                checked={props.filters.isFav}
                onChange={updateFav}
              />
            </Form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
};

export default TheFilter;