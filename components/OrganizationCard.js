import { React, useState } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

export default function OrganizationCard({ organization, isActive }) {
  return (
    <a href={organization.link} target="_blank">
      <div
        className={`m-2 lg:max-w-full lg:flex border bg-white shadow-lg flex flex-col p-4`}
      >
        <div className="w-full row-span-4 overflow-hidden grid grid-cols-4 gap-2">
          <div className="col-span-1">
            <img
              className="w-full h-full object-contain"
              src={`/img/${organization.image}`}
              alt="kidneyBackground"
            />
          </div>

          <div className="col-span-3 self-center">
            <div className="flex flex-col">
              <p className="text-gray-700 text-lg md:text-2xl pl-4 font-semibold">
                {organization.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
