import { Container } from "react-bootstrap"
import { Cabecalho } from "./cabecalho.js"
import Menu from "./menu.js"

export default function Pagina(props){
return(
    <div>
        <Cabecalho texto = "Sistema para cadastramento de Entregadores e Mercadorias"/>
         <Menu/>
         <Container>
         {props.children}
         </Container>
    </div>
)
}