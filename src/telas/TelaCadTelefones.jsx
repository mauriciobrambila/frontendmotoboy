import FormTelefones from "../formularios/FormTelefone";
import { Container } from "react-bootstrap";
import TabelaTelefones from "../tabelas/tabelaTelefones";
import { useState, useEffect } from "react";
import Pagina from "../templates/Pagina";
import { urlBase3 } from "../utilitarios/definiçoes";

export default function TelaCadastroTelefones(props){
    const [telefones, setTelefones] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [telefoneEmEdicao, setTelefoneEmEdicao] = useState({
        codigoTel: "",
        descricao: ""
    });
 
    useEffect(()=>{
        fetch(urlBase3, {method:"GET"})
        .then((resposta)=>{return resposta.json()})
        .then((dados)=>{
            if (Array.isArray(dados)){
                setTelefones(dados);
            }
            else{
                window.alert("Erro ao fazer requisição do dados! Tente novamente")
            }
        });
    },[]);

    function prepararTelefoneEdicao(telefone){
        setModoEdicao(true);
        setTelefoneEmEdicao(telefone);
        setExibirTabela(false);
    }
    
    function excluirTelefone(telefone) {
        if (window.confirm("Confirmar exclusão?")) {
          fetch(urlBase3, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(telefone)
          })
            .then((resposta) => resposta.json())
            .then((resposta) => {
              window.alert("Telefone excluído!");
      
              setTelefones((antigos) =>
                antigos.filter((c) => c.codigoTel !== telefone.codigoTel)
              );
            })
            .catch((erro) => {
              window.alert("Erro ao excluir o telefone: " + erro.message);
            });
        }
      }

    return (
        <>
            {
                exibirTabela? 
                <Pagina>
                    <Container id="brasao">
                    <TabelaTelefones listaTelefones={telefones}
                                        setTelefones={setTelefones}
                                        exibirTabela={setExibirTabela}
                                        editarTelefone={prepararTelefoneEdicao}
                                        excluir={excluirTelefone}/> 
                    </Container>
                </Pagina>
                    :
                <Pagina>
                    <Container id="brasao">
                        <FormTelefones listaTelefones={telefones} 
                                        setTelefones={setTelefones} 
                                        exibirTabela={setExibirTabela} 
                                        modoEdicao={modoEdicao}
                                        setModoEdicao={setModoEdicao} 
                                        telefone={telefoneEmEdicao}
                                        />
                    </Container>
                 </Pagina>
            }
        </>      
    );
}    