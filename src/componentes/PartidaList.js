import React, { useState, useEffect } from 'react';
import { listarPartidas } from '../services/api';
import { Container, ListGroup, Card } from 'react-bootstrap';
import './PartidaList.css';
const PartidaList = () => {
    const [partidas, setPartidas] = useState([]);

    useEffect(() => {
        listarPartidas().then(response => {
            setPartidas(response.data);
        }).catch(error => {
            console.error('Erro ao carregar partidas:', error);
            setPartidas([]);
        });
    }, []);

    return (
        <Container className="mt-5">
            <h2 className="mb-4 text-center">Jogos</h2>
            <ListGroup>
                {partidas.map(partida => (
                    <ListGroup.Item key={partida.id} className="mb-3 p-0 border-0">
                        <Card>
                            <Card.Header className="text-white bg-primary">
                               Dia: {new Date(partida.dataHora).toLocaleString()} -{partida.status}
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>{partida.localizacao}</Card.Title>
                                <Card.Text>
                                    <strong>{partida.equipe1Nome}</strong> vs <strong>{partida.equipe2Nome}</strong>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default PartidaList;
