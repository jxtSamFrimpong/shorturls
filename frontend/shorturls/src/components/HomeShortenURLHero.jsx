const HomeShortenURLHero = ({}) => {
    return (
        <div className="hero">
            <div className="hero-content">
                <h1 className="hero-title">Keep it brief.<br/>A easier way to share links</h1>
                <p className="hero-subtitle">Professional services for your professional sites</p>
                <div className="url-input-container">
                    <input type="text" className="url-input" placeholder="Enter your URL here"/>
                    <button className="shorten-btn">SHORTEN</button>
                </div>
            </div>
        </div>
    )
}


export default HomeShortenURLHero