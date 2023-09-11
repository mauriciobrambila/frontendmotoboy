import { Button, Container, Table, Row, Col, Form } from "react-bootstrap";
import { urlBase } from "../assets/definicoes";



export default function TabelaMotoBoy(props) {

    function filtraMotoBoy(e) {
        const termoBusca = e.currentTarget.value;

        fetch(urlBase + "https://129.146.68.51/aluno45-pfsii/motos",  { method: "GET" })
            .then((resposta) => { return resposta.json() })
            .then((listaMotoBoy) => {
                if (Array.isArray(listaMotoBoy)) {
                    const resultado = listaMotoBoy.filter((moto) => moto.nome.toLowerCase().includes(termoBusca.toLowerCase()));
                    props.setMotos(resultado);
                }
            });
    }



    return (
        <Container>

            <Container className="m-3">
                <Row>
                    <Col>
                        <Form.Control type="text" id="termoBusca" onChange={filtraMotoBoy} placeholder= "Busque um Nome listado abaixo" />
                    </Col>

                </Row>
            </Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Endereco</th>
                        <th>Bairro</th>
                        <th>Habilitação</th>
                        <th>Fone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listaMotoBoy?.map((moto) => {
                            return <tr key={moto.ID}>
                                <td>{moto.ID}</td>
                                <td>{moto.nome}</td>
                                <td>{moto.cpf}</td>
                                <td>{moto.endereco}</td>
                                <td>{moto.bairro}</td>
                                <td>{moto.habilitacao}</td>
                                <td>{moto.fone}</td>
                                <td>
                                    <Button onClick={() => { props.editarMoto(moto) }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </Button>

                                    {' '}

                                    <Button variant="danger" onClick={() => {
                                        if (window.confirm('Confirma a Exclusão da moto?')) {
                                            props.excluirMoto(moto);
                                        }
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                    </Button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>

           <center><Button className="mb-4 mt-2"
                onClick={() => {
                    props.exibirTabela(false);

                }}>
                Cadastrar motoboy
            </Button></center>

        </Container>
    );
}