import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// ÍCONES
import {
  FaHome, FaUserNurse, FaHospital, FaSyringe, FaExchangeAlt, FaList, FaListAlt, FaClipboardList, FaHistory, FaCheckCircle, FaExclamationTriangle, FaCalendarAlt
} from "react-icons/fa";

// PRINCIPAIS

import Dashboard from "../pages/Dashboard";
import CadastroProfissionais from "../pages/CadastroProfissionais";
import CadastroUnidade from "../pages/CadastroUnidade";
import CadastroVacina from "../pages/CadastroVacina";
import AgendarVacina from "../pages/AgendarVacina";
import TransferenciaVacina from "../pages/TransferenciaVacina";

// LISTAGENS
import ListaAgendamentos from "../pages/Listagens/ListaAgendamentos";
import ListaProfissionais from "../pages/Listagens/ListaProfissionais";
import ListaUnidades from "../pages/Listagens/ListaUnidades";
import ListaVacinas from "../pages/Listagens/ListaVacinas";
import ListaTransferencias from "../pages/Listagens/ListaTransferencias";
import ListaDoses from "../pages/Listagens/ListaDoses";
import ListaHistorico from "../pages/Listagens/ListaDoses";


// NOVAS FUNÇÕES
import RegistrarDoses from "../pages/RegistrarDoses";
import AlertasVencimento from "../pages/AlertasVencimento";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", height: "100vh" }}>

        {/* SIDEBAR */}
        <aside
          style={{
            width: "260px",
            background: "#d8e8f8ff",
            borderRight: "1px solid #ddd",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <h3 style={{ marginBottom: 20 }}>Menu de Usabilidade</h3>

          {/* PRINCIPAL */}
          <Link to="/" style={linkStyle}><FaHome /> Dashboard</Link>

          {/* CADASTROS */}
          <Link to="/profissionais" style={linkStyle}>
            <FaUserNurse /> Cadastros de Profissionais
          </Link>

          <Link to="/unidades" style={linkStyle}>
            <FaHospital /> Cadastro Unidade
          </Link>

          <Link to="/vacinas" style={linkStyle}>
            <FaSyringe /> Cadastro Vacina
          </Link>

          <Link to="/transferencias" style={linkStyle}>
            <FaExchangeAlt /> Transferência
          </Link>

          <Link to="/agendar-vacina" style={linkStyle}>
            <FaCalendarAlt /> Agendar Vacina
          </Link>

          <Link to="/lista-agendamentos" style={linkStyle}>
            <FaCalendarAlt /> Agendados
          </Link>

          <Link to="/registrar-doses" style={linkStyle}>
            <FaCheckCircle /> Registrar Doses
          </Link>

          <h3 style={{ marginTop: 20 }}>Listagem de Cadastramento</h3>

          {/* LISTAGENS */}
          <Link to="/lista-profissionais" style={linkStyle}>
            <FaList /> Profissionais
          </Link>

          <Link to="/lista-unidades" style={linkStyle}>
            <FaListAlt /> Unidades
          </Link>

          <Link to="/lista-vacinas" style={linkStyle}>
            <FaClipboardList /> Vacinas
          </Link>

          <Link to="/lista-transferencias" style={linkStyle}>
            <FaExchangeAlt /> Transferências
          </Link>

          <Link to="/lista-doses" style={linkStyle}>
            <FaCheckCircle /> Doses Aplicadas
          </Link>
          
          <Link to="/lista-historico" style={linkStyle}>
            <FaHistory /> Histórico
          </Link>

          {/* NOVAS FUNÇÕES */}
            <Link to="/alertas-vencimento" style={linkStyle}>
            <FaExclamationTriangle /> Alertas de Vencimento
          </Link>
         
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <main style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/profissionais" element={<CadastroProfissionais />} />
            <Route path="/unidades" element={<CadastroUnidade />} />
            <Route path="/vacinas" element={<CadastroVacina />} />
            <Route path="/agendar-vacina" element={<AgendarVacina />} />
            <Route path="/transferencias" element={<TransferenciaVacina />} />
            
            <Route path="/lista-agendamentos" element={<ListaAgendamentos />} />
            <Route path="/lista-profissionais" element={<ListaProfissionais />} />
            <Route path="/lista-unidades" element={<ListaUnidades />} />
            <Route path="/lista-vacinas" element={<ListaVacinas />} />
            <Route path="/lista-transferencias" element={<ListaTransferencias />} />
            <Route path="/lista-doses" element={<ListaDoses />} />
            
            <Route path="/lista-historico" element={<ListaHistorico />} />

            <Route path="/registrar-doses" element={<RegistrarDoses />} />
            <Route path="/alertas-vencimento" element={<AlertasVencimento />} />
            
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

// Estilo dos links
const linkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  textDecoration: "none",
  color: "#00127aff",
  fontSize: "16px",
  padding: "8px",
  borderRadius: "5px",
  transition: "0.2s",
};
