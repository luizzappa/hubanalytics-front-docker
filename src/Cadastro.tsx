// 3rd's
import { FormEventHandler, ChangeEventHandler, useState, useRef, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useLocation } from "react-router-dom";

// locals
import './Cadastro.css'
import endpoints from './env'
import { createFormData } from './utils/createFormData'
import { ICardInfo } from './InfiniteScroller'

export interface ICadastro {
  card?: ICardInfo
}

function Cadastro() {
  const location = useLocation(),
    [editData, setEditData] = useState<ICardInfo>();
  
  const getState = () => {
    return {
      titulo: '',
      url: '',
      visitas: 0, 
      likes: 0,
      tags: '',
      descricao: '',
      isLiked: false,
      isFav: false,
      uploaded_images: []
    }
  };

  const [state, setState] = useState<{
    id?: string,
    titulo: string,
    url: string,
    visitas: number, 
    likes: number,
    tags: string,
    descricao: string,
    isLiked: boolean,
    isFav: boolean,
    uploaded_images: any[]
  }>(getState()),
    [isSaving, setIsSaving] = useState(false),
    [show, setShow] = useState(false),
    [modalTitle, setModalTitle] = useState(''),
    [modalMessage, setModalMessage] = useState(''),
    imgUploadEl = useRef<HTMLInputElement>(null);

  const updateState: ChangeEventHandler = e => {
    const currId = e.currentTarget.getAttribute('id')!;
    console.log('called update', currId)
    setState({
      ...state,
      [currId]: currId === 'uploaded_images'
        ? (e.currentTarget as HTMLInputElement).files
        : (e.currentTarget as HTMLInputElement).value
    })
  }

  const cadastrarOutro = () => {
    imgUploadEl.current && (imgUploadEl.current.value = '');
    setShow(false);
    setEditData(undefined);
    setState(getState());
  }

  const addItem: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setIsSaving(true);
    const url = editData ? `${endpoints.patch_painel}${state.id}` : endpoints.add_painel;
    fetch(url, {
      method: editData ? 'PATCH' : 'POST',
      body: createFormData({
        "titulo": state.titulo,
        "url": state.url,
        "visitas": state.visitas,
        "likes": state.likes,
        "tags": Array.isArray(state.tags) ? state.tags.join(';') : state.tags,
        "descricao": state.descricao,
        "isLiked": state.isLiked,
        "isFav": state.isFav,
        "uploaded_images": state.uploaded_images
      })
    }).then(() => {
      setIsSaving(false);
      setShow(true);
      setModalTitle('Item cadastrado com sucesso!');
      setModalMessage('O que você deseja fazer?');
    }).catch(() => {
      setIsSaving(false);
      setShow(true);
      setModalTitle('Houve um problema no cadastro');
      setModalMessage('O que você deseja fazer?');
    });
  };

  useEffect(() => {
    if (location?.state?.data) {
      setEditData({
        ...location.state.data,
        tags: location.state.data.tags.join(';')
    });
      setState(location.state.data);
    }
  }, [location, setEditData, setState]);
  
  return (
    <>
      <div className='cadastro-wrapper'>
        <Form onSubmit={addItem}>
          <Form.Group className="mb-3" controlId="titulo">
            <Form.Label>Nome do painel/relatório</Form.Label>
            <Form.Control required onChange={updateState} value={state.titulo} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="url">
            <Form.Label>Endereço (URL)</Form.Label>
            <Form.Control required placeholder="HTTPS://..." onChange={updateState} value={state.url} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="descricao">
            <Form.Label>Descrição</Form.Label>
            <Form.Control 
              required 
              as="textarea" 
              rows={3} 
              placeholder="Breve descrição" 
              onChange={updateState}
              value={state.descricao}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="tags">
            <Form.Label>Tags</Form.Label>
            <Form.Control required onChange={updateState} value={state.tags} />
            <Form.Text className="text-muted">
              Utilize ponto e vírgula ( ; ) para adicionar mais de uma tag.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="uploaded_images" className="mb-3">
            <Form.Label>Adicione algumas imagens de seu painel/relatório</Form.Label>
            <Form.Control required type="file" multiple onChange={updateState} ref={imgUploadEl} />
          </Form.Group>
          <Button 
            className="mt-3" 
            variant="primary" 
            type="submit" 
            disabled={isSaving}
          >{isSaving ? 'Salvando..' : 'Salvar!'}
          </Button>
        </Form>
      </div>
      <Modal show={show} backdrop="static">
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cadastrarOutro}>
            Cadastrar outro 
          </Button>
          <Button 
            variant="primary" 
            href="/"
          >Voltar ao início 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Cadastro;