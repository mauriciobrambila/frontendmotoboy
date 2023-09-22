import { useState } from "react";
import { Button, Form, Row, Col, FormLabel, FormControl } from "react-bootstrap"
import React from "react";
import { urlBase } from "../assets/definicoes";
import SelectionBox from "../componentes/busca/CaixaSelecao";

const boxcadall_style = {
    padding: '5px',
    borderRadius: '10px',
    border: '3px solid black',
    height: '315px'
}

export default function FormMotoboy(props) {
    const [validado, setValidado] = useState(false);
    const [motoboy, setMotoboy] = useState(props.motoboy);
    const [entregaSelect, setEntregaSelecionado] = useState({});

    function manipulaMudanca(e) {
        const elementForm = e.currentTarget;
        const id = elementForm.id;
        const valor = elementForm.value;
        setMotoboy({ ...motoboy, [id]: valor });
    }

    function manipulaSbmissao(evento) {
        const form = evento.currentTarget;
        console.log(entregaSelect)
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                fetch(urlBase + "https://129.146.68.51/aluno45-pfsii/motoboy", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(entregaSelect)
                }).then((resposta) => {
                    return resposta.json();
                }).then((dados) => {
                    if (dados.status) {
                        props.setModoEdicao(false);
                        let motoboys = props.listaMotoboys;
                        motoboys.push(motoboy);
                        props.exibirTabela(true);
                        window.location.reload();
                    }
                    window.alert(dados.mensagem);
                }).catch((erro) => {
                    window.alert("Erro ao executar a requisição: " + erro.message);
                })
            }
            else {
                fetch(urlBase + "https://129.146.68.51/aluno45-pfsii/motoboy", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(entregaSelect)
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
        <div style={boxcadall_style}>
                    
            <Form noValidate validated={validado} onSubmit={manipulaSbmissao}>
                <Row>
                    <Col>
                        <FormLabel><strong>ID</strong></FormLabel>
                        <FormControl
                            disabled
                            value={motoboy.ID}
                            id="ID"
                        >
                        </FormControl>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label><strong>Nome do motoboy</strong></Form.Label>
                            <Form.Control type="text" placeholder="informe o nome do motoboy" required value={motoboy.nome} id="nome" onChange={manipulaMudanca} />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">Informe o nome Completo</Form.Control.Feedback>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label><strong>CPF</strong></Form.Label>
                            <Form.Control type="text" placeholder="000.000.000-00" required value={motoboy.cpf} id="cpf" onChange={manipulaMudanca} />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">Informe o CPF</Form.Control.Feedback>
                    </Col>
                 </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label><strong>Endereço</strong></Form.Label>
                            <Form.Control type="text" placeholder="Rua Rui Barbosa" required value={motoboy.endereco} id="endereco" onChange={manipulaMudanca} />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">Informe o endereço</Form.Control.Feedback>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label><strong>Bairro</strong></Form.Label>
                            <Form.Control type="text" placeholder="Centro" required value={motoboy.bairro} id="bairro" onChange={manipulaMudanca} />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid"> Informe o bairro</Form.Control.Feedback>
                    </Col>
                   
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label><strong>Habilitação</strong></Form.Label>
                            <Form.Control type="text" placeholder="0000000-AA" required value={motoboy.habilitacao} id="habilitacao" onChange={manipulaMudanca} />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">Informe o nº da habilitação</Form.Control.Feedback>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label><strong>Telefone</strong></Form.Label>
                            <Form.Control type="text" placeholder="(18)-11111-1111" required value={motoboy.fone} id="fone" onChange={manipulaMudanca} />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid"> Informe o telefone</Form.Control.Feedback>
                    </Col>
                                       
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label><strong>Entrega</strong></Form.Label>
                            <SelectionBox
                                source={"https://129.146.68.51/aluno45-pfsii/entrega/"}
                                dataKey={"ID"}
                                exhibitionField={"entrega"}
                                selectFunction={setEntregaSelecionado}
                                motoboy={motoboy}
                                entregaSelect={entregaSelect}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="btn-group" />
                <Row>
                <col-2>
                    <center><div className="btn-group">
                        <center><Button type="submit" variant="primary">{props.modoEdicao ? 'Atualizar' : 'Cadastrar'}</Button></center>
                        
                    <center><Button type="submit" variant="primary" onClick={() => {
                                props.exibirTabela(true);
                            }}>Voltar</Button></center>
                        </div></center>
                        </col-2>
                </Row>
            </Form>
        </div>
    );
}