import { Button } from '@/components/atoms/button';
import { cn } from '@/utils/misc';
import { type ComponentProps, type ReactNode, useState } from 'react';
import { LogOutIcon, MenuIcon, UserIcon } from 'lucide-react';
import { Section } from '../atoms/section';
import CompanyData from '@/data/company.data';
import { Link } from 'react-router-dom';
import { LogoText } from '@/assets/images';
import { Sheet, SheetContent, SheetTitle } from '../atoms/sheet';
import { useAuth } from '@/contexts/auth.context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../atoms/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../atoms/avatar';
import { getInitial } from '@/utils/string';

const Links = CompanyData.menu.main.links;

const Header = ({
  className,
  slotLeft,
  slotRight,
  ...props
}: ComponentProps<'header'> & {
  slotLeft?: ReactNode;
  slotRight?: ReactNode;
}) => {
  const { user, signOut } = useAuth();
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <header className={cn('bg-background shadow-lg', className)} {...props}>
      <Section className="flex flex-row items-center justify-between gap-4 py-2">
        <div className="flex items-center gap-2">
          <Button
            variant={'ghost'}
            size={'icon'}
            className="md:hidden"
            onClick={() => setSheetOpen((s) => !s)}
          >
            <MenuIcon />
          </Button>

          <Link to={'/'}>
            <img src={LogoText} alt="" className="w-32" />
          </Link>

          {slotLeft}
        </div>

        <div className="flex items-center gap-8">
          {Links.map((link, i) => (
            <Button key={i} variant={'link'} className="not-md:hidden" asChild>
              <Link to={link.href}>{link.label}</Link>
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {slotRight}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size={'icon'}>
                  <Avatar>
                    <AvatarImage src={user.profile?.avatarUrl} />
                    <AvatarFallback>
                      {getInitial(user.profile?.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to={'/account'}>
                    <UserIcon /> Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onClick={signOut}>
                  <LogOutIcon /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link to={'/auth/sign-in'}>Sign In</Link>
            </Button>
          )}
        </div>
      </Section>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="p-5" side="left">
          <SheetTitle visually-hidden="true"></SheetTitle>

          <div className="flex flex-col items-start gap-5">
            {Links.map((link, i) => (
              <Button
                key={i}
                variant={'link'}
                className="text-foreground"
                size={'lg'}
                asChild
              >
                <Link to={link.href} onClick={() => setSheetOpen(false)}>
                  {link.label}
                </Link>
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
