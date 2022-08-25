import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";
import { Cat } from "../typings";

interface Props {
  noOfPages: Cat[];
  cats: Cat[];
}

const Cats = ({ noOfPages, cats }: Props) => {
  const [paginatedCats, setPaginatedCats] = useState<Cat[]>(cats);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPageNumber, setMaxPageNumber] = useState(5);
  const [minPageNumber, setMinPageNumber] = useState(0);
  const router = useRouter();
  const ITEMS_PER_PAGE = 3;
  let pageNumberLimit = 5;

  const pages = [];
  const pageNumber = noOfPages.length;
  for (let i = 0; i <= pageNumber / ITEMS_PER_PAGE; i++) {
    pages.push(i);
  }
  console.log(cats);
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    router.push(`/cats?page=${currentPage + 1}`);

    if (currentPage + 1 > maxPageNumber) {
      setMaxPageNumber(maxPageNumber + pageNumberLimit);
      setMinPageNumber(minPageNumber + pageNumberLimit);
    }
  };
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
    router.push(`/cats?page=${currentPage - 1}`);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumber(maxPageNumber - pageNumberLimit);
      setMinPageNumber(minPageNumber - pageNumberLimit);
    }
  };
  const pageClick = (event: MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(Number(event.currentTarget.id));
    router.push(`/cats?page=${event.currentTarget.id}`);
  };

  useEffect(() => {
    setPaginatedCats(cats);
  }, [cats]);

  return (
    <>
      <h1 className="text-xl sm:text-3xl md:text-4xl font-semibold">
        List of Cat Breeds
      </h1>
      <div className="my-4 flex-1 flex flex-col justify-between ">
        {paginatedCats &&
          paginatedCats.length > 0 &&
          paginatedCats.map((cat) => (
            <div key={cat.id} className="flex">
              <Image
                src={`${
                  cat.image && cat.image.url
                    ? cat.image.url
                    : "/fallbackImg.webp"
                }`}
                width={170}
                height={170}
                alt="meow"
                objectFit="cover"
                objectPosition="center"
                className="rounded-3xl flex-1"
              />
              <div>
                <h2>{cat.name}</h2>
                <p className="max-w-[888px]">{cat.description}</p>
              </div>
            </div>
          ))}
      </div>
      <div className="flex self-end items-center">
        {currentPage !== 0 && (
          <button className="previousPage cursor-pointer" onClick={prevPage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 stroke-black"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        {pages.map((number) => {
          if (number < maxPageNumber + 1 && number > minPageNumber) {
            return (
              <button
                onClick={pageClick}
                id={number.toString()}
                className={`${
                  currentPage === number
                    ? "bg-primary text-white hover:text-white"
                    : "text-accent hover:text-primary"
                } text-xs border py-2.5 px-4 rounded hover:border-primary  cursor-pointer`}
              >
                {number}
              </button>
            );
          }
        })}
        {currentPage !== pages[pages.length - 1] && (
          <button className="nextPage cursor-pointer" onClick={nextPage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 stroke-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query.page ? context.query.page : 0;
  const [noOfPages, cats] = await Promise.all([
    fetch("http://localhost:3000/api/cat").then((res) => res.json()),
    fetch(`http://localhost:3000/api/cats/${page}`).then((res) => res.json()),
  ]);

  return {
    props: {
      noOfPages,
      cats,
    },
  };
};

export default Cats;
