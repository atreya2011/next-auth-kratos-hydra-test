import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const { data: session } = useSession();

  console.log(session);

  // state email
  const [email, setEmail] = useState("");

  // recovery link
  const [recoveryLink, setRecoveryLink] = useState("");

  const handleCreateIdentity = (schemaId: string) => async () => {
    const response = await fetch("/api/identities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ schemaId, email }),
    });
    const data = await response.json();
    setRecoveryLink(data.recoveryLink);
  };

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
          <div className="flex flex-wrap items-center justify-between min-w-full">
            {/* email input*/}
            <div className="w-full items-center">
              <label className="text-xl" htmlFor="email">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded-md"
                id="email"
                type="email"
                placeholder="Enter E-Mail"
              />
            </div>
            <button
              className="bg-green-900 hover:bg-green-700 px-3.5 py-3 rounded-md my-3 text-xl text-white"
              onClick={handleCreateIdentity("default")}
            >
              Create Person
            </button>
            <button
              className="bg-yellow-900 hover:bg-yellow-700 px-3.5 py-3 rounded-md my-3 text-xl text-white"
              onClick={handleCreateIdentity("customer")}
            >
              Create Customer
            </button>
            <button
              className="bg-indigo-900 hover:bg-indigo-700 px-5 py-3 rounded-md my-3 text-xl text-white"
              onClick={() => {
                signOut();
                window.location.replace("http://localhost:4455/logout");
              }}
            >
              Sign out
            </button>
            {/* recovery link */}
            <a href={recoveryLink}>
              Recovery Link: <span className="underline">{recoveryLink}</span>
            </a>
          </div>
        </main>
      </div>
    );
  }

  return <div className="self-center">Loading...</div>;
}
