import Image from "next/image";
const Header = () => {
  return (
    <header className="pt-5">
      <Image src="/CatwikiLogo.svg" width={123} height={43} />
    </header>
  );
};

export default Header;
