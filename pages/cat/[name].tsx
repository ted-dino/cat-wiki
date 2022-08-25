import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import CatStat from "../../components/CatStat";
import { Cat, CatImg } from "../../typings";

interface Props {
  cat: Cat[];
  image: CatImg[];
}

const Index: NextPage<Props> = ({ image, cat }) => {
  if (!image || !cat) {
    return <h1>Loading..</h1>;
  }

  const {
    name,
    description,
    temperament,
    origin,
    life_span,
    adaptability,
    affection_level,
    child_friendly,
    grooming,
    intelligence,
    health_issues,
    social_needs,
    stranger_friendly,
  } = cat[0];
  const [catImage, setCatImage] = useState<CatImg[]>(image);

  return (
    <article>
      <section className="grid grid-cols-1 lg:grid-cols-3 lg:gap-5">
        <div className="w-full">
          <Image
            src={`${catImage ? catImage[0].url : "/fallbackImg.webp"}`}
            alt="meow"
            width={371}
            height={371}
            objectPosition="center"
            objectFit="cover"
            className="rounded-3xl"
            placeholder="blur"
            blurDataURL="/fallbackImg.webp"
          />
        </div>
        <div className="col-span-2 flex flex-col gap-5">
          <div>
            <h1 className="text-xl sm:text-3xl md:text-4xl font-semibold">
              {name}
            </h1>
            <p className="text-sm md:text-xl max-w-[50rem]">{description}</p>
          </div>
          <span>
            <strong>Temperament:</strong> {temperament}
          </span>
          <span>
            <strong>Origin:</strong> {origin}
          </span>
          <span>
            <strong>Life Span:</strong> {`${life_span} years`}
          </span>
          <div className="flex flex-col gap-5 w-full max-w-[600px]">
            <CatStat statName="Adaptability" level={adaptability} />
            <CatStat statName="Affection Level" level={affection_level} />
            <CatStat statName="Child Friendly" level={child_friendly} />
            <CatStat statName="Grooming" level={grooming} />
            <CatStat statName="Intelligence" level={intelligence} />
            <CatStat statName="Health Issues" level={health_issues} />
            <CatStat statName="Social Needs" level={social_needs} />
            <CatStat statName="Stranger Friendly" level={stranger_friendly} />
          </div>
        </div>
      </section>
      <section className="my-10">
        <h2 className="mb-3 text-2xl sm:text-3xl md:text-4xl font-semibold">
          Other Photos
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 place-items-start gap-y-2 lg:gap-y-8">
          {catImage.slice(1, 9).map((cat) => (
            <div key={cat.id} className="grid place-content-center ">
              <Image
                src={`${cat.url ? cat.url : "/fallbackImg.webp"}`}
                width={278}
                height={278}
                objectFit="cover"
                objectPosition="center"
                className="rounded-3xl"
              />
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const name = context.query.name;
  const [image, cat] = await Promise.all([
    fetch(
      `https://api.thecatapi.com/v1/images/search?limit=9&name=${name}&size=thumb`
    ).then((res) => res.json()),
    fetch(`http://localhost:3000/api/cat/${name}`).then((res) => res.json()),
  ]);

  if (cat.length === 0 || !cat) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      image,
      cat,
    },
  };
};
export default Index;
