import React, { useEffect, useState } from 'react';
import { Container, Table, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const MatchesList = () => {
    const [groupName, setGroupName] = useState('');
    const [matches, setMatches] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (groupName) {
            axios.get(`http://localhost:8080/api/matches/group/${groupName}`)
                .then(response => setMatches(response.data))
                .catch(error => console.error('Erro ao carregar os jogos:', error));
        }
    };

    return (
        <Container className="mt-5">
            <Card className="mb-4">
                <Card.Header>
                    <h2>Pesquisar Jogos por Grupo</h2>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSearch}>
                        <Form.Group controlId="formGroupName">
                            <Form.Label>Nome do Grupo</Form.Label>
                            <Form.Control
                                type="text"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                placeholder="Digite o nome do grupo"
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-2">
                            Pesquisar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            {matches.length > 0 && (
                <Card>
                    <Card.Header>
                        <h2>Jogos do {groupName}</h2>
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover responsive="sm">
                            <thead>
                                <tr>
                                    <th>Time da Casa</th>
                                    <th>Gols da Casa</th>
                                    <th>Gols Visitante</th>
                                    <th>Time Visitante</th>
                                    <th>Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matches.map((match) => (
                                    <tr key={match.id}>
                                        <td>{match.homeTeam.name}</td>
                                        <td>{match.homeGoals}</td>
                                        <td>{match.awayGoals}</td>
                                        <td>{match.awayTeam.name}</td>
                                        <td>{new Date(match.date).toLocaleDateString('pt-BR')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default MatchesList;
