import { type NextPage } from "next";
import {  useSession } from "next-auth/react";

// import Head from "next/head";
// import Link from "next/link";
import { SiteHeader } from "~/components/home/site-header";
// import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: session, status } = useSession({
    required: true,
  });

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1">
        <section className="container mx-auto grid items-center gap-6 pb-8 pt-6 md:py-10"></section>
      </div>
    </div>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
