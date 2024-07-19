import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaPlus, FaList, FaHomer, FaFutbol, FaUserPlus, FaFacebookF, FaStar } from 'react-icons/fa';

const NavBar = () => {
    return (
        <Navbar bg="light" expand="lg" style={styles.navbar}>
            <Navbar.Brand href="/" style={styles.brand}></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                   <LinkContainer to="/">
                        <Nav.Link><FaStar style={styles.icon} /> Inicio</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/equipes/novo">
                        <Nav.Link><FaPlus style={styles.icon} /> Nova Equipe</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/equipes">
                        <Nav.Link><FaList style={styles.icon} /> Listar Equipes</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/partidas/novo">
                        <Nav.Link><FaFutbol style={styles.icon} /> Nova Partida</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/partidas">
                        <Nav.Link><FaList style={styles.icon} /> Listar Partidas</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/torneios">
                        <Nav.Link><FaList style={styles.icon} /> Torneios</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/resultados">
                        <Nav.Link><FaList style={styles.icon} /> Atualizar Resultados</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/adcionarEquipeGrupo">
                        <Nav.Link><FaList style={styles.icon} /> Preencher Grupos</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/grupos">
                        <Nav.Link><FaList style={styles.icon} /> Detalhes Grupos</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

const styles = {
    navbar: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    brand: {
        fontWeight: 'bold',
        fontSize: '24px',
    },
    icon: {
        marginRight: '8px',
    },
};

export default NavBar;
