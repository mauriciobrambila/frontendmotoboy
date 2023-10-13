import FormMotoboys from "../forms/FormMotoboy";
import Pagina from "../templates/pagina";
import TabelaMotoboys from "../tabelas/TabelaMotoboys";
import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { urlBase3 } from "../utilitarios/definicoes";

export default function TelaCadastro(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [motoboys, setMotoboys] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [motoboyEdicao, setMotoboyEdicao] = useState({
    nome: "",
    cpf: "",
    dataNasc: "",
    email: "",
    tel: "",
    sexo: "",
    cidade: "",
    uf: "",
   
  });

  function prepararTela(motoboy) {
    setModoEdicao(true);
    setMotoboyEdicao(motoboy);
    setExibirTabela(false);
  }

  function deletarMotoboy(motoboy) {
    fetch(urlBase3, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(motoboy),
    })
      .then((resposta) => {
        window.alert("Motoboy excluido com sucesso!");
        return resposta.json();
      })
      .then(window.location.reload());
  }

  useEffect(() => {
    fetch(urlBase3, {
      method: "GET",
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setMotoboys(dados);
        } else {
        }
      });
  }, []);

  return (
    <Pagina>
      <Container className="border">
        <Alert variant="success" className="text-center">
          <h4><strong>C a d a s t r os</strong></h4>
        </Alert>
        {exibirTabela ? (
          <TabelaMotoboys
            listaMotoboys={motoboys}
            setMotoboys={setMotoboys}
            exibirTabela={setExibirTabela}
            editar={prepararTela}
            deletar={deletarMotoboy}/>
        ) : (
          <div>
            {/* <BarraBusca
              placeHolder={"Informe sua busca"}
              dados={setListaDoacao}
              campoChave={"cpf"}
              campoBusca={ListaDoacao}
              funcaoSelecao={setDoacaoSelecionado}
              valor={doacaoSelecionado}
            /> */}
            <FormMotoboys
              listaMotoboys={motoboys}
              exibirTabela={setExibirTabela}
              setMotoboys={setMotoboys}
              editar={prepararTela}
              modoEdicao={modoEdicao}
              setModoEdicao={setModoEdicao}
              motoboy={motoboyEdicao}/>
          </div>
        )}
      </Container>
    </Pagina>
  );
}
