import { useState } from 'react'
import FeatureItem from './FeatureItem'

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
        <div className="features">
            {
                featuresData.map( i => {
                    console.log(`rendering one feature item ${i.featureHeader}`)
                    return (
                        <FeatureItem iconObject={i.iconObject} featureHeader={i.featureHeader} description={i.description} key={i.featureHeader}/>
                    )
                })
            }
        </div>
    )
}


export default FeatureCards