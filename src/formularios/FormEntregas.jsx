import { useState } from "react";
import { Button, Form, Row, Col, Container, FormLabel, FormControl } from "react-bootstrap"
import React from "react";
import { urlBase } from "../assets/definicoes";

const boxcad_style = {
    padding: '2px',
    borderRadius: '10px',
    border: '2px solid black',
    width: '380px'
}
const boxcadall_style = {
    padding: '5px',
    borderRadius: '10px',
    border: '3px solid black',
    height: '325px'
}

export default function FormEntregas(props) {
    const [validado, setValidado] = useState(false);
    const [entrega, setEntrega] = useState(props.entrega);

    function manipulaMudanca(e) {
        const elementForm = e.currentTarget;
        const id = elementForm.id;
        const valor = elementForm.value;
        setEntrega({ ...entrega, [id]: valor });
    }

    function manipulaSbmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
                fetch(urlBase + "https://129.146.68.51/aluno45-pfsii/entrega", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(entrega)
                }).then((resposta) => {
                    return resposta.json();
                }).then((dados) => {
                    if (dados.status) {
                        props.setModoEdicao(false);
                        let entregas = props.listaEntregas;
                        entregas.push(entrega);
                        props.exibirTabela(true);
                        window.location.reload();
                    }
                    window.alert(dados.mensagem);
                }).catch((erro) => {
                    window.alert("Erro ao executar a requisição: " + erro.message);
                })
            }
            else {

                fetch(urlBase + "https://129.146.68.51/aluno45-pfsii/entrega", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(entrega)
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
            <Container className="text-center" style={boxcad_style}>
                <h3>Cadastro de Entregas</h3>
            </Container>
            <Form noValidate validated={validado} onSubmit={manipulaSbmissao}>
                <Row>
                    <Col>
                        <FormLabel>ID</FormLabel>
                        <FormControl
                            disabled
                            value={entrega.ID}
                            id="ID"
                        >
                        </FormControl>
                    </Col>

                </Row>

                <Row>

                <Col>
                        <Form.Group className="mb-3">
                            <Form.Label><strong>Entrega</strong></Form.Label>
                            <Form.Control type="text" placeholder="Digite o tipo de Entrega. ex: peças, lanches" required value={entrega.entrega} id="entrega" onChange={manipulaMudanca} />
                            <Form.Control.Feedback type="invalid"> Por Favor Informe a Entrega</Form.Control.Feedback>
                        </Form.Group>
                
                    </Col>
                    
                </Row>

                <Row>
                    <center><Col>
                        <Button type="submit" variant="primary">{props.modoEdicao ? 'Atualizar' : 'Cadastrar'}</Button>
                    </Col>
                        <Col>
                            <Button type="submit" variant="primary" onClick={() => {
                                props.exibirTabela(true);
                            }}>Voltar</Button>
                        </Col></center>
                </Row>
            </Form>
        </div>
    );
}