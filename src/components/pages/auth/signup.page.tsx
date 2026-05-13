import { Button } from '@/components/atoms/button';
import { useAuth } from '@/contexts/auth.context';
import { Link, Navigate, useNavigate } from 'react-router-dom';
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
import { useFormik } from 'formik';
import * as y from 'yup';
import { toast } from 'sonner';

const schema = y.object({
  Name: y.string().min(3).max(50).required(),
  Email: y.string().email().required(),
  Password: y
    .string()
    .min(6)
    .matches(/[a-z]/, 'Must contain lowercase letter')
    .matches(/[A-Z]/, 'Must contain uppercase letter')
    .matches(/\d/, 'Must contain number')
    .matches(/[^A-Za-z\d]/, 'Must contain symbol')
    .required(),
});

type Schema = y.InferType<typeof schema>;

const SignUpPage = () => {
  const nav = useNavigate();
  const { signUp, signInGoogle, user } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const form = useFormik<Schema>({
    initialValues: {
      Name: '',
      Email: '',
      Password: '',
    },
    validationSchema: schema,
    async onSubmit(values) {
      const loading = toast.loading('Creating your account...');

      const result = await signUp({
        name: values.Name,
        email: values.Email,
        password: values.Password,
        redirectTo: `${window.location.origin}/auth/verify-email`,
      });

      toast.dismiss(loading);
      if (result) {
        toast.success(
          'Account created! Please check your inbox to verify your email.'
        );
        nav('/auth/sign-in');
      } else {
        toast.error('Sign up failed. Please check your data and try again.');
      }
    },
  });

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

      <form onSubmit={form.handleSubmit} className="mt-8 flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="Name">Name</FieldLabel>
          <Input
            id="Name"
            type="text"
            placeholder="Your name"
            name="Name"
            value={form.values.Name}
            onChange={form.handleChange}
            aria-invalid={!!form.errors.Name}
          />
          {form.errors.Name && <FieldError>{form.errors.Name}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="Email">Email</FieldLabel>
          <Input
            id="Email"
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
          <FieldLabel htmlFor="Password">Password</FieldLabel>

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
