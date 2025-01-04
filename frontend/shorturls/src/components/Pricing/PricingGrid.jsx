import { useState } from "react"
import PricingCard from "./PricingCard"

const PricingGrid = ({}) => {

    const [pricingData, setPricingData] = useState([
        {
            priceCategory: "BASIC", 
            price: 20,
            description: "One URL shorten per day"
        },
        {
            priceCategory: "ADVANCED", 
            price: 60,
            description: "Unlimited URL shortens per day"
        }
    ])

    return (
        <div className="pricing">
            <h2>The right plan for your needs</h2>
            <div className="pricing-grid">
                {
                    pricingData.map(i => {
                        return (
                            <PricingCard priceCategory={i.priceCategory} price={i.price} description={i.description}  key={i.priceCategory}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PricingGrid