import { Outlet } from 'react-router-dom';
import Header from '../../organisms/header';
import { HeaderSticky } from '../../atoms/header-sticky';
import Footer from '../../organisms/footer';
import { Button } from '@/components/atoms/button';
import { QrCodeIcon } from 'lucide-react';
import dialogStore from '@/stores/dialog.store';
import QrReadDialog from '@/components/organisms/dialogs/qr-read.dialog';

const MainLayout = () => {
  const { openDialog } = dialogStore();

  return (
    <>
      <QrReadDialog />

      <div className="flex min-h-svh flex-col items-stretch overflow-x-hidden">
        <HeaderSticky>
          <Header
            slotRight={
              <Button
                size={'icon'}
                variant={'secondary'}
                onClick={() =>
                  openDialog('qr_read', { content: 'Lorem ipsum' })
                }
              >
                <QrCodeIcon />
              </Button>
            }
          />
        </HeaderSticky>
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
