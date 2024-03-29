import React, { Component } from 'react';
import "./style.css"

export default class Tarjetas extends Component {
    constructor(props){
        super(props);
        this.state = {
             clase: "none", //La idea es que no se muestre la descripcion al prinicpio. 
             mensaje: "Ver Más",
        }
    
    }

     //Metodo que se llama cuando se hace clic en ver mas. 
     handleShow(){
            if (this.state.clase === "none") { //si esta en none, la idea es que se cambie a block. 
                this.setState({
                    clase: "block",
                    mensaje: "Ver Menos"
                })
                } else {
                    this.setState({   // Si esta en block, al hacerle clic la idea es que se esconda. 
                        clase: "none",
                        mensaje: "Ver Más"
                    })
            }
        }
    
    render() {
        return (
            <div className= { `${this.props.orientacion + "-tarjeta"}`}>  {/* le pasamos 2 clases, template string */}

               <h4 className= "titulo"> {this.props.title} </h4>
               <h4 className="text2"> Fecha de estreno: {this.props.release_date} </h4>
               <div className= { `${this.props.orientacion + "-tarjeta2"}`}>

               <img alt='20' src={`https://image.tmdb.org/t/p/w342/${this.props.poster_path}`}></img>  {/* Se usan comillas invertidas, y $ Para llamar al valor*/}
                <br/>
                <h4 className="text" style={{display: this.state.clase }}> Descripción: {this.props.overview} </h4> {/* Usamos sintaxis de css, por eso la doble llave */}
                </div>
               <button className= "boton" onClick={() => this.handleShow()}> {this.state.mensaje} </button>  {/* agregamos evento onclick  */}
               <br/>
               <br/>
               <button className= "boton" onClick={()=> this.props.removerPelicula(this.props.title)}> Eliminar pelicula </button>
           
            </div>
        )
    }
}