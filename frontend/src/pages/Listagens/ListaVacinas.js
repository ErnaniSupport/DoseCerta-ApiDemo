import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./../../styles/Listagem/listarVacinas.css";

export default function ListaVacinas() {
  const [vacinas, setVacinas] = useState([]);
  const [editando, setEditando] = useState(null);

  const [form, setForm] = useState({
    nome_vacina: "",
    fabricante: "",
    lote: "",
    validade: "",
    protecao: "",
    quantidade: 0,
    data_cadastro: "",
    nome_profissional: "",
    cpf_profissional: ""
  });

  // ---------------------------
  // 🟦 Funções para tratar datas
  // ---------------------------

  // Converte YYYY-MM-DD → DD/MM/YYYY (para exibição)
  function formatarDataBR(dataISO) {
    if (!dataISO) return "";
    if (dataISO.includes("/")) return dataISO; // já BR
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  // Converte DD/MM/YYYY → YYYY-MM-DD (para salvar ou usar no input)
  function formatarDataISO(dataBR) {
    if (!dataBR) return "";
    if (dataBR.includes("-")) return dataBR; // já ISO
    const [dia, mes, ano] = dataBR.split("/");
    return `${ano}-${mes}-${dia}`;
  }

  // ---------------------------
  // 🟩 Carregar dados
  // ---------------------------

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const res = await api.get("/vacinas");
    setVacinas(res.data);
  }

  // ---------------------------
  // 🟥 Excluir
  // ---------------------------

  async function excluir(id) {
    if (window.confirm("Deseja excluir esta vacina?")) {
      await api.delete(`/vacinas/${id}`);
      carregar();
    }
  }

  // ---------------------------
  // 🟨 Iniciar edição
  // ---------------------------

  function iniciarEdicao(v) {
    setEditando(v.id);

    setForm({
      ...v,
      validade: v.validade.includes("/")
        ? formatarDataISO(v.validade) // se vier BR, converte pra ISO
        : v.validade // se vier ISO, mantém
    });
  }

  // ---------------------------
  // 🟩 Salvar edição
  // ---------------------------

  async function salvarEdicao(e) {
    e.preventDefault();

    const payload = {
      ...form,
      quantidade: Number(form.quantidade),
      validade: form.validade.includes("/")
        ? formatarDataISO(form.validade)
        : form.validade
    };

    await api.put(`/vacinas/${editando}`, payload);

    setEditando(null);
    carregar();
  }

  // ---------------------------
  // 🟦 Renderização
  // ---------------------------

  return (
    <div className="pageListaVacina">
      <h2>Lista de Vacinas Cadastradas</h2>

      <table className="tabela-doses">
        <thead>
          <tr>
            <th>NOME</th>
            <th>FABRICANTE</th>
            <th>LOTE</th>
            <th>VALIDADE</th>
            <th>QUANTIDADE</th>
            <th>PROFISSIONAL</th>
            <th>CPF</th>
            <th>AÇÕES</th>
          </tr>
        </thead>

        <tbody>
          {vacinas.map((v) => (
            <tr key={v.id}>
              <td>{v.nome_vacina}</td>
              <td>{v.fabricante}</td>
              <td>{v.lote}</td>

              {/* Exibição em formato BR */}
              <td>{formatarDataBR(v.validade)}</td>

              <td>{v.quantidade}</td>
              <td>{v.nome_profissional}</td>
              <td>{v.cpf_profissional}</td>

              <td style={{ display: "flex", gap: "10px" }}>
                <button className="btn-edit" onClick={() => iniciarEdicao(v)}>
                  Editar
                </button>

                <button className="btn-delete" onClick={() => excluir(v.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editando && (
        <div className="form-card">
          <h3>Editando Vacina Cadastrada</h3>

          <label>
            Nome
            <input
              name="nome_vacina"
              value={form.nome_vacina}
              onChange={(e) =>
                setForm({ ...form, nome_vacina: e.target.value })
              }
            />
          </label>

          <label>
            Fabricante
            <input
              name="fabricante"
              value={form.fabricante}
              onChange={(e) =>
                setForm({ ...form, fabricante: e.target.value })
              }
            />
          </label>

          <label>
            Lote
            <input
              name="lote"
              value={form.lote}
              onChange={(e) => setForm({ ...form, lote: e.target.value })}
            />
          </label>

          <label>
            Validade
            <input
              type="date"
              name="validade"
              value={form.validade}
              onChange={(e) => setForm({ ...form, validade: e.target.value })}
            />
          </label>

          <label>
            Proteção
            <input
              name="protecao"
              value={form.protecao}
              onChange={(e) =>
                setForm({ ...form, protecao: e.target.value })
              }
            />
          </label>

          <label>
            Quantidade
            <input
              type="number"
              name="quantidade"
              value={form.quantidade}
              onChange={(e) =>
                setForm({ ...form, quantidade: e.target.value })
              }
            />
          </label>

          <label>
            Nome do Profissional
            <input
              name="nome_profissional"
              value={form.nome_profissional}
              onChange={(e) =>
                setForm({ ...form, nome_profissional: e.target.value })
              }
            />
          </label>

          <label>
            CPF do Profissional
            <input
              name="cpf_profissional"
              value={form.cpf_profissional}
              onChange={(e) =>
                setForm({ ...form, cpf_profissional: e.target.value })
              }
            />
          </label>

          <div className="form-actions">
            <button className="primary" onClick={salvarEdicao}>
              Salvar
            </button>
            <button className="secondary" onClick={() => setEditando(null)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
