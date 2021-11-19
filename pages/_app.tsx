import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Auth from "~/middleware/Auth";
import "../styles/globals.css";

function App({ Component, pageProps: { session, ...pageProps }, router: { route } }: AppProps) {
  const requireAuth = !route.startsWith("/auth");

  return (
    <SessionProvider session={session}>
      {/* Refer: https:github.com/nextauthjs/next-auth/issues/1210#issuecomment-866575527 */}
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
