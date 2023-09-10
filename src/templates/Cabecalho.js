import { Alert } from "react-bootstrap";

export default function Cabecalho(props){
    return(
        <div>
            <Alert variant='dark' className='text-center mb-0'><h2><strong>{props.texto}</strong></h2></Alert>
        </div>
    );
}