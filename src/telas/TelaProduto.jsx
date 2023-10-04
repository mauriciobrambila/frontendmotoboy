import FormProduto from "../forms/FormProduto";
import Pagina from "../templates/pagina";
import TabelaProduto from "../tabelas/TabelaProduto";
import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { urlBase} from "../utilitarios/definicoes";

export default function TelProduto(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [entregas, setEntregas] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [motoboyEdicao, setMotoboyEdicao] = useState({
    id_produto:"",
    item: "",
    qtd: "",
    
  });

  function prepararTela(entrega) {
    setModoEdicao(true);
    setMotoboyEdicao(entrega);
    setExibirTabela(false);
  }

  function excluirMotoboy(entrega) {
    fetch(urlBase, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entrega),
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
          setEntregas(dados);
        } else {
        }
      });
  }, []);

  return (
    <Pagina>
      <Container className="border">
        <Alert variant="success" className="text-center">
        <h3><strong>Registre o tipo e a quantidade de entrega</strong></h3>
        </Alert>
        {exibirTabela ? (
          <TabelaProduto
            listaEntregas={entregas}
            setEntregas={setEntregas}
            exibirTabela={setExibirTabela}
            editar={prepararTela}
            excluir={excluirMotoboy}
          />
        ) : (
          <div>
           
            <FormProduto
              listaEntregas={entregas}
              exibirTabela={setExibirTabela}
              setEntregas={setEntregas}
              editar={prepararTela}
              modoEdicao={modoEdicao}
              setModoEdicao={setModoEdicao}
              entrega={motoboyEdicao}
            />
          </div>
        )}
      </Container>
    </Pagina>
  );
}
