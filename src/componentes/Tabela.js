import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import './Tabela.css';

const Tabela = () => {
    const [groupName, setGroupName] = useState('');
    const [teams, setTeams] = useState([]);
    const [matches, setMatches] = useState([]);

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
                fetchTeamsAndMatches(groupName); // Atualiza a tabela após a atualização do resultado
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    };

    const formatScore = (score) => {
        return score === -1 ? '' : score;
    };

    return (
        <Container className="tabela-container mt-5">
            <Form className="search-form">
                <Form.Group controlId="formGroupName">
                    <Form.Label>Pesquisar Grupo</Form.Label>
                    <Form.Control type="text" value={groupName} onChange={handleGroupChange} placeholder="Digite o nome do grupo" />
                </Form.Group>
            </Form>

            <Card className="tabela-card mb-4">
                <Card.Header className="tabela-header">
                    <h5>Classificação</h5>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover responsive="sm" className="tabela-classificacao">
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Pts</th>
                                <th>VIT</th>
                                <th>E</th>
                                <th>DER</th>
                                <th>GP</th>
                                <th>GC</th>
                                <th>PJ</th> {/* Nova coluna */}
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
                                    <td>{team.gamesPlayed}</td> 
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Card className="tabela-card mb-4">
                <Card.Body>
                    {matches.length > 0 && (
                        <>
                            {matches.map((match, index) => (
                                <div key={match.id} className="match-row mb-3">
                                    <h5 className="match-title">Partida {index + 1}</h5>
                                    <Row className="align-items-center">
                                        <Col xs={4} className="team-name">
                                            {match.homeTeam.name}
                                        </Col>
                                        <Col xs={1} className="score-input">
                                            <Form.Control
                                                type="number"
                                                value={formatScore(match.homeGoals)}
                                                onChange={(e) => handleScoreChange(match.id, 'homeGoals', e.target.value)}
                                                disabled={match.status !== "A Realizar"}
                                            />
                                        </Col>
                                        <Col xs={1} className="vs">X</Col>
                                        <Col xs={1} className="score-input">
                                            <Form.Control
                                                type="number"
                                                value={formatScore(match.awayGoals)}
                                                onChange={(e) => handleScoreChange(match.id, 'awayGoals', e.target.value)}
                                                disabled={match.status !== "A Realizar"}
                                            />
                                        </Col>
                                        <Col xs={4} className="team-name">
                                            {match.awayTeam.name}
                                        </Col>
                                    </Row>
                                    <Row className="match-details">
                                        <Col>
                                            {new Date(match.dateTime).toLocaleString('pt-BR')} | Local do Jogo
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-center mt-2">
                                        {match.status === "A Realizar" && (
                                            <Button
                                                variant="primary"
                                                size="sm" // Define o tamanho pequeno
                                                onClick={() => handleUpdateMatch(match)}
                                            >
                                                Atualizar
                                            </Button>
                                        )}
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
