import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { FaPlusCircle } from 'react-icons/fa';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './TeamForm.css';

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
                toast.success('Equipe criada e adcionada no grupo ' , groupName);
                setName('');
                setGroupName('');
            })
            .catch(error => {
                notifyError(error.response.data.message);
            });
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">Adicionar Time</h2>
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
                        <Button variant="primary" type="submit" className="w-100 d-flex align-items-center justify-content-center">
                            <FaPlusCircle className="me-2" /> Adicionar Time
                        </Button>
                    </Form>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
};

export default TeamForm;
