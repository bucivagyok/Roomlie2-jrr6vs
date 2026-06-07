import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { EditProvider } from "./context/EditContext.tsx"
import { Provider } from 'react-redux';

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
      <EditProvider>
        <App />
      </EditProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>
)
