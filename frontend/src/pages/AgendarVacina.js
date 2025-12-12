import React, { useState, useEffect } from "react";
import api from "../services/api";
import styles from "../styles/AgendarVacina.module.css";

export default function AgendarVacina() {

  const [form, setForm] = useState({
    nome_paciente: "",
    cpf_paciente: "",
    data: "",
    vacina: "",
  });

  const [vacinas, setVacinas] = useState([]);

  function h(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Carregar vacinas ao abrir a página
  useEffect(() => {
    async function carregarVacinas() {
      try {
        const response = await api.get("/vacinas");
        setVacinas(response.data);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar lista de vacinas");
      }
    }
    carregarVacinas();
  }, []);

  async function salvar(e) {
    e.preventDefault();

    // DATA MÍNIMA
    const hoje = new Date().toISOString().split("T")[0];
    if (form.data < hoje) {
      alert("A data do agendamento não pode ser no passado.");
      return;
    }

    if (!form.nome_paciente || !form.cpf_paciente || !form.data || !form.vacina) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      await api.post("/agendamentos", form);

      alert("Agendamento criado!");

      setForm({
        nome_paciente: "",
        cpf_paciente: "",
        data: "",
        vacina: "",
      });

    } catch (err) {
      console.error(err);
      alert("Erro ao criar agendamento");
    }
  }

  return (
    <div className={styles.AgendarVacina}>
       <form className={styles["form-card"]} onSubmit={salvar}>
        <h2>Agendar Vacina</h2>
        <label>NOME DO PACIENTE
          <input 
            name="nome_paciente"
            value={form.nome_paciente}
            onChange={h}
          />
        </label>

        <label>CPF DO PACIENTE
          <input
            name="cpf_paciente"
            value={form.cpf_paciente}
            onChange={h}
          />
        </label>

        <label>DATA DO AGENDAMENTO
          <input
            type="date"
            name="data"
            min={new Date().toISOString().split("T")[0]}  // 🔒 bloqueia datas passadas
            value={form.data}
            onChange={h}
          />
        </label>

        <label>VACINA
          <select
            name="vacina"
            value={form.vacina}
            onChange={h}
          >
            <option value="">Selecione a vacina</option>

            {vacinas.map(v => (
              <option key={v.id} value={v.nome_vacina}>
                {v.nome_vacina} — Lote {v.lote}
              </option>
            ))}
          </select>
        </label>

        <div className={styles["form-actions-botao"]}>
          <button type="submit" className={styles.primary}>Salvar</button>
        </div>

      </form>
    </div>
  );
}
