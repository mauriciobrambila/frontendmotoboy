import FormHospede from "../formularios/FormHospede";
import { Container } from "react-bootstrap";
import TabelaHospedes from "../tabelas/tabelaHospedes";
import { useState, useEffect } from "react";
import Pagina from "../templates/Pagina";
import { urlBase } from "../utilitarios/definiçoes";

export default function TelaCadastroHospedes(props){
    const [hospedes, setHospedes] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [hospedeEmEdicao, setHospedeEmEdicao] = useState({
        nome: "",
        endereco: "",
        cpf: "",
        codigo: "",
        fone: "",
        dataCadastro: "",
        codTelefone: ""
    });
    
    useEffect(()=>{
        fetch(urlBase, {method:"GET"})
        .then((resposta)=>{return resposta.json()})
        .then((dados)=>{
            if (Array.isArray(dados)){
                setHospedes(dados);
            }
            else{
                window.alert("Erro ao fazer requisição do dados! Tente novamente")
            }
        });
    },[]);

    function prepararHospedeEdicao(hospede){
        setModoEdicao(true);
        setHospedeEmEdicao(hospede);
        setExibirTabela(false);
    }
    
    function excluirHospede(hospede) {
        if (window.confirm("Confirmar exclusão?")) {
          fetch(urlBase, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(hospede)
          })
            .then((resposta) => resposta.json())
            .then((resposta) => {
              window.alert("Hospede excluído!");
      
              setHospedes((antigos) =>
                antigos.filter((v) => v.codigo !== hospede.codigo)
              );
            })
            .catch((erro) => {
              window.alert("Erro ao excluir hospede: " + erro.message);
            });
        }
      }
     
    return (
        <>
            {
                exibirTabela? 
                <Pagina>
                    <Container id="brasao">
                    <TabelaHospedes listaHospedes={hospedes}
                                        setHospedes={setHospedes}
                                        exibirTabela={setExibirTabela}
                                        editarHospede={prepararHospedeEdicao}
                                        excluir={excluirHospede}/> 
                    </Container>
                </Pagina>
                    :
                <Pagina>
                    <Container id="brasao">
                        <FormHospede listaHospedes={hospedes} 
                                        setHospedes={setHospedes} 
                                        exibirTabela={setExibirTabela} 
                                        modoEdicao={modoEdicao}
                                        setModoEdicao={setModoEdicao} 
                                        hospede={hospedeEmEdicao}
                                        />
                    </Container>
                 </Pagina>
            }
        </>      
    );
}   