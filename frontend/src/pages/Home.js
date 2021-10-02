import Carousel from '../components/Carousel'
import HeroHome from '../components/HeroHome'


const Home = () => {
    {document.title = 'MyTinerary'}

    return (
        <>
            <div className="hero-home-container">
                <HeroHome />
                <video autoPlay loop muted>
                    <source src="./assets/video1.mp4" type="video/mp4" />
                </video>
            </div>
            <main className="main-home">
                <Carousel />
            </main>
        </>
    )
}

export default Home

