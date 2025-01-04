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

        <FeatureCards />

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
