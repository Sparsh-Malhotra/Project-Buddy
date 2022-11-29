import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { wrapper, store } from "../store/index";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </NextUIProvider>
  );
}

export default wrapper.withRedux(MyApp);