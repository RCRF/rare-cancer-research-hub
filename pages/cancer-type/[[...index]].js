"use client";
import { React, useState, useEffect, Fragment, useRef } from "react";
import { Protect, useUser } from '@clerk/nextjs';

import ResearchHighlights from "../../components/ResearchHighlights";

import {
  institutionTagsMock,
  organizationsMock,
  providersTagsMock,
} from "@/app/mocks";
import InstitutionCard from "@/components/InstitutionCard";
import ProviderCard from "@/components/ProviderCard";
import OrganizationCard from "@/components/OrganizationCard";
import ResourceCard from "@/components/ResourceCard";
import AddProviderForm from "@/components/AddProviderForm";
import {
  useFetchArticles,
  useInstitutions,
  useProviders,
  useInteralArticles,
  useTrialData,
  useFetchOrganization,
  useFetchClinicalTrials,
  fetchResourcesByOrganization,
} from "@/hooks/api";
import TagLegendCard from "@/components/TagLegendCard";
import {
  BuildingOfficeIcon,
  InformationCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import Modal from "@/components/Modal";
import ClinicalTrialTable from "@/components/tables/ClinicalTrialTable";
import internal from "stream";
import { Footer } from "@/components/HomePage/Footer";
import Head from "next/head";
import { useSession } from "next-auth/react";
import AddInstitutionForm from "@/components/AddInstitutionForm";
import { useQueryClient, useQuery } from "react-query";
import HighlightCard from "@/components/HighlightCard";

export default function Home({ version, setVersion, isEditing, setIsEditing }) {
  const queryClient = useQueryClient();
  const id = "5058ba10-88d5-48b1-9d01-041e6777e80e";
  const { data: institutionData } = useInstitutions();
  const { data: providersData } = useProviders();
  const { data: articles } = useFetchArticles();

  const { data: organization } = useFetchOrganization(id);
  const { data: internalArticles } = useInteralArticles();
  const { data: trialData } = useTrialData();
  const { data: clincialTrials } = useFetchClinicalTrials(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProvidersModalOpen, setIsProvidersModalOpen] = useState(false);
  const { data: session } = useSession();
  const { user } = useUser();

  const {
    data: resources,
    isLoading,
    isError,
  } = useQuery(["resourcesByOrganization", id], () =>
    fetchResourcesByOrganization(id)
  );

  const [isAddProviderOpen, setIsAddProviderOpen] = useState(false);
  const [isAddInstitutionOpen, setIsAddInstitutionOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedVersion = localStorage.getItem("version");
      if (storedVersion) {
        setVersion(storedVersion);
      }

      const handleStorageChange = (e) => {
        if (e.key === "version") {
          setVersion(e.newValue);
        }
      };

      window.addEventListener("storage", handleStorageChange);
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, [version]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeInstitutionModal = () => {
    setIsAddInstitutionOpen(false);
  };

  const closeAddProvider = () => {
    setIsAddProviderOpen(false);
  };

  const closeProvidersModal = () => {
    setIsProvidersModalOpen(false);
  };

  // Get primary email address
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const isAdmin = userEmail === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  return (
    <>
      <Head>
        <title>MedResourceConnect</title>
        <meta
          name="description"
          content="Med Resource Connect, connecting resources for chromophobe kidney cancer and other rare diseases."
        />
        <meta property="og:title" content="MedResourceConnect" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://medresourceconnect.com" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dyrev28qc/image/upload/v1688187311/MedResourceConnect_jsvkul.png"
        />
      </Head>
      <div className="flex justify-center">
        {isAddProviderOpen && (
          <Modal
            show={isAddProviderOpen}
            fragment={Fragment}
            closeModal={closeAddProvider}
          >
            <div>
              <AddProviderForm
                closeModal={closeAddProvider}
                session={session}
              />
            </div>
          </Modal>
        )}

        {isAddInstitutionOpen && (
          <Modal
            show={isAddInstitutionOpen}
            fragment={Fragment}
            closeModal={closeInstitutionModal}
          >
            <div>
              <AddInstitutionForm
                closeModal={closeInstitutionModal}
                session={session}
              />
            </div>
          </Modal>
        )}
        {isModalOpen && (
          <Modal show={isModalOpen} fragment={Fragment} closeModal={closeModal}>
            <TagLegendCard
              tags={institutionTagsMock}
              tagType="Institution Tags"
            />
          </Modal>
        )}
        {isProvidersModalOpen && (
          <Modal
            show={isProvidersModalOpen}
            fragment={Fragment}
            closeModal={closeProvidersModal}
          >
            <TagLegendCard tags={providersTagsMock} tagType="Provider Tags" />
            <div className="mt-4 flex flex-row">
              <BuildingOfficeIcon className="h-8 w-8 ml-1 text-blue-400" />{" "}
              <p className="text-sm flex self-center">
                Providers with the institution icon are at institutions that
                research Chromophobe RCC
              </p>
            </div>
          </Modal>
        )}
        <main className="flex flex-col p-10 bg-slate-50 justify-center items-center md:w-[80%] w-full">
          <h1 className="md:text-6xl w-full text-3xl mx-auto p-4 text-center font-semibold">
            Chromophobe Kidney Cancer
          </h1>
          <div className="mt-5 w-full flex flex-wrap ">
            <div className="grid sm:grid-cols-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4 grid-row-[fr1] mt-14">
              {organization?.highlights
                ?.sort((a, b) => a.order - b.order)
                .map((highlight, index) => (
                  <HighlightCard
                    key={index}
                    firstLine={highlight.firstLine}
                    secondLine={highlight.secondLine}
                    thirdLine={highlight.thirdLine}
                  />
                ))}
            </div>
          </div>
          <div className="w-full">
            <h1 className="text-left w-full p-4 text-2xl font-semibold mt-20">
              Summary
            </h1>
            <div className="text-left w-full pl-4">
              <p>{organization?.summary}</p>
            </div>
          </div>

          {version === "mrcresearch" ? (
            <div className="mx-auto w-full">
              <ResearchHighlights
                articles={articles}
                internalArticles={internalArticles}
                trialData={trialData}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
              <div className="flex items-center mt-20">
                <h1 className="text-left text-2xl font-semibold">
                  Institutions Researching Chromophobe RCC
                </h1>


                {isMounted && isEditing && isAdmin ? (
                  // <Protect permission="org:sys_domains:manage">
                  <div>
                    <button onClick={() => setIsAddInstitutionOpen(true)}>
                      <PlusCircleIcon className="h-5 w-6 text-blue-500 ml-2" />
                    </button>
                  </div>
                  // </Protect>
                ) : (
                  null
                )}


                {isMounted && !isEditing && (
                  <button onClick={() => setIsModalOpen(true)}>
                    <InformationCircleIcon className="w-6 inline-block h-full ml-2 text-blue-400" />
                  </button>
                )}
              </div>

              <div className="w-full mb-4">
                <div className="flex flex-col h-full">
                  <TagLegendCard highlights={institutionTagsMock} />
                </div>
              </div>

              <div className="grid sm:grid-cols-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4 grid-row-[fr1]">
                {institutionData
                  ?.sort((a, b) => a.listOrder - b.listOrder)
                  ?.map((institution, index) => (
                    <div className="flex flex-col h-full" key={index}>
                      <InstitutionCard
                        className="shadow-md"
                        institution={institution}
                        isActive={false}
                      />
                    </div>
                  ))}
              </div>
            </div>
          ) : null}

          <div className="flex w-full mt-20">
            <div className="flex flex-col mb-8">
              <div className="flex flex-row">
                <h1 className="text-left text-2xl font-semibold">
                  Providers who see patients with Chromophobe RCC
                </h1>
                {isMounted && isEditing && isAdmin && (
                  // <Protect permission="org:sys_domains:manage">
                  <div className="self-center">
                    <button onClick={() => setIsAddProviderOpen(true)}>
                      <PlusCircleIcon className="h-5 w-6 text-blue-500 ml-2" />
                    </button>
                  </div>
                  // </Protect>
                )}

                {isMounted && !isEditing && (
                  <div onClick={() => setIsProvidersModalOpen(true)}>
                    <InformationCircleIcon className="w-6 inline-block h-full ml-2 text-blue-400" />
                  </div>
                )}

              </div>
              <p className="text-sm text-left text-gray-600">
                The information provided here is for informational purposes only and does not constitute an endorsement or recommendation of any provider.
              </p>
            </div>



          </div>

          <div className="mb-10">
            <div className="grid sm:grid-cols-1  grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full gap-4">
              {providersData
                ?.sort((a, b) => a.listOrder - b.listOrder)
                ?.map((provider, index) => (
                  <ProviderCard
                    className="shadow-md"
                    key={index}
                    provider={provider}
                    isActive={false}
                  />
                ))}
            </div>
          </div>

          <h1 className="text-left w-full p-4 text-2xl font-semibold mt-20">
            Organizations Funding Research
          </h1>
          <div className="grid sm:grid-cols-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full gap-4">
            {organizationsMock?.map((organization, index) => (
              <OrganizationCard
                className="shadow-md"
                key={index}
                organization={organization}
                isActive={false}
              />
            ))}
          </div>

          <h1 className="text-left w-full pl-4 text-2xl font-semibold mt-20">
            Clinical Trials
          </h1>
          <p className="text-sm text-left w-full pl-4 mb-4">
            While there aren't currently any dedicated clincial trials for ChRCC
            specifically, the trials below may have eligibility criteria
            applicable to ChRCC patients.
          </p>
          <ClinicalTrialTable trials={clincialTrials} />
          <div className="text-left w-full pb-4 pl-4 text-xs mt-4 text-gray-500">
            Trials sourced from{" "}
            <a
              className="text-blue-500"
              href="https://www.kidneycancer.org/clinical-trials-finder/?trial_page=1"
              target="_blank"
            >
              Kidney Cancer Association's Clinical Trial Finder{" "}
            </a>
            or trials related to{" "}
            <a
              className="text-blue-500"
              href="https://www.youtube.com/watch?v=xY7BkvTzY8Y"
              target="_blank"
            >
              preclincial research in ChRCC
            </a>
          </div>
          <h1 className="text-left w-full p-4 text-2xl font-semibold mt-16">
            Resources / Webinars / Videos
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 grid-rows-[1fr] w-full">
            {resources?.map((resource, index) => (
              <ResourceCard
                className="shadow-md"
                key={index}
                resource={resource}
                isActive={false}
              />
            ))}
          </div>
        </main >
      </div >
      <Footer />
    </>
  );
}

Home.getInitialProps = async ({ query }) => {
  return {
    type: query.type,
    props: {
      organizations: organizationsMock,
    },
  };
};
