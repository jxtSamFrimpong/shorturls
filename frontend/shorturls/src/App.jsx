import { useState } from 'react'
import './styles/App.css'
import Footer from './components/Footer'
import NavigationBar from './components/NavigationBar'
import HomeShortenURLHero from './components/HomeShortenURLHero'
import FeatureCards from './components/FeaturesCards/FeatureCards'
import PricingGrid from './components/Pricing/PricingGrid'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
        <NavigationBar />

        <HomeShortenURLHero />

        <FeatureCards />

        <PricingGrid />
        <Footer />
    </div>
  )
}

export default App
