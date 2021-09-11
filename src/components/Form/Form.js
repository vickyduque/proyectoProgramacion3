import React, { Component } from 'react';

export default class Formulario extends Component {
    constructor (){
        super();
        //Valor inicial del estado
        this.state = {
            valorInput: ""
        }
    }

    prevenirSubmit(evento){
        evento.preventDefault();
    }

    capturaInput(evento){
        console.log(evento.target.value);
        this.setState({
            // .target.value nos dice que valor tiene nuestro input a medida que va cambiando
            valorInput: evento.target.value 
        },()=>this.props.filtrarPorNombre(this.state.valorInput))
    }

    render(){
        return(
            <form onSubmit={(evento)=> this.prevenirSubmit(evento)}>
                <label>Titulo: </label>
                {/* El evento onChange se va a disparar cuando hay un  cambio en el contenido del formulario*/}
                <input onChange={(evento)=> this.capturaInput(evento) } type="text" value={this.state.valorInput}/>
                
                <input type= "submit"/>
            </form>
        )
    }
}