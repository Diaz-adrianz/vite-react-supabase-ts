import { Button } from '@/components/atoms/button';
import { useAuth } from '@/contexts/auth.context';
import { Link, Navigate } from 'react-router-dom';
import { IcGoogle } from '@/assets/images';
import { Field, FieldError, FieldLabel } from '@/components/atoms/field';
import { Input } from '@/components/atoms/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/atoms/input-group';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import * as y from 'yup';
import { useFormik } from 'formik';
import { toast } from 'sonner';

const schema = y.object({
  Email: y.string().email().required(),
  Password: y.string().min(6).required(),
});

type Schema = y.InferType<typeof schema>;

const SignInPage = () => {
  const { signIn, signInGoogle, user } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const form = useFormik<Schema>({
    initialValues: {
      Email: '',
      Password: '',
    },
    validationSchema: schema,
    async onSubmit(values) {
      const loading = toast.loading('Signing you in...');

      const result = await signIn({
        email: values.Email,
        password: values.Password,
      });

      toast.dismiss(loading);
      if (result.success) {
        toast.success('Welcome back!');
      } else {
        toast.error(
          result.message ?? 'Invalid email or password. Please try again.'
        );
      }
    },
  });

  if (user) return <Navigate to={'/'} replace />;

  return (
    <div className="flex w-full flex-col">
      <h2 className="typo-heading-lg">Welcome Back</h2>
      <p className="typo-body-md text-muted-foreground">
        Sign in to your account
      </p>

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

      <form onSubmit={form.handleSubmit} className="mt-8 flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            name="Email"
            value={form.values.Email}
            onChange={form.handleChange}
            aria-invalid={!!form.errors.Email}
          />
          {form.errors.Email && <FieldError>{form.errors.Email}</FieldError>}
        </Field>

        <Field>
          <div className="flex justify-between">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Button variant={'link'} size={'xs'} asChild>
              <Link to={'/auth/forgot-password'}>Forgot password?</Link>
            </Button>
          </div>

          <InputGroup>
            <InputGroupInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              name="Password"
              value={form.values.Password}
              onChange={form.handleChange}
              aria-invalid={!!form.errors.Password}
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
          {form.errors.Password && (
            <FieldError>{form.errors.Password}</FieldError>
          )}
        </Field>

        <Button
          type="submit"
          className="mt-4"
          size={'lg'}
          disabled={form.isSubmitting}
        >
          Sign In
        </Button>
      </form>

      <p className="typo-caption text-muted-foreground mt-8 text-center">
        Don't have account?{' '}
        <Button variant={'link'} size={'sm'} asChild>
          <Link to={'/auth/sign-up'}>Sign up</Link>
        </Button>
      </p>
    </div>
  );
};

export default SignInPage;
