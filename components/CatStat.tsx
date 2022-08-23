interface Props {
  statName: string;
  level: number;
}

const CatStat = ({ statName, level }: Props) => {
  let bar: string[] = new Array(5).fill("");
  for (let i = 0; i < level; i++) {
    bar.splice(i, 1, "colored");
  }

  return (
    <div className="flex flex-col justify-between lg:flex-row lg:items-center">
      <strong>{statName}:</strong>
      <div className="w-full max-w-[344px] gap-2 flex">
        {bar.map((item, key) => (
          <div
            key={key}
            className={`h-3 w-full max-w-[60px] rounded-lg ${
              item === "colored" ? "bg-[#544439]" : "bg-[#E0E0E0]"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CatStat;
