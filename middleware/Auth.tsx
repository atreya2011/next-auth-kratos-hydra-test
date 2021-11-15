import { signIn, useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import Layout from "~/components/Layout";

type AuthProps = {
  children: ReactNode;
};

// Based on: https://github.com/nextauthjs/next-auth/issues/1210#issuecomment-782630909
export default function Auth({ children }: AuthProps) {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!isUser) signIn(); // If not authenticated, force log in
  }, [isUser, status === "loading"]);

  if (isUser) {
    return <Layout>{children}</Layout>;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return (
    <div className="flex flex-col justify-center w-full h-screen max-w-lg m-auto">
      <div className="self-center">Loading...</div>
    </div>
  );
}
