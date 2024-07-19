import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { agendarPartida, listarEquipes } from '../services/api';

const PartidaForm = () => {
    const [dataHora, setDataHora] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [equipe1, setEquipe1] = useState('');
    const [equipe2, setEquipe2] = useState('');
    const [equipes, setEquipes] = useState([]);

    useEffect(() => {
        listarEquipes()
            .then(response => {
                console.log('Dados recebidos:', response.data);
                if (Array.isArray(response.data)) {
                    setEquipes(response.data);
                } else {
                    console.error('Dados recebidos não são um array:', response.data);
                    setEquipes([]);
                }
            })
            .catch(error => {
                console.error('Erro ao carregar equipes:', error);
                setEquipes([]);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const partida = {
            dataHora: new Date(dataHora).toISOString(),
            localizacao,
            equipe1: { id: equipe1 },
            equipe2: { id: equipe2 },
            status: 'AGENDADA'
        };
        agendarPartida(partida).then(response => {
            alert('Partida agendada com sucesso');
            setDataHora('');
            setLocalizacao('');
            setEquipe1('');
            setEquipe2('');
        }).catch(error => {
            alert(error.response.data.message);
        });
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formDataHora">
                    <Form.Label>Data e Hora</Form.Label>
                    <Form.Control type="datetime-local" value={dataHora} onChange={(e) => setDataHora(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formLocalizacao">
                    <Form.Label>Localização</Form.Label>
                    <Form.Control type="text" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formEquipe1">
                    <Form.Label>Equipe 1</Form.Label>
                    <Form.Control as="select" value={equipe1} onChange={(e) => setEquipe1(e.target.value)}>
                        <option value="">Selecione a equipe</option>
                        {equipes.map(equipe => (
                            <option key={equipe.id} value={equipe.id}>
                                {equipe.nome}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formEquipe2">
                    <Form.Label>Equipe 2</Form.Label>
                    <Form.Control as="select" value={equipe2} onChange={(e) => setEquipe2(e.target.value)}>
                        <option value="">Selecione a equipe</option>
                        {equipes.map(equipe => (
                            <option key={equipe.id} value={equipe.id}>
                                {equipe.nome}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Agendar Partida
                </Button>
            </Form>
        </Container>
    );
};

export default PartidaForm;
