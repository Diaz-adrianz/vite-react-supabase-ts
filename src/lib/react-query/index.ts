import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 60 * 1000,
    },
  },
  queryCache: new QueryCache({
    onError: () => {
      // TODO: handle supabase response error
      toast.error('Something went wrong');
    },
  }),
  mutationCache: new MutationCache({
    onError: () => {
      // TODO: handle supabase response error
      toast.error('Something went wrong');
    },
  }),
});

export { queryClient };
