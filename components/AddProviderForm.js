import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createProviderPOST, fetchAllOrganizations } from "@/hooks/api";
import Select from "./common/Select";
import { fetchTags } from "@/hooks/api";
import { getReadableName } from "@/utils/helpers";
import PhotoUpload from "./common/PhotoUpload";

export default function AddProviderForm({ closeModal, session }) {
  const [organizations, setOrganizations] = useState();
  //this should probably be moved up a level
  const [tags, setTags] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchAllOrganizations(session);
        setOrganizations(data);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    }

    fetchData();
  }, [session]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    async function fetchData() {
      if (watch("organization")) {
        try {
          const data = await fetchTags(session, watch("organization").id);
          // Add a "selected" property to each tag
          const structuredTags = data.map((tag) => ({
            ...tag,
            selected: false,
          }));
          setTags(structuredTags);
        } catch (error) {
          console.error("Error fetching tags:", error);
        }
      }
    }
    fetchData();
  }, [watch("organization")]);

  const onSubmit = (data) => {
    const selectedTags = tags.filter((tag) => tag.selected);
    //set the selected tags to the data object
    data.tags = selectedTags;
    createProviderPOST({ data, session });
    closeModal();
  };

  const handleTagClick = (tagId) => {
    setTags((prevTags) =>
      prevTags.map((tag) =>
        tag.id === tagId ? { ...tag, selected: !tag.selected } : tag
      )
    );
  };

  return (
    <div className="flex items-center self-center justify-center h-1/2">
      <div className="w-11/12 p-5">
        <div className="flex flex-col w-full justify-center">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-5">
            New Provider
          </h2>

          <PhotoUpload
            session={session}
            setValue={setValue}
            name="image"
            type="provider"
          />

          {organizations && organizations.length > 0 && (
            <div className="w-2/3 mx-auto z-10">
              <Select
                setValue={setValue}
                name="organization"
                options={organizations}
              />
              {/* other form fields */}
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className=" rounded p-3">
          <div className="rounded-md shadow-sm -space-y-px p-6">
            <div className="gap-2 grid grid-cols-1 sm:grid-cols-12">
              <div className="col-span-1 sm:col-span-5">
                <label className="text-sm font-medium">First Name</label>
                <input type="hidden" {...register("image")} />

                <input
                  {...register("firstName", {
                    required: "Fist name is required",
                  })}
                  name="firstName"
                  type="text"
                  required
                  autoComplete="off"
                  className="rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-sm"
                />

                {errors.title && (
                  <p className="text-red-500 text-xs italic">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="col-span-1 sm:col-span-5">
                <label className="text-sm font-medium">Last Name</label>

                <input
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  name="lastName"
                  type="text"
                  required
                  autoComplete="off"
                  className="rounded-md relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-sm"
                />

                {errors.title && (
                  <p className="text-red-500 text-xs italic">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="col-span-1 sm:col-span-2">
                <label className="text-sm font-medium">Designation</label>
                <div className="">
                  <input
                    {...register("designation")}
                    name="designation"
                    type="text"
                    autoComplete="off"
                    className="rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full gap-2">
              <div className="pt-2 w-full">
                <label htmlFor="institution" className="text-sm font-medium">
                  Institution
                </label>
                <div className="pt-2">
                  <input
                    {...register("institution", {
                      required: "institution is required",
                    })}
                    id="institution"
                    name="institution"
                    type="text"
                    required
                    autoComplete="off"
                    className="rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  />

                  {errors.name && (
                    <p className="text-red-500 text-xs italic">
                      {errors.link.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full gap-2">
              <div className="pt-2 w-full">
                <label htmlFor="link" className="text-sm font-medium">
                  Link
                </label>
                <div className="pt-2">
                  <input
                    {...register("link", {
                      required: "link is required",
                    })}
                    id="link"
                    name="link"
                    type="text"
                    required
                    autoComplete="off"
                    className="rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  />

                  {errors.name && (
                    <p className="text-red-500 text-xs italic">
                      {errors.link.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full gap-2 pt-2">
              <label htmlFor="address" className="text-sm font-medium">
                Address
              </label>
              <div className="w-full">
                <input
                  {...register("address", {})}
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="off"
                  className="rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                />

                {errors.name && (
                  <p className="text-red-500 text-xs italic">
                    {errors.link.message}
                  </p>
                )}
              </div>
            </div>
            {/* These all need to be revised to be drop downs  */}
            <div className="grid grid-cols-1 sm:grid-cols-4 w-full gap-2">
              <div className="pt-2 grid-cols-1">
                <label htmlFor="city" className="text-sm font-medium">
                  City
                </label>
                <div className="pt-2">
                  <input
                    {...register("city", {})}
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="off"
                    className="rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  />

                  {errors.name && (
                    <p className="text-red-500 text-xs italic">
                      {errors.link.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="pt-2 grid-cols-1">
                <label htmlFor="state" className="text-sm font-medium">
                  State
                </label>
                <div className="pt-2">
                  <input
                    {...register("state", {})}
                    id="state"
                    name="state"
                    type="text"
                    autoComplete="off"
                    className="rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  />

                  {errors.name && (
                    <p className="text-red-500 text-xs italic">
                      {errors.link.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-2 grid-cols-1">
                <label htmlFor="country" className="text-sm font-medium">
                  Country
                </label>
                <div className="pt-2">
                  <input
                    {...register("country", {})}
                    id="country"
                    name="country"
                    type="text"
                    autoComplete="off"
                    className="rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  />

                  {errors.name && (
                    <p className="text-red-500 text-xs italic">
                      {errors.link.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="pt-2 w-full">
                <label htmlFor="postal" className="text-sm font-medium">
                  Postal
                </label>
                <div className="pt-2">
                  <input
                    {...register("postal", {})}
                    id="postal"
                    name="postal"
                    type="text"
                    autoComplete="off"
                    className="rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  />

                  {errors.name && (
                    <p className="text-red-500 text-xs italic">
                      {errors.link.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Provider Tags */}
            <h3 className="text-lg leading-6 pt-10 font-semibold text-gray-900">
              Provider Tags
            </h3>

            <div className="pt-2 mb-10">
              <fieldset className="mt-2 grid grid-cols-1 border-t border-b border-gray-200 mb-10">
                {tags
                  ?.filter((t) => t.tagType === "provider")
                  .map((tag) => (
                    <div className="divide-y divide-gray-200 border-b">
                      <div className="relative flex items-start pb-4 pt-3.5">
                        <div className="min-w-0 flex-1 text-sm leading-6">
                          <label
                            htmlFor={tag.id}
                            className="font-medium text-gray-900"
                          >
                            {getReadableName(tag.name)}
                          </label>
                        </div>
                        <div className="ml-3 flex h-6 items-center self-center">
                          <input
                            checked={tag.selected}
                            onChange={() => handleTagClick(tag.id)} // Update on change
                            id={tag.tagId}
                            name={`tags.${tag.tagId}`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </fieldset>
            </div>
            {/* This needs to be revised, should use a drag a drop method or determine a better method to order providers- will need to shift the others */}
            <div className="flex flex-row w-full justify-between">
              <label className="text-lg leading-6 font-semibold text-gray-900 self-center">
                List Order
              </label>
              <input
                {...register(`listOrder`)}
                data-lpignore="true"
                type="number"
                required
                autoComplete="off"
                className="rounded-md self-center w-10 text-right h-10 text-sm border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="mt-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
