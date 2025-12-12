import React, { useState } from "react";
import api from "../services/api";
import styles from "../styles/cadastrarUnidade.module.css";

export default function CadastroVacina() {
  const [form, setForm] = useState({
    nome_vacina: "",
    tipo: "",
    fabricante: "",
    lote: "",
    validade: "",
    quantidade: 0,
    nome_profissional: "",
    cpf_profissional: "",
  });

  function h(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function salvar(e) {
    e.preventDefault();

    if (!form.nome_vacina || !form.lote) {
      alert("Preencha nome e lote");
      return;
    }

    try {
      const payload = {
        nome_vacina: form.nome_vacina,
        fabricante: form.fabricante,
        lote: form.lote,
        validade: form.validade,
        protecao: form.tipo,
        quantidade: Number(form.quantidade),
        data_cadastro: new Date().toISOString().split("T")[0],
        nome_profissional: form.nome_profissional,
        cpf_profissional: form.cpf_profissional,
      };

      await api.post("/vacinas", payload);

      alert("Vacina cadastrada!");

      setForm({
        nome_vacina: "",
        tipo: "",
        fabricante: "",
        lote: "",
        validade: "",
        quantidade: 0,
        nome_profissional: "",
        cpf_profissional: "",
      });

    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar");
    }
  }

  return (
    <div className={styles.CadastroUnidade}>
      <h2>Cadastro de Vacina</h2>

      <form className={styles["form-card"]} onSubmit={salvar}>

        <label>NOME DA VACINA
          <input name="nome_vacina" value={form.nome_vacina} onChange={h} />
        </label>

        <label>TIPO / PROTEÇÃO
          <input name="tipo" value={form.tipo} onChange={h} />
        </label>

        <label>FABRICANTE
          <input name="fabricante" value={form.fabricante} onChange={h} />
        </label>

        <label>LOTE
          <input name="lote" value={form.lote} onChange={h} />
        </label>

        <label>VALIDADE
          <input type="date" name="validade" value={form.validade} onChange={h} />
        </label>

        <label>QUANTIDADE
          <input type="number" name="quantidade" value={form.quantidade} onChange={h} />
        </label>

        <label>NOME DO PROFISSONAL
          <input name="nome_profissional" value={form.nome_profissional} onChange={h} />
        </label>

        <label>CPF DO PROFISSONAL
          <input name="cpf_profissional" value={form.cpf_profissional} onChange={h} />
        </label>

        <div className={styles["form-actions-botao"]}>
          <button type="submit" className={styles.primary}>Salvar</button>
        </div>

      </form>
    </div>
  );
}
