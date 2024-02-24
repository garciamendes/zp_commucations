import { Toaster } from "sonner";
import { GlobalStyle } from "./styles/global"
import { RouterProvider } from "react-router-dom";
import { UserProvider } from "./contexts/userContext";
import { router } from "./routes";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ConversationProvider } from "./contexts/ConversationContext";

const queryClient = new QueryClient()

export const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ConversationProvider>
          <GlobalStyle />
          <Toaster
            loadingIcon
            duration={5000}
            position="top-right"
            richColors />
          <RouterProvider router={router} />
        </ConversationProvider>
      </UserProvider>
    </QueryClientProvider>
  )
}
