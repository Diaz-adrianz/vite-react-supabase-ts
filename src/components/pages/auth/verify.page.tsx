import { Button } from '@/components/atoms/button';
import { useAuth } from '@/contexts/auth.context';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Field, FieldError, FieldLabel } from '@/components/atoms/field';
import { Input } from '@/components/atoms/input';

import { useFormik } from 'formik';
import * as y from 'yup';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/atoms/input-otp';
import StorageData from '@/data/storage.data';
import { toast } from 'sonner';

const schema = y.object({
  Email: y.string().email().required(),
  Code: y.string().length(6).required(),
});

type Schema = y.InferType<typeof schema>;

const VerifyPage = () => {
  const nav = useNavigate();
  const { verify, user } = useAuth();

  const form = useFormik<Schema>({
    initialValues: {
      Email: sessionStorage.getItem(StorageData.SIGNUP_EMAIL) ?? '',
      Code: '',
    },
    validationSchema: schema,
    async onSubmit(values) {
      const loading = toast.loading('Activating your account...');

      const result = await verify({
        email: values.Email,
        token: values.Code,
      });

      toast.dismiss(loading);
      if (result.success) {
        toast.success('Account activated! ');
        sessionStorage.removeItem(StorageData.SIGNUP_EMAIL);
        nav('/');
      } else {
        toast.error(result.message ?? 'Activation failed. Please try again.');
      }
    },
  });

  if (user) return <Navigate to={'/'} replace />;

  return (
    <div className="flex w-full flex-col">
      <h2 className="typo-heading-lg">Verify Your Email</h2>
      <p className="typo-body-md text-muted-foreground">
        Please enter the verification code sent to your inbox to activate your
        account.
      </p>

      <form onSubmit={form.handleSubmit} className="mt-8 flex flex-col gap-4">
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
          <FieldLabel htmlFor="Code">Verification code</FieldLabel>

          <InputOTP
            className="w-full"
            maxLength={6}
            value={form.values.Code}
            onChange={(v) => form.setFieldValue('Code', v)}
            aria-invalid={!!form.errors.Code}
          >
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          {form.errors.Code && <FieldError>{form.errors.Code}</FieldError>}
        </Field>

        <Button
          type="submit"
          className="mt-4"
          size={'lg'}
          disabled={form.isSubmitting}
        >
          Verify
        </Button>
      </form>

      <p className="typo-caption text-muted-foreground mt-8 text-center">
        Already verified?{' '}
        <Button variant={'link'} size={'sm'} asChild>
          <Link to={'/auth/sign-in'}>Sign in</Link>
        </Button>
      </p>
    </div>
  );
};

export default VerifyPage;
