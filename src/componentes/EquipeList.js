import React, { useState, useEffect } from 'react';
import { listarEquipes, listarEquipesCriteria } from '../services/api';
import JogadorForm from './JogadorForm';
import { Container, ListGroup, Form } from 'react-bootstrap';

const EquipeList = () => {
    const [esporte, setEsporte] = useState('FUTSAL');
    const [genero, setGenero] = useState('MASCULINO');
    const [equipes, setEquipes] = useState([]);

    useEffect(() => {
        listarEquipesCriteria(esporte, genero).then(response => {
            if (Array.isArray(response.data)) {
                setEquipes(response.data);
            } else {
                setEquipes([]);
            }
        }).catch(error => {
            console.error('Erro ao carregar equipes:', error);
            setEquipes([]);
        });
    }, [esporte, genero]);

    return (
        <Container>
            <Form inline className="mb-3">
                <Form.Group controlId="formEsporte" className="mr-2">
                    <Form.Label>Esporte:</Form.Label>
                    <Form.Control as="select" value={esporte} onChange={(e) => setEsporte(e.target.value)} className="ml-2">
                        <option value="FUTSAL">Futsal</option>
                        <option value="VOLEI">Volei</option>
                        <option value="NATACAO">Natação</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formGenero" className="mr-2">
                    <Form.Label>Gênero:</Form.Label>
                    <Form.Control as="select" value={genero} onChange={(e) => setGenero(e.target.value)} className="ml-2">
                        <option value="MASCULINO">Masculino</option>
                        <option value="FEMININO">Feminino</option>
                    </Form.Control>
                </Form.Group>
            </Form>
            <ListGroup>
                {equipes.map(equipe => (
                    <ListGroup.Item key={equipe.id}>
                        {equipe.nome} - {equipe.esporte} - {equipe.genero}
                        <JogadorForm equipeId={equipe.id} />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default EquipeList;
