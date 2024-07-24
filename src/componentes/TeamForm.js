import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

const TeamForm = () => {
    const [name, setName] = useState('');
    const [groupName, setGroupName] = useState('');
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const team = { name, groupName };
        axios.post('http://localhost:8080/api/teams', team)
            .then(response => {
                setMessage('Time adicionado com sucesso');
                setVariant('success');
                setName('');
                setGroupName('');
            })
            .catch(error => {
                setMessage(error.response.data.message);
                setVariant('danger');
            });
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">Adicionar Time</h2>
                    {message && <Alert variant={variant}>{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName" className="mb-3">
                            <Form.Label>Nome do Time</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                placeholder="Digite o nome do time"
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="formGroupName" className="mb-3">
                            <Form.Label>Nome do Grupo</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={groupName} 
                                onChange={(e) => setGroupName(e.target.value)} 
                                placeholder="Digite o nome do grupo"
                                required 
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Adicionar Time
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default TeamForm;
