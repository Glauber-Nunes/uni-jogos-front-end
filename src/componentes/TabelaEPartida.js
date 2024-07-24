import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Tabela from './Tabela';
import Partida from './Partida';

const TabelaEPartida = () => {
    return (
        <Container className="mt-4">
            <Row>
                <Col md={8}>
                    <Tabela />
                </Col>
               
            </Row>
        </Container>
    );
};

export default TabelaEPartida;
