import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import MatchesList from './MatchesList';

const GerarJogos = () => {
    const [groupName, setGroupName] = useState('');
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const [matches, setMatches] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/api/matches/generate`, {
            groupName,
            startDateTime,
            endDateTime
        })
            .then(response => {
                setMatches(response.data);
                alert('Jogos gerados com sucesso');
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    };

    return (
        <Container>
            <h2>Gerar Jogos</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formGroupName">
                    <Form.Label>Nome do Grupo</Form.Label>
                    <Form.Control
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formStartDateTime">
                    <Form.Label>Data e Hora de Início</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        value={startDateTime}
                        onChange={(e) => setStartDateTime(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formEndDateTime">
                    <Form.Label>Data e Hora de Fim</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        value={endDateTime}
                        onChange={(e) => setEndDateTime(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Gerar Jogos
                </Button>
            </Form>
            {matches.length > 0 && <MatchesList matches={matches} groupName={groupName} />}
        </Container>
    );
};

export default GerarJogos;
