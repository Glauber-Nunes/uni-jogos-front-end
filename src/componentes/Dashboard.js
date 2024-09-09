import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import './Dashboard.css';
const Dashboard = () => {
    const [noticias, setNoticias] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedNoticia, setSelectedNoticia] = useState(null);

    useEffect(() => {
        // Buscar as notícias da API
        axios.get('http://localhost:8080/api/noticias')
            .then(response => {
                setNoticias(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar notícias:', error);
            });
    }, []);

    // Função para exibir a prévia do conteúdo (limita a 100 caracteres)
    const getPreview = (conteudo) => {
        if (conteudo.length > 100) {
            return conteudo.substring(0, 100) + '...';
        }
        return conteudo;
    };

    // Função para abrir o modal
    const handleShowModal = (noticia) => {
        setSelectedNoticia(noticia);
        setShowModal(true);
    };

    // Função para fechar o modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedNoticia(null);
    };

    return (
        <Container>
            <h2 className="mt-4 text-center" style={styles.title}>Últimas Notícias</h2>
            <Row className="news-row">
                {noticias.length > 0 && noticias.map((noticia, index) => (
                    <Col key={index} md={4}>
                        <Card
                            style={styles.card}
                            onClick={() => handleShowModal(noticia)} // Abre o modal ao clicar
                            className="hover-card" // Classe CSS para efeito de hover
                        >
                            <Card.Img variant="top" src={noticia.imagemUrl} alt={noticia.titulo} />
                            <Card.Body>
                                <Card.Title style={styles.cardTitle}>{noticia.titulo}</Card.Title>
                                <Card.Text>
                                    {getPreview(noticia.conteudo)}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Modal para exibir notícia completa */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedNoticia?.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img
                        src={selectedNoticia?.imagemUrl}
                        alt={selectedNoticia?.titulo}
                        style={styles.modalImage}
                        className="img-fluid"
                    />
                    <p>{selectedNoticia?.conteudo}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

const styles = {
    title: {
        color: '#28a745',
        fontWeight: 'bold',
        fontSize: '28px',
        marginBottom: '20px',
    },
    card: {
        border: 'none',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        marginBottom: '20px',
        cursor: 'pointer',
    },
    cardTitle: {
        color: 'white',
        backgroundColor: '#28a745',
        padding: '10px',
        borderRadius: '5px',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Efeito de borda
    },
    modalImage: {
        width: '100%',
        marginBottom: '20px',
    },
};

export default Dashboard;
