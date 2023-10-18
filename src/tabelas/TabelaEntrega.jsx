import { Table, Button, Form, Container } from "react-bootstrap";
import { urlBase2 } from "../utilitarios/definiçoes";

export default function TabelaEntregas(props){
    function filtrarEntregas(e) {
        const termoBusca = e.currentTarget.value.toLowerCase();
           fetch(urlBase2 + "http://localhost:3000/entrega", { method: "GET" })
          .then((resposta) => resposta.json())
          .then((listaEntregas) => {
            if (Array.isArray(listaEntregas)) {
                const resultado = listaEntregas.filter((entrega) => {
                const data = entrega.data.toLowerCase();
                 return data.includes(termoBusca);
              });
              props.setEntregas(resultado);
            }
          });
      }
    
    return(
        <Container className="mt-5 mb-5">
            <h3 className="d-flex justify-content-center align-items-center"><strong>Entregas confirmadas</strong></h3>
            <h6>Pesquise pela data</h6>
            <Container className="d-flex mt-2 mb-1">
                <Form.Control type="date"
                                id="termoBusca"
                                placeholder="aaaa-mm-dd"
                                onChange={filtrarEntregas}>
                </Form.Control>
            </Container>
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>ID</th>
                <th><center>Nome do entregador</center></th>
                <th><center>Data do pedido</center></th>
                <th><center>Hora do pedido</center></th>
                <th><center>Hora de entrega</center></th>
                <th><center>Ações</center></th>
                </tr>
            </thead>
            <tbody>
            {
                props.listaEntregas?.map((entrega) => {

                    let dataDMA = entrega.data;
                    let partesData = dataDMA.split("-");
                    let dataFormatada = `${partesData[2]}/${partesData[1]}/${partesData[0]}`;
                    return <tr key={entrega.registro}>
                            <td>{entrega.registro}</td>
                            <td>
                                {entrega.motoboys.map((motoboy, index) => (
                                    <span key={motoboy.motoboy.codigo}>
                                        {motoboy.motoboy.nome}
                                        {index < entrega.motoboys.length - 1 ? <br/>  : ''}
                                    </span>
                                ))}
                            </td>
                            <td>{dataFormatada}</td>
                            <td>{entrega.horaEntrada}</td>
                            <td>{entrega.horaSaida}</td>
                            <td>
                                <div className="d-flex">
                                    <Button variant="info" onClick={()=>{ props.editarEntrega(entrega) }}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                            </svg> </Button>
                                    <Button variant="danger" onClick={()=>{ props.excluir(entrega) }} className="ms-2"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                            </svg> </Button>
                                </div>
                            </td>
                        </tr>
                })
            }
            
            </tbody>
            </Table>
           
                <center><Button onClick={() => {
                    props.exibirTabela(false);
                }} variant="primary">Entregar</Button></center>
           </Container>
        
  );
}