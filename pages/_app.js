import { Layout } from "@/components/index";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import {
  theme,
  storeWrapper,
  toastCloseTime,
  nprogressStart,
} from "@/data/index";
import { ToastContainer, Slide, toast } from "react-toastify";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "@/firebase/auth";
import { respondTo } from "@/lib/index";
import "react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css";
import Router from "next/router";
import NProgress from "nprogress";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
NProgress.configure({ showSpinner: false, minimum: nprogressStart });

const MyApp = ({ Component, pageProps }) => {
  const store = useStore((state) => state);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ToastContainer
        autoClose={toastCloseTime}
        position={toast.POSITION.TOP_RIGHT}
        transition={Slide}
      />
      <PersistGate persistor={store.__persistor} loading={null}>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </PersistGate>
      <div id="modal"></div>
    </ThemeProvider>
  );
};

export default storeWrapper.withRedux(MyApp);

const GlobalStyles = createGlobalStyle`
 ${reset}
 
 body {
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.gray.dark};
 }

 #__next {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
 }

* {
  &:before,
  &:after {
    box-sizing: inherit;
  }
 }

 main {
  flex-grow: 1;
 }

 strong, bold {
  font-weight:  ${({ theme }) => theme.fontWeights.bold};
 }

 small {
  font-size: ${({ theme }) => theme.fontSizes.xs};
 } 

 button {
  outline: none;
  &:focus-visible {
    box-shadow: 0 0 1px 1px ${({ theme }) => theme.colors.black};
  }
 }

 h1 {
  font-size: ${({ theme }) => theme.fontSizes.titleMd};
  ${respondTo.sm`
    font-size: ${({ theme }) => theme.fontSizes.titleXl};
  `}
 }

 h2 {
  font-size: ${({ theme }) => theme.fontSizes.titleSm};
  ${respondTo.sm`
    font-size: ${({ theme }) => theme.fontSizes.titleMd};
  `}
  }

 h3 {
  font-size: ${({ theme }) => theme.fontSizes.xl};
  ${respondTo.sm`
    font-size: ${({ theme }) => theme.fontSizes.titleSm};
  `}
 }

 h4 {
  font-size: ${({ theme }) => theme.fontSizes.xl};
 }

 h5 {
  font-size: ${({ theme }) => theme.fontSizes.lg}
 }

 select,
 input,
 textarea {
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSizes.md};
  border: 1px solid ${({ theme }) => theme.colors.gray.light};
  border-radius: ${({ theme }) => theme.spacing.xs};
  transition: border 0.15s ease;
  outline: none;
    &:focus {
      border-color: ${({ theme }) => theme.colors.blue.dark};
    }
  }

 select {
    padding: ${({ theme }) => theme.spacing.xs};
  }

  input[type='text'],
  input[type='password'],
  input[type='email'],
  textarea {
    padding: ${({ theme }) => theme.spacing.sm};
  }

 input[type='checkbox'],
 input[type='radio'] {
    --active: ${({ theme }) => theme.colors.blue.normal};
    --active-inner: ${({ theme }) => theme.colors.white};
    --focus: 1px ${({ theme }) => theme.colors.blue.dark};
    --border: ${({ theme }) => theme.colors.gray.light};
    --border-hover: ${({ theme }) => theme.colors.blue.dark};
    --background: ${({ theme }) => theme.colors.white};
    --disabled: ${({ theme }) => theme.colors.gray.xlight};
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 21px;
    outline: none;
    display: inline-block;
    vertical-align: top;
    position: absolute;
    margin: 0;
    cursor: pointer;
    border: 1px solid var(--bc, var(--border));
    background: var(--b, var(--background));
    transition: background .3s, border-color .3s, box-shadow .2s;
    &:after {
      content: '';
      display: block;
      left: 0;
      top: 0;
      position: absolute;
      transition: transform var(--d-t, .3s) var(--d-t-e, ease), opacity var(--d-o, .2s);
    }
    &:checked {
      --b: var(--active);
      --bc: var(--active);
      --d-o: .3s;
      --d-t: .6s;
      --d-t-e: cubic-bezier(.2, .85, .32, 1.2);
    }
    &:disabled {
      --b: var(--disabled);
      cursor: not-allowed;
      opacity: .9;
      &:checked {
        --b: var(--disabled-inner);
        --bc: var(--border);
      }
      & + label {
        cursor: not-allowed;
      }
    }
    &:hover {
      &:not(:checked) {
        &:not(:disabled) {
          --bc: var(--border-hover);
        }
      }
    }
    &:focus {
      box-shadow: 0 0 0 var(--focus);
    }
    &:not(.switch) {
      width: 21px;
      &:after {
        opacity: var(--o, 0);
      }
      &:checked {
        --o: 1;
      }
    }
    & + label {
      display: inline-block;
      line-height: 21px;
      vertical-align: top;
      cursor: pointer;
      padding-left: 25px;
    }
  }
  input[type='checkbox'] {
    &:not(.switch) {
      border-radius: 7px;
      &:after {
        width: 5px;
        height: 9px;
        border: 2px solid var(--active-inner);
        border-top: 0;
        border-left: 0;
        left: 7px;
        top: 4px;
        transform: rotate(var(--r, 20deg));
      }
      &:checked {
        --r: 43deg;
      }
    }
    &.switch {
      width: 38px;
      border-radius: 11px;
      &:after {
        left: 2px;
        top: 2px;
        border-radius: 50%;
        width: 15px;
        height: 15px;
        background: var(--ab, var(--border));
        transform: translateX(var(--x, 0));
      }
      &:checked {
        --ab: var(--active-inner);
        --x: 17px;
      }
      &:disabled {
        &:not(:checked) {
          &:after {
            opacity: .6;
          }
        }
      }
    }
  }
  input[type='radio'] {
    border-radius: 50%;
    &:after {
      width: 19px;
      height: 19px;
      border-radius: 50%;
      background: var(--active-inner);
      opacity: 0;
      transform: scale(var(--s, .7));
    }
    &:checked {
      --s: .5;
    }
  }
}
`;
