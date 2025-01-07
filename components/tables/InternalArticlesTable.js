import { isEmpty, set } from "lodash";
import { type } from "os";
import React, { Fragment, useState } from "react";
import Modal from "../Modal";
import ArticlePreview from "../ArticlePreview";
import { institutionTagsMock } from "@/app/mocks";

export default function InternalArticlesTable({
  articles,
  modal,
  isAdmin,
  isEditing,
}) {
  return (
    <div className="pl-2">
      <div className="">
        <table className="border w-full">
          <thead className="bg-slate-100 w-full">
            <tr>
              <th
                scope="col"
                className="py-3.5 px3.5 pl-4 pr-3 sm:w-3/4 w-60 text-left text-md font-semibold text-gray-900"
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
                {modal ? "Authors" : "First Author"}
              </th>
              {modal ? null : (
                <div>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-md font-semibold text-gray-900 sm:table-cell"
                  >
                    Article
                  </th>
                </div>
              )}

              {modal ? null : (
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-md font-semibold text-gray-900 hidden sm:table-cell pl-4"
                >
                  Type
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {Array.isArray(articles) &&
              articles
                .sort((a, b) => {
                  // sort by datePublished
                  if (a.datePublished === null) return 1;
                  if (b.datePublished === null) return -1;
                  return new Date(b.datePublished) - new Date(a.datePublished);
                })
                .map((article, index) => (
                  <tr key={index}>
                    <td className="w-full lg:pl-4 lg:w-2/3 max-w-0 py-4 pl-1 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                      {modal ? (
                        <a
                          href={
                            isAdmin && isEditing
                              ? `/articles/${article.id}`
                              : article.link
                          }
                          target="_blank"
                          className="text-blue-700"
                        >
                          {article.title}
                        </a>
                      ) : (
                        <>{article.title}</>
                      )}
                    </td>
                    <td className="py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-0 hidden sm:table-cell">
                      {article.date
                        ? `${new Date(article.date).getMonth() + 1}/${new Date(
                            article.date
                          ).getDate()}/${
                            new Date(article.date).getFullYear() % 100
                          }`
                        : `${
                            new Date(article.datePublished).getMonth() + 1
                          }/${new Date(article.datePublished).getDate()}/${
                            new Date(article.datePublished).getFullYear() % 100
                          }`}
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
                          {article?.articleAuthors[0]?.lastName}...
                        </div>
                      )}
                    </td>

                    <td className="hidden py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-0 md:hidden sm:table-cell">
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
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
