import { useTranslation } from "react-i18next";

const Years = ({ id, data, value, setValue, name }) => {
  const { t } = useTranslation();

  const handleYear = (year) => {
    console.log(`year removing : ${year}`, value?.[id]);
    setValue((prev) => ({
      ...prev,
      [id]: !prev[id]?.includes(year) ? [...prev?.[id], year] : prev?.[id].toSpliced(prev[id].indexOf(year), 1),
    }));
  };

  const handleAllYear = (years) => {
    const allYears = [];
    years.map((year) => allYears.push(...Object.values(year)));
    setValue((prev) => ({
      ...prev,
      [id]: prev?.[id].length === data.length ? [] : allYears,
    }));
  };

  return (
    <div id={id} className="flex flex-col gap-1 w-full">
      <p className="text-[#AAADB6] font-customweight leading-5 tracking-wider">{t(name)}</p>

      <ul className="rounded border border-[#373A45] bg-[#0F1322] py-2 px-4 text-[#CFCFCF] font-inter text-md flex gap-3 items-center">
        {
          <>
            <li
              className={`p-1 truncate ${
                value?.[id]?.length === data?.length ? "bg-[#374677] rounded cursor-pointer" : ""
              }`}
              onClick={() => handleAllYear(data)}>
              {t(`All Years`)}
            </li>
            {data?.map((item, i) => (
              <li
                key={i}
                className={`text-[#eaeaea] border-transparent p-1 transition-all duration-200 ${
                  value?.[id]?.includes(item.data) ? "border-transparent p-1 bg-[#374677] rounded" : "text-white"
                } `}
                onClick={() => handleYear(item.data)}>
                {item.data}
              </li>
            ))}
          </>
        }
      </ul>
    </div>
  );
};

export default Years;
