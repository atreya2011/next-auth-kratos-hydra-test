import { signOut, useSession } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center px-7 space-y-2">
          <h1 className="p-3 text-5xl">
            Welcome to{" "}
            <a className="underline" href="https://nextjs.org">
              Next.js!
            </a>
          </h1>
          <ul className="text-center space-y-3">
            <li>
              <p className="font-semibold">Signed in as:</p>
              <p className="text-xl">{session?.user?.email}</p>
            </li>
            <ul>
              <li>
                <span className="font-semibold">Access Token:</span>
                <p className="text-xl truncate">{session?.accessToken as string}</p>
              </li>
            </ul>
          </ul>
          <div className="min-w-full px-3.5">
            <button
              className="min-w-full bg-indigo-900 hover:bg-indigo-700 px-5 py-3 rounded-md my-3 text-xl text-white"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        </main>
      </div>
    );
  }

  return <div className="self-center">Loading...</div>;
}
