import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaPlus, FaList, FaHomer, FaFutbol, FaUserPlus, FaFacebookF, FaStar, FaTable, FaGamepad } from 'react-icons/fa';

const NavBar = () => {
    return (
        <Navbar bg="light" expand="lg" style={styles.navbar}>
            <Navbar.Brand href="/" style={styles.brand}></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <LinkContainer to="/">
                        <Nav.Link><FaTable style={styles.icon} /> Homer</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/tabela-e-partida">
                        <Nav.Link><FaTable style={styles.icon} /> Gerenciar Jogos</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/cadastrar-time">
                        <Nav.Link><FaPlus style={styles.icon} /> Cadastrar Time</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/gerar-jogos">
                        <Nav.Link><FaGamepad style={styles.icon} /> Gerar Jogos</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/jogos">
                        <Nav.Link><FaGamepad style={styles.icon} /> Ver Jogos</Nav.Link>
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
