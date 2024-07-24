import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './Partida.css';

const Partida = () => {
    const [teams, setTeams] = useState([]);
    const [homeTeamId, setHomeTeamId] = useState('');
    const [awayTeamId, setAwayTeamId] = useState('');
    const [homeGoals, setHomeGoals] = useState('');
    const [awayGoals, setAwayGoals] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/teams')
            .then(response => setTeams(response.data))
            .catch(error => console.error('Erro ao carregar os times:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const match = {
            homeTeam: { id: homeTeamId },
            awayTeam: { id: awayTeamId },
            homeGoals: parseInt(homeGoals),
            awayGoals: parseInt(awayGoals),
            date
        };
        axios.post('http://localhost:8080/api/matches', match)
            .then(response => {
                alert('Partida adicionada com sucesso');
                setHomeTeamId('');
                setAwayTeamId('');
                setHomeGoals('');
                setAwayGoals('');
                setDate('');
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    };

    return (
        <Card className="partida-card">
            <Card.Header className="partida-header">
                <h5>Atualizar Partida</h5>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row className="align-items-center">
                        <Col xs={2} className="team-logo">
                            {homeTeamId && <img src={`path/to/logo/${homeTeamId}.png`} alt="Home Team" />}
                        </Col>
                        <Col xs={3} className="team-name">
                            <Form.Group controlId="formHomeTeam">
                                <Form.Control as="select" value={homeTeamId} onChange={(e) => setHomeTeamId(e.target.value)}>
                                    <option value="">Selecione o time da casa</option>
                                    {teams.map(team => (
                                        <option key={team.id} value={team.id}>{team.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={1} className="score-input">
                            <Form.Group controlId="formHomeGoals">
                                <Form.Control type="number" value={homeGoals} onChange={(e) => setHomeGoals(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col xs={1} className="vs">X</Col>
                        <Col xs={1} className="score-input">
                            <Form.Group controlId="formAwayGoals">
                                <Form.Control type="number" value={awayGoals} onChange={(e) => setAwayGoals(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col xs={3} className="team-name">
                            <Form.Group controlId="formAwayTeam">
                                <Form.Control as="select" value={awayTeamId} onChange={(e) => setAwayTeamId(e.target.value)}>
                                    <option value="">Selecione o time visitante</option>
                                    {teams.map(team => (
                                        <option key={team.id} value={team.id}>{team.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col xs={2} className="team-logo">
                            {awayTeamId && <img src={`path/to/logo/${awayTeamId}.png`} alt="Away Team" />}
                        </Col>
                    </Row>
                    <Row className="match-details">
                        <Col>
                            <Form.Group controlId="formDate">
                                <Form.Label>Data</Form.Label>
                                <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit" className="mt-4">
                        Adicionar Partida
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default Partida;
