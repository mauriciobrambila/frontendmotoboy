import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { urlBase3 } from '../utilitarios/definiçoes';

const boxcad_style = {
  padding: '2px',
  borderRadius: '10px',
  border: '2px solid black',
  width: '300px',
}

const boxcadall_style = {
  padding: '5px',
  borderRadius: '10px',
  border: '3px solid black',
  height: '400px'
}

export default function FormTelefone(props) {
  const [validated, setValidated] = useState(false);
  const [telefone, setTelefone] = useState(props.telefone);

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setTelefone({ ...telefone, [id]: valor });
}

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
        if(!props.modoEdicao){
          fetch(urlBase3, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(telefone),
          })
            .then((resposta) => {
              return resposta.json();
            })
            .then((dados) => {
                props.setModoEdicao(false);
                fetch(urlBase3, { method: "GET" })
                .then((resposta) => {
                  return resposta.json();
                })
                .then((listaTelefones) => {
                  if (Array.isArray(listaTelefones)) {
                    props.setTelefones(listaTelefones);
                  }
                })
                .catch((erro) => {
                    window.alert("Erro ao obter a lista de telefones: " + erro.message);
                });
              window.alert(dados.mensagem);
            })
            .catch((erro) => {
              window.alert("Erro ao executar a requisição: " + erro.message);
            });
        }
        else{
          fetch(urlBase3, {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(telefone)
          }).then((resposta) => {
            return resposta.json();
          });
          window.alert("Atualizado com sucesso!");
          props.setModoEdicao(false);
          props.setTelefone(true);
        }
        
      props.exibirTabela(true);
    }
    setValidated(true);
  }
  
  return (
    <Form className='mt-5' id='cadastroTelefones' noValidate validated={validated} onSubmit={handleSubmit} style={boxcadall_style}>
      <hr />
      <div className='d-flex justify-content-center'><Form.Label className="fs-3 justify-content-center d-flex" style={boxcad_style}><strong>Registre um telefone</strong></Form.Label></div>
      <hr />

      <Row className="mb-3">
        <Form.Group as={Col} md="4">
          <Form.Label><strong>ID</strong></Form.Label>
          <Form.Control
            placeholder="ID gerado apos incluir um telefone "
              disabled
              value={telefone.codigoTel}
              id="codigoTel" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6">
          <Form.Label><strong>Telefone com prefixo</strong></Form.Label>
          <Form.Control
           placeholder="EX: 00-99999-9999"
            required
            type="text"
            value={telefone.descricao}
            id="descricao"
            onChange={manipularMudanca}
          />
          <Form.Control.Feedback type="invalid">
            Informe um valor 
                      </Form.Control.Feedback>
        </Form.Group>
      </Row>
     
      <Row>
        <center>
          <Button variant="secondary" type="button" onClick={() => { props.exibirTabela(true)}}>Voltar</Button>
       
          <Button type="submit" md={{ offset: 5 }}>Cadastrar</Button>
          </center>
      </Row>
      
    </Form>   
  );      
}
