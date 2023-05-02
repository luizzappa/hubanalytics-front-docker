// 3rd's
import { useRef, useEffect, useState, MouseEvent } from "react";
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import {LinkContainer} from 'react-router-bootstrap';

// locals
import "./Card.css";
import { ICardProps } from "./InfiniteScroller"
import endpoints from "./env";

function Card(props: ICardProps) {
  const cardEl = useRef<HTMLDivElement>(null),
    [showDetail, setShowDetail] = useState<boolean>(false),
    [showRemover, setShowRemover] = useState<boolean>(false);

  const createTagEl = (tag: string, cardId: string) =>
    <span className="tag" key={`${tag}-${cardId}`}>{tag}</span>;

  const openCardDetail = (e: MouseEvent<HTMLSpanElement>) => {
    const targetEl = e.target as HTMLElement;
    if (
      targetEl.closest('.fav-icon')
      || targetEl.closest('.likes')
    ) 
      return;
    setShowDetail(true);
  };

  useEffect(() => {
    cardEl.current?.addEventListener("mouseenter", e => {
      cardEl.current?.classList.add("has-hover");
    });
    cardEl.current?.addEventListener("mouseleave", e => {
      cardEl.current?.classList.remove("has-hover");
    });
  });

  return (
    <>
      <div className="post-module" ref={cardEl} onClick={openCardDetail}>
        <div className="thumbnail">
          <div className="fav-icon" title="Adicionar aos favoritos" onClick={props.toggleFav}>
            <span className={props.cards.isFav ? 'material-icons' : 'material-icons-outlined'}>
              {props.cards.isFav ? 'star' : 'star_outline'}
            </span>
          </div>
          <img className="img-card" src={`${endpoints.baseUrl}/imgs/${props.cards.images[0]}`} alt="Imagem do relatório" />
        </div>
        <div className="post-content">
          <h1 className="title" title={props.cards.titulo}>{props.cards.titulo}</h1>
          <div className="tags" title={props.cards.tags.join(" | ")}>
            {props.cards.tags.map(tag => createTagEl(tag, props.cards.id))}
          </div>
          <p className="description">
            {
              props.cards.descricao.length > 200
                ? `${props.cards.descricao.substring(0,199)} ... (ver mais)`
                : props.cards.descricao
            }
          </p>
          <div className="post-meta">
            <span className="visits" title="Visitas">
              <span className="material-icons">visibility</span>
              {props.cards.visitas.toLocaleString('pt-BR')} 
            </span>
            <span className="likes" title="Curtir" onClick={props.toggleLike}>
              <span className={props.cards.isLiked ? 'material-icons' : 'material-icons-outlined'}>
                thumb_up
              </span>
              {props.cards.likes.toLocaleString('pt-BR')} {props.cards.likes === 1 ? 'curtida' : 'curtidas'}
            </span>
          </div>
        </div>
      </div>
      <Modal
        show={showDetail}
        onHide={() => setShowDetail(false)}
        dialogClassName="modal-detail"
        aria-labelledby="detalhes-painel"
      >
        <Modal.Header closeButton>
          <Modal.Title id="detalhes-painel">
            {props.cards.titulo}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-description">
            <div className="carousel-wrapper">
              <Carousel>
                {props.cards.images.map((img, idx) => (
                  <Carousel.Item key={idx} >
                    <img
                      className="d-block carousel-img"
                      src={`${endpoints.baseUrl}/imgs/${img}`}
                      alt="Imagem painel"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
            <div className="modal-description-side">
              <div className="d-flex justify-content-end align-items-center">
                <LinkContainer to='/cadastro' state={{data: props.cards}}>
                  <span 
                    id="icon-editar"
                    className="material-icons-outlined pe-3"
                    title="Editar"
                  >
                    edit
                  </span>
              </LinkContainer>
                <span 
                  id="icon-deletar"
                  className="material-icons-outlined pe-3" 
                  title="Deletar"
                  onClick={() => { setShowRemover(true); setShowDetail(false) }}
                >
                  delete_outline
                </span>
                <Button 
                  href={props.cards.url}
                  title="Visitar"
                  target="_blank"
                  variant="success" 
                >Visitar</Button>
              </div>
              <div className="modal-painel-tags">
                <label>Tags</label>
                <div className="tags">
                  {props.cards.tags.map(tag => createTagEl(tag, props.cards.id))}
                </div>
              </div>
              <div className="modal-painel-descricao">
                <label>Descrição</label>
                <span>{props.cards.descricao}</span>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={showRemover}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Remover item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Você realmente deseja remover esse item?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowRemover(false); setShowDetail(true) }}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={props.removerItem}>Remover!</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Card;