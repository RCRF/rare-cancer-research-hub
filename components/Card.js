import { React, useState, Fragment, useEffect } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import InternalResearchForm from "./InternalResearchForm";
import { useMutation, useQueryClient } from "react-query";
import { updateArticlePATCH } from "@/hooks/api";
import AdminEditCard from "./AdminEditCard";
import { toast } from "react-hot-toast";

export default function Card({
  article,
  isActive,
  articles,
  session,
  index,
  isEditing,
  type,
}) {
  const [isAddResearchOpen, setIsAddResearchOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation(updateArticlePATCH, {
    onSuccess: (data) => {
      // Handle successful response
      // fetchAllOrganizations(session).then((data) => {
      //   setOrganizations(data);
      // });
    },
    onError: (error) => {
      // Handle error
      toast.error("Error updating order");
    },
  });

  const closeAddResearch = () => {
    setIsAddResearchOpen(false);
  };

  const cardStyle = isActive
    ? "border-4 border-blue-700 shadow-lg border-opacity-20"
    : "shadow-md border-2 border-gray-200 ";

  const redirectToArticle = () => {
    if (session?.isAdmin) {
      if (session?.isAdmin && isEditing) {
        setIsAddResearchOpen(true);
      } else {
        window.open(article.link, "_blank");
      }
    } else {
      window.open(article.link, "_blank");
    }
  };

  const submitArticle = (data) => {
    const payload = {
      data,
      session,
    };
    mutate(payload, {
      onSuccess: (data) => {
        // setIsToggled(!isToggled);
        queryClient.invalidateQueries(["internalArticles"]);
      },
    });
  };

  const saveOrder = (data) => {
    if (type) {
      data.updateOrder = true;
      data.order = index + 1;
      data.type = type;
      const payload = {
        data,
        session,
      };

      mutate(payload, {
        onSuccess: (data) => {
          // setIsToggled(!isToggled);
          toast.success("Order saved");
          queryClient.invalidateQueries(["internalArticles"]);
        },
      });
    }
  };

  return (
    <div
      className={`m-2 max-w-sm w-full h-full mx-auto lg:max-w-full lg:flex border bg-white shadow-lg  ${cardStyle}  flex flex-col`}
      onClick={redirectToArticle}
    >
      {isAddResearchOpen && (
        <Modal
          show={isAddResearchOpen}
          fragment={Fragment}
          closeModal={closeAddResearch}
        >
          <AdminEditCard
            article={article}
            articles={articles}
            saveOrder={saveOrder}
            closeModal={closeAddResearch}
          />
        </Modal>
      )}
      <div className="w-full flex-none overflow-hidden relative">
        <img
          className="w-full object-contain"
          src="/img/kidneyBackground.png"
          alt="kidneyBackground"
        />

        <div className="absolute inset-0 bg-gray-100 opacity-50"></div>
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-1 right-1"
        ></a>
      </div>

      <div className="p-4 flex flex-col leading-normal w-full">
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col">
            <p className="text-gray-700 text-2xl l:h-28 font-semibold flex lg:line-clamp-3 mb-2 md-line-clamp-2">
              {article.title}
            </p>
            <div className="text-xs mb-2 flex flex-col text-gray-600">
              <p className="line-clamp-1">
                Authors:{" "}
                {article.articleAuthors
                  ? article.articleAuthors
                      .sort((a, b) => {
                        // if either value is null, sort it last
                        if (a.listOrder === null) return 1;
                        if (b.listOrder === null) return -1;

                        return a.listOrder - b.listOrder;
                      })
                      .map(
                        (author) =>
                          author.firstName +
                          " " +
                          author.lastName +
                          " " +
                          (author.designation !== null
                            ? author.designation
                            : "")
                      )
                      .join(", ")
                  : null}
              </p>
              {/* //format the date to be more readable */}
              <p>
                Published:{" "}
                {new Date(article.datePublished).toLocaleDateString("en-US")}
              </p>
            </div>

            <hr className="my-1 mb-3" />
            <div className="bg-blue-50 items-center flex flex-row">
              <div className="px-2">
                <InformationCircleIcon className="w-6 h-6 text-blue-600" />
              </div>
              <p className="leading-none text-sm pt-2 pr-2 pb-2">
                {article.headline}
              </p>
            </div>
            <p className="leading-none text-sm mt-2 pt-2 line-clamp-6 overflow-scroll">
              {article.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
