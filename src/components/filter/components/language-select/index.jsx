import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TiArrowSortedDown } from "react-icons/ti";

export default function LanguageSelect({ id, value, setValue, data }) {
  const [open, setOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const lang = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && lang.current && !lang.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <div className="select-language cursor-pointer">
        <div className="select-inner text-white flex flex-col">
          <p className="text-[#AAADB6]">{t(`Lang`)}</p>
          <div
            ref={lang}
            className="relative p-2 select-list w-full items-center justify-between gap-3 rounded bg-[#0F1322] hover:bg-[#374677] hover:text-white transition-all duration-150 text-white flex border border-[rgb(55,58,69)]"
            onClick={() => setOpen((prev) => !prev)}>
            <p className="item">{value?.[id]}</p>
            <button>
              <TiArrowSortedDown />
            </button>
            <ul
              className={` ${
                open ? "block" : "hidden"
              } absolute top-12 left-0 cursor-pointer rounded bg-[#0F1322] w-full border border-[rgb(55,58,69)]`}>
              <>
                {data?.map((item, idx) => {
                  return (
                    <li
                      onClick={() => {
                        i18n.changeLanguage(item.code);
                        setValue((prev) => ({ ...prev, [id]: item.name }));
                      }}
                      className="p-2 hover:bg-[#374677] text-[#AAADB6] hover:text-[#fff]"
                      key={idx}>
                      {item.name}
                    </li>
                  );
                })}
              </>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
