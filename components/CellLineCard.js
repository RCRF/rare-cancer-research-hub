import { BeakerIcon } from "@heroicons/react/24/solid";
import { React, useState } from "react";

export default function CellLineCard({ cellLine }) {
  return (
    <a href={cellLine.link} target="_blank">
      <div
        className={`m-2 lg:max-w-full lg:flex border bg-white shadow-lg flex flex-row p-4`}
      >
        <div className="w-full row-span-5 overflow-hidden grid grid-cols-4 gap-2">
          <div className="col-span-1">
            <BeakerIcon
              className="text-blue-500 opacity-50 p-6"
              aria-hidden="true"
            />
          </div>

          <div className="col-span-3 self-center">
            <div className="flex flex-col">
              <p className="text-gray-700 text-xl pl-4 font-semibold">
                Cell Line: {cellLine.title}
              </p>
              <p className="text-gray-700 text-medium pl-4">
                Institution: {cellLine.institution}
              </p>
              <p className="text-gray-700 text-sm pl-4">
                Published: {new Date(cellLine.datePublished).getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
