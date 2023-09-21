import Pagina from "../templates/Pagina";
import FormEntrega from "../formularios/FormCadEntrega";
import TabelaEntrega from "../tabela/TabelaEntrega";
import { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";

export default function TelaCadEntrega(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [entregas, setEntregas] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [atualizando, setAtualizando] = useState(false);
    const [entregaEmEdicao, setEntregaEdicao] = useState({
        ID: '',
        entrega: '',
    })

    function edicaoEntrega(entrega) {
        setAtualizando(true);
        setEntregaEdicao(entrega);
        setExibirTabela(false);
        setModoEdicao(true);
    }

    function apagarEntrega(entrega) {
        fetch( "https://129.146.68.51/aluno45-pfsii/entrega", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entrega)
        }).then((resposta) => {
            return resposta.json();
        }).then((retorno) => {
            if (retorno.mensagem) {
                alert("Entrega excluído");
                setExibirTabela(true);
                window.location.reload();
            }
            else {
                alert("Não e possível excluir")

            }
        })
    }

    useEffect(() => {
        fetch( "https://129.146.68.51/aluno45-pfsii/entrega", {
            method: "GET"
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)) {
                setEntregas(dados);
            } 
            else {
            }
        });
    }, []);

    return (
        <Pagina>
            <Container className="border m-6">
                <Alert variant={""} className="text-center m-3">
                   <font size="5"><strong>Cadastro de Entregas</strong></font>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaEntrega
                            setEntregas={setEntregas}
                            listaEntrega={entregas}
                            exibirTabela={setExibirTabela}
                            editarEntrega={edicaoEntrega}
                            excluirEntrega={apagarEntrega}
                            setModoEdicao={setModoEdicao}
                            edicaoEntrega={setEntregaEdicao} />
                        :
                        <FormEntrega
                            listaEntrega={entregas}
                            setEntregas={setEntregas}
                            exibirTabela={setExibirTabela}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                            atualizando={atualizando}
                            entrega={entregaEmEdicao}
                            edicaoEntrega={setModoEdicao} />
                }
            </Container>
        </Pagina>
    );
}