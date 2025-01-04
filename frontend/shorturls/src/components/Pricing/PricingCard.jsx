const PricingCard = ({priceCategory, price, description}) => {
    return (
        <div className="pricing-card">
                    <h3>{priceCategory}</h3>
                    <div className="price">${price}<span>/URL</span></div>
                    <p>{description}</p>
                </div>
    )
}


export default PricingCard