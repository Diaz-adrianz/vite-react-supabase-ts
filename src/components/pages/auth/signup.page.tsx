import { Button } from '@/components/atoms/button';
import { useAuth } from '@/contexts/auth.context';
import { Link, Navigate } from 'react-router-dom';
import { IcGoogle } from '@/assets/images';
import { Field, FieldLabel } from '@/components/atoms/field';
import { Input } from '@/components/atoms/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/atoms/input-group';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const SignUpPage = () => {
  const { signInGoogle, user } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  if (user) return <Navigate to={'/'} replace />;

  return (
    <div className="flex w-full flex-col">
      <h2 className="typo-heading-lg">Get Started</h2>
      <p className="typo-body-md text-muted-foreground">Create a new account</p>

      <div className="mt-8 flex flex-wrap items-center justify-center">
        <Button variant={'outline'} onClick={signInGoogle} className="w-full">
          <img src={IcGoogle} className="size-4" />
          Continue with Google
        </Button>
      </div>

      <div className="mt-8 flex items-center gap-2">
        <div className="bg-border h-px grow"></div>
        <p className="typo-overline text-muted-foreground">Or</p>
        <div className="bg-border h-px grow"></div>
      </div>

      <form className="mt-8 flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="you@example.com" />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>

          <InputGroup>
            <InputGroupInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                variant="ghost"
                size={'icon-sm'}
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>

        <Button type="submit" className="mt-4" size={'lg'}>
          Sign Up
        </Button>
      </form>

      <p className="typo-caption text-muted-foreground mt-8 text-center">
        Already have account?{' '}
        <Button variant={'link'} size={'sm'} asChild>
          <Link to={'/auth/sign-in'}>Sign in</Link>
        </Button>
      </p>
    </div>
  );
};

export default SignUpPage;
