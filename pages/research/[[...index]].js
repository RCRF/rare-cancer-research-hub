import React, { useState, useEffect } from "react";
import Research from "@/components/Research";
import {
  useFetchArticles,
  useInteralArticles,
  useTrialData,
  useFetchLabResearch,
  useFetchClinicalTrials,
} from "@/hooks/api";
import Institutions from "../institutions";
import ClinicalTrialTable from "@/components/tables/ClinicalTrialTable";
import { Spinner } from "flowbite-react";
import { Footer } from "@/components/HomePage/Footer";

const ResearchPage = ({ isEditing }) => {
  const id = "5058ba10-88d5-48b1-9d01-041e6777e80e";
  const [isLoading, setIsLoading] = useState(true);
  const { data: articles } = useFetchArticles(id);
  const { data: internalArticles } = useInteralArticles();
  const { data: trialData } = useTrialData();
  const { data: labResearch } = useFetchLabResearch(id);
  const { data: clincialTrials } = useFetchClinicalTrials(id);

  useEffect(() => {
    // Simulate delay for fetching data
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  if (isLoading) {
    // Render loading screen
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        <svg
          className="animate-spin -ml-1 mr-3 h-10 w-10 "
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full">
      <main className="flex flex-col bg-slate-50 justify-center items-center md:w-[70%] w-5/6">
        <h1 className="text-5xl font-semibold text-slate-900 w-full mt-14 md:text-left ">
          Research
        </h1>
        {articles ? (
          <Research
            articles={articles}
            internalArticles={internalArticles}
            trialData={trialData}
            labResearch={labResearch}
            isEditing={isEditing}
          />
        ) : null}
        <div className="mt-14 mb-10">
          <Institutions />
        </div>

        <div className="w-full">
          <h1 className="text-left w-full text-2xl font-semibold mt-10 pl-2">
            Clinical Trials
          </h1>
          <p className="text-sm text-left w-full mb-4 pl-2">
            While there aren't currently any dedicated clincial trials for ChRCC
            specifically, the trials below may have eligibility criteria
            applicable to ChRCC patients.
          </p>
          <ClinicalTrialTable trials={clincialTrials} />
          <div className="text-left w-full pb-4 text-xs mt-4 text-gray-500 mb-10">
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
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default ResearchPage;
