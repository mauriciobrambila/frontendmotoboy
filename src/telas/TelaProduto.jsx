import FormProduto from "../forms/FormProduto";
import Pagina from "../templates/pagina";
import TabelaProduto from "../tabelas/TabelaProduto";
import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { urlBase} from "../utilitarios/definicoes";

export default function TelaProduto(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [motoboyEdicao, setMotoboyEdicao] = useState({
    id:"",
    item: "",
    qtd: "",
    
  });

  function prepararTela(produto) {
    setModoEdicao(true);
    setMotoboyEdicao(produto);
    setExibirTabela(false);
  }

  function excluirMotoboy(produto) {
    fetch(urlBase, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    })
      .then((resposta) => {
        window.alert("Item excluido");
        return resposta.json();
      })
      .then(window.location.reload());
  }

  useEffect(() => {
    fetch(urlBase, {
      method: "GET",
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setProdutos(dados);
        } else {
        }
      });
  }, []);

  return (
    <Pagina>
      <Container className="border">
        <Alert variant="success" className="text-center">
        <h3><strong>Registre o tipo e a quantidade de produto</strong></h3>
        </Alert>
        {exibirTabela ? (
          <TabelaProduto
            listaProdutos={produtos}
            setProdutos={setProdutos}
            exibirTabela={setExibirTabela}
            editar={prepararTela}
            excluir={excluirMotoboy}/>
        ) : (
          <div>
           
            <FormProduto
              listaProdutos={produtos}
              exibirTabela={setExibirTabela}
              setProdutos={setProdutos}
              editar={prepararTela}
              modoEdicao={modoEdicao}
              setModoEdicao={setModoEdicao}
              produto={motoboyEdicao}/>
          </div>
        )}
      </Container>
    </Pagina>
  );
}
