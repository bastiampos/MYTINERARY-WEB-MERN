const CardCity = (props) => {
    const {city} = props
    const {name, country, description, haveSea, currency, lenguage} = city
    return (
        <>
            <div className="divided-column-infocity">
                <div className="aside-infocity">
                    <div style={{backgroundImage: `url("/assets/${props.city.src}")`}}></div>
                </div>
                <div className="right-column-infocity-container">
                    <div className="card-infocity-container">
                        <h3>{name}<span>, city in {country}</span></h3>
                        <p>{description}</p>
                    </div>
                    <div className="items-card-infocity-container">
                        <div className="item-info-card">
                            <img alt="Has sea" src="/assets/wave.svg" />
                            <div>
                                <span>Has sea: </span>
                                <p>{ haveSea ? 'Yes' : 'No'}</p>
                            </div>
                        </div>
                        <div className="item-info-card">
                            <img alt="currency" src="/assets/dollar.svg" />
                            <div>
                                <span>Currency:</span>
                                <p>{currency}</p>
                            </div>
                        </div>
                        <div className="item-info-card">
                            <img alt="language" src="/assets/traducir.svg" />
                            <div>
                                <span>Language: </span>
                                <p>{lenguage}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="photo-city-infocity-responsive" style={{backgroundImage: `url("/assets/${props.city.src}")`}}></div>
        </>
    )
}

export default CardCity