import React, { Component } from 'react';
import Tarjetas from '../Tarjetas/Tarjetas';

export default class ContainerTarjetas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tarjetas: []
        }
    }

    componentDidMount() {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=274e06a482f13c5a152ff7abe7a3142a&language=en-US&page=1')
            .then(response => { return response.json() })
            .then(data => {
               

                //A la información que obtengo la guardo en el estado dentro de una propiedad
                this.setState({
                    tarjetas: data.results
                })
            })
            .catch(error => console.log(error));
    }
    render() {
        return (
            <div>
                {this.state.tarjetas.map((tarjeta, index) => {
                        return <Tarjetas key={index}
                        title={tarjeta.title}
                        backdrop_path={tarjeta.backdrop_path}
                        overview = {tarjeta.overview}
                        // removerPersonaje = {(name)=>this.removerPersonaje(name)}
                        />
                    })
                }
            </div>
        )
    }
}