import { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
//import { IMaskInput } from "react-imask";
import { urlBase3 } from "../utilitarios/definicoes";

export default function FormMotoboys(props) {
  const [validado, setValidate] = useState(false);
  const [motoboy, setMotoboy] = useState(props.motoboy);

  function manipulaEvento(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setMotoboy({ ...motoboy, [id]: valor });
  }

  function manipulaSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      if (!props.modoEdicao) {
        fetch(urlBase3, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(motoboy),
        })
          .then((resposta) => {
            return resposta.json();
          })
          .then((dados) => {
            if (dados.status) {
              props.setModoEdicao(false);
              let novaLista = props.listaMotoboys;
              novaLista.push(motoboy);
              props.setMotoboys(novaLista);
              props.exibirTabela(true);
            }
            window.alert(dados.mensagem);
          })
          .catch((erro) => {
            window.alert("Erro ao executar a requisição: " + erro.message);
          });
      } else {
        fetch(urlBase3, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(motoboy),
        })
          .then((resposta) => {
            return resposta.json();
          })
          .then((dados) => {
            window.alert(dados.mensagem);
          })

          .then(window.location.reload());
      }

      setValidate(false);
    } else {
      setValidate(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
  }

  return (
    <Container className="bg-light">
      <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="nome">
              <Form.Label>Nome completo</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nome"
                value={motoboy.nome}
                id="nome"
                onChange={manipulaEvento}
              />

              <Form.Control.Feedback type="invalid">
              Informe o nome completo
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="cpf">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                required
                as={ ""}
                mask="000.000.000-00"
                placeholder="Digite o CPF"
                value={motoboy.cpf}
                id="cpf"
                onChange={manipulaEvento}
              />

              <Form.Control.Feedback type="invalid">
              Informe o CPF
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        
          <Col>
            <Form.Group className="mb-3" controlId="dataNasc">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                required
                type="date"
                value={motoboy.dataNasc}
                id="dataNasc"
                onChange={manipulaEvento}
              />

              <Form.Control.Feedback type="invalid">
                Por favor, informe a data!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          </Row>

         <Row>
          <Col>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                value={motoboy.email}
                id="email"
                onChange={manipulaEvento}
              />

              <Form.Control.Feedback type="invalid">
              Informe seu email
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        
          <Col>
            <Form.Group className="mb-3" controlId="tel">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                required
                type="text"
                as={" "}
                mask="(00) 00000-0000"
                placeholder="Telefone"
                value={motoboy.tel}
                id="tel"
                onChange={manipulaEvento}
              />

              <Form.Control.Feedback type="invalid">
                Por favor, um telefone para contato!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Sexo</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={motoboy.sexo}
                id="sexo"
                onChange={manipulaEvento}
              >
                <option null>Selecione uma opção</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Informe genero
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="cidade">
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Cidade"
                value={motoboy.cidade}
                id="cidade"
                onChange={manipulaEvento}
              />

              <Form.Control.Feedback type="invalid">
                Por favor, informe sua cidade!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Estado</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={motoboy.estado}
                id="uf"
                onChange={manipulaEvento}>
                <option null>Escolha o Estado</option>
                <option value="Acre">Acre</option>
                <option value="Alagoas">Alagoas</option>
                <option value="Amapá">Amapá</option>
                <option value="Amazonas">Amazonas</option>
                <option value="Bahia">Bahia</option>
                <option value="Ceará">Ceará</option>
                <option value="Distrito Federal">Distrito Federal</option>
                <option value="Espírito Santo">Espírito Santo</option>
                <option value="Goiás">Feminino</option>
                <option value="Maranhão">Maranhão</option>
                <option value="Mato Grosso">Mato Grosso</option>
                <option value="Mato Grosso do Sul">Mato Grosso do Sul</option>
                <option value="Minas Gerais">Minas Gerais</option>
                <option value="Pará">Pará</option>
                <option value="Paraíba">Paraíba</option>
                <option value="Paraná">Paraná</option>
                <option value="Pernambuco">Pernambuco</option>
                <option value="Piauí">Piauí</option>
                <option value="Rio de Janeiro">Rio de Janeiro</option>
                <option value="Rio Grande do Norte">Rio Grande do Norte</option>
                <option value="Rio Grande do Sul">Rio Grande do Sul</option>
                <option value="Rondônia">Rondônia</option>
                <option value="Roraima">Roraima</option>
                <option value="Santa Catarina">Santa Catarina</option>
                <option value="São Paulo">São Paulo</option>
                <option value="Sergipe">Sergipe</option>
                <option value="Tocantins">Tocantins</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Informe um estado
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <div className="btn-group"/>
        <Row>
          <col-2>
          <center><div className="btn-group">
          <center><Button type="submit"variant="primary">{props.modoEdicao ? 'Atualizar' : 'Cadastrar'}</Button></center> 
          <center><Button type="submit" variant="primary" onClick={() => {
                props.exibirTabela(true);
              }}>voltar</Button></center>
            </div></center>
          </col-2>
          </Row>
      </Form>
    </Container>
  );
}