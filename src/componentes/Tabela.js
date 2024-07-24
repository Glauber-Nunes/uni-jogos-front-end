import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import './Tabela.css';

const Tabela = () => {
    const [groupName, setGroupName] = useState('');
    const [teams, setTeams] = useState([]);
    const [matches, setMatches] = useState([]);
    const [updatedMatches, setUpdatedMatches] = useState(new Set());

    useEffect(() => {
        if (groupName) {
            fetchTeamsAndMatches(groupName);
        }
    }, [groupName]);

    const fetchTeamsAndMatches = (groupName) => {
        axios.get(`http://localhost:8080/api/teams/group/${groupName}`)
            .then(response => setTeams(response.data))
            .catch(error => console.error('Erro ao carregar a tabela:', error));

        axios.get(`http://localhost:8080/api/matches/group/${groupName}`)
            .then(response => setMatches(response.data))
            .catch(error => console.error('Erro ao carregar os jogos:', error));
    };

    const handleGroupChange = (e) => {
        setGroupName(e.target.value);
    };

    const handleScoreChange = (matchId, field, value) => {
        setMatches(matches.map(match =>
            match.id === matchId ? { ...match, [field]: value } : match
        ));
    };

    const handleUpdateMatch = (match) => {
        axios.put(`http://localhost:8080/api/matches/${match.id}`, match)
            .then(response => {
                alert('Resultado atualizado com sucesso');
                setUpdatedMatches(new Set(updatedMatches).add(match.id));
                fetchTeamsAndMatches(groupName); // Atualiza a tabela após a atualização do resultado
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    };

    return (
        <Container className="tabela-container mt-5">
            <Form>
                <Form.Group controlId="formGroupName">
                    <Form.Label>Pesquisar Grupo</Form.Label>
                    <Form.Control type="text" value={groupName} onChange={handleGroupChange} placeholder="Digite o nome do grupo" />
                </Form.Group>
            </Form>

            <Card className="tabela-card mb-4">
                <Card.Header className="tabela-header">
                    <h2>Tabela de Classificação</h2>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover responsive="sm" className="tabela-classificacao">
                        <thead>
                            <tr>
                                <th>Posição</th>
                                <th>Nome</th>
                                <th>P</th>
                                <th>V</th>
                                <th>E</th>
                                <th>D</th>
                                <th>GP</th>
                                <th>GC</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.sort((a, b) => b.points - a.points).map((team, index) => (
                                <tr key={team.id} className={getRowClass(index)}>
                                    <td>{index + 1}</td>
                                    <td>{team.name}</td>
                                    <td>{team.points}</td>
                                    <td>{team.wins}</td>
                                    <td>{team.draws}</td>
                                    <td>{team.losses}</td>
                                    <td>{team.goalsFor}</td>
                                    <td>{team.goalsAgainst}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Card className="tabela-card mb-4">
                <Card.Header className="tabela-header">
                    <h2>Jogos do Grupo {groupName}</h2>
                </Card.Header>
                <Card.Body>
                    {matches.length > 0 && (
                        <>
                            {matches.map((match, index) => (
                                <div key={match.id} className="match-row mb-3">
                                    <h5>Partida {index + 1}</h5>
                                    <Row className="align-items-center">
                                        <Col xs={4} className="team-name">
                                            {match.homeTeam.name}
                                        </Col>
                                        <Col xs={1} className="score-input">
                                            <Form.Control
                                                type="number"
                                                value={match.homeGoals}
                                                onChange={(e) => handleScoreChange(match.id, 'homeGoals', e.target.value)}
                                                disabled={updatedMatches.has(match.id)}
                                            />
                                        </Col>
                                        <Col xs={1} className="vs">X</Col>
                                        <Col xs={1} className="score-input">
                                            <Form.Control
                                                type="number"
                                                value={match.awayGoals}
                                                onChange={(e) => handleScoreChange(match.id, 'awayGoals', e.target.value)}
                                                disabled={updatedMatches.has(match.id)}
                                            />
                                        </Col>
                                        <Col xs={4} className="team-name">
                                            {match.awayTeam.name}
                                        </Col>
                                    </Row>
                                    <Row className="match-details">
                                        <Col>
                                            {new Date(match.date).toLocaleString('pt-BR')} | Local do Jogo
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-center mt-2">
                                        <Button
                                            variant="primary"
                                            onClick={() => handleUpdateMatch(match)}
                                            disabled={updatedMatches.has(match.id)}
                                        >
                                            Atualizar
                                        </Button>
                                    </Row>
                                </div>
                            ))}
                        </>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

const getRowClass = (index) => {
    switch (index) {
        case 0:
        case 1:
            return 'table-success';
        case 2:
            return 'table-warning';
        case 3:
            return 'table-danger';
        default:
            return '';
    }
};

export default Tabela;
