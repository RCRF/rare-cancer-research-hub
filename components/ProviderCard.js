import { React, useState } from "react";
import {
  ArrowTopRightOnSquareIcon,
  BeakerIcon,
  BuildingOffice2Icon,
  LightBulbIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";

export default function ProviderCard({ provider, isActive }) {
  const colorMap = {
    lab: "bg-green-400",
    physician_scientist: "bg-red-400",
    oncology: "bg-blue-400",
    research: "bg-green-400",
    surgery: "bg-indigo-400",
    chief_urologic: "bg-indigo-400",
  };

  const tagsLookup = {
    lab: "Lab",
    physician_scientist: "Physician Scientist",
    oncology: "Oncologist",
    research: "Research",
    surgery: "Surgeon",
    chief_urologic: "Chief Urologic Oncology",
  };

  // This needs to be built into a table
  const researchingInstutitions = [
    "MD Anderson Cancer Center",
    "Memorial Sloan Kettering Cancer Center",
    "Dana Farber Cancer Institute",
    "National Cancer Institute",
    "Yale Cancer Center",
  ];

  const getTagColor = (tag) => {
    if (tag in colorMap) return colorMap[tag];
    return "bg-gray-500"; // Default color
  };

  return (
    <a href={provider.link} target="_blank">
      <div
        className={`m-2 lg:max-w-full pl-6 pr-6 lg:flex border bg-white shadow-lg flex flex-col p-4 xl:h-48 center-self`}
      >
        <div className="flex flex-col xl:flex-row">
          <div className="w-full row-span-4 overflow-hidden grid xl:grid-cols-4 gap-2 self-center justify-center">
            <div className="flex col-span-1 aspect-w-1 aspect-h-1 overflow-hidden self-center h-full md:h-80 lg:h-80 xl:h-full">
              <img
                className={
                  provider.image !== ""
                    ? "object-fit rounded-sm self-center"
                    : "opacity-30 object-fit rounded-sm self-center"
                }
                src={
                  provider.image !== ""
                    ? provider.image
                    : "/img/emptyProfilePhoto.png"
                }
                alt="profile picture"
              />
            </div>

            <div className="xl:col-span-3 pt-3 pb-3 pl-2">
              <div className="flex flex-col">
                <p className="text-gray-700 text-2xl font-semibold mb-1">
                  {provider.firstName} {provider.lastName},{" "}
                  {provider.designation}
                </p>
                <p className="text-gray-700 text-xl font-semibold md:line-clamp-1">
                  {provider.institution}
                </p>
                <div className="text-xs mb-2 flex flex-col text-gray-600">
                  <p>
                    {provider.city}, {provider.state}, {provider.country}
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-1 mt-2 justify-center ">
                  {provider.tagNames.map((tag, index) => (
                    <div
                      key={index}
                      className={`text-center rounded-sm w-full h-8 p-2 flex items-center py-0.25 px-0.25 text-white text-xxs rounded-1 font-medium mb-2 ${getTagColor(
                        tag
                      )}`}
                    >
                      <div className="w-full line-clamp-2">
                        {tagsLookup[tag]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {researchingInstutitions.includes(provider.institution) ? (
            <div>
              <BuildingOfficeIcon
                className="h-6 w-6 text-blue-500 opacity-50 float-right"
                aria-hidden="true"
              />
            </div>
          ) : null}
        </div>
      </div>
    </a>
  );
}
