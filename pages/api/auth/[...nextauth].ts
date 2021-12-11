import NextAuth from "next-auth";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    {
      id: "kratos-hydra",
      name: "Kratos & Hydra",
      type: "oauth",
      wellKnown: "http://127.0.0.1:4444/.well-known/openid-configuration",
      authorization: { params: { grant_type: "authorization_code", scopes: ["openid", "customer"] } },
      idToken: true,
      checks: ["pkce", "state"],
      async profile(profile) {
        console.log("profile", profile);
        return {
          id: profile.sub,
          email: profile.email,
        };
      },
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      clientId: process.env.AUTH_CLIENT_ID!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      clientSecret: process.env.AUTH_CLIENT_SECRET!,
    },
  ],
  // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
  // https://next-auth.js.org/configuration/databases
  //
  // Notes:
  // * You must install an appropriate node_module for your database
  // * The Email provider requires a database (OAuth providers do not)
  // database: process.env.DATABASE_URL,

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: process.env.SECRET,
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    // signIn: '/auth/signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) { return true },
    // This function is called first to determine if a user is allowed to sign in.
    async signIn({ profile }) {
      console.log("signIn-profile", profile);
      if (profile) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    // async jwt({ token, user, account, profile, isNewUser }) { return token }
    // This function is called second, after the signIn callback function.
    // The access token is extracted from the OAuth provider's response,
    // and stored in the token object.
    jwt({ token, account }) {
      console.log("jwt-token", token, "jwt-account", account);
      // add accessToken to token
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    // async session({ session, token, user }) { return session },
    // This function is called third, after the jwt callback function.
    // The access token that is extracted in the jwt callback function,
    // is stored in the session object.
    async session({ session, token, user }) {
      console.log("session-session", session, "session-token", token, "session-user", user);
      session.accessToken = token.accessToken;
      return session;
    },
    // async redirect({ url, baseUrl }) { return baseUrl },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? `${baseUrl}/` : baseUrl;
    },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // Enable debug messages in the console if you are having problems
  debug: false,
});
