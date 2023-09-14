import { Container, Form } from "react-bootstrap";
import Cabecalho from "./Cabecalho";
import Menu from "./Menu";
import Rodape from "./Rodape";
import BarraBusca from "../componentes/busca/BarraBusca";
import {useState, useEffect} from "react";

export default function Pagina(props) {

    const [setMotosSelecionado] = useState({});
        const [formValido, setFormValido] = useState(false);
        const [listaMotos, setListaMotos] = useState([]);

        useEffect(() => {
            fetch("http://129.146.68.51/aluno45-pfsii/motos", { method: "GET" })
                .then((resposta) => {
                    return resposta.json();
                }).then((dados) => {
                    setListaMotos(dados);
                });
        })
      
        function manipularSubmissao(evento) {
          const formulario = evento.currentTarget;
          if (formulario.checkValidity()){
             setFormValido(true);
          }
          else{
            setFormValido(false);
          }
          evento.preventDefault();
          evento.stopPropagation();
        }

    return(
        <>
           <Cabecalho texto="Central de Motoboys" />
            <Rodape texto="POLITICA DE PRIVACIDADE! Mauricio Brambila. TODOS OS DIREITO RESERVADOS" />
            <Menu />

            <BarraBusca placeHolder={'Informe um nome para buscar no banco de dados'}
                dados={listaMotos}
                campoChave={"cpf"}
                campoBusca={"nome"}
                funcaoSelecao={setMotosSelecionado}
                valor={""} />
                <Form noValidate validated={formValido} onSubmit={manipularSubmissao}></Form>
                
            <Container>{props.children}</Container>
        </>
    );
}