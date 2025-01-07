import React, { useState, Fragment } from "react";

import BasicTable from "./tables/BasicTable";
import ResearchHighlights from "./ResearchHighlights";
import Card from "./Card";
import CellLineCard from "./CellLineCard";
import InternalArticlesTable from "./tables/InternalArticlesTable";
import Modal from "./Modal";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useMutation } from "react-query";
import { useSession, getSession } from "next-auth/react";
import InternalResearchForm from "./InternalResearchForm";
import { createArticlePOST } from "@/hooks/api";
import { toast } from "react-hot-toast";
import { queryClient } from "@/queryClient";
import { Protect, useUser } from '@clerk/nextjs';
import { InformationCircleIcon } from "@heroicons/react/24/solid";

export default function Research({
  articles,
  internalArticles,
  trialData,
  labResearch,
  isEditing,
  setIsEditing,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddResearchOpen, setIsAddResearchOpen] = useState(false);
  const { data: session } = useSession();
  const { user } = useUser();
  const { mutate } = useMutation(createArticlePOST, {
    onSuccess: (data) => {
      // Handle successful response
      // fetchAllOrganizations(session).then((data) => {
      //   setOrganizations(data);
      // });
    },
    onError: (error) => {
      // Handle error
      toast.error("Error adding article");
    },
  });
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeAddResearch = () => {
    setIsAddResearchOpen(false);
  };

  const submitArticle = (data) => {
    const payload = {
      data,
      session,
    };
    mutate(payload, {
      onSuccess: (data) => {
        // setIsToggled(!isToggled);
        queryClient.invalidateQueries("articles");
      },
    });
  };



  // Get primary email address
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const isAdmin = userEmail === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  return (
    <div>
      {isAddResearchOpen && (
        <Modal
          show={isAddResearchOpen}
          fragment={Fragment}
          closeModal={closeAddResearch}
        >
          <div>
            <InternalResearchForm
              closeModal={closeAddResearch}
              addArticle={submitArticle}
              type=""
            />
          </div>
        </Modal>
      )}
      {isModalOpen && (
        <Modal show={isModalOpen} fragment={Fragment} closeModal={closeModal}>
          <div className="mb-10">
            <h1 className="text-center md:text-left sm:text-xl text-md p-2 font-semibold mb-2">
              Highlighted Articles{" "}
            </h1>
            <InternalArticlesTable
              articles={internalArticles
                ?.filter((a) => a.highlighted === true)
                .sort(
                  (a, b) =>
                    new Date(b.datePublished) - new Date(a.datePublished)
                )}
              modal={true}
              isEditing={isEditing}
              isAdmin={session?.isAdmin ?? false}
            />
          </div>
        </Modal>
      )}
      <ResearchHighlights
        internalArticles={internalArticles}
        articles={articles}
        trialData={trialData}
        isEditing={isEditing}
      />

      <div className="flex flex-row md:p-4 mt-10">
        <h1 className="text-left p-4 text-2xl font-semibold">
          Highlighted Research
        </h1>
        {/* Can use protect if using Clerk b2b */}
        {/* <Protect permission="org:sys_domains:manage"> */}
        {isEditing && isAdmin ? (
          <button
            onClick={() => setIsAddResearchOpen(true)}
            type="button"
            className="rounded-full p-1 text-white shadow-sm"
          >
            <PlusCircleIcon
              className="h-6 w-6 text-blue-500 pl-1 hover:text-blue-600"
              aria-hidden="true"
            />
          </button>
        ) : null}
        {/* </Protect> */}
        {!isEditing && isAdmin && (
          <button onClick={() => setIsModalOpen(true)}>
            <InformationCircleIcon className="w-6 inline-block h-full ml-2 text-blue-400" />
          </button>
        )}
      </div>

      <div className="grid sm:grid-cols-1  grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full gap-4">
        {internalArticles
          ?.filter((a) => a.highlighted === true)
          .sort((a, b) => {
            // if either value is null, sort it last
            if (a.highlightOrder === null) return 1;
            if (b.highlightOrder === null) return -1;

            return a.highlightOrder - b.highlightOrder;
          })
          // .sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished))
          .slice(0, 2)
          ?.map((article, index) => (
            <Card
              className="shadow-md"
              key={index}
              article={article}
              isActive={false}
              isEditing={isEditing}
              session={session}
              index={index}
              articles={internalArticles?.filter((a) => a.highlighted === true)}
              type={"highlight"}
            />
          ))}
      </div>
      <div className="text-right p-2 mt-4 text-sm text-blue-700 font-semibold">
        <button onClick={() => setIsModalOpen(true)}>
          View all highlighted articles{" "}
        </button>
      </div>
      <h1 className="text-left w-full p-4 text-2xl font-semibold mt-20">
        Cell Lines
      </h1>
      <div className="grid sm:grid-cols-1  grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full gap-4">
        {labResearch &&
          labResearch?.map((cellLine, index) => (
            <CellLineCard key={index} cellLine={cellLine} />
          ))}
      </div>
      {articles !== undefined && articles !== null ? (
        <div>
          <h1 className="text-left w-full p-4 text-2xl font-semibold mt-20">
            Most Recent PubMed Articles
          </h1>
          <div className="align-left w-full">
            <BasicTable articles={articles} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
