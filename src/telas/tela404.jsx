import { Alert } from "react-bootstrap";
import Pagina from "../templates/pagina";

export default function Tela404(props) {
  return (
    <Pagina>
      <Alert className="text-center" variant="danger">
       <h1>Pagina em construçao, selecione no MENU</h1>
      </Alert>
    </Pagina>
  );
}
