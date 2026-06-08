import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LazyMotion, domAnimation } from "framer-motion";
// remove this in production. this is for extensions
const queryClient = new QueryClient();
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

const AppProvider = ({ children }) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LazyMotion features={domAnimation}>{children}</LazyMotion>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default AppProvider;
