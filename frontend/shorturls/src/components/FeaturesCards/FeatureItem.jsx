const FeatureItem = ({iconObject, featureHeader, description}) => {
    return (
        <div class="feature-card">
                <div class="feature-icon"></div>
                <div>
                    <h3>{featureHeader}</h3>
                    <p>{description}</p>
                </div>
            </div>
    )
}

export default FeatureItem