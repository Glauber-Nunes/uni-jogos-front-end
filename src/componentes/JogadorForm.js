import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { adicionarJogador } from '../services/api';

const JogadorForm = ({ equipeId }) => {
    const [nome, setNome] = useState('');
    const [posicao, setPosicao] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        adicionarJogador(equipeId, { nome, posicao }).then(response => {
            alert('Jogador adicionado com sucesso');
            setNome('');
            setPosicao('');
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
                <Form.Group controlId="formPosicao">
                    <Form.Label>Posição</Form.Label>
                    <Form.Control type="text" value={posicao} onChange={(e) => setPosicao(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Adicionar Jogador
                </Button>
            </Form>
        </Container>
    );
};

export default JogadorForm;
