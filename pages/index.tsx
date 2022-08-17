import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>CatWiki</title>
        <link rel="icon" href="/devchallenges.png" />
      </Head>
      <section className="hero">
        <img
          src="/CatwikiLogo.svg"
          aria-hidden="true"
          alt="catwiki"
          className="w-auto brightness-0 invert md:h-20"
        />

        <h1 className="text-white text-xs md:text-2xl my-1">
          Get to know more about your{" "}
          <span className="md:block">cat breed</span>
        </h1>
        <form className="mx-2 sm:mx-0 lg:w-80 py-2 px-3.5 rounded-full bg-white flex items-center">
          <input
            className="w-full focus:outline-none"
            type="text"
            name="breed"
            id="breed"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#291507"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </form>
      </section>
      <section></section>
    </>
  );
};

export default Home;
