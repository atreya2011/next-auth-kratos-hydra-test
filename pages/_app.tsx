import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Auth from "~/middleware/Auth";
import "../styles/globals.css";

function App({ Component, pageProps: { session, ...pageProps }, router: { route } }: AppProps) {
  const requireAuth = !route.startsWith("/auth");

  return (
    <SessionProvider session={session}>
      {requireAuth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

export default App;
