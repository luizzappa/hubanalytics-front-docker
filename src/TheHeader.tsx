// 3rd's
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {LinkContainer} from 'react-router-bootstrap';
import { Dispatch, SetStateAction, MouseEvent, ChangeEvent, KeyboardEvent, useRef } from 'react';

// locals
import './TheHeader.css'

function TheHeader(
  props: {
    setSearchTerms: Dispatch<SetStateAction<string>>
  }
) {
  const expand = 'md',
    searchEl = useRef<HTMLInputElement>(null);

  const searchItem = (e: MouseEvent<HTMLButtonElement>) => {
    props.setSearchTerms(
      searchEl.current ?
        searchEl.current.value
        : ''
    )
  };

  const searchItemEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      props.setSearchTerms(
        searchEl.current ?
          searchEl.current.value
          : ''
      );
    };
  };

  const checkClear = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      props.setSearchTerms('');
    };
  };

  return (
    <Navbar key={expand} bg="header" variant="dark" expand={expand} sticky="top">
      <Container fluid>
        <Navbar.Brand>
          <img src="/imgs/logo.png" className="hub-logo" alt="logo" />
          <span className="ps-1" style={{fontWeight: "bold"}}>HUB Analytics</span>
          <span 
            className="d-none d-lg-inline"
            style={{
              fontSize: "1.2rem", 
              fontWeight: "bold", 
              color: "rgb(237, 179, 0)",
              paddingLeft: "5px"
            }}
          >::</span>
          <span 
            className="d-none d-lg-inline"
            style={{
              fontSize: "1rem",
              fontStyle: "italic",
              paddingLeft: "5px"
            }}
          >Navegue pelos painéis e relatórios corporativos</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="ms-auto">
            <Form className="d-flex me-5 h-75 align-self-center">
              <Form.Control
                type="search"
                className="me-2"
                size="sm"
                aria-label="Buscar"
                onChange={checkClear}
                onKeyDown={searchItemEnter}
                ref={searchEl}
              />
              <Button 
                variant="light" 
                size="sm"
                onClick={searchItem}
              >Buscar</Button>
            </Form>
            <Nav defaultActiveKey="/" className="justify-content-end pe-3">
              <LinkContainer to='/'>
                <Nav.Link>Início</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/cadastro'>
                <Nav.Link>Cadastrar solução</Nav.Link>
              </LinkContainer>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default TheHeader;
