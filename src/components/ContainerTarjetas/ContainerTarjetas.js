import React, { Component } from 'react';
import Tarjetas from '../Tarjetas/Tarjetas';
import "./styles.css"
import Form from '../Form/Form';


export default class ContainerTarjetas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tarjetas: [ ], // array de todas las pelis 
            filteredMovies: [ ], // pelis filtradas para eliminar 
            pagina: 2, //cuando agregamos mas pelis, vamos a la pagina 2. 
            orientacion: "container-row",
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
                    tarjetas: data.results,  // Results porque es la palabra que te da la API para devolverte los resultados de busqueda.
                    filteredMovies: data.results
                })
            })
            .catch(error => console.log(error));
    }

    // Metodo para cambiar orientacion 
    cambiarOrientacion(orientacion){
        if (orientacion == "columna"){
            this.setState({orientacion: "container-row"})
        } else{
            this.setState({orientacion: "container-column"})
        }

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

    // Llamamos a la API que agregara mas peliculas:
    addPelicula(){
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=274e06a482f13c5a152ff7abe7a3142a&language=en-US&page=' + this.state.pagina)
            .then(response => { return response.json() })
            .then(data => {
            //Lo que traemos del fetch se almacena en el estado (con setState) para luego ser accedido. 
            //A la información que obtengo la guardo en el estado dentro de una propiedad (tarjetas que contiene la informacion a mappear).
                this.setState({
                    pagina: this.state.pagina + 1,
                    tarjetas: this.state.tarjetas.concat(data.results),
                    filteredMovies: this.state.tarjetas.concat(data.results)
                })
                console.log(this.state.tarjetas)
            })
            .catch(error => console.log(error));
    }

    // Metodo que va a agregar mas peliculas
    mostrarContenido(){
        if(this.state.tarjetas.length !== 0){
            return(
                <div className= {this.state.orientacion}>
                {this.state.filteredMovies.map((tarjeta, index) => {
                        return <Tarjetas key={index}
                        title={tarjeta.title}
                        poster_path={tarjeta.poster_path}
                        overview = {tarjeta.overview}
                        release_date =  {tarjeta.release_date}
                        orientacion = {this.state.orientacion}
                        removerPelicula = {(title) => this.removerPelicula(title)} //paso una funcion para que elimine la peli. Recibe el id de cada peli. 
                        />
                    })
            }
            </div>)
        } else{
            return <h2>Cargando...</h2>
        }
    }

    filtrarPorNombre(title){
        const peliculasFiltradas = this.state.tarjetas.filter(tarjeta => tarjeta.title.toLowerCase().includes(title.toLowerCase())) // Si (title) esta incluido en el titulo de cualquiera de las tarjetas
        
        if(title === ""){
            this.setState({
                filteredMovies: this.state.tarjetas
            })
        } else {
            this.setState({
                filteredMovies: peliculasFiltradas
            })
        } 
    }


    render() {
        return (
            <div className= "container">
                <Form filtrarPorNombre={(title)=>{this.filtrarPorNombre(title)}}
                cambiarOrientacion={(orientacion)=>{this.cambiarOrientacion(orientacion)}}
                addPelicula={()=>(this.addPelicula())}
                />
                {this.mostrarContenido()}
                <footer>
            Victoria Duque -
           Tomas Salem -
           Maximo Chaio
             </footer>
            </div>
        )
    }
}