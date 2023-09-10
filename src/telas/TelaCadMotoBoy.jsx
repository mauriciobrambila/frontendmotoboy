import FormMotoBoy from "../formularios/FormCadMotoBoy";
import Pagina from "../templates/Pagina";
import TabelaMotoBoy from "../tabela/TabelaMotoBoy";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { urlBase } from "../assets/definicoes";

export default function TelaCadMotoBoy(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [motos, setMotos] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [atualizando, setAtualizando] = useState(false);
    const [motoEmEdicao, setMotoEdicao] = useState({
        ID: '',
        nome: '',
        cpf: '',
        endereco: '',
        bairro: '',
        habilitacao: '',
        fone: '',
    })

    function edicaoMoto(moto) {
        setAtualizando(true);
        setMotoEdicao(moto);
        setExibirTabela(false);
        setModoEdicao(true);
    }

    function apagarMoto(moto) {
        fetch(urlBase + "https://129.146.68.51/aluno45-pfsii/motos",  {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(moto)
        }).then((resposta) => {
            return resposta.json();
        }).then((retorno) => {
            if (retorno.mensagem) {
                alert("MotoBoy excluído");
                setExibirTabela(true);
                window.location.reload();
            }
            else {
                alert("Não foi possível excluir")
                
            }
        })
    }

    useEffect(() => {
        fetch(urlBase + "https://129.146.68.51/aluno45-pfsii/motos",  {
            method: "GET"
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)) {
                setMotos(dados);
            }
            else {

            }
        });
    }, []);

    return (
        <Pagina>
            <Container className="border m-6">
                
                   

                {
                    exibirTabela ?
                        <TabelaMotoBoy
                            setMotos={setMotos}
                            listaMotoBoy={motos}
                            exibirTabela={setExibirTabela}
                            editarMoto={edicaoMoto}
                            excluirMoto={apagarMoto}
                            setModoEdicao={setModoEdicao}
                            edicaoMotos={setMotoEdicao}
                        />
                        :
                        <FormMotoBoy
                            setMotos={setMotos}
                            listaMotoBoy={motos}
                            exibirTabela={setExibirTabela}
                            modoEdicao={modoEdicao}
                            setModoEdicao={setModoEdicao}
                            atualizando={atualizando}
                            moto={motoEmEdicao}
                            edicaoMoto={setModoEdicao}
                        />
                }
            </Container>

        </Pagina>
    );
}