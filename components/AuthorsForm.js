import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import {
  createAuthorPOST,
  deleteAuthorsPOST,
  updateAuthorsPOST,
} from "@/hooks/api";
import { useSession } from "next-auth/react";
import { queryClient } from "@/queryClient";

export default function AuthorsForm({ closeModal, authors, article }) {
  const { data: session } = useSession();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      authors: authors,
    },
  });

  const { mutate: addAuthors } = useMutation(createAuthorPOST);
  const { mutate: deleteAuthors } = useMutation(deleteAuthorsPOST);
  const { mutate: updateAuthors } = useMutation(updateAuthorsPOST, {
    onSuccess: (data) => {
      toast.success("Successfully updated authors");
      closeModal();
    },
    onError: (error) => {
      // Handle error

      toast.error("Error updating authors");
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "authors",
  });

  const onSubmit = (data) => {
    const removedAuthors = authors.filter(
      (author) =>
        !watch("authors").some((watchAuthor) => watchAuthor.id === author.id)
    );
    const addedAuthors = watch("authors").filter(
      (watchAuthor) => !authors.some((author) => watchAuthor.id === author.id)
    );

    //remove authors
    const removedAuthorsPayload = {
      articleId: article.id,
      data: removedAuthors,
      session,
    };
    removedAuthors.length > 0
      ? deleteAuthors(removedAuthorsPayload, {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["article"]);
          queryClient.invalidateQueries(["author"]);
          queryClient.invalidateQueries(["authors"]);
          toast.success("Successfully deleted authors");
          closeModal();
        },
        onError: (error) => {
          // Handle error
          toast.error("Error adding deleting authors");
        },
      })
      : null;

    // add authors
    const addedAuthorsPayload = {
      articleId: article.id,
      data: addedAuthors,
      session,
    };
    addedAuthors.length > 0
      ? addAuthors(addedAuthorsPayload, {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["article"]);
          toast.success("Successfully added authors");
          closeModal();
        },
        onError: (error) => {
          // Handle error
          toast.error("Error adding organizaiton");
        },
      })
      : null;

    //update authors
    const updatedAuthors = watch("authors").filter((watchAuthor) => {
      const author = authors.find((author) => watchAuthor.id === author.id);
      if (
        (author !== undefined && author.firstName !== watchAuthor.firstName) ||
        (author !== undefined && author.lastName !== watchAuthor.lastName) ||
        (author !== undefined &&
          author.institution !== watchAuthor.institution) ||
        (author !== undefined && author.listOrder !== watchAuthor.listOrder)
      ) {
        return true;
      } else {
        return false;
      }
    });
    const updatedAuthorsPayload = {
      articleId: Number(article.id),
      data: updatedAuthors,
      session,
    };
    updatedAuthors.length > 0
      ? updateAuthors(updatedAuthorsPayload, {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["article"]);
          toast.success("Successfully updated authors");
          closeModal();
        },
        onError: (error) => {
          // Handle error
          toast.error("Error updating authors");
        },
      })
      : null;

    closeModal();
  };

  return (
    <div className="flex items-center self-center justify-center h-1/2">
      <div className="w-11/12 p-5">
        <form onSubmit={handleSubmit(onSubmit)} className=" rounded p-3">
          <div className="rounded-md shadow-sm -space-y-px p-6">
            <div className="flex flex-row">
              <div className="font-semibold text-2xl">Authors</div>
              <button
                onClick={() =>
                  append({
                    firstName: "",
                    lastName: "",
                    institution: "",
                    designation: "",
                    listOrder: authors.length + 1,
                  })
                }
                type="button"
              >
                <PlusCircleIcon className="h-5 w-5 text-blue-500 ml-2" />
              </button>
            </div>
            <div className="w-full flex flex-col">
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="w-full p-4 border-b mt-2 mb-2 rounded"
                >
                  <div className="flex flex-row self-center h-full">
                    <div>
                      <div
                        key={index}
                        className="grid gap-2 grid-cols-10 justify-between"
                      >
                        <input
                          {...register(`authors[${index}].firstName`, {
                            required: "first name is required",
                          })}
                          data-lpignore="true"
                          type="text"
                          required
                          autoComplete="off"
                          className="rounded-md col-span-3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-sm"
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
                          className="rounded-md col-span-3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
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
                        <input
                          {...register(`authors[${index}].listOrder`)}
                          data-lpignore="true"
                          type="integer"
                          autoComplete="off"
                          className="rounded-md col-span-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                          placeholder="Order"
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
