import { isEmpty, set } from "lodash";
import { type } from "os";
import React, { Fragment, useState } from "react";
import Modal from "../Modal";
import { formatConfidenceInterval } from "@/utils/helpers";

export default function TrialTable({ trialData }) {
  const colorMap = {
    case: "bg-blue-400 inline-block py-1 px-2 mt-2 text-white rounded-1 justify-center self-center text-xs flex font-medium mb-2 mr-2",
    review:
      "bg-red-400 inline-block py-1 px-2 mt-2 text-white rounded-1 justify-center self-center text-xs flex font-medium mb-2 mr-2",
    retro:
      "bg-green-400 inline-block py-1 px-2 mt-2 text-white rounded-1 justify-center self-center text-xs flex font-medium mb-2 mr-2",
    immunotherapy: "bg-blue-300",
    tki: "bg-red-300",
    mtor: "bg-green-300",
    chemotherapy: "bg-indigo-300",
  };

  const tagsLookup = {
    case: "Case",
    review: "Review",
    retro: "Retro",
  };

  const getTagColor = (tag) => {
    if (tag in colorMap) return colorMap[tag];
    return "bg-gray-500"; // Default color
  };

  return (
    <div className="pl-2">
      <div className="max-h-[500px] overflow-y-auto border rounded-sm">
        <table className="w-full">
          <thead className="sticky top-0 bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 px3.5 pl-4 pr-3 text-left text-md font-semibold text-gray-900"
              >
                Study
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-md font-semibold text-gray-900 hidden sm:table-cell"
              >
                Year
              </th>

              <th
                scope="col"
                className="px-3 py-3.5 text-left text-md font-semibold text-gray-900 hidden sm:table-cell"
              >
                Treatment
              </th>
              <th
                scope="col"
                className="py-3.5 px3.5 pl-4 pr-3 text-left text-md font-semibold text-gray-900"
              >
                Total Patients
              </th>
              <th
                scope="col"
                className="py-3.5 px3.5 pl-4 pr-3 text-md font-semibold text-gray-900 text-center"
              >
                Objective Response
              </th>
              {/* <th
                scope="col"
                className="py-3.5 px3.5 pl-4 pr-3 text-left text-md font-semibold text-gray-900"
              >
                ORR
              </th> */}
              {/* <th
                scope="col"
                className="px-3 py-3.5 text-center text-md font-semibold text-gray-900 hidden lg:table-cell pl-4"
              >
                CI
              </th> */}

              <th
                scope="col"
                className="px-3 py-3.5 text-center text-md font-semibold text-gray-900 hidden lg:table-cell pl-4"
              >
                Category
              </th>

              <th
                scope="col"
                className="py-3.5 px3.5 pl-4 pr-3 text-left text-md font-semibold text-gray-900"
              >
                Publication
              </th>

              {/* <th
                scope="col"
                className="px-3 py-3.5 text-left text-md font-semibold text-gray-900 hidden lg:table-cell pl-4"
              >
                Sourced From
              </th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {Array.isArray(trialData) &&
              trialData
                .sort((a, b) => {
                  a = new Date(a.datePublished).getFullYear();
                  b = new Date(b.datePublished).getFullYear();
                  return a > b ? -1 : a < b ? 1 : 0;
                })
                .map((trial, index) => (
                  <tr key={index}>
                    <td className="w-full lg:pl-4 lg:w-1/5 max-w-0 py-4 pl-2 text-sm font-medium text-gray-900 sm:w-auto sm:pl-1 md:pl-1">
                      {trial.study}
                    </td>

                    <td className="py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-0 hidden sm:table-cell">
                      {new Date(trial.datePublished).getFullYear()}
                    </td>
                    <td className="py-4 pl-3 pr-4 lg:w-1/4 text-left text-xs font-medium sm:pr-0 text-gray-600 hidden sm:table-cell">
                      {trial.treatment}
                    </td>
                    <td className="py-3.5 px3.5 pl-4 pr-3 text-md font-semibold text-gray-900 text-center ">
                      {trial.totalPatients}
                    </td>
                    <td className="py-3.5 px3.5 pl-4 pr-3 text-md font-semibold text-gray-900 text-center">
                      {trial.objectiveResponse}
                    </td>
                    {/* <td className="py-3.5 px3.5 pl-4 pr-3 text-left text-md font-semibold text-gray-900 hidden sm:table-cell">
                      {trial.orr}
                    </td> */}
                    {/* <td className="hidden px-3 py-4 lg:w-1/6 text-center text-sm lg:table-cell">
                      {formatConfidenceInterval(trial.confidence)}
                    </td> */}

                    <td className="hidden py-3.5 px-3.5 pl-3 pr-3 text-md font-semibold sm:pr-0 lg:table-cell">
                      <div className="flex flex-row w-3/4 pl-4">
                        {trial?.category?.split(",").map((category) => (
                          <div
                            className={`h-3 w-3 m-1 rounded ${colorMap[category] || "bg-blue-900"
                              }`}
                            key={category}
                          ></div>
                        ))}
                      </div>
                    </td>

                    <td className="py-3.5 px-3.5 pl-4 pr-3 text-center text-md font-semibold text-gray-900">
                      <a
                        target="_blank"
                        href={trial.link}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </a>
                    </td>

                    {/* <td className="hidden py-3.5 px-3.5 pl-3 pr-3 text-left text-md font-semibold sm:pr-0 lg:table-cell">
                      <a
                        target="_blank"
                        href={trial.credit}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </a> */}

                    {/* <td className="text-left h-full  hidden sm:table-cell text-xs font-medium  items-center justify-center sm:pr-0 text-gray-600">
                    {trial.type === "case" ||
                    trial.type === "review" ||
                    trial.type === "retro" ? (
                      <div
                        className={`${getTagColor(trial.type)}`}
                        key={trial.type}
                      >
                        {tagsLookup[trial.type]}
                      </div>
                    ) : null}
                  </td> */}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
