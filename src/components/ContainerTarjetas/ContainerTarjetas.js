import React, { Component } from 'react';
import Tarjetas from '../Tarjetas/Tarjetas';
import "./styles.css"


export default class ContainerTarjetas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tarjetas: [ ], // array de todas las pelis 
            filteredMovies: [ ] // pelis filtradas para eliminar 
        }
    }

    // Pasamos la ulr de la API. 
    // Siempre el llamado a apis tiene que estar en un container y este hace el llamado despues a cada una de las tarjetas individualmente.
    componentDidMount() {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=274e06a482f13c5a152ff7abe7a3142a&language=en-US&page=1')
            .then(response => { return response.json() })
            .then(data => {
            //Lo que traemos del fetch se almacena en el estado (con setState) para luego ser accedido. 
            //A la información que obtengo la guardo en el estado dentro de una propiedad (tarjetas que contiene la informacion a mappear).
                this.setState({
                    tarjetas: data.results  // Results porque es la palabra que te da la API para devolverte los resultados de busqueda.
                })
            })
            .catch(error => console.log(error));
    }


     //Metodo que se llama cuando se hace clic en eliminar pelicula. 
     removerPelicula(title){      //Obtengo el titulo de la peli que quiero borrar del array. 
        //Quiero filtrar todas las peliculas que no tengan ese nombre. Permancen en el array aquellas peliculas que no tengan el nombre a filtrar 
       const peliculasFiltradas = this.state.tarjetas.filter(tarjeta => tarjeta.title !== title) //!== Significa distinto. 

       //Ultimo paso es setear el estado, asi no queda en la nada:
       this.setState({
           filteredMovies: peliculasFiltradas,
           tarjetas: peliculasFiltradas  //se vuelve a renderizar en pantalla. 
       })
    }

    render() {
        return (
            <div className= "container">
                {this.state.tarjetas.map((tarjeta, index) => {
                        return <Tarjetas key={index}
                        title={tarjeta.title}
                        poster_path={tarjeta.poster_path}
                        overview = {tarjeta.overview}
                        release_date =  {tarjeta.release_date}
                        removerPelicula = {(title) => this.removerPelicula(title)} //paso una funcion para que elimine la peli. Recibe el id de cada peli. 
                        />
                    })
                }
        
            </div>
        )
    }
}