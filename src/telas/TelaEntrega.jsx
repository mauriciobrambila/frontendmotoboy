import FormEntrega from "../forms/FormEntrega";
import Pagina from "../templates/pagina";
import TabelaEntrega from "../tabelas/TabelaEntrega";
import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { urlBase2} from "../utilitarios/definicoes";


export default function TelaEntrega(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [entregas, setEntregas] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [motoboyEdicao, setMotoboyEdicao] = useState({
    valorEntregue: "",
    itemEntregue: "",
    nome: "",
  });

  function prepararTela(entrega) {
    setModoEdicao(true);
    setMotoboyEdicao(entrega);
    setExibirTabela(false);
  }

  function excluirMotoboy(entrega) {
    fetch(urlBase2, {
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
    fetch(urlBase2, {
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
        <h3><strong><Alert variant="success" className="text-center">
          Registre a entrega e a taxa
        </Alert></strong></h3>
        {exibirTabela ? (
          <TabelaEntrega
            listaEntregas={entregas}
            setEntregas={setEntregas}
            exibirTabela={setExibirTabela}
            editar={prepararTela}
            excluir={excluirMotoboy}
          />
        ) : (
          <div>
           
            <FormEntrega
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
