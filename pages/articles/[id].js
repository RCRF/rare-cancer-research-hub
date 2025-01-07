"use client";
import InternalResearchForm from "@/components/InternalResearchForm";
import { useFetchArticleById, updateArticlePATCH } from "@/hooks/api";
import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Modal from "@/components/Modal";
import AuthorsForm from "@/components/AuthorsForm";
import { queryClient } from "@/queryClient";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";


const Article = () => {
  //get the id from the url
  const router = useRouter();
  const { data: session } = useSession();
  const { id } = router.query;
  const { data: article } = useFetchArticleById({ id, session });

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

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: article?.title ?? "",
      link: article?.link ?? "",
      datePublished: article?.datePublished ?? "",
      headline: article?.headline ?? "",
      description: article?.description ?? "",
      highlighted: article?.highlighted ?? false,
      management: article?.management ?? false,
      organizationId: "",
      authors: [],
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (article) {
      setValue("title", article.title);
      setValue("link", article.link);
      setValue("datePublished", article.datePublished);
      setValue("headline", article.headline);
      setValue("description", article.description);
      setValue("highlighted", article.highlighted);
      setValue("management", article.management);
      setValue("organizationId", article.organizationId);
      setValue("authors", article.articleAuthors);
    } else {
    }
  }, [article]);

  const onSubmit = async (data) => {
    const pastArticle = {
      id: article.id,
      title: article.title,
      link: article.link,
      datePublished: article.datePublished,
      headline: article.headline,
      description: article.description,
      highlighted: article.highlighted,
      management: article.management,
      organizationId: article.organizationId,
      authors: article.articleAuthors,
    };

    const currentArticle = {
      id: article.id,
      title: data.title,
      link: data.link,
      datePublished: data.datePublished,
      headline: data.headline,
      description: data.description,
      highlighted: data.highlighted,
      management: data.management,
      organizationId: data.organizationId,
      authors: data.authors,
    };

    const payloadData = {
      pastArticle: pastArticle,
      currentArticle: currentArticle,
      updateOrder: false,
    };

    const payload = {
      data: payloadData,
      session,
    };

    const hasUpdated = mutate(payload, {
      onSuccess: (data) => {
        // setIsToggled(!isToggled);
        toast.success("Article updated successfully");
        queryClient.invalidateQueries("articles");
        //TODO: update this to the proper route
        router.push("/cancer-type/chromophobe");
      },
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      {isModalOpen && (
        <Modal show={isModalOpen} fragment={Fragment} closeModal={closeModal}>
          <AuthorsForm
            closeModal={closeModal}
            article={article}
            authors={watch("authors")}
          />
        </Modal>
      )}
      <div className="flex items-center self-center justify-center">
        <div className="w-3/4 p-5">
          <h2 className="text-left pt-10 text-3xl font-semibold pl-5 text-gray-900 mb-5">
            {article?.title ?? "Article"}
          </h2>
          <div className="grid grid-cols-1">
            <form onSubmit={handleSubmit(onSubmit)} className="rounded p-3">
              <div className="rounded-md shadow-sm -space-y-px p-6">
                <div>
                  <label className="text-sm font-medium">Article Title</label>
                  <div className="pt-2">
                    <input
                      {...register("title", {
                        required: "Article title is required",
                      })}
                      name="title"
                      type="text"
                      required
                      autoComplete="off"
                      className="rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-sm"
                    />

                    {errors.title && (
                      <p className="text-red-500 text-xs italic">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-row w-full gap-2">
                  <div className="pt-2 w-full">
                    <label
                      htmlFor="date-published"
                      className="text-sm font-medium"
                    >
                      Date Published
                    </label>
                    <div className="pt-2">
                      <input
                        {...register("datePublished", {
                          required: "datePublished is required",
                        })}
                        id="datePublished"
                        name="datePublished"
                        type="date"
                        required
                        autoComplete="off"
                        className="rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      />

                      {errors.name && (
                        <p className="text-red-500 text-xs italic">
                          {errors.datePublished.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="pt-2 w-full">
                    <label
                      htmlFor="date-published"
                      className="text-sm font-medium"
                    >
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
                <div className="pt-2">
                  <label htmlFor="headline" className="text-sm font-medium">
                    Highlight
                  </label>
                  <textarea
                    {...register("headline", {
                      required: "Headline is required",
                    })}
                    id="headline"
                    type="text"
                    required
                    className="rounded-md mt-2 relative h-20 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  />
                  {errors.headline && (
                    <p className="text-red-500 text-xs italic">
                      {errors.headline.message}
                    </p>
                  )}
                </div>
                <div className="pt-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    {...register("description", {
                      required: "description is required",
                    })}
                    id="description"
                    type="text"
                    required
                    className="rounded-md mt-2 relative h-40 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs italic">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                {/* Highlighted or Research Articles */}
                <div className="pt-2 mb-10">
                  <fieldset className="mt-2  flex flex-col justify-between border-t border-b border-gray-200 mb-10">
                    <div className="divide-y divide-gray-200 border-b">
                      <div className="relative flex items-start pb-4 pt-3.5">
                        <div className="min-w-0 flex-1 text-sm leading-6">
                          <label
                            htmlFor="highlighted"
                            className="font-medium text-gray-900"
                          >
                            Highlighted
                          </label>
                          <p
                            id="comments-description"
                            className="text-gray-500"
                          >
                            Adds article to the highlighted section
                          </p>
                        </div>
                        <div className="ml-3 flex h-6 items-center self-center">
                          <input
                            {...register("highlighted")}
                            id="highlighted"
                            aria-describedby="highlighted-description"
                            name="highlighted"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                      <div className="relative flex items-start pb-4 pt-3.5">
                        <div className="min-w-0 flex-1 text-sm leading-6">
                          <label
                            htmlFor="management"
                            className="font-medium text-gray-900"
                          >
                            Management
                          </label>
                          <p
                            id="comments-description"
                            className="text-gray-500"
                          >
                            Adds article to the management section
                          </p>
                        </div>
                        <div className="ml-3 flex h-6 items-center self-center">
                          <input
                            {...register("management")}
                            id="management"
                            aria-describedby="management-description"
                            name="management"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className="flex flex-row mt-10 ">
                  <div className="font-semibold text-lg">Authors</div>
                  <button onClick={openModal} type="button">
                    <PencilSquareIcon className="h-5 w-5 text-blue-500 ml-2" />
                  </button>
                </div>
                <div className="">
                  {watch("authors")
                    .sort((a, b) => {
                      // if either value is null, sort it last
                      if (a.listOrder === null) return 1;
                      if (b.listOrder === null) return -1;

                      return a.listOrder - b.listOrder;
                    })
                    .map((item, index) => (
                      <div
                        key={item.id}
                        className="col-span-2 p-2 border-b mt-2 mb-2 rounded"
                      >
                        <div className="flex flex-row self-center h-full">
                          <div>
                            <div key={index} className="text-sm font-light">
                              {item.firstName} {item.lastName}{" "}
                              {item.designation}, {item.institution}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="mt-10 group relative w-full mb-10 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Article
                </button>
              </div>
            </form>
            {/* <div>
              <div className="flex flex-row mt-10 ">
                <div className="font-semibold text-lg">Authors</div>
                <button
                  onClick={() =>
                    append({ firstName: "", lastName: "", institution: "" })
                  }
                  type="button"
                >
                  <PlusCircleIcon className="h-5 w-5 text-blue-500 ml-2" />
                </button>
              </div>
              <div className="w-full flex flex-col">
                {watch("authors").map((item, index) => (
                  <div
                    key={item.id}
                    className="w-full p-4 border-b mt-2 mb-2 rounded"
                  >
                    <div className="flex flex-row self-center h-full">
                      <div>
                        <div key={index} className="grid gap-1 grid-cols-12">
                          <input
                            {...register(`authors[${index}].firstName`, {
                              required: "first name is required",
                            })}
                            data-lpignore="true"
                            type="text"
                            required
                            autoComplete="off"
                            className="rounded-md col-span-5 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-sm"
                            placeholder="First Name"
                          />
                          <input
                            {...register(`authors[${index}].lastName`, {
                              required: "Last name is required",
                            })}
                            data-lpignore="true"
                            type="text"
                            required
                            autoComplete="off"
                            className="rounded-md col-span-5 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            placeholder="Last Name"
                          />
                          <input
                            {...register(`authors[${index}].designation`)}
                            data-lpignore="true"
                            type="text"
                            autoComplete="off"
                            className="rounded-md col-span-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            placeholder="Designation"
                          />
                        </div>
                        <div>
                          <input
                            {...register(`authors[${index}].institution`, {
                              required: "Institution is required",
                            })}
                            data-lpignore="true"
                            type="text"
                            required
                            autoComplete="off"
                            className="rounded-md mt-2 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            placeholder="Institution"
                          />
                        </div>
                      </div>
                      <TrashIcon
                        type="button"
                        className="h-6 w-6 ml-4 text-blue-500  self-center"
                        onClick={() => remove(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {errors.authors && (
                <p className="text-red-500 text-xs italic">
                  {errors.authors.message}
                </p>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
