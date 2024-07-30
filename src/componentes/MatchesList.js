import React, { useEffect, useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './MatchesList.css';

const MatchesList = () => {
    const [groupName, setGroupName] = useState('');
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        handleAll();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (groupName) {
            axios.get(`http://localhost:8080/api/matches/group/${groupName}`)
                .then(response => setMatches(response.data))
                .catch(error => console.error('Erro ao carregar os jogos:', error));
        }
    };

    const handleAll = () => {
        axios.get(`http://localhost:8080/api/matches/find-all`)
            .then(response => setMatches(response.data))
            .catch(error => console.error('Erro ao carregar os jogos:', error));
    };

    const formatScore = (score) => {
        return score === -1 ? '--' : score;
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
                <Card className="matches-card">
                    <Card.Header>
                        <h2>Jogos Fase De Grupos</h2>
                    </Card.Header>
                    <Card.Body>
                        {matches.map((match, index) => (
                            <div key={match.id} className="match-row mb-3">
                                <Row className="align-items-center">
                                    <Col xs={4} className="team-name">
                                        {match.homeTeam.name}
                                    </Col>
                                    <Col xs={1} className="score">
                                        {formatScore(match.homeGoals)}
                                    </Col>
                                    <Col xs={1} className="vs">X</Col>
                                    <Col xs={1} className="score">
                                        {formatScore(match.awayGoals)}
                                    </Col>
                                    <Col xs={4} className="team-name">
                                        {match.awayTeam.name}
                                    </Col>
                                </Row>
                                <Row className="match-details">
                                    <Col>
                                        {new Date(match.dateTime).toLocaleString('pt-BR')} | SESC
                                    </Col>
                                </Row>

                                <Row className="match-details">
                                    <Col >
                                    <strong>{match.status}</strong>
                                       
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default MatchesList;
