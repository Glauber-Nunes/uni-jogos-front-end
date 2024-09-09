import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { FaPlusCircle } from 'react-icons/fa';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';


const TeamForm = () => {
    const [name, setName] = useState('');
    const [groupName, setGroupName] = useState('');

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const handleSubmit = (e) => {
        e.preventDefault();
        const team = { name, groupName };
        axios.post('http://localhost:8080/api/teams', team)
            .then(response => {
                notifySuccess(`Equipe criada e adicionada no grupo ${groupName}`);
                setName('');
                setGroupName('');
            })
            .catch(error => {
                notifyError(error.response ? error.response.data.message : 'Erro ao criar equipe');
            });
    };

    return (
        <Container className="team-form-container mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <div className="form-card p-4 shadow-lg">
                        <h2 className="text-center mb-4">Adicionar Time</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formName" className="mb-4">
                                <Form.Label>Nome do Time</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    placeholder="Digite o nome do time"
                                    className="rounded-pill"
                                    required 
                                />
                            </Form.Group>
                            <Form.Group controlId="formGroupName" className="mb-4">
                                <Form.Label>Nome do Grupo</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={groupName} 
                                    onChange={(e) => setGroupName(e.target.value)} 
                                    placeholder="Digite o nome do grupo"
                                    className="rounded-pill"
                                    required 
                                />
                            </Form.Group>
                            <Button variant="success" type="submit" className="w-100 d-flex align-items-center justify-content-center rounded-pill">
                                <FaPlusCircle className="me-2" /> Adicionar Time
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
};

export default TeamForm;
