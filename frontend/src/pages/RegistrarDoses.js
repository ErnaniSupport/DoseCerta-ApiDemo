import React, { useState, useEffect } from "react";
import api from "../services/api";
import styles from "../styles/RegistrarDoses.module.css";

export default function RegistrarDoses() {
  const [vacinas, setVacinas] = useState([]);

  const [form, setForm] = useState({
    vacina_id: "",
    nome_paciente: "",
    cpf_paciente: "",
    data_aplicacao: "",
    lote: "",
    quantidade: 1,
    profissional_nome: ""
  });

  function h(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Buscar vacinas
  useEffect(() => {
    async function carregar() {
      try {
        const res = await api.get("/vacinas");
        setVacinas(res.data);
      } catch {
        alert("Erro ao carregar vacinas.");
      }
    }
    carregar();
  }, []);

  async function salvar(e) {
    e.preventDefault();

    const hoje = new Date().toISOString().split("T")[0];
    if (form.data_aplicacao > hoje) {
      alert("A data de aplicação não pode ser no futuro.");
      return;
    }

    try {
      await api.post("/doses", form);

      alert("Registro salvo!");

      setForm({
        vacina_id: "",
        nome_paciente: "",
        cpf_paciente: "",
        data_aplicacao: "",
        lote: "",
        quantidade: 1,
        profissional_nome: ""
      });
    } catch (err) {
      console.error(err);
      alert("Erro ao registrar dose.");
    }
  }

  return (
    <div className={styles.RegistrarDoses}>
      <form className={styles["form-card"]} onSubmit={salvar}>
        <h2>Registrar Dose Aplicada</h2>

        <label>VACINA
          <select name="vacina_id" value={form.vacina_id} onChange={h}>
            <option value="">Selecione</option>
            {vacinas.map(v => (
              <option key={v.id} value={v.id}>
                {v.nome_vacina} — Lote {v.lote}
              </option>
            ))}
          </select>
        </label>

        <label>NOME DO PACIENTE
          <input name="nome_paciente" value={form.nome_paciente} onChange={h} />
        </label>

        <label>CPF DO PACIENTE
          <input name="cpf_paciente" value={form.cpf_paciente} onChange={h} />
        </label>

        <label>DATA DA APLICAÇÃO
          <input
            type="date"
            name="data_aplicacao"
            value={form.data_aplicacao}
            onChange={h}
            max={new Date().toISOString().split("T")[0]}
          />
        </label>

        <label>QUANTIDADE
          <input
            type="number"
            name="quantidade"
            min="1"
            value={form.quantidade}
            onChange={h}
          />
        </label>

        <label>PROFISSIONAL RESPONSÁVEL
          <input
            name="profissional_nome"
            value={form.profissional_nome}
            onChange={h}
          />
        </label>

        <label>LOTE
          <input name="lote" value={form.lote} onChange={h} />
        </label>

        <div className={styles["form-actions-botao"]}>
          <button className={styles.primary}>Salvar</button>
        </div>
      </form>
    </div>
  );
}
