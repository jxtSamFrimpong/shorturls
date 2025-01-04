import { useState } from 'react'

const FeatureCards = ({}) => {

    const [featuresData, setFeaturesData] = useState([
        {
            iconObject: {},
            featureHeader: "Shorten",
            description: "Create short links instantly"
        },
        {
            iconObject: {},
            featureHeader: "Measure",
            description: "Track and analyze your links"
        },
        {
            iconObject: {},
            featureHeader: "Optimize",
            description: "Improve your link performance"
        }
    ])

    console.log(`featured Data`, featuresData)

    return (
        <div class="features">
            {
                featuresData.map( i => {
                    console.log(`rendering one feature item ${i.featureHeader}`)
                    return (
                        <div className="feature-card" key={i.featureHeader}>
                            <div className="feature-icon"></div>
                            <div>
                                <h3>{i.featureHeader}</h3>
                                <p>{i.description}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}


export default FeatureCards