import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../../styles/Listagem/tabelaAgendamento.css"; 

export default function ListaAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);

  // modal
  const [mostrarModal, setMostrarModal] = useState(false);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);
  const [novaData, setNovaData] = useState("");

  const carregar = () => {
    axios.get("http://localhost:3001/agendamentos").then((res) => {
      setAgendamentos(res.data);
    });
  };

  useEffect(() => {
    carregar();
  }, []);

  const remover = async (id) => {
    if (window.confirm("Excluir agendamento?")) {
      await axios.delete(`http://localhost:3001/agendamentos/${id}`);
      carregar();
    }
  };

  const abrirReagendar = (ag) => {
    setAgendamentoSelecionado(ag);
    setNovaData(ag.data);
    setMostrarModal(true);
  };

  const salvarReagendamento = async () => {
    await axios.put(
      `http://localhost:3001/agendamentos/${agendamentoSelecionado.id}`,
      {
        ...agendamentoSelecionado,
        data: novaData,
      }
    );

    setMostrarModal(false);
    carregar();
    alert("Agendamento reagendado com sucesso!");
  };

  return (
    <div className="page">
      <h1>Agendamentos</h1>

      <table className="tabela-doses">
        <thead>
          <tr>
            <th>PACIENTE</th>
            <th>CPF</th>
            <th>VACINA</th>
            <th>DATA</th>
            <th>AÇÕES</th>
          </tr>
        </thead>

        <tbody>
          {agendamentos.map((a) => (
            <tr key={a.id}>
              <td>{a.nome_paciente}</td>
              <td>{a.cpf_paciente}</td>
              <td>{a.vacina}</td>
              <td>{a.data}</td>
              <td style={{ display: "flex", gap: 10 }}>

                <button
                  className="btn-edit"
                  onClick={() => abrirReagendar(a)}
                >
                  Reagendar
                </button>

                <button
                  className="btn-delete"
                  onClick={() => remover(a.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {mostrarModal && (
        <div className="modal-bg">
          <div className="modal">
            <h3>Reagendar</h3>

            <label>Nova Data</label>
            <input
              type="date"
              value={novaData}
              onChange={(e) => setNovaData(e.target.value)}
              style={{ width: "100%", marginBottom: 15 }}
            />

            <button className="btn-edit" onClick={salvarReagendamento}>
              Salvar
            </button>

            <button
              className="btn-delete"
              onClick={() => setMostrarModal(false)}
              style={{ marginLeft: 10 }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
