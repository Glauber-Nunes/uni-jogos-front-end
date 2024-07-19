import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { criarCampeonato } from '../services/api';

const CampeonatoForm = () => {
    const [nome, setNome] = useState('');
    const [grupos, setGrupos] = useState([{ nome: '', equipes: [] }]);

    const adicionarGrupo = () => {
        setGrupos([...grupos, { nome: '', equipes: [] }]);
    };

    const handleGrupoChange = (index, e) => {
        const newGrupos = grupos.slice();
        newGrupos[index][e.target.name] = e.target.value;
        setGrupos(newGrupos);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        criarCampeonato({ nome, grupos }).then(response => {
            alert('Campeonato criado com sucesso');
            setNome('');
            setGrupos([{ nome: '', equipes: [] }]);
        }).catch(error => {
            console.error('Erro ao criar campeonato:', error);
            alert('Erro ao criar campeonato: ' + (error.response?.data?.message || error.message));
        });
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNome">
                    <Form.Label>Nome do Campeonato</Form.Label>
                    <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                </Form.Group>
                {grupos.map((grupo, index) => (
                    <Form.Group controlId={`formGrupo${index}`} key={index}>
                        <Form.Label>Nome do Grupo {index + 1}</Form.Label>
                        <Form.Control type="text" name="nome" value={grupo.nome} onChange={(e) => handleGrupoChange(index, e)} />
                    </Form.Group>
                ))}
                <Button variant="secondary" onClick={adicionarGrupo}>Adicionar Grupo</Button>
                <Button variant="primary" type="submit" className="ml-2">Criar Campeonato</Button>
            </Form>
        </Container>
    );
};

export default CampeonatoForm;
