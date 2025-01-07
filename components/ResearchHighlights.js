import React, { useState, Fragment } from "react";
import TrialTable from "./tables/TrialTable";
import {
  InformationCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import TagLegendCard from "./TagLegendCard";
import Modal from "./Modal";
import Card from "./Card";
import InternalArticlesTable from "./tables/InternalArticlesTable";
import { useMutation } from "react-query";
import { useSession, getSession } from "next-auth/react";
import InternalResearchForm from "./InternalResearchForm";
import { createArticlePOST } from "@/hooks/api";
import { toast } from "react-hot-toast";
import { queryClient } from "@/queryClient";

const trialTagMocks = [
  {
    id: 1,
    value: "immunotherapy",
    title: "Immunotherapy",
    firstLine: "Nivolumab, Pembrolizumab, Ipilimumab, Atezolizumab",
    secondLine: "",
  },
  {
    id: 2,
    value: "tki",
    title: "Drugs Targeting VEGF (mostly TKIs)",
    firstLine: "Lenvatinib, Cabozantinib, Sunitinib, Axitinib, Bevacizumab",
    secondLine: "",
  },
  {
    id: 3,
    value: "mtor",
    title: "mTOR Inhibitors",
    firstLine: "Everolimus",
    secondLine: "",
  },
  ,
  {
    id: 3,
    value: "chemotherapy",
    title: "Chemotherapy",
    firstLine:
      "Gemcitabine, Doxorubicin, Carboplatin, Paclitaxel, Capecitabine",
    secondLine: "",
  },
];

export default function Research({ internalArticles, trialData, isEditing }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddResearchOpen, setIsAddResearchOpen] = useState(false);
  const [isManagementOpen, setIsManagementOpen] = useState(false);
  const { data: session } = useSession();
  const { mutate } = useMutation(createArticlePOST, {
    onSuccess: (data) => {
      // Handle successful response
      // fetchAllOrganizations(session).then((data) => {
      //   setOrganizations(data);
      // });
    },
    onError: (error) => {
      // Handle error
      toast.error("Error adding organizaiton");
    },
  });
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeAddResearch = () => {
    setIsAddResearchOpen(false);
  };

  const closeManagementModal = () => {
    setIsManagementOpen(false);
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

  return (
    <>
      <div className="flex justify-center mx-auto">
        <main className="flex flex-col bg-slate-50 justify-center items-center">
          <div className="mt-12 sm:p-2 w-full">
            {isModalOpen && trialTagMocks && (
              <Modal
                show={isModalOpen}
                fragment={Fragment}
                closeModal={closeModal}
              >
                <TagLegendCard
                  tags={trialTagMocks}
                  tagType="Treatment Categories"
                />
              </Modal>
            )}

            {isManagementOpen && (
              <div>
                <Modal
                  show={isModalOpen}
                  fragment={Fragment}
                  closeModal={closeManagementModal}
                >
                  <div className="mb-10">
                    <h1 className="text-center md:text-left sm:text-xl text-md p-2 font-semibold mb-2">
                      Review and Management Literature{" "}
                    </h1>

                    <InternalArticlesTable
                      articles={internalArticles?.filter(
                        (a) => a.management === true
                      )}
                      modal={true}
                      isAdmin={session?.isAdmin ?? false}
                      isEditing={isEditing}
                    />
                  </div>
                </Modal>
              </div>
            )}
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
                  />
                </div>
              </Modal>
            )}
            <div className="flex flex-row md:p-4">
              <h1 className="text-center md:text-left md:text-2xl text-xl font-semibold">
                Review and Management Literature
              </h1>
              {session?.isAdmin && isEditing && (
                <button
                  onClick={() => setIsAddResearchOpen(true)}
                  type="button"
                  className="rounded-full  p-1 text-white shadow-sm"
                >
                  <PlusCircleIcon
                    className="h-6 w-6 text-blue-500 pl-1 hover:text-blue-600"
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>
            <div className="grid sm:grid-cols-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4">
              {internalArticles
                ?.filter((a) => a.management === true)
                .sort((a, b) => {
                  // if either value is null, sort it last
                  if (a.managementOrder === null) return 1;
                  if (b.managementOrder === null) return -1;

                  return a.managmentOrder - b.managmentOrder;
                })
                .splice(0, 3)
                ?.map((article, index) => (
                  <Card
                    isEditing={isEditing}
                    className="shadow-md"
                    key={index}
                    article={article}
                    isActive={false}
                    articles={internalArticles?.filter(
                      (a) => a.management === true
                    )}
                    session={session}
                    index={index}
                    type={"management"}
                  />
                ))}
            </div>
            <div className="text-right p-2 mt-4 text-sm text-blue-700 font-semibold">
              <button onClick={() => setIsManagementOpen(true)}>
                View all management articles{" "}
              </button>
            </div>

            <div>
              <div className="items-bottom flex flex-row">
                <h1 className="text-center md:text-left  pb-4 pl-4 text-2xl font-semibold mt-20">
                  Trial Results w/Chromophobe RCC Cohorts
                  <button onClick={() => setIsModalOpen(true)}>
                    <InformationCircleIcon className="w-6 inline-block h-full pl-1 mb-1 text-blue-400 " />
                  </button>
                </h1>
              </div>
              <div className="align-left w-full">
                <TrialTable trialData={trialData} />
              </div>
              <div className="text-center md:text-left  pb-4 pl-4 text-xs mt-4 text-gray-500">
                Table data adapted from systemic reviews{" "}
                <a
                  className="text-blue-500"
                  href="https://www.sciencedirect.com/science/article/abs/pii/S0889858823000539"
                  target="_blank"
                >
                  here
                </a>{" "}
                and{" "}
                <a
                  className="text-blue-500"
                  href="https://pubmed.ncbi.nlm.nih.gov/31953002/"
                  target="_blank"
                >
                  here.
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

//test
