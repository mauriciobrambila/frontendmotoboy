import Pagina from "../templates/Pagina";
import FormMotoboy from "../formularios/FormMotoboy";
import TabelaMotoboys from "../tabela/TabelaMotoboy";
import { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import { urlBase } from "../assets/definicoes";

export default function TelaCadMotoboy(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [motoboys, setMotoboys] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [atualizando, setAtualizando] = useState(false);
    const [motoboyEmEdicao, setMotoboyEdicao] = useState({
        ID: '',
        nome: '',
        cpf: '',
        endereco: '',
        bairro: '',
        habilitacao: '',
        fone: '',
    })

    function edicaoMotoboy(motoboy) {
        setAtualizando(true);
        setMotoboyEdicao(motoboy);
        setExibirTabela(false);
        setModoEdicao(true);
    }

    function apagarMotoboy(motoboy) {
        fetch(urlBase +"https://129.146.68.51/aluno45-pfsii/motoboy", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(motoboy)
        }).then((resposta) => {
            return resposta.json();
        }).then((retorno) => {
            if (retorno.mensagem) {
                alert("Motoboy excluído");
                setExibirTabela(true);
                window.location.reload();
            }
            else {
                alert("Não foi possível excluir")
                
            }
        })
    }

    useEffect(() => {
        fetch(urlBase + "https://129.146.68.51/aluno45-pfsii/motoboy", {
            method: "GET"
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)) {
                setMotoboys(dados);
            }
            else {

            }
        });
    }, []);

    return(
        <Pagina>
            <Container className="border m-6">
                <Alert variant={""} className="text-center m-3">
                    <font size="5"><strong>Cadastro de motoboys</strong></font></Alert>
                {
                    exibirTabela ?
                        <TabelaMotoboys 
                            listaMotoboys={motoboys}
                            setMotoboys={setMotoboys}
                            exibirTabela={setExibirTabela}
                            editarMotoboy={edicaoMotoboy}
                            excluirMotoboy={apagarMotoboy}
                            setModoEdicao={setModoEdicao}
                            edicaoMotoboy={setMotoboyEdicao} />
                        :
                        <FormMotoboy
                            listaMotoboys={motoboys}
                            setMotoboys={setMotoboys}
                            exibirTabela={setExibirTabela}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                            atualizando={atualizando}
                            motoboy={motoboyEmEdicao}
                            edicaoMotoboy={setModoEdicao} />
                }
            </Container>
        </Pagina>
    );
}    