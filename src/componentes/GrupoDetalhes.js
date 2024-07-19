import React, { useState, useEffect } from 'react';
import AdicionarEquipeForm from './AdicionarEquipeForm';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { obterGrupoPorId } from '../services/api';

const GrupoDetalhes = () => {
    const { grupoId } = useParams();
    const [grupo, setGrupo] = useState(null);

    useEffect(() => {
        if (grupoId) {
            console.log(`Buscando grupo com ID: ${grupoId}`);
            obterGrupoPorId(grupoId).then(response => {
                console.log('Grupo encontrado:', response.data);
                setGrupo(response.data);
            }).catch(error => {
                console.error('Erro ao carregar grupo:', error);
            });
        }
    }, [grupoId]);

    if (!grupo) {
        return <div>Carregando...</div>;
    }

    return (
        <Container>
            <h2>{grupo.nome}</h2>
            <AdicionarEquipeForm grupoId={grupo.id} />
            {/* Exibir outras informações do grupo */}
        </Container>
    );
};

export default GrupoDetalhes;
