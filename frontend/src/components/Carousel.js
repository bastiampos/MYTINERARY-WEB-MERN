import {useEffect, useRef} from 'react'

const Carousel = () => {
    const ciudades = [
                {slide: '1', ciudades:[{id: '1', nombre: 'Paris', pais: 'France', foto: './assets/paris.jpg'},
                                            {id: '2', nombre: 'New York', pais: 'United States', foto: './assets/newyork.jpg'},
                                            {id: '3', nombre: 'London', pais: 'England', foto: './assets/london.jpg'},
                                            {id: '4', nombre: 'Bangkok', pais: 'Thailand', foto: './assets/bangkok.jpg'}]
                },

                {slide: '2', ciudades:[{id: '5', nombre: 'Hong Kong', pais: 'China', foto: './assets/hongkong.jpg'},
                                            {id: '6', nombre: 'Dubai', pais: 'United Arab Emirates', foto: './assets/dubai.jpg'},
                                            {id: '7', nombre: 'Singapore', pais: 'Singapore', foto: './assets/singapore.jpg'},
                                            {id: '8', nombre: 'Rome', pais: 'Italy', foto: './assets/rome.jpg'}]
                },

                {slide: '3', ciudades:[{id: '9', nombre: 'Macau', pais: 'China', foto: './assets/macau.jpg'},
                                            {id: '10', nombre: 'Istanbul', pais: 'Turkey', foto: './assets/istanbul.jpg'},
                                            {id: '11', nombre: 'Kuala Lumpur', pais: 'Malaysia', foto: './assets/kualalumpur.jpg'},
                                            {id: '12', nombre: 'Delhi', pais: 'India', foto: './assets/delhi.jpg'}]
                }   
            ]
    const slideshow = useRef(null)

    const proximo = () => {
        const primerSlide = slideshow.current.children[0]
        slideshow.current.style.transition = `2000ms ease-out all`
        const tamañoSlide = primerSlide.offsetWidth
        slideshow.current.style.transform = `translateX(-${tamañoSlide}px)`

        const transicionProxima = () => {
            slideshow.current.style.transition = `none`
            slideshow.current.style.transform = `translateX(0)`
            slideshow.current.appendChild(primerSlide)
            slideshow.current.removeEventListener('transitionend', transicionProxima)
        }
        slideshow.current.addEventListener('transitionend', transicionProxima)
    }

    const anterior = () => {
        const primerSlide = slideshow.current.children[0]
        const ultimoSlide = slideshow.current.children[slideshow.current.children.length-1]
        slideshow.current.insertBefore(ultimoSlide, primerSlide) 

        const tamañoSlide = primerSlide.offsetWidth
        slideshow.current.style.transition = `none`
        slideshow.current.style.transform = `translateX(-${tamañoSlide}px)`

        setTimeout( () => {
            slideshow.current.style.transition = `2000ms ease-out all`
            slideshow.current.style.transform = `translateX(0)`
        }, 30)
    }

    

    useEffect( () => {
        let intervalo = setInterval( () => {
            proximo()
        }, 5000)

        return () => {
            clearInterval(intervalo)
        }
    }, [])


    return (
            <div className="main-carousel">
                <div className="carousel-title">
                    <h3>Popular MyTineraries</h3>
                </div>
                <div className="carousel-container">
                    <div className="slides-container" ref={slideshow}>
                        {ciudades.map( (slide) => (
                            <div key={slide.slide} className="slide">
                                {slide.ciudades.map( (ciudad) => (
                                    <div key={ciudad.id} className="carousel-card">
                                        <div key={ciudad.id} className="city-photo-carousel" style={{backgroundImage: `url("${ciudad.foto}")`}}>
                                            <div className="arrow-top-carousel"></div>
                                        </div>
                                        <div className="info-card-carousel">
                                            <p>{ciudad.nombre}</p>
                                            <span>{`City in ${ciudad.pais}`}</span>
                                        </div>
                                    </div>))}
                            </div>))}
                    </div>
                </div>
                <div className="buttons-carousel">
                    <div className="arrows-carousel previous" onClick={anterior}>
                        <p>{'<'}</p>
                    </div>
                    <div className="arrows-carousel next" onClick={proximo}>
                        <p>{'>'}</p>
                    </div>
                </div>
            </div>
        )
}

export default Carousel
