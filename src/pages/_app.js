import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { store, wrapper } from "../store/index";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }) {
  const store = useStore((state) => state);
  return (
    <NextUIProvider>
      <PersistGate persistor={store.__persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </NextUIProvider>
  );
}

export default wrapper.withRedux(MyApp);
