import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import logo from '../assets/logo.png'; // Import the image

const TopBar = () => {
    return (
        <Navbar bg="dark" variant="dark" style={styles.navbar}>
            <Container style={styles.container}>
                
                <Navbar.Brand href="/" style={styles.brand}>
                    UniJogos 2025 Gestão
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

const styles = {
    navbar: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    logo: {
        height: '30px', // Adjust the height as needed
        marginRight: '10px',
    },
    brand: {
        fontWeight: 'bold',
        fontSize: '24px',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        
    },
};

export default TopBar;
