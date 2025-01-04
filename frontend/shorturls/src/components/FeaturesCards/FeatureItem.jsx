const FeatureItem = ({iconObject, featureHeader, description}) => {

    
    console.log(`gotten iconObject`, iconObject)
    console.log(`gotten featureHeader`, featureHeader)
    console.log(`gotten description`, description)

    return (
        <div className="feature-card">
                <div className="feature-icon"></div>
                <div>
                    <h3>{featureHeader}</h3>
                    <p>{description}</p>
                </div>
            </div>
    )
}

export default FeatureItem