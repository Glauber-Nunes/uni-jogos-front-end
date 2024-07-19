import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const criarEquipe = (equipe) => {
    return axios.post(`${API_URL}/v1/equipes`, equipe);
};

export const listarEquipesCriteria = (esporte, genero) => {
    return axios.get(`${API_URL}/v1/equipes/lista-criteria`, { params: { esporte, genero } });
};

export const adicionarJogador = (equipeId, jogador) => {
    return axios.post(`${API_URL}/v1/equipes/${equipeId}/jogadores`, jogador);
};

export const agendarPartida = (partida) => {
    return axios.post(`${API_URL}/v1/partidas`, partida);
};

export const listarPartidas = (inicio, fim) => {
    return axios.get(`${API_URL}/v1/partidas`, { params: { inicio, fim } });
};

export const listarEquipes = () => {
    return axios.get(`${API_URL}/v1/equipes`);
};

export const criarCampeonato = (campeonato) => {
    return axios.post(`${API_URL}/api/campeonatos`, campeonato);
};

export const atualizarResultado = (partidaId, golsEquipe1, golsEquipe2) => {
    return axios.post(`${API_URL}/partidas/${partidaId}/resultado`, null, {
        params: { golsEquipe1, golsEquipe2 }
    });
};

export const adicionarEquipeAoGrupo = (grupoId, equipeId) => {
    return axios.post(`${API_URL}/api/grupos/${grupoId}/adicionarEquipe`, null, {
        params: { equipeId }
    });
};

export const obterGrupoPorId = (grupoId) => {
    return axios.get(`${API_URL}/api/grupos/${grupoId}`);
};
