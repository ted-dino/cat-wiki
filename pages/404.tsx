import Image from "next/image";
import Link from "next/link";

const Custom404 = () => {
  return (
    <section className="flex-1 grid grid-cols-1 md:grid-cols-2 place-content-center">
      <div className="mx-auto">
        <Image
          src="/scarecrow.png"
          width={539}
          height={448}
          className="self-center"
          objectFit="cover"
        />
      </div>
      <div className="flex justify-around flex-col">
        <div>
          <h1 className="text-5xl font-bold max-w-[450px]">
            I have bad news for you
          </h1>
          <p className="text-lg max-w-[381px]">
            The page you are looking for might be removed or is temporarily
            unavailable
          </p>
        </div>
        <Link href="/">
          <a className="w-[250px] bg-[#333333] text-white block my-5 py-6 px-11">
            Back to homepage
          </a>
        </Link>
      </div>
    </section>
  );
};

export default Custom404;
