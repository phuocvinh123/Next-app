import { CtaSection } from '@/components/home/cta-section'
import { FeaturesSection } from '@/components/home/features-section'
import { HeroSection } from '@/components/home/hero-section'
import { PeopleSection } from '@/components/home/people-section'
import { Section } from '@/components/home/section'
import { TestimonialSection } from '@/components/home/testimonials-section'

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <Section />
      <TestimonialSection />
      <PeopleSection />
      <CtaSection />
    </>
  )
}
