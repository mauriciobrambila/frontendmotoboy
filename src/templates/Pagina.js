import { Container } from "react-bootstrap";
import Cabecalho from "./Cabecalho";
import Menu from "./Menu";

export default function Pagina(props) {
    return(
        <>
            <Cabecalho texto="Hotel Palace" />
            <Menu />
            <Container>{props.children}</Container>
        </>
    );

}