import React, { Component } from 'react';

//Componente de presentación (sin lógica)
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
            if (this.state.clase === "none") { //si esta en hide, la idea es que se cambie a show. 
                this.setState({
                    clase: "block",
                    mensaje: "Ver Menos"
                })
                } else {
                    this.setState({   //si no esta en hide, esta en show. SI esta en show, al hacerle clic la idea es que se esconda. 
                        clase: "none",
                        mensaje: "Ver Mas"
                    })
            }
        }

       

    render() {
        return (
            <div>
               <h4> {this.props.title} </h4>
               <h4> Fecha de estreno: {this.props.release_date} </h4>
               <img alt='20' src={`https://image.tmdb.org/t/p/w342/${this.props.backdrop_path}`}></img>
               
                <br/>
                <h4 style={{display: this.state.clase }}> {this.props.overview} </h4>
               <button onClick={() => this.handleShow(this.props.overview)}> {this.state.mensaje} </button>  {/* agregamos evento onclick  */}

               <button onClick={()=> this.props.removerPelicula(this.props.title)}> Eliminar pelicula </button>
           
            </div>
        )
    }
}