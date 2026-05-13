import { IlusAbstract, LogoText } from '@/assets/images';
import { Card, CardContent } from '@/components/atoms/card';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="bg-primary/10 flex min-h-screen min-w-screen p-4">
      <Card className="m-auto max-h-[80svh] w-full max-w-4xl flex-col gap-0 p-0 md:flex-row">
        <div className="h-20 overflow-hidden md:h-auto md:max-w-2/5 md:min-w-2/5">
          <img
            src={IlusAbstract}
            className="size-full scale-105 object-cover"
          />
        </div>

        <CardContent className="flex flex-col items-start overflow-y-auto p-8 md:max-w-3/5 md:min-w-3/5 md:justify-center">
          <img src={LogoText} alt="" className="mb-8 w-52" />
          <Outlet />
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthLayout;
