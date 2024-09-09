import { FeaturesSection } from './features-section/page'
import { Header } from './header-section/page'
import { HeroSection } from './hero-section/page'
import { Section } from './section/page'

export default function Home() {
  return (
    <div className='overflow-hidden'>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Section />
    </div>
  )
}
