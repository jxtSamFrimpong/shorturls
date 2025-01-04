import { useState } from 'react'
import './styles/App.css'
import Footer from './components/Footer'
import NavigationBar from './components/NavigationBar'
import HomeShortenURLHero from './components/HomeShortenURLHero'
import FeatureCards from './components/FeaturesCards/FeatureCards'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div class="container">
        <NavigationBar />

        <HomeShortenURLHero />

        <div class="features">
            <div class="feature-card">
                <div class="feature-icon"></div>
                <div>
                    <h3>Shorten</h3>
                    <p>Create short links instantly</p>
                </div>
            </div>
            <div class="feature-card">
                <div class="feature-icon"></div>
                <div>
                    <h3>Measure</h3>
                    <p>Track and analyze your links</p>
                </div>
            </div>
            <div class="feature-card">
                <div class="feature-icon"></div>
                <div>
                    <h3>Optimize</h3>
                    <p>Improve your link performance</p>
                </div>
            </div>
        </div>
        {/* <FeatureCards /> */}

        <div class="pricing">
            <h2>The right plan for your needs</h2>
            <div class="pricing-grid">
                <div class="pricing-card">
                    <h3>BASIC</h3>
                    <div class="price">$20<span>/URL</span></div>
                    <p>One URL shorten per day</p>
                </div>
                <div class="pricing-card">
                    <h3>ADVANCED</h3>
                    <div class="price">$60<span>/URL</span></div>
                    <p>Unlimited URL shortens per day</p>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default App
