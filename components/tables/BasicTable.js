import { isEmpty, set } from "lodash";
import { type } from "os";
import React, { Fragment, useEffect, useState } from "react";
import Modal from "../Modal";
import ArticlePreview from "../ArticlePreview";
import { institutionTagsMock } from "@/app/mocks";

export default function BasicTable({ articles }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewedArticle, setPreviewedArticle] = useState(null);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = (article) => {
    setPreviewedArticle(article);
    setIsModalOpen(true);
  };

  // sort articles by date
  articles.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date) - new Date(a.date);
    } else if (a.datePublished && b.datePublished) {
      return new Date(b.datePublished) - new Date(a.datePublished);
    } else {
      return 0;
    }
  });

  const colorMap = {
    case: "bg-blue-400 inline-block py-1 px-2 mt-2 text-white rounded-1 justify-center self-center text-xs flex font-medium mb-2 mr-2",
    review:
      "bg-red-400 inline-block py-1 px-2 mt-2 text-white rounded-1 justify-center self-center text-xs flex font-medium mb-2 mr-2",
    retro:
      "bg-green-400 inline-block py-1 px-2 mt-2 text-white rounded-1 justify-center self-center text-xs flex font-medium mb-2 mr-2",
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
      {isModalOpen && (
        <Modal show={isModalOpen} fragment={Fragment} closeModal={closeModal}>
          <ArticlePreview article={previewedArticle} />
        </Modal>
      )}
      <div className="">
        <table className="border">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 px3.5 pl-4 pr-3 text-left text-md font-semibold text-gray-900"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-md font-semibold text-gray-900 hidden sm:table-cell"
              >
                Date
              </th>

              <th
                scope="col"
                className="px-3 py-3.5 text-left text-md font-semibold text-gray-900 hidden sm:table-cell"
              >
                First Author
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-md font-semibold text-gray-900 lg:table-cell"
              >
                Abstract
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-md font-semibold text-gray-900 sm:table-cell"
              >
                Article
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-md font-semibold text-gray-900 hidden sm:table-cell pl-4"
              >
                Type
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {Array.isArray(articles) &&
              articles.map((article, index) => (
                <tr key={index}>
                  <td className="w-full lg:pl-4 lg:w-2/3 max-w-0 py-4 pl-1 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                    {article.title}
                  </td>

                  <td className="py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-0 hidden sm:table-cell">
                    {article.date
                      ? `${new Date(article.date).getMonth() + 1}/${new Date(
                        article.date
                      ).getDate()}/${new Date(article.date).getFullYear() % 100
                      }`
                      : ""}
                  </td>
                  <td className="py-4 pl-3 pr-4 text-left text-xs font-medium sm:pr-0 text-gray-600 hidden sm:table-cell">
                    {article.authors ? (
                      <div>
                        {article?.authors[0]?.firstName}{" "}
                        {article?.authors[0]?.lastName}
                      </div>
                    ) : (
                      <div>
                        {article?.articleAuthors[0]?.firstName}{" "}
                        {article?.articleAuthors[0]?.lastName}
                      </div>
                    )}
                  </td>

                  <td className="hidden px-3 py-4 text-sm text-left text-blue-600 hover:text-blue-900 lg:table-cell">
                    {!isEmpty(article.abstract) ? (
                      <button onClick={() => openModal(article)}>
                        Preview
                      </button>
                    ) : null}
                    {/* {Object.keys(article.abstract).map((key) => (
                      <div key={key} className="line-clamp-1">
                        <strong>{key}: </strong>
                        {Array.isArray(article.abstract[key])
                          ? article.abstract[key].map((value) => (
                              <span key={value}>{value}</span>
                            ))
                          : article.abstract[key]} */}
                    {/* </div> */}
                    {/* ))} */}
                  </td>

                  <td className="hidden py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-0 lg:table-cell">
                    <a
                      target="_blank"
                      href={`https://pubmed.ncbi.nlm.nih.gov/${article.PMID}/`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </a>
                  </td>

                  <td className=" py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-0 md:hidden sm:table-cell">
                    {!isEmpty(article.abstract) ? (
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => openModal(article)}
                      >
                        Preview
                      </button>
                    ) : (
                      <a
                        target="_blank"
                        href={`https://pubmed.ncbi.nlm.nih.gov/${article.PMID}/`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </a>
                    )}
                  </td>
                  <td className="text-left h-full  hidden sm:table-cell text-xs font-medium  items-center justify-center sm:pr-0 text-gray-600">
                    {article.type === "case" ||
                      article.type === "review" ||
                      article.type === "retro" ? (
                      <div
                        className={`${getTagColor(article.type)}`}
                        key={article.type}
                      >
                        {tagsLookup[article.type]}
                      </div>
                    ) : null}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
