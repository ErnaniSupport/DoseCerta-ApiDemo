import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./../../styles/Listagem/listarProfissionais.css"; // 🔵 importa o CSS

export default function ListaProfissionais() {
  const [profissionais, setProfissionais] = useState([]);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    cns: "",
    cbo: "",
    municipio: "",
    uf: ""
  });

  useEffect(() => {
    carregarProfissionais();
  }, []);

  async function carregarProfissionais() {
    const res = await api.get("/profissionais");
    setProfissionais(res.data);
  }

  async function excluir(id) {
    if (window.confirm("Deseja excluir este profissional?")) {
      await api.delete(`/profissionais/${id}`);
      carregarProfissionais();
    }
  }

  function iniciarEdicao(profissionais) {
    setEditando(profissionais.id);
    setForm(profissionais);
  }

  async function salvarEdicao(e) {
    e.preventDefault();
    await api.put(`/profissionais/${editando}`, form);
    setEditando(null);
    carregarProfissionais();
  }

  return (
    <div className="pageListaProfissionais">
      <h2>Profissionais de Saúde Cadastrados</h2>

      {/* Tabela com mesmo estilo dos agendamentos */}
      <table className="tabela-doses">
        <thead>
          <tr>
            <th>NOME</th>
            <th>CPF</th>
            <th>CNS</th>
            <th>CBO</th>
            <th>MUNÍCIPIO</th>
            <th>UF</th>
            <th>AÇÕES</th>
          </tr>
        </thead>

        <tbody>
          {profissionais.map((a) => (
            <tr key={a.id}>
              <td>{a.nome}</td>
              <td>{a.cpf}</td>
              <td>{a.cns}</td>
              <td>{a.cbo}</td>
              <td>{a.municipio}</td>
              <td>{a.uf}</td>
              <td style={{ display: "flex", gap: "10px" }}>
                <button className="btn-edit" onClick={() => iniciarEdicao(a)}>
                  Editar
                </button>

                <button className="btn-delete" onClick={() => excluir(a.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulário de edição estilizado */}
      {editando && (
        <div className="form-card">
          <h3>Editando Profissional de Saúde</h3>

          <label>NOME
            <input
              name="nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
          </label>

          <label>CPF
            <input
              name="cpf"
              value={form.cpf}
              onChange={(e) => setForm({ ...form, cpf: e.target.value })}
            />
          </label>

          <label>CNS
            <input
              name="cns"
              value={form.cns}
              onChange={(e) => setForm({ ...form, cns: e.target.value })}
            />
          </label>

          <label>CBO
            <input
              name="cbo"
              value={form.cbo}
              onChange={(e) => setForm({ ...form, cbo: e.target.value })}
            />
          </label>

          <label>MUNICÍPIO
            <input
              name="municipio"
              value={form.municipio}
              onChange={(e) => setForm({ ...form, municipio: e.target.value })}
            />
          </label>

          <label>UF
            <input
              name="uf"
              value={form.uf}
              onChange={(e) => setForm({ ...form, uf: e.target.value })}
            />
          </label>

          <div className="form-actions">
            <button className="primary" onClick={salvarEdicao}>Salvar</button>
            <button className="secondary" onClick={() => setEditando(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
