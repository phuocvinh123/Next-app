import { CtaSection } from '@/components/ui/ctaSectionComponent'
import { FeaturesSection } from '@/components/ui/featuresSectionComponent'
import { FooterSection } from '@/components/ui/footerSectionComponent'
import { Header } from '@/components/ui/headerSectionComponent'
import { HeroSection } from '@/components/ui/heroSectionComponent'
import { PeopleSection } from '@/components/ui/peopleSectionComponent'
import { Section } from '@/components/ui/sectionComponent'
import { TestimonialSection } from '@/components/ui/testimonialsSectionComponent'

export default function Home() {
  return (
    <div className='overflow-hidden'>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Section />
      <TestimonialSection />
      <PeopleSection />
      <CtaSection />
      <FooterSection />
    </div>
  )
}
