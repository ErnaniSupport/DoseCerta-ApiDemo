import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./../../styles/Listagem/listarUnidades.css"; // 🔵 opcional, pode usar o mesmo CSS global

export default function ListaUnidades() {
  const [unidades, setUnidades] = useState([]);
  const [editando, setEditando] = useState(null);

  const [form, setForm] = useState({
    cnes: "",
    nome_fantasia: "",
    nome_empresarial: "",
    tipo_estabelecimento: "",
    subtipo: "",
    municipio: "",
    uf: ""
  });

  useEffect(() => {
    carregarUnidades();
  }, []);

  async function carregarUnidades() {
    const res = await api.get("/unidades");
    setUnidades(res.data);
  }

  async function excluir(id) {
    if (window.confirm("Deseja excluir esta unidade?")) {
      await api.delete(`/unidades/${id}`);
      carregarUnidades();
    }
  }

  function iniciarEdicao(unidade) {
    setEditando(unidade.id);
    setForm(unidade);
  }

  async function salvarEdicao(e) {
    e.preventDefault();
    await api.put(`/unidades/${editando}`, form);
    setEditando(null);
    carregarUnidades();
  }

  return (
    <div className="pageUnidade">
      <h2>Lista de Unidades de Saúde</h2>

      <table className="tabela-doses">
        <thead>
          <tr>
            <th>NOME FANTASIA</th>
            <th>EMPRESARIAL</th>
            <th>CNES</th>
            <th>TIPO</th>
            <th>SUBTIPO</th>
            <th>MUNÍCIPIO</th>
            <th>UF</th>
            <th>AÇÕES</th>
          </tr>
        </thead>

        <tbody>
          {unidades.map((u) => (
            <tr key={u.id}>
              <td>{u.nome_fantasia}</td>
              <td>{u.nome_empresarial}</td>
              <td>{u.cnes}</td>
              <td>{u.tipo_estabelecimento}</td>
              <td>{u.subtipo}</td>
              <td>{u.municipio}</td>
              <td>{u.uf}</td>

              <td style={{ display: "flex", gap: "10px" }}>
                <button className="btn-edit" onClick={() => iniciarEdicao(u)}>
                  Editar
                </button>

                <button className="btn-delete" onClick={() => excluir(u.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editando && (
        <div className="form-card">
          <h3>Editando Unidade de Saúde</h3>

          <label>
            Nome Fantasia
            <input
              name="nome_fantasia"
              value={form.nome_fantasia}
              onChange={(e) =>
                setForm({ ...form, nome_fantasia: e.target.value })
              }
            />
          </label>

          <label>
            Nome Empresarial
            <input
              name="nome_empresarial"
              value={form.nome_empresarial}
              onChange={(e) =>
                setForm({ ...form, nome_empresarial: e.target.value })
              }
            />
          </label>

          <label>
            CNES
            <input
              name="cnes"
              value={form.cnes}
              onChange={(e) => setForm({ ...form, cnes: e.target.value })}
            />
          </label>

          <label>
            Tipo
            <input
              name="tipo_estabelecimento"
              value={form.tipo_estabelecimento}
              onChange={(e) =>
                setForm({ ...form, tipo_estabelecimento: e.target.value })
              }
            />
          </label>

          <label>
            Subtipo
            <input
              name="subtipo"
              value={form.subtipo}
              onChange={(e) => setForm({ ...form, subtipo: e.target.value })}
            />
          </label>

          <label>
            Município
            <input
              name="municipio"
              value={form.municipio}
              onChange={(e) =>
                setForm({ ...form, municipio: e.target.value })
              }
            />
          </label>

          <label>
            UF
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
