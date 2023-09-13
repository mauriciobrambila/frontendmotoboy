import { useState } from "react";
import { Form, Row, Col, Button, FormControl, FormLabel } from "react-bootstrap";
import React from "react";
import { urlBase } from "../assets/definicoes";
import InputMask from "react-input-mask";
import SelectionBox from "../componentes/busca/CaixaSelecao";

const boxcadall_style = {
    padding: '5px',
    borderRadius: '10px',
    border: '3px solid red',
    height: '345px'
}

export default function FormMotoBoy(props) {
    const [validado, setValidado] = useState(false);
    const [moto, setMoto] = useState(props.moto);
    const [entregaSelecionado, setEntregaSelecionado] = useState({});

    function manipulaMudanca(e) {
        const elementForm = e.currentTarget;
        const id = elementForm.id;
        const valor = elementForm.value;
        setMoto({ ...moto, [id]: valor });
    }

    function manipulaSbmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
                fetch(urlBase + "https://129.146.68.51/aluno45-pfsii/motos", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(moto)
                }).then((resposta) => {
                    return resposta.json();
                }).then((dados) => {
                    if (dados.status) {
                        props.setModoEdicao(false);
                        let motos = props.listaMotoBoy;
                        motos.push(moto);
                        props.exibirTabela(true);
                        window.location.reload();
                    }
                    window.alert(dados.mensagem);
                }).catch((erro) => {
                    window.alert("Erro ao executar a requisição: " + erro.message);
                })
            }
            else {

                fetch(urlBase +"https://129.146.68.51/aluno45-pfsii/motos",  {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(moto)
                }).then(() => {
                    props.setModoEdicao(false);
                    alert("Atualizado com sucesso!");
                    props.exibirTabela(true);
                }).then(() => {
                    window.location.reload();

                });
            }
            setValidado(false);
        }
        else {
            setValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <div style={boxcadall_style} >
           
            <Form noValidate validated={validado} onSubmit={manipulaSbmissao}>

                <Row>
                <Col>
                    <FormLabel>ID</FormLabel>
                        <FormControl
                            disabled
                            value={moto.ID}
                            id="ID"
                            >
                        </FormControl>
                </Col>

                    <Col>
                        <Form.Group className="mb-3" controlId="nome">
                            <Form.Label><strong>Nome Completo</strong></Form.Label>
                            <Form.Control type="text" placeholder="Nome Completo" required value={moto.nome} id="nome" onChange={manipulaMudanca} />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid"> Por Favor Informe o Nome Completo!</Form.Control.Feedback>
                    </Col>


                    <Col>
                        <Form.Group className="mb-3" controlId="cpf">
                        <Form.Label><strong>CPF</strong></Form.Label>
                            <InputMask mask="999.999.999-99" maskChar="" value={moto.cpf} 
                            onChange={manipulaMudanca}>
                    {() => <Form.Control type="text" placeholder="000.000.000-00" required id="cpf"/>}
            </InputMask>
                        <Form.Control.Feedback type="invalid"> Por Favor Informe o CPF!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3" controlId="endereco">
                            <Form.Label><strong>Endereço</strong></Form.Label>
                            <Form.Control type="text" placeholder="Av. Brasil " required value={moto.endereco} id="endereco" onChange={manipulaMudanca} />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">  Informe o endereço</Form.Control.Feedback>
                    </Col>
                </Row>

                <Row>
                   <Col>
                        <Form.Group className="mb-3" controlId="bairro">
                            <Form.Label><strong>Bairro</strong></Form.Label>
                            <Form.Control type="text" placeholder="Vila Brasil" required value={moto.bairro} id="bairro" onChange={manipulaMudanca} />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">Informe o bairro</Form.Control.Feedback>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="habilitacao">
                            <Form.Label><strong>Habilitacao</strong></Form.Label>
                            <Form.Control type="text" placeholder="0000000000/AA" required value={moto.habilitacao} id="habilitacao" onChange={manipulaMudanca} />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">Informe o numero da habilitação</Form.Control.Feedback>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3" controlId="fone">
                            <Form.Label><strong>Telefone</strong></Form.Label>
                            <Form.Control type="text" placeholder="(00) 00000-0000" required value={moto.fone} id="fone" onChange={manipulaMudanca} />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">Informe o telefone</Form.Control.Feedback>
                    </Col>
                    
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label><strong>Entrega</strong></Form.Label>
                            <SelectionBox
                            source={"https://129.146.68.51/aluno45-pfsii/entrega"}
                            dataKey={"ID"}
                            exhibitionField={"entrega"}
                            selectFunction={setEntregaSelecionado}/>
                        </Form.Group> 
                    </Col>

                </Row>

                <Row>

                </Row>

              <div className="btn-group" />
        <Row>
          <col-2>
            <center><div className="btn-group">
              <center>
                        <Button type="submit" variant="primary">{props.modoEdicao ? 'Atualizar' : 'Cadastrar'}</Button>
                        </center>
              <center>
                            <Button type="submit" variant="primary" onClick={() => {
                                props.exibirTabela(true);
                            }}>Voltar</Button>
                       </center>
            </div></center>
          </col-2>
                </Row>

            </Form>
        </div>
    );
}