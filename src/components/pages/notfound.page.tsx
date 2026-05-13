import { IlusNotfound } from '@/assets/images';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '../atoms/empty';
import { Button } from '../atoms/button';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex size-full min-h-svh flex-col pb-24">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="default">
            <img src={IlusNotfound} className="w-full" />
          </EmptyMedia>
          <EmptyTitle>Page not found</EmptyTitle>
          <EmptyDescription>
            The page you are trying to access does not exist or has been moved.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link to={'/'}>Go to homepage</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
};

export default NotFoundPage;
