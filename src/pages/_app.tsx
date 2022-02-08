import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { AppProvider } from "../../src/data/context/AppContext";
import { AuthProvider } from "../../src/data/context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </AuthProvider>
  );
}

export default MyApp;
