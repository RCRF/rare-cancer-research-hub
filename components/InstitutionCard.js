import { React, useState } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

export default function InstitutionCard({ institution, isActive }) {
  const colorMap = {
    fresh_tissue: "bg-green-400",
    fixed_tissue: "bg-blue-400",
    trials: "bg-red-400",
  };

  const tagsLookup = {
    fresh_tissue: "Surgical Tissue",
    fixed_tissue: "Preserved Tissue",
    trials: "Trials",
  };

  const getTagColor = (tag) => {
    if (tag in colorMap) return colorMap[tag];
    return "bg-gray-500"; // Default color
  };

  return (
    <a href={institution.link} target="_blank">
      <div
        className={`m-2lg:max-w-full lg:flex border bg-white shadow-lg flex flex-col p-4`}
      >
        <div className="w-full row-span-4 overflow-hidden grid grid-cols-4 gap-2 xl:h-32 md:h-32">
          <div className="col-span-1 flex">
            <img
              className={
                institution.image !== "/img/emptyInstitution.png"
                  ? "object-fit rounded-sm self-center"
                  : "opacity-60 object-fit rounded-sm self-center"
              }
              src={`${institution.image}` ?? "/img/emptyInstitution.png"}
              alt="institution image"
            />
          </div>
          <div className="col-span-3">
            <div className="flex flex-col">
              <div className="max-h-20 min-h-20">
                <p className="text-gray-700 text-lg font-semibold line-clamp-1">
                  {institution.name}
                </p>
                <p className="text-gray-700 text-lg font-semibold">
                  {institution.lab === "" ? "\u00A0" : institution.lab}
                </p>
              </div>
              <div className="text-xs mb-2 flex flex-col text-gray-600">
                <p>
                  {institution.city}, {institution.state}, {institution.country}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-1 justify-center">
                {institution?.tagNames?.map((tag, index) => (
                  <div
                    key={index}
                    className={`text-center rounded-sm w-full flex items-center py-1 px-1 text-white text-xxs font-medium mb-2 ${getTagColor(
                      tag
                    )}`}
                  >
                    <div className="w-full">{tagsLookup[tag]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
