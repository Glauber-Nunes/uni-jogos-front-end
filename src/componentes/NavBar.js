import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaPlus, FaTable, FaGamepad } from 'react-icons/fa';

const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" style={styles.navbar}>
           
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <LinkContainer to="/">
                        <Nav.Link style={styles.navLink}>
                            <FaTable style={styles.icon} /> Inicio
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/tabela-e-partida">
                        <Nav.Link style={styles.navLink}>
                            <FaTable style={styles.icon} /> Gerenciar Jogos
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/cadastrar-time">
                        <Nav.Link style={styles.navLink}>
                            <FaPlus style={styles.icon} /> Cadastrar Time
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/gerar-jogos">
                        <Nav.Link style={styles.navLink}>
                            <FaGamepad style={styles.icon} /> Gerar Jogos
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/jogos">
                        <Nav.Link style={styles.navLink}>
                            <FaGamepad style={styles.icon} /> Ver Jogos
                        </Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/noticia">
                        <Nav.Link style={styles.navLink}>
                            <FaGamepad style={styles.icon} /> Noticia
                        </Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

const styles = {
    navbar: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '10px 20px',
        background: 'linear-gradient(90deg, #28a745 0%, #218838 100%)', // Gradient in green tones
    },
    brand: {
        fontWeight: 'bold',
        fontSize: '26px',
        color: '#ffffff',
        letterSpacing: '1.5px',
        transition: 'color 0.3s ease',
    },
    navLink: {
        fontSize: '18px',
        fontWeight: '500',
        color: '#ffffff',
        padding: '10px 20px',
        margin: '0 10px',
        transition: 'color 0.3s ease, transform 0.3s ease',
    },
    icon: {
        marginRight: '8px',
        fontSize: '20px',
        transition: 'transform 0.3s ease',
    },
    navLinkHover: {
        color: '#c3e6cb',
        transform: 'scale(1.05)',
    }
};

export default NavBar;
