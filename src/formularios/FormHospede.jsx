import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import ReactInputMask from "react-input-mask";
import { urlBase, urlBase3 } from '../utilitarios/definiçoes';
import CaixaSelecao from '../utilitarios/Combobox';

const boxcad_style = {
  padding: '2px',
  borderRadius: '10px',
  border: '2px solid black',
  width: '350px',
}

const boxcadall_style = {
  padding: '5px',
  borderRadius: '10px',
  border: '3px solid black',
  height: '450px'
}

export default function FormHospede(props) {
  const [validated, setValidated] = useState(false);
  const [hospede, setHospede] = useState(props.hospede);
  const [telefoneSelecionada, setTelefoneSelecionada] = useState({});

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setHospede({ ...hospede, [id]: valor });

  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
        if(!props.modoEdicao){
          fetch(urlBase, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(hospede),
          })
            .then((resposta) => {
              return resposta.json();
            })
            .then((dados) => {
                props.setModoEdicao(false);
                fetch(urlBase, { method: "GET" })
                .then((resposta) => {
                  return resposta.json();
                })
                .then((listaHospedes) => {
                  if (Array.isArray(listaHospedes)) {
                    props.setHospedes(listaHospedes);
                  }
                })
                .catch((erro) => {
                    window.alert("Erro ao obter a lista de hospedes: " + erro.message);
                });
              window.alert(dados.mensagem);
            })
            .catch((erro) => {
              window.alert("Erro ao executar a requisição: " + erro.message);
            });
        }
        else{
          fetch(urlBase, {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(hospede)
          }).then((resposta) => {
            return resposta.json();
          });
          window.alert("Atualizado com sucesso!");
          props.setModoEdicao(false);
          props.setHospede(true);
        }
        
      props.exibirTabela(true);
    }
    setValidated(true);
  }
  

  return (
    <Form className='mt-5' id='cadastroHospedes' noValidate validated={validated} onSubmit={handleSubmit} style={boxcadall_style}>
      <hr />
      <div className='d-flex justify-content-center'><Form.Label className="fs-3 justify-content-center d-flex" style={boxcad_style}><strong>Cadastro de Hospedes</strong></Form.Label></div>
      <hr />
      <Row className="mb-3">
        <Form.Group as={Col} md="6">
          <Form.Label><strong>Nome completo</strong></Form.Label>
          <Form.Control
            required
            type="text"
            value={hospede.nome}
            id="nome"
            onChange={manipularMudanca}
          />
          <Form.Control.Feedback type="invalid">
            Insira um nome
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6">
        <Form.Label><strong>Endereço</strong></Form.Label>
        <Form.Control
            required
            type="text"
            value={hospede.endereco}
            id="endereco"
            onChange={manipularMudanca}
          />
         
          <Form.Control.Feedback type="invalid">
            Informe o endereço
          </Form.Control.Feedback>
          </Form.Group>
      </Row>
     
      <Row className="mb-3">
        <Form.Group as={Col} md="4">
          <Form.Label><strong>CPF</strong></Form.Label>
          <ReactInputMask mask="999.999.999-99" maskChar="" value={hospede.cpf} onChange={manipularMudanca}>
            {() => <Form.Control type="text"
              placeholder="000.000.000-00"
              required
              id="cpf" />}
          </ReactInputMask>
          <Form.Control.Feedback type="invalid">
            Informe um CPF válido
          </Form.Control.Feedback>
        </Form.Group>
      
        <Form.Group as={Col} md="4">
          <Form.Label><strong>Telefone</strong></Form.Label>
          <ReactInputMask mask="(99) 99999-9999" maskChar="" value={hospede.fone} onChange={manipularMudanca}>
            {() => <Form.Control type="text"
              placeholder="(00)00000-0000"
              required
              min="0"
              id="fone" />}
          </ReactInputMask>
          <Form.Control.Feedback type="invalid">
            Informe o telefone
          </Form.Control.Feedback>
        </Form.Group>
     
        <Form.Group as={Col} md="4">
          <Form.Label><strong>ID</strong></Form.Label>
          <Form.Control
            placeholder="ID gerado apos cadastrar"
              disabled
              value={hospede.codigo}
              id="codigo" />
          <Form.Control.Feedback type="invalid">
            Informe o código do hospede
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
          <Form.Group as={Col} md="4">
          <Form.Label><strong>Data de Cadastro</strong></Form.Label>
          <Form.Control type="date"
            placeholder="00/00/0000"
            required
            value={hospede.dataCadastro}
            id="dataCadastro"
            onChange={manipularMudanca} />
          <Form.Control.Feedback type="invalid">
            Informe uma data válida!
          </Form.Control.Feedback>
        </Form.Group>

          <Form.Group as={Col} md="4">
          <Form.Label><strong>Telefones</strong></Form.Label>
          <CaixaSelecao endFonteDados={urlBase3}
                        campoChave={"codigoTel"}
                        campoExibicao={"descricao"}
                        funcaoSelecao={(itemSelecionado) => {
                          setTelefoneSelecionada(itemSelecionado);
                          setHospede({ ...hospede, codTelefone: itemSelecionado.codigoTel });
                        }}
                        id="codTelefone"
                        value={hospede.codTelefone}
          />
        </Form.Group>
     
        <Form.Group as={Col} md="2">
        <center>
          <Button variant="secondary" type="button" onClick={() => { props.exibirTabela(true)}}>Voltar</Button>
          <Button type="submit" md={{ offset: 5 }}>Cadastrar</Button>
        </center>
        </Form.Group>
      </Row>
    </Form>
  );
}
