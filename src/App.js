import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import { useAlert } from "react-alert";

const emptyState = {
  nome: "",
  cargo: "",
  dataNacimento: new Date().toISOString().substring(0, 10),
  estadoCivil: "",
  sexo: "",
  endereco: "",
  bairro: "",
  cidade: "",
  cep: "",
  telefone1: "",
  telefone2: "",
  celular: "",
  contato: "",
  email: "",
  identidade: "",
  cpf: "",
  veiculo: "",
  habilitacao: "",
};

function App() {
  const alert = useAlert();
  const [state, setState] = useState(emptyState);

  const onSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/register", state)
      .then((data) => {
        if (data.status == 200) {
          alert.success("Cadastro realizado com sucesso");
          setState(emptyState);
        }
      })
      .catch((err) => {
        if (err.response.status == 400) {
          const errors = err.response.data.errors;
          errors.forEach((item) => {
            alert.error(item.msg);
          });
        }

        if (err.response.status == 500) {
          alert.error("Falha ao realizar cadastro, por favor verifique");
        }
      });
  };

  const onFieldChange = (event) => {
    event.preventDefault();
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const searchCep = async () => {
    const { data } = await axios.get(
      `https://viacep.com.br/ws/${state.cep}/json/`
    );

    setState({
      ...state,
      cidade: data.localidade,
      bairro: data.bairro,
      endereco: data.logradouro,
    });
  };

  return (
    <div className="app">
      <form>
        <h2>DADOS PESSOAIS</h2>
        <hr />
        <div>
          <div className="row">
            <div>
              <label htmlFor="nome" className="required">
                Nome Completo
              </label>
              <input
                type="text"
                name="nome"
                id="nome"
                onChange={onFieldChange}
                value={state.nome}
              />
            </div>
            <div>
              <label htmlFor="nome" className="required">
                Cargo Pretendido
              </label>
              <input
                type="text"
                nome="cargo"
                id="cargo"
                onChange={onFieldChange}
                value={state.cargo}
              />
            </div>
          </div>

          <div className="row">
            <div>
              <label htmlFor="dataNacimento" className="required">
                Data de Nascimento
              </label>
              <input
                type="date"
                id="dataNacimento"
                name="dataNacimento"
                onChange={onFieldChange}
                value={state.dataNacimento}
              />
            </div>
            <div>
              <label htmlFor="estadoCivil">Estado Civil</label>
              <select
                id="estadoCivil"
                name="estadoCivil"
                onChange={onFieldChange}
                value={state.estadoCivil}
              >
                <option value=""></option>
                <option label="Trocar">Trocar</option>
                <option label="Trocar">Trocar</option>
                <option label="trocaaar">Trocar</option>
                <option label="essetambem">Trocar</option>
              </select>
            </div>
            <div>
              <label htmlFor="sexo">Sexo</label>
              <select
                id="sexo"
                name="sexo"
                onChange={onFieldChange}
                value={state.sexo}
              >
                <option value=""></option>
                <option label="Maculino">Masculino</option>
                <option label="Feminino">Feminino</option>
                <option label="Não especificado">Não Especificado</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div>
              <label htmlFor="endereco" className="required">
                Endereço
              </label>
              <input
                onChange={onFieldChange}
                value={state.endereco}
                type="text"
                name="endereco"
                id="endereco"
                placeholder="ex. Nome da Rua, 56, bloco 2, AP 259"
              />
            </div>
          </div>

          <div className="row">
            <div>
              <label htmlFor="bairro" className="required">
                Bairro
              </label>
              <input
                type="text"
                name="bairro"
                id="bairro"
                onChange={onFieldChange}
                value={state.bairro}
              />
            </div>
            <div>
              <label htmlFor="cidade" className="required">
                Cidade
              </label>
              <input
                type="text"
                name="cidade"
                id="cidade"
                onChange={onFieldChange}
                value={state.cidade}
              />
            </div>
          </div>

          <div className="row">
            <div>
              <label htmlFor="cep" className="required">
                CEP
              </label>
              <input
                type="text"
                name="cep"
                id="cep"
                onChange={onFieldChange}
                value={state.cep}
                onBlur={() => searchCep()}
              />
            </div>
            <div>
              <label htmlFor="telefone1">Telefone Fixo 1</label>
              <input
                type="text"
                name="telefone1"
                id="telefone1"
                onChange={onFieldChange}
                value={state.telefone1}
              />
            </div>
            <div>
              <label htmlFor="telefone2">Telefone Fixo 2</label>
              <input
                type="text"
                name="telefone2"
                id="telefone2"
                onChange={onFieldChange}
                value={state.telefone2}
              />
            </div>
          </div>

          <div className="row">
            <div>
              <label htmlFor="celular" className="required">
                Celular
              </label>
              <input
                type="text"
                name="celular"
                id="celular"
                onChange={onFieldChange}
                value={state.celular}
              />
            </div>
            <div>
              <label htmlFor="contato">Contato</label>
              <input
                type="text"
                name="contato"
                id="contato"
                onChange={onFieldChange}
                value={state.contato}
              />
            </div>
            <div>
              <label htmlFor="email" className="required">
                E-mail
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="ex. example@example.com"
                onChange={onFieldChange}
                value={state.email}
              />
            </div>
          </div>
        </div>

        <h2>DOCUMENTOS</h2>
        <hr />
        <div>
          <div className="row">
            <div>
              <label htmlFor="identidade" className="required">
                Identidade
              </label>
              <input
                type="text"
                name="identidade"
                id="identidade"
                onChange={onFieldChange}
                value={state.identidade}
              />
            </div>
            <div>
              <label htmlFor="cpf" className="required">
                CPF
              </label>
              <input
                type="text"
                name="cpf"
                id="cpf"
                onChange={onFieldChange}
                value={state.cpf}
              />
            </div>
            <div>
              <label htmlFor="veiculo">Possui Veículo</label>
              <select
                id="veiculo"
                name="veiculo"
                onChange={onFieldChange}
                value={state.veiculo}
              >
                <option value=""></option>
                <option label="Sim">Sim</option>
                <option label="Não">Não</option>
              </select>
            </div>
            <div>
              <label htmlFor="habilitação">Habilitação</label>
              <select
                id="habilitação"
                name="habilitacao"
                onChange={onFieldChange}
                value={state.habilitacao}
              >
                <option value=""></option>
                <option label="Sim">Sim</option>
                <option label="Não">Não</option>
              </select>
            </div>
          </div>
        </div>
        <div className="buttonSection">
          <button type="submit" onClick={onSubmit} className="button">
            ENVIAR
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
