import { ThemeProvider } from "styled-components";
import { LightTheme } from "./shared/themes";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { GlobalStyle } from "./shared/themes/global";


function App() {
  return (
    <ThemeProvider theme={LightTheme}>
       <GlobalStyle />
      <BrowserRouter>
       
                <AppRoutes />
             
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
