import React, { Component } from 'react';

//Componente de presentación (sin lógica)
export default class Tarjetas extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
               <h4> {this.props.title} </h4>
               <img alt='20' src={`https://image.tmdb.org/t/p/w500/${this.props.backdrop_path}`}></img>
               <h4> Descripcion: {this.props.overview}</h4>
               <button>Ver mas</button>
               <button onClick={() => this.handleShow()}>Ver más</button>
               {/* <button onClick={()=> this.props.removerPersonaje(this.props.name)}> Eliminar pelicula</button> */}
            </div>
        )
    }
}