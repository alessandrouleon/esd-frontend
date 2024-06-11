import { ThemeProvider } from "styled-components";
import { LightTheme } from "./themes";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { GlobalStyle } from "./themes/global";
import { AuthProvider } from "./contexts/AuthProvider";

function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <GlobalStyle />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
