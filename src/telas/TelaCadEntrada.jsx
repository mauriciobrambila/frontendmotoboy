import FormEntrada from "../formularios/FormEntrada";
import { Container } from "react-bootstrap";
import TabelaEntradas from "../tabelas/tabelaEntrada";
import { useState, useEffect } from "react";
import Pagina from "../templates/Pagina";
import { urlBase2 } from "../utilitarios/definiçoes";

export default function TelaCadastroEntradas(props){
    const [entradas, setEntradas] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [entradaEmEdicao, setEntradaEmEdicao] = useState({
        registro: "",
        listaHospede: [],
        data: "",
        horaEntrada: "",
        horaSaida: ""
    });
    
    useEffect(()=>{
        fetch(urlBase2, {method:"GET"})
        .then((resposta)=>{return resposta.json()})
        .then((dados)=>{
            if (Array.isArray(dados)){
                setEntradas(dados);
            }
            else{
                window.alert("Erro ao fazer requisição dos dados! Tente novamente")
            }
        });
    },[]);

    function prepararEntradaEdicao(entrada){
        setModoEdicao(true);
        setEntradaEmEdicao(entrada);
        setExibirTabela(false);
    }

    function excluirEntrada(entrada) {
        if (window.confirm("Confirmar exclusão?")) {
          fetch(urlBase2, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entrada),
          })
            .then((resposta) => resposta.json())
            .then((resposta) => {
              window.alert("Excluido com sucesso!");
      
              setEntradas((antigos) =>
                antigos.filter((a) => a.registro !== entrada.registro)
              );
            })
            .catch((erro) => {
              window.alert("Erro ao excluir : " + erro.message);
            });
        }
      }
      
    return (
        <>
            {
                exibirTabela? 
                <Pagina>
                    <Container id="brasao">
                    <TabelaEntradas listaEntradas={entradas}
                                        setEntradas={setEntradas}
                                        exibirTabela={setExibirTabela}
                                        editarEntrada={prepararEntradaEdicao}
                                        excluir={excluirEntrada}/> 
                    </Container>
                </Pagina>
                    :
                <Pagina>
                    <Container id="brasao">
                        <FormEntrada listaEntradas={entradas} 
                                        setEntradas={setEntradas} 
                                        exibirTabela={setExibirTabela} 
                                        modoEdicao={modoEdicao}
                                        setModoEdicao={setModoEdicao} 
                                        entrada={entradaEmEdicao}
                                        />
                    </Container>
                 </Pagina>
            }
        </>      
    );
}   