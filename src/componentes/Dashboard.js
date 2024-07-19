import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Dashboard = () => {
    return (
        <Container>
            <Row className="mt-3">
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Equipes</Card.Title>
                            <Card.Text>
                                Gerencie as equipes participantes dos jogos.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Partidas</Card.Title>
                            <Card.Text>
                                Agende e visualize as partidas.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Notícias</Card.Title>
                            <Card.Text>
                                Acompanhe as últimas notícias dos jogos pelo app.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
