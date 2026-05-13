import { type ComponentProps } from 'react';
import { cn } from '@/utils/misc';
import { LogoText } from '@/assets/images';
import { Section } from '@/components/atoms/section';
import { Separator } from '@/components/atoms/separator';
import CompanyData from '@/data/company.data';
import { Button } from '@/components/atoms/button';
import { Link } from 'react-router-dom';

const Footer = ({ className, ...props }: ComponentProps<'footer'>) => {
  return (
    <footer className={cn('border-t', className)} {...props}>
      <Section className="flex flex-col gap-4">
        <div className="flex w-full flex-wrap gap-12 md:gap-16 xl:gap-24">
          <div className="flex grow flex-col items-start" id="contacts">
            <img src={LogoText} alt="" className="mb-8 w-32" />

            {CompanyData.socials.map((item, i) => (
              <Button
                key={i}
                variant={'link'}
                className="text-muted-foreground mb-2 h-fit"
                asChild
              >
                <a href={item.href} target="_blank">
                  <item.icon /> <span className="text-wrap">{item.label}</span>
                </a>
              </Button>
            ))}
          </div>
          {Object.entries(CompanyData.menu).map(([key, menu]) => (
            <div key={key} className="flex flex-col items-start">
              <p className="typo-heading-xs mb-2">{menu.title}</p>
              {menu.links.map((item, i) => (
                <Button
                  key={i}
                  variant={'link'}
                  className="text-muted-foreground"
                  asChild
                >
                  <Link to={item.href}>{item.label}</Link>
                </Button>
              ))}
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="typo-body text-muted-foreground whitespace">
            {CompanyData.copyright}
          </p>
        </div>
      </Section>
    </footer>
  );
};

export default Footer;
