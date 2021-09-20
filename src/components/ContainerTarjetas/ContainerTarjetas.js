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
            orientacion: "container-row", //por defecto es row. 
        }
    }

    // Pasamos la ulr de la API: adentro del container. 
    componentDidMount() {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=274e06a482f13c5a152ff7abe7a3142a&language=en-US&page=1') //se almacena con setState.
            .then(response => { return response.json() })
            .then(data => {
                this.setState({
                    tarjetas: data.results,  // Tarjetas contiene la info a mappear. Results es la palabra que te da la API para devolverte los resultados de busqueda.
                    filteredMovies: data.results
                })
            })
            .catch(error => console.log(error));
    }

    // Metodo para cambiar orientacion 
    cambiarOrientacion(orientacion){
        if (orientacion === "columna"){
            this.setState({orientacion: "container-row"})
        } else{
            this.setState({orientacion: "container-column"})
        }

    }
    ordenarABC(lista, orden) { //lista: es el parametro que uso para saber que lista ordenar (filteredmovies). orden: defino el orden ascendente
        this.setState({ //quiero modificar mi lista vieja
          filteredMovies: lista.sort(function (a, b) { //sort me devuelve una nueva lista ordenada
            if (a.title > b.title) { //si titulo de a es mas cercano a b en comparacion a z
              return orden === "ASC" ? 1 : -1; //el elemento más grande se acerque a la posicion 0, más arriba en el array.
            } else {
              return orden === "DESC" ? 1 : -1; //si esta en desc y b está más cerca de la letra a, lo quiero más cerca.
            }
          }),
        });
      }

     //Metodo para eliminar pelicula. 
     removerPelicula(title){      //Quiero el titulo de la peli para borrar. 
       const peliculasFiltradas = this.state.tarjetas.filter(tarjeta => tarjeta.title !== title) 
       //Ultimo paso es setear el estado: 
       this.setState({
           filteredMovies: peliculasFiltradas,
           tarjetas: peliculasFiltradas  //se vuelve a renderizar en pantalla. 
       })
    }

    // Llamamos a la API que agregara mas peliculas:
    addPelicula(){
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=274e06a482f13c5a152ff7abe7a3142a&language=en-US&page=' + this.state.pagina) //se almacena con setState.
            .then(response => { return response.json() })
            .then(data => {
                this.setState({
                    pagina: this.state.pagina + 1,
                    tarjetas: this.state.tarjetas.concat(data.results),
                    filteredMovies: this.state.tarjetas.concat(data.results)
                })
                console.log(this.state.tarjetas)
            })
            .catch(error => console.log(error));
    }

    // Metodo que va a mostrar mas peliculas
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
                        removerPelicula = {(title) => this.removerPelicula(title)} 
                        />
                    })
            }
            </div>)
        } else{
            return <h2>Cargando...</h2>
        }
    }

    //Metodo para que busque las peliculas
    filtrarPorNombre(title){  //Tenemos que hacer un filtro para filtrar los nombres de las pelis
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

    //Lo que se va a mostrar en pantalla:
    render() {
        return (
            <div className= "container">
                <div>
                    <button className= "boton" onClick={()=>this.ordenarABC(this.state.filteredMovies, "ASC")}>
                        A-Z
                    </button>
                    <button className= "boton" onClick={()=>this.ordenarABC(this.state.filteredMovies, "DESC")}>
                        Z-A
                    </button>
                </div>
                <Form filtrarPorNombre={(title)=>{this.filtrarPorNombre(title)}}
                cambiarOrientacion={(orientacion)=>{this.cambiarOrientacion(orientacion)}}
                addPelicula={()=>(this.addPelicula())}
                />
                {this.mostrarContenido()}

                <footer className= "footer">
                Integrantes: 
                Victoria Duque -
                Tomas Salem -
                Maximo Chaio :)
             </footer>
            </div>
        )
    }
}