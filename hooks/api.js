import { useQuery, useMutation } from "react-query";
import axios from "axios";
import convert from "xml-js";
import { useSession } from "next-auth/react";
import { getJwt } from "next-auth/jwt";
import { queryClient } from "@/queryClient";

const API_ENDPOINTS = {
  TRIAL_DATA: "trials",
  ARTICLES: "articles",
  INSTITUTIONS: "institutions",
  PROVIDERS: "providers",
  REASEARCH: "research",
  CLINCIAL_TRIALS: "clinical-trials",
  BASE_URL: "https://api.medresourceconnect.com/api/",
  ORG_ID: process.env.ORG_ID,
  // BASE_URL: "http://localhost:5194/api/",
};

// **NOTICE: This is a public ID - should move if you don't want this ID accessible
const ORG_ID = process.env.NEXT_PUBLIC_ORG_ID;

async function fetchProfile(id) {
  return axios
    .get(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.PROFILE}/${id}`)
    .then((response) => response.data);
}

async function fetchLabResearch(id) {
  return axios
    .get(
      `${API_ENDPOINTS.BASE_URL}organizations/${id}/${API_ENDPOINTS.REASEARCH}`
    )
    .then((response) => response.data);
}

async function fetchProviders() {
  return axios
    .get(
      `${API_ENDPOINTS.BASE_URL}organizations/${ORG_ID}/${API_ENDPOINTS.PROVIDERS}`
    )
    .then((response) => response.data);
}

export async function fetchTags(session, id) {
  const token = session?.token.systemToken;
  return axios
    .get(`${API_ENDPOINTS.BASE_URL}organizations/${id}/tags`, {
      headers: {
        userId: session.user.userId,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
}

export async function fetchAllOrganizations(session) {
  const token = session?.token.systemToken;

  return axios
    .get(`${API_ENDPOINTS.BASE_URL}organizations`, {
      headers: {
        userId: 1,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
}

async function fetchInstitutions() {
  return axios
    .get(
      `${API_ENDPOINTS.BASE_URL}organizations/${ORG_ID}/${API_ENDPOINTS.INSTITUTIONS}`
    )
    .then((response) => response.data);
}

async function fetchInternalArticles() {
  return axios
    .get(
      `${API_ENDPOINTS.BASE_URL}organizations/${ORG_ID}/${API_ENDPOINTS.ARTICLES}`
    )
    .then((response) => response.data);
}

async function fetchArticleById({ id, session }) {
  const token = session?.token.systemToken;
  if (session?.user && session?.user.isAdmin) {
    return axios
      .get(`${API_ENDPOINTS.BASE_URL}articles/${id}`, {
        headers: {
          userId: session.user.userId,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data);
  }
  return;
}

export async function fetchResourcesByOrganization(id) {
  return axios
    .get(`${API_ENDPOINTS.BASE_URL}organizations/${id}/resources`, {})
    .then((response) => response.data);
}

async function fetchOrganization(id) {
  return axios
    .get(`${API_ENDPOINTS.BASE_URL}organizations/${id}/`)
    .then((response) => response.data);
}

async function fetchTrialData() {
  return axios
    .get(
      `${API_ENDPOINTS.BASE_URL}organizations/${ORG_ID}/${API_ENDPOINTS.TRIAL_DATA}`
    )
    .then((response) => response.data);
}

async function fetchClinicalTrials(id) {
  return axios
    .get(
      `${API_ENDPOINTS.BASE_URL}organizations/${id}/${API_ENDPOINTS.CLINCIAL_TRIALS}`
    )
    .then((response) => response.data);
}


export async function useFetchUserByEmail(user, token) {
  return axios
    .get(`${API_ENDPOINTS.BASE_URL}users?email=${user.email}`, {
      // config
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
}

export async function createProviderPOST({ data, session }) {
  const requestBody = {
    data,
  };
  return axios
    .post(`${API_ENDPOINTS.BASE_URL}providers/create`, requestBody, {
      // config
      headers: {
        userId: session.user.userId,
        Authorization: `Bearer ${session.token.systemToken}`,
      },
    })
    .then((response) => response.data);
}

export async function createInstitutionPOST({ data, session }) {
  const requestBody = {
    data,
  };
  return axios
    .post(`${API_ENDPOINTS.BASE_URL}institutions/create`, requestBody, {
      // config
      headers: {
        userId: session.user.userId,
        Authorization: `Bearer ${session.token.systemToken}`,
      },
    })
    .then((response) => response.data);
}

export async function createOrganizationPOST({ data, session }) {
  const requestBody = {
    data,
  };
  return axios
    .post(`${API_ENDPOINTS.BASE_URL}organizations/create`, requestBody, {
      // config
      headers: {
        userId: session.user.userId,
        Authorization: `Bearer ${session.token.systemToken}`,
      },
    })
    .then((response) => response.data);
}

export async function createAuthorPOST({ data, session, articleId }) {
  const token = session?.token.systemToken;
  const requestBody = {
    data,
  };

  return axios
    .post(
      `${API_ENDPOINTS.BASE_URL}articles/${articleId}/author/create`,
      requestBody,
      {
        // config
        headers: {
          userId: session.user.userId,
          Authorization: `Bearer ${session.token.systemToken}`,
        },
      }
    )
    .then((response) => response.data);
}

export async function deleteAuthorsPOST({ data, session, articleId }) {
  const token = session?.token.systemToken;
  const requestBody = {
    data,
  };

  return axios
    .delete(`${API_ENDPOINTS.BASE_URL}articles/${articleId}/author/delete`, {
      data: requestBody,
      headers: {
        userId: session.user.userId,
        Authorization: `Bearer ${session.token.systemToken}`,
      },
    })
    .then((response) => response.data);
}

export async function updateAuthorsPOST({ data, session, articleId }) {
  const token = session?.token.systemToken;
  const requestBody = {
    data,
  };

  return axios
    .patch(
      `${API_ENDPOINTS.BASE_URL}articles/${articleId}/author/update`,
      requestBody,
      {
        headers: {
          userId: session.user.userId,
          Authorization: `Bearer ${session.token.systemToken}`,
        },
      }
    )
    .then((response) => response.data);
}

export async function createArticlePOST({ data, session }) {
  //this will need to be stored in the session and swapped out for the actual org id
  data.organizationId = "5058ba10-88d5-48b1-9d01-041e6777e80e";
  const requestBody = {
    data,
  };

  return axios
    .post(`${API_ENDPOINTS.BASE_URL}articles/create`, requestBody, {
      // config
      headers: {
        userId: session.user.userId,
        Authorization: `Bearer ${session.token.systemToken}`,
      },
    })
    .then((response) => response.data);
}

export async function updateArticlePATCH({ data, session }) {
  //this will need to be stored in the session and swapped out for the actual org id
  data.organizationId = "5058ba10-88d5-48b1-9d01-041e6777e80e";
  const requestBody = {
    data: data,
  };

  return axios
    .patch(
      `${API_ENDPOINTS.BASE_URL}articles/${data.pastArticle.id}/update`,
      requestBody,
      {
        // config
        headers: {
          userId: session.user.userId,
          Authorization: `Bearer ${session.token.systemToken}`,
        },
      }
    )
    .then((response) => response.data);
}

export function useAuthorizationMutation(session) {
  return useMutation((session) => fetchAuthorization(session));
}

export function useFetchClinicalTrials(id) {
  return useQuery(["clinicalTrials", id], () => fetchClinicalTrials(id));
}

// export function useFetchUserByEmail(email) {
//   return useQuery(["user", email], () => fetchUserByEmail(email));
// }

export function useFetchLabResearch(id) {
  console.log(id)
  debugger;
  return useQuery(["mrcresearch", id], () => fetchLabResearch(id));
}

export function useFetchArticles(id) {
  console.log(id)
  return useQuery(["articles", id], () => fetchArticles());
}

export function useFetchArticleById({ id, session }) {
  return useQuery(["articles", id], () => fetchArticleById({ id, session }), {
    enabled: !!id && !!session && !!session.user,
  });
}

export function useFetchOrganization(id) {
  console.log(id)
  return useQuery(["organization", id], () => fetchOrganization(id));
}

export function useFetchAllOrganizations(session) {
  console.log(id)
  return useQuery("organization", () => fetchAllOrganizations(session));
}

export function useProviders() {
  return useQuery(["providers"], () => fetchProviders());
}

export function useInstitutions() {
  return useQuery(["institutions"], () => fetchInstitutions());
}

export function useInteralArticles() {
  return useQuery(["internalArticles"], () => fetchInternalArticles());
}

export function useTrialData() {
  return useQuery(["trialData"], () => fetchTrialData());
}

export async function uploadPhotoPOST(data, session) {
  const token = session?.token.systemToken;

  return axios
    .post(`${API_ENDPOINTS.BASE_URL}upload`, data, {
      // config
      headers: {
        "Content-Type": "multipart/form-data",
        userId: session.user.userId,
        Authorization: `Bearer ${session.token.systemToken}`,
      },
    })
    .then((response) => response.data);
}

export async function useFetchToken(token) {
  const response = await axios.get(`${API_ENDPOINTS.BASE_URL}login`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

// Custom hooks
export function useProfile(id) {
  return useQuery(["profile", id], () => fetchProfile(id));
}

export function useCreateOrganization(data) {
  return useQuery(["organizations"], () => createOrganizationPOST(data));
}

export function useCreateAuthor(data) {
  return useQuery(["article"], () => createAuthorPOST(data));
}

export function useDeleteAuthors(data) {
  return useQuery(["article"], () => deleteAuthorsPOST(data));
}

export function useUpdateAuthors(data) {
  return useQuery(["authors"], () => updateAuthorsPOST(data));
}

export function usePatchProfile() {
  const mutation = useMutation((payload) =>
    patchProfile(payload.id, payload.data)
  );
  return mutation;
}

export function usePatchAccess() {
  const mutation = useMutation((payload) =>
    patchAccess(payload.id, payload.data)
  );
  return mutation;
}

export const fetchArticles = async () => {
  try {
    const baseUrl =
      "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi";
    const query = "chromophobe[Title]";
    const dateRange = "[2018/01/01:2023/12/31]";
    const url = `${baseUrl}?db=pubmed&term=${query}&reldate=1835&retmode=xml`;

    const response = await axios.get(url);
    const xml = response.data;
    const result = convert.xml2js(xml, { compact: true });

    // Get the PubMed IDs
    const ids = result.eSearchResult.IdList.Id.map((idObj) => idObj._text);
    const fetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${ids.join(
      ","
    )}&retmode=xml`;

    const fetchResponse = await axios.get(fetchUrl);
    const fetchXml = fetchResponse.data;
    const fetchResult = convert.xml2js(fetchXml, { compact: true });

    const articles = fetchResult.PubmedArticleSet.PubmedArticle.map(
      (article) => {
        const { MedlineCitation } = article;
        const { Article, DateCompleted } = MedlineCitation;
        const { ArticleTitle, Abstract } = Article;

        function getDate(Article, DateCompleted) {
          if (Article && Article.ArticleDate) {
            const { Month, Day, Year } = Article.ArticleDate;

            if (
              Month &&
              Day &&
              Year &&
              Month._text &&
              Day._text &&
              Year._text
            ) {
              return `${Month._text}/${Day._text}/${Year._text}`;
            }
          } else if (DateCompleted) {
            const { Month, Day, Year } = DateCompleted;

            if (
              Month &&
              Day &&
              Year &&
              Month._text &&
              Day._text &&
              Year._text
            ) {
              return `${Month._text}/${Day._text}/${Year._text}`;
            }
            return "";
          }
          return "";
        }

        const date = getDate(Article, DateCompleted);

        let abstract = {};
        if (Array.isArray(Article?.Abstract?.AbstractText)) {
          abstract = Article.Abstract.AbstractText.reduce((obj, item) => {
            const label = item._attributes.Label;
            const text = item._text;
            obj[label] = text;
            return obj;
          }, {});
        }

        let authors = [];
        if (Array.isArray(MedlineCitation?.Article?.AuthorList?.Author)) {
          authors = MedlineCitation.Article.AuthorList.Author.map((author) => {
            const { LastName, ForeName, AffiliationInfo } = author;
            return {
              firstName: ForeName?._text ?? "",
              lastName: LastName?._text ?? "",
              affiliation: AffiliationInfo?.Affiliation?._text ?? "",
            };
          });
        }

        const getTageType = getTagType(ArticleTitle);
        return {
          title: ArticleTitle?._text ?? "",
          abstract: abstract,
          date: date ?? "",
          authors: authors,
          PMID: MedlineCitation?.PMID?._text ?? "",
          type: getTageType ?? "other",
        };
      }
    );

    return articles;
  } catch (error) {
    //swallowing this error - need to come back and surface it
    console.log(error);
  }
};

function getTagType(articleTitle) {
  if (!articleTitle) {
    return "other";
  }

  if (typeof articleTitle?._text === "string") {
    const title = articleTitle._text.toLowerCase();

    switch (true) {
      case title.includes("case"):
        return "case";
      case title.includes("review"):
        return "review";
      case title.includes("retrospective"):
        return "retro";
      default:
        return "other";
    }
  } else {
    return "other";
  }
}

export default API_ENDPOINTS;
