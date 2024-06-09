import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

html,
body,
#root {
  min-height: 100vh;
  max-width: 100vw;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #f8f9fa;
  -webkit-font-smoothing: antialiased;
}

  body, input, button, textarea {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 1rem;
}

  button{
    cursor: pointer;
  }

  [disabled]{
    opacity: 0.6;
    cursor: not-allowed;
  }

  a {
    text-decoration: none;
  }

  *,
  button,
  input {
    border: 0;
    background: none;
  }

  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

`;