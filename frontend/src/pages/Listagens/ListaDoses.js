import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../../styles/Listagem/lista-doses.css";

export default function ListaDoses() {
  const [doses, setDoses] = useState([]);
  //const [vacinas, setVacinas] = useState([]);

  const carregar = async () => {
    try {
      const resDoses = await axios.get("http://localhost:3001/doses");
      const resVacinas = await axios.get("http://localhost:3001/vacinas");

      const vacinasMap = {};
      resVacinas.data.forEach(v => {
        vacinasMap[v.id] = v.nome_vacina; // cria o mapa id → nome
      });

      // "JOIN" manual
      const dosesComVacina = resDoses.data.map(d => ({
        ...d,
        vacina_nome: vacinasMap[d.vacina_id] || "—"
      }));

      setDoses(dosesComVacina);
    } catch (err) {
      alert("Erro ao carregar dados.");
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const remover = async (id) => {
    if (window.confirm("Deseja excluir esta dose?")) {
      await axios.delete(`http://localhost:3001/doses/${id}`);
      carregar();
    }
  };

  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    return data.toLocaleDateString("pt-BR");
  };

  return (
    <div className="pageListaDoses">
      <h1>Listagem de Doses Aplicadas</h1>

      <table className="tabela-doses">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>CPF</th>
            <th>Vacina</th>
            <th>Quantidade</th>
            <th>Profissional</th>
            <th>Data Aplicação</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {doses.map(d => (
            <tr key={d.id}>
              <td>{d.nome_paciente}</td>
              <td>{d.cpf_paciente}</td>
              <td>{d.vacina_nome}</td>
              <td>{d.quantidade}</td>
              <td>{d.profissional_nome}</td>
              <td>{formatarData(d.data_aplicacao)}</td>

              <td className="acoes">
                <button
                  className="btn-delete"
                  onClick={() => remover(d.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
