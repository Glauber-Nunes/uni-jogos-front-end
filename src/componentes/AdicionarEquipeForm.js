import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { listarEquipes, adicionarEquipeAoGrupo } from '../services/api';

const AdicionarEquipeForm = ({ grupoId }) => {
    const [equipeId, setEquipeId] = useState('');
    const [equipes, setEquipes] = useState([]);

    useEffect(() => {
        listarEquipes().then(response => {
            setEquipes(response.data);
        }).catch(error => {
            console.error('Erro ao carregar equipes:', error);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!grupoId) {
            alert(grupoId);
            alert('Grupo não encontrado');
            return;
        }
        adicionarEquipeAoGrupo(grupoId, equipeId).then(response => {
            alert('Equipe adicionada com sucesso');
            setEquipeId('');
        }).catch(error => {
            alert('Erro ao adicionar equipe: ' + (error.response?.data?.message || error.message));
        });
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEquipe">
                    <Form.Label>Selecione a Equipe</Form.Label>
                    <Form.Control as="select" value={equipeId} onChange={(e) => setEquipeId(e.target.value)}>
                        <option value="">Selecione a equipe</option>
                        {equipes.map(equipe => (
                            <option key={equipe.id} value={equipe.id}>
                                {equipe.nome}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Adicionar Equipe
                </Button>
            </Form>
        </Container>
    );
};

export default AdicionarEquipeForm;
