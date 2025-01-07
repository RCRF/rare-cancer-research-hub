"use client";
import React, { useState, Fragment } from "react";

import InstitutionCard from "@/components/InstitutionCard";
import ProviderCard from "@/components/ProviderCard";
import {
  useInstitutions,
  useProviders,
} from "@/hooks/api";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import Modal from "@/components/Modal";
import TagLegendCard from "@/components/TagLegendCard";
import { institutionTagsMock } from "@/app/mocks";

const Institutions = () => {
  const { data: institutionData } = useInstitutions();
  const { data: providersData } = useProviders();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center w-full">
      <main className="flex flex-col bg-slate-50 justify-center items-center">
        <h1 className="text-5xl font-semibold  text-slate-900 w-full mt-14 mb-10">
          Institutions
        </h1>
        {isModalOpen && (
          <Modal show={isModalOpen} fragment={Fragment} closeModal={closeModal}>
            <TagLegendCard
              tags={institutionTagsMock}
              tagType="Institution Tags"
            />
          </Modal>
        )}
        <h1 className="text-left w-full p-2 text-2xl font-semibold mt-10">
          Institutions Researching Chromophobe RCC{" "}
          <button onClick={() => setIsModalOpen(true)}>
            <InformationCircleIcon className="w-6 inline-block h-full pl-1 mb-1 text-blue-400 " />
          </button>
        </h1>

        <div className="grid sm:grid-cols-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4 grid-row-[fr1]">
          {institutionData?.map((institution, index) => (
            <div className="flex flex-col h-full">
              <InstitutionCard
                className="shadow-md"
                key={index}
                institution={institution}
                isActive={false}
              />
            </div>
          ))}
        </div>

        <h1 className="text-left w-full p-4 text-2xl font-semibold mt-20">
          Providers who see patients with Chromophobe RCC
        </h1>
        <div className="flex flex-row grid sm:grid-cols-1  grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full gap-4">
          {providersData?.map((provider, index) => (
            <ProviderCard
              className="shadow-md"
              key={index}
              provider={provider}
              isActive={false}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Institutions;
