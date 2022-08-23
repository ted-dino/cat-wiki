import Image from "next/image";
import Link from "next/link";
const Header = () => {
  return (
    <header className="pt-5">
      <Link href="/">
        <a>
          <Image src="/CatwikiLogo.svg" width={123} height={43} />
        </a>
      </Link>
    </header>
  );
};

export default Header;
