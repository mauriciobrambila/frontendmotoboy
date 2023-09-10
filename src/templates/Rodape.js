import { Alert } from "react-bootstrap";
import React from "react";

export default function Rodape(props){
    const rodapeStyle = {
        position: 'absolute',
        width: '100%',
        height: '2.0rem', 
        padding: '0px',
        fontWeight: 'Semi Bold ',
        top: '720px'
    };
    return(
        <div>
            <Alert style={rodapeStyle} variant='dark' className='fixed-bottom  text-center mb-0'><h6><strong>
                {props.texto}</strong></h6></Alert>
        </div>
    );
}