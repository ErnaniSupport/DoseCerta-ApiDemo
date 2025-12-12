import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/Listagem/ListarTransferencia.css"; // usa o mesmo estilo das outras listas

export default function ListaTransferencias() {
  const [transferencias, setTransferencias] = useState([]);
  const [vacinas, setVacinas] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    vacina_id: "",
    estabelecimento_origem: "",
    estabelecimento_destino: "",
    quantidade_transferida: 0,
    data_transferencia: "",
    nome_profissional: "",
    cpf_profissional: ""
  });

  useEffect(() => {
    carregar();
    api.get("/vacinas").then(r => setVacinas(r.data));
    api.get("/unidades").then(r => setUnidades(r.data));
  }, []);

  async function carregar() {
    const res = await api.get("/transferencias");
    setTransferencias(res.data);
  }

  async function excluir(id) {
    if (window.confirm("Deseja excluir esta transferência?")) {
      await api.delete(`/transferencias/${id}`);
      carregar();
    }
  }

  function iniciarEdicao(t) {
    setEditando(t.id);
    setForm(t);
  }

  async function salvarEdicao(e) {
    e.preventDefault();
    const payload = { ...form, quantidade_transferida: Number(form.quantidade_transferida) };
    await api.put(`/transferencias/${editando}`, payload);
    setEditando(null);
    carregar();
  }

  function nomeVacina(id) {
    const v = vacinas.find(x => String(x.id) === String(id));
    return v ? `${v.nome_vacina} (${v.lote})` : id;
  }

  function nomeUnidade(id) {
    const u = unidades.find(x => String(x.id) === String(id));
    return u ? u.nome_fantasia : id;
  }

  return (
    <div className="pageListarTransferencia">
      <h2>Transferências Registradas</h2>

      <table className="tabela-doses">
        <thead>
          <tr>
            <th>Vacina</th>
            <th>Origem</th>
            <th>Destino</th>
            <th>Quantidade</th>
            <th>Data</th>
            <th>Profissional</th>
            <th>CPF</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {transferencias.map(t => (
            <tr key={t.id}>
              <td>{nomeVacina(t.vacina_id)}</td>
              <td>{nomeUnidade(t.estabelecimento_origem)}</td>
              <td>{nomeUnidade(t.estabelecimento_destino)}</td>
              <td>{t.quantidade_transferida}</td>
              <td>{t.data_transferencia}</td>
              <td>{t.nome_profissional}</td>
              <td>{t.cpf_profissional}</td>
              <td style={{ display: "flex", gap: "10px" }}>
                <button className="btn-edit" onClick={() => iniciarEdicao(t)}>Editar</button>
                <button className="btn-delete" onClick={() => excluir(t.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editando && (
        <form onSubmit={salvarEdicao} className="form-card">
          <h3>Editando Transferência</h3>

          <label>Vacina
            <select name="vacina_id" value={form.vacina_id}
              onChange={e => setForm({ ...form, vacina_id: e.target.value })}
            >
              <option value="">Selecione</option>
              {vacinas.map(v => (
                <option key={v.id} value={v.id}>
                  {v.nome_vacina} — {v.lote}
                </option>
              ))}
            </select>
          </label>

          <label>Origem
            <select name="estabelecimento_origem" value={form.estabelecimento_origem}
              onChange={e => setForm({ ...form, estabelecimento_origem: e.target.value })}
            >
              <option value="">Selecione</option>
              {unidades.map(u => (
                <option key={u.id} value={u.id}>{u.nome_fantasia}</option>
              ))}
            </select>
          </label>

          <label>Destino
            <select name="estabelecimento_destino" value={form.estabelecimento_destino}
              onChange={e => setForm({ ...form, estabelecimento_destino: e.target.value })}
            >
              <option value="">Selecione</option>
              {unidades.map(u => (
                <option key={u.id} value={u.id}>{u.nome_fantasia}</option>
              ))}
            </select>
          </label>

          <label>Quantidade
            <input type="number" value={form.quantidade_transferida}
              onChange={e => setForm({ ...form, quantidade_transferida: e.target.value })}
            />
          </label>

          <label>Data
            <input type="date" value={form.data_transferencia}
              onChange={e => setForm({ ...form, data_transferencia: e.target.value })}
            />
          </label>

          <label>Nome Profissional
            <input value={form.nome_profissional}
              onChange={e => setForm({ ...form, nome_profissional: e.target.value })}
            />
          </label>

          <label>CPF 
            <input value={form.cpf_profissional}
              onChange={e => setForm({ ...form, cpf_profissional: e.target.value })}
            />
          </label>

          <div className="form-actions">
            <button type="submit" className="primary">Salvar</button>
            <button type="button" onClick={() => setEditando(null)}>Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
}