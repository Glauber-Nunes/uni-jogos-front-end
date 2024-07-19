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

const App = () => {
    return (
        <Router>
            <div>
                <TopBar />
                <NavBar />
                <div style={styles.content}>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/equipes/novo" element={<EquipeForm />} />
                        <Route path="/equipes" element={<EquipeList />} />
                        <Route path="/partidas/novo" element={<PartidaForm />} />
                        <Route path="/partidas" element={<PartidaList />} />
                        <Route path="/torneios" element={<CampeonatoForm />} />
                        <Route path="/resultados" element={<AtualizarResultadoForm />} />
                        <Route path="/adcionarEquipeGrupo" element={<AdicionarEquipeForm />} />
                        <Route path="/grupos/:grupoId" element={<GrupoDetalhes />} />
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
