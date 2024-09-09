import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EquipeForm from './componentes/EquipeForm';
import EquipeList from './componentes/EquipeList';
import PartidaForm from './componentes/PartidaForm';
import PartidaList from './componentes/PartidaList';
import TopBar from './componentes/TopBar';
import NavBar from './componentes/NavBar';

import Dashboard from './componentes/Dashboard';
import CampeonatoForm from './componentes/CampeonatoForm';
import AtualizarResultadoForm from './componentes/AtualizarResultadoForm';
import GrupoDetalhes from './componentes/GrupoDetalhes';
import AdicionarEquipeForm from './componentes/AdicionarEquipeForm';
import Tabela from './componentes/Tabela';
import Partida from './componentes/Partida';
import TeamForm from './componentes/TeamForm.js';
import GerarJogos from './componentes/GerarJogos.js';
import TabelaEPartida from './componentes/TabelaEPartida.js';
import MatchesList from './componentes/MatchesList.js';
import CadastroNoticia from './componentes/CadastroNoticia.js';

const App = () => {
    return (
        <Router>
            <div>
                <TopBar />
                <NavBar />
                <div style={styles.content}>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/tabela-e-partida" element={<TabelaEPartida />} />
                        <Route path="/cadastrar-time" element={<TeamForm />} />
                        <Route path="/tabela" element={<Tabela />} />
                        <Route path="/gerar-jogos" element={<GerarJogos />} />
                        <Route path="/jogos" element={<MatchesList />} />
                        <Route path="/noticia" element={<CadastroNoticia />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

const styles = {
    content: {
        padding: '20px',
    },
};

export default App;
