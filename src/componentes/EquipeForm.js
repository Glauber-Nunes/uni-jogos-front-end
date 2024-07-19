import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { criarEquipe } from '../services/api';

const EquipeForm = () => {
    const [nome, setNome] = useState('');
    const [esporte, setEsporte] = useState('FUTSAL');
    const [genero, setGenero] = useState('MASCULINO');

    const handleSubmit = (e) => {
        e.preventDefault();
        criarEquipe({ nome, esporte, genero, jogadores: [] }).then(response => {
            alert('Equipe criada com sucesso');
            setNome('');
            setEsporte('FUTSAL');
            setGenero('MASCULINO');
        }).catch(error => {
            alert(error.response.data.message);
        });
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formEsporte">
                    <Form.Label>Esporte</Form.Label>
                    <Form.Control as="select" value={esporte} onChange={(e) => setEsporte(e.target.value)}>
                        <option value="FUTSAL">Futsal</option>
                        <option value="VOLEI">Volei</option>
                        <option value="NATACAO">Natação</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formGenero">
                    <Form.Label>Gênero</Form.Label>
                    <Form.Control as="select" value={genero} onChange={(e) => setGenero(e.target.value)}>
                        <option value="MASCULINO">Masculino</option>
                        <option value="FEMININO">Feminino</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Criar Equipe
                </Button>
            </Form>
        </Container>
    );
};

export default EquipeForm;
