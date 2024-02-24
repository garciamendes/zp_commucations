import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --white: #fff;
    --slate-300: #CBD5E1;
    --slate-400: #94A3B8;
    --slate-500: #64748B;
    --slate-600: #475569;
    --slate-800: #1E293B;
    --slate-900: #0F172A;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    font-family: 'Inter', sans-serif;
    background-color: var(--slate-900);
  }

  .animation-loader {
    animation: spin 1s linear infinite;

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }

  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 45px;
    width: 45px;
    border-radius: 50%;
    border: 1px solid var(--white);
    color: var(--white);
  }
`