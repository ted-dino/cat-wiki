import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Cat } from "../typings";
import { getAllBreed } from "../utils/fetchData";

interface Props {
  breeds: Cat[];
}

const Home: NextPage<Props> = ({ breeds }) => {
  const [breed, setBreed] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [featureBreeds, setFeaturedBreed] = useState<Cat[] | null>();
  const dropdown = useRef<HTMLDivElement>(null);

  const filteredBreed = breeds.filter((item: Cat) => {
    const searchTerm = breed.toLowerCase();
    const breedName = item.name.toLowerCase();

    return breedName.includes(searchTerm);
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBreed(e.currentTarget.value);
    if (e.currentTarget.value.length > 0) {
      setShowDropdown(true);
    }
  };
  const onSearch = (name: string) => {
    setBreed(name);
    setShowDropdown(false);
  };

  useEffect(() => {
    const featuredBreed: Cat[] = breeds
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .slice(0, 4);
    setFeaturedBreed(featuredBreed);
  }, []);

  useEffect(() => {
    // close dropdown when click outside
    if (!showDropdown) return;
    function handleClick(e: MouseEvent): void {
      if (dropdown.current && !dropdown.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [showDropdown]);
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
        <form className="mx-2 sm:mx-0 lg:w-80 py-2 px-5 rounded-full bg-white relative">
          <div className="flex items-center ">
            <input
              className="w-full focus:outline-none py-1 px-2"
              type="text"
              name="breed"
              value={breed}
              onChange={onChange}
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
          </div>
          {showDropdown && breed && filteredBreed.length > 0 && (
            <div
              ref={dropdown}
              className="absolute left-0 top-[55px] z-10 max-h-52 w-full rounded-2xl bg-white pt-4 pl-5 pr-3 pb-3"
            >
              <ul className="max-h-[168px] overflow-auto flex flex-col">
                {breed &&
                  breeds.length > 0 &&
                  filteredBreed.map((item) => (
                    <li
                      onClick={() => onSearch(item.name)}
                      className="mr-2 text-lg hover:bg-[#979797]/10 py-2 px-4 rounded-xl cursor-pointer"
                      key={item.id}
                    >
                      {item.name}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </form>
      </section>
      <section className="sectionPadding pb-12 md:pb-24 breeds">
        <span className="breedSubText">Most Searched Breeds</span>
        <div className="my-5 flex flex-col md:flex-row items-start md:items-center justify-between">
          <h2 className="text-lg lg:text-5xl font-bold">
            {breeds.length}+ Breeds For you{" "}
            <span className="md:block">to discover</span>
          </h2>
          <Link href="/">
            <a className="flex items-center gap-2 text-xs text-black/60 font-bold">
              SEE MORE
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#7F736A"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-12 place-items-center items-center">
          {breeds.length > 0 &&
            featureBreeds &&
            featureBreeds.length > 0 &&
            featureBreeds.map((cat) => (
              <div key={cat.id} className="w-full flex flex-col">
                <Image
                  src={`${
                    cat.image && cat.image.url
                      ? cat.image.url
                      : "/fallbackImg.webp"
                  }`}
                  width={220}
                  height={220}
                  alt="meow"
                  objectFit="cover"
                  className="rounded-3xl flex-1"
                />
                <span className="block text-xs md:text-lg font-semibold mt-3 md:mt-5">
                  {`${cat.name}`}
                </span>
              </div>
            ))}
        </div>
      </section>
      <section className="xl:px-10 my-16 grid grid-cols-1 md:grid-cols-2 md:gap-7 place-items-center">
        <div>
          <h2 className="max-w-md text-4xl md:text-5xl font-bold relative before:block before:absolute before:w-[40px] before:h-1 before:md:w-[60px] before:inset-x-0 before:-top-5 before:bg-[#4D270C] before:rounded-3xl">
            Why should you have a cat?
          </h2>
          <p className="max-w-sm text-lg mt-10 mb-7 md:mb-10">
            Having a cat around you can actually trigger the release of calming
            chemicals in your body which lower your stress and anxiety levels.
          </p>
          <Link href="https://icatcare.org/advice/thinking-of-getting-a-cat/">
            <a className="flex items-center gap-2 text-xs text-black/60 font-bold">
              READ MORE
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#7F736A"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:gap-7 place-items-start">
          <div className="flex flex-col items-end gap-4 md:gap-7">
            <Image
              src="/image-2.png"
              width={274}
              height={167}
              alt="meow"
              objectFit="contain"
            />
            <Image
              src="/image-1.png"
              width={195}
              height={293}
              objectFit="contain"
              alt="meow"
            />
          </div>
          <Image
            src="/image-3.png"
            width={238}
            height={385}
            alt="meow"
            objectFit="contain"
          />
        </div>
      </section>
    </>
  );
};

export const getStaticProps = async () => {
  const breeds = await getAllBreed();
  return {
    props: {
      breeds: breeds,
    },
  };
};
export default Home;
