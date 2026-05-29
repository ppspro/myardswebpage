import React from 'react';
import PartnerHero from './PartnerHero';
import PartnerIntroCard from './PartnerIntroCard';
import PartnerTypeCards from './PartnerTypeCards';
import BenefitsSection from './BenefitsSection';
import OnboardingSteps from './OnboardingSteps';
import RequiredDocuments from './RequiredDocuments';
import FaqSection from './FaqSection';
import FinalCta from './FinalCta';
import PartnerFooter from './PartnerFooter';

const PartnerLandingPage = () => {
  return (
    <main>
      <PartnerHero />
      <PartnerIntroCard />
      <PartnerTypeCards />
      <BenefitsSection />
      <OnboardingSteps />
      <RequiredDocuments />
      <FaqSection />
      <FinalCta />
      <PartnerFooter />
    </main>
  );
};

export default PartnerLandingPage;
