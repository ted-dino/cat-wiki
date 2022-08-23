import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currYear = new Date().getFullYear();
  return (
    <footer className="p-4 md:p-9 bg-black rounded-t-[40px] flex flex-wrap items-center justify-center md:justify-between">
      <Link href="#top">
        <a>
          <Image
            src="/CatwikiLogo.svg"
            width={123}
            height={43}
            className="brightness-0 invert"
          />
        </a>
      </Link>
      <span className="text-white text-center">
        created by{" "}
        <Link href="https://github.com/ted-dino">
          <a className="font-bold">Ted Dino</a>
        </Link>{" "}
        - devChallenge.io {currYear}
      </span>
    </footer>
  );
};

export default Footer;
