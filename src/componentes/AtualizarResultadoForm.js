import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { atualizarResultado } from '../services/api';

const AtualizarResultadoForm = ({ partidaId }) => {
    const [golsEquipe1, setGolsEquipe1] = useState('');
    const [golsEquipe2, setGolsEquipe2] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        atualizarResultado(partidaId, golsEquipe1, golsEquipe2).then(() => {
            alert('Resultado atualizado com sucesso');
            setGolsEquipe1('');
            setGolsEquipe2('');
        }).catch(error => {
            alert('Erro ao atualizar resultado: ' + error.response.data.message);
        });
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formGolsEquipe1">
                    <Form.Label>Gols Equipe 1</Form.Label>
                    <Form.Control type="number" value={golsEquipe1} onChange={(e) => setGolsEquipe1(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formGolsEquipe2">
                    <Form.Label>Gols Equipe 2</Form.Label>
                    <Form.Control type="number" value={golsEquipe2} onChange={(e) => setGolsEquipe2(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Atualizar Resultado
                </Button>
            </Form>
        </Container>
    );
};

export default AtualizarResultadoForm;
