import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Dashboard.css"; // << importe o css aqui

const Icon = ({ name }) => {
  const icons = {
    profissionais: (
      <svg width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="14" r="10" fill="#4FC3F7" />
        <rect x="10" y="26" width="28" height="18" rx="9" fill="#0288D1" />
      </svg>
    ),

    unidade: (
      <svg width="48" height="48" viewBox="0 0 48 48">
        <rect x="6" y="18" width="36" height="24" fill="#4DB6AC" />
        <rect x="18" y="6" width="12" height="12" fill="#00897B" />
        <rect x="22" y="10" width="4" height="4" fill="#FFF" />
      </svg>
    ),

    vacina: (
      <svg width="48" height="48" viewBox="0 0 48 48">
        <rect x="20" y="4" width="8" height="14" fill="#E91E63" />
        <rect x="16" y="18" width="16" height="20" fill="#F06292" />
        <circle cx="24" cy="28" r="4" fill="#FFF" />
      </svg>
    ),

    transf: (
      <svg width="48" height="48" viewBox="0 0 48 48">
        <path d="M6 16h30l-8-8" fill="#42A5F5" />
        <path d="M42 32H12l8 8" fill="#1E88E5" />
      </svg>
    ),

    // === NOVOS ÍCONES ===
    dose: (
      <svg width="48" height="48" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" fill="#7E57C2" />
        <circle cx="8" cy="9" r="2" fill="#CE93D8" />
        <rect x="11" y="8" width="7" height="2" fill="#E1BEE7" />

        <circle cx="8" cy="15" r="2" fill="#CE93D8" />
        <rect x="11" y="14" width="7" height="2" fill="#E1BEE7" />
      </svg>
    ),

    alerta: (
      <svg width="48" height="48" viewBox="0 0 48 48">
        <polygon points="24,4 44,40 4,40" fill="#FF7043" />
        <rect x="22" y="18" width="4" height="12" fill="#FFF" />
        <rect x="22" y="32" width="4" height="4" fill="#FFF" />
      </svg>
    ),

    agenda: (
      <svg width="48" height="48" viewBox="0 0 48 48">
        <rect x="4" y="10" width="40" height="30" fill="#29B6F6" />
        <rect x="4" y="10" width="40" height="8" fill="#0277BD" />
        <circle cx="16" cy="26" r="4" fill="#FFF" />
      </svg>
    ),

    historico: (
      <svg width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="20" fill="#81C784" />
        <path d="M24 12v12l8 4" stroke="#FFF" strokeWidth="4" fill="none" />
      </svg>
    ),
  };

  return <span className="icon-svg">{icons[name]}</span>;
};

export default function Dashboard() {

  const cards = [
    // CADASTROS e LISTAGENS
    { to: '/profissionais', label: 'Cadastramento de Profissionais', icon: 'profissionais' },
    { to: '/lista-profissionais', label: 'Listar Profissionais Cadastrados', icon: 'profissionais' },

    { to: '/unidades', label: 'Cadastramento de Unidades de Saúde', icon: 'unidade' },
    { to: '/lista-unidades', label: 'Listar Unidades de Saúde', icon: 'unidade' },

    { to: '/vacinas', label: 'Cadastramento de Vacinas', icon: 'vacina' },
    { to: '/lista-vacinas', label: 'Listar Vacinas Cadastradas', icon: 'vacina' },

    { to: '/transferencias', label: 'Transferências de Vacinas', icon: 'transf' },
    { to: '/lista-transferencias', label: 'Listar Vacinas Transferidas', icon: 'transf' },

    { to: '/agendar-vacina', label: 'Agendar Vacina', icon: 'agenda' },
    { to: '/lista-agendamentos', label: 'Listar Agendamentos', icon: 'agenda' },
    
    { to: '/registrar-doses', label: 'Registrar Doses Aplicadas', icon: 'dose' },
    { to: '/lista-doses', label: 'Listar Doses', icon: 'dose' },

    { to: '/lista-historico', label: 'Listar Histórico', icon: 'historico' },

    // ALERTAS    
    { to: '/alertas-vencimento', label: 'Alerta de Vacinas', icon: 'alerta' },

  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Bem vindo! Você está no Dose Certa</h1>
      </div>

      <div className="cards-grid">
        {cards.map((c, i) => (
          <Link to={c.to} className="card" key={i}>
            <div className="card-ico"><Icon name={c.icon} /></div>
            <div className="card-label">{c.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
