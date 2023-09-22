import { Container, Form } from "react-bootstrap";
import Cabecalho from "./Cabecalho";
import Menu from "./Menu";
import BarraBusca from "../componentes/busca/BarraBusca";
import { useState, useEffect } from "react";

export default function Pagina(props) {

    const [motoboySelecionado, setMotoboySelecionado] = useState({});
    const [formValido, setFormValido] = useState(false);
    const [listaMotoboys, setListaMotoboys] = useState([]);

    useEffect(() => {
        fetch("https://129.146.68.51/aluno45-pfsii/motoboy", { method: "GET" })
            .then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                setListaMotoboys(dados);
            });
    })

    function manipularSubmissao(evento) {
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            setFormValido(true);
        }
        else {
            setFormValido(false);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <>
               <Cabecalho texto="Central de motoboys"/>
            <Menu />
            <BarraBusca placeHolder={'Busque um nome no banco de dados'}
                dados={listaMotoboys}
                campoChave={"cpf"}
                campoBusca={"nome"}
                funcaoSelecao={setMotoboySelecionado}
                valor={""} />
                <Form noValidate validated={formValido} onSubmit={manipularSubmissao}></Form>
            <Container>{props.children}</Container>
        </>
    );
}