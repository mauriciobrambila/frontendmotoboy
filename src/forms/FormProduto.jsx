import { useState, useEffect } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { urlBase, urlBase3 } from "../utilitarios/definicoes";
import BarraBusca from "./BarraBusca";

export default function FormProduto(props) {
  const [validado, setValidado] = useState(false);
  const [entrega, setEntrega] = useState(props.entrega);

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setEntrega({ ...entrega, [id]: valor });
  }

  function manipulaSumissao(evento) {
    const form = evento.currentTarget;

    if (form.checkValidity()) {
      const motoboy = {
        cpf: motoboySelecionado.cpf,
        nome: motoboySelecionado.nome,
      };
      const dadosEnvio = {
        item: entrega.item,
        qtd: entrega.qtd,
        cpf: entrega.cpfMotoboy,
        motoboy: motoboy,
      };
      if (!props.modoEdicao) {
        fetch(urlBase, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosEnvio),
        }).then((resposta) => {
          window.alert("Entrega registrada");
          window.location.reload();
          return resposta.json();
        });
      } else {
        dadosEnvio.id = entrega.id;
        fetch(urlBase, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosEnvio),
        }).then((resposta) => {
          window.alert("Entrega atualizada");
          window.location.reload();
          return resposta.json();
        });
      }
      setValidado(false);
    } else {
      setValidado(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
  }

  const [motoboySelecionado, setMotoboySelecionado] = useState({});
  const [listaMotoboys, setListaMotoboys] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlBase3, { method: "GET" });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data from API:", data);
        setListaMotoboys(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Form noValidate validated={validado} onSubmit={manipulaSumissao}>
        <Row>
          <Form.Group className="mb-3">
            <Form.Label>Motoboy</Form.Label>
            {}
            <BarraBusca
              placeHolder={"Informe um motoboy"}
              dados={listaMotoboys}
              campoChave={"cpf"}
              campoBusca={"nome"}
              funcaoSelecao={(motoboySelecionado) => {
                setMotoboySelecionado(motoboySelecionado);
                setEntrega({ ...entrega, motoboy: motoboySelecionado });
              }}
              valor={""}
            />
            {}
            {<br></br>}{<br></br>}
            <Form.Control.Feedback type="invalid">
             Insira um motoboy
            </Form.Control.Feedback>
              <Form.Control
              type="text"
              placeholder="Nome do motoboy"
              value={motoboySelecionado?.nome || ""}
              onChange={(e) => {

              }}
              />
               {<br></br>}
              <Form.Control
              type="text"
              placeholder="CPF do motoboy"
              value={motoboySelecionado?.cpf || ""}
              onChange={(e) => {

              }}
              />

            

          </Form.Group>

          <Col>
            <Form.Group className="mb-3" controlId="item">
              <Form.Label>Item a ser entregue</Form.Label>
              <Form.Control
                placeholder="Peças, etc, ....."
                value={entrega.item}
                id="item"
                onChange={manipularMudanca}
              />
              {(inputProps) => <Form.Control {...inputProps} />}

             
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="valorEntregue">
              <Form.Label>Quantidade de itens</Form.Label>
              <Form.Control
                type="int"
                placeholder="10"
                value={entrega.qtd}
                id="qtd"
                onChange={manipularMudanca}
              />
              
            </Form.Group>
          </Col>
        </Row>

        <div className="btn-group"/>
        <Row>
          <col-2>
          <center><div className="btn-group">
          <center><Button type="submit">Gravar</Button></center> 
          <center><Button type="button" onClick={() => {
                props.exibirTabela(true);
              }}>voltar</Button></center>
            </div></center>
          </col-2>
        </Row>
      </Form>
    </Container>
  );
}