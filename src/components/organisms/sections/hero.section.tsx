import { Section } from '@/components/atoms/section';
import CompanyData from '@/data/company.data';
import type { ComponentProps } from 'react';

const HeroSection = ({ ...props }: ComponentProps<typeof Section>) => {
  return (
    <Section {...props}>
      <h1 className="typo-display text-primary mb-4">{CompanyData.name}</h1>
      <p className="typo-body-md text-muted-foreground max-w-lg">
        {CompanyData.description}
      </p>
    </Section>
  );
};

export default HeroSection;
