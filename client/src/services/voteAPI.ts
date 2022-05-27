import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";

export const pollApi = createApi({
  reducerPath: "voteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/vote",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      // console.log(token);

      if (token) {
        headers.set("auth-token", `${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Votes"],
  endpoints: (builder) => ({
    getVotes: builder.query({
      query: () => {
        return {
          url: "/",
          method: "get",
          // headers,
        };
      },
      providesTags: ["Votes"],
    }),
    createPoll: builder.mutation({
      query: (body) => {
        return {
          url: "/",
          method: "post",
          body,
        };
      },
      invalidatesTags: ["Votes"],
    }),
  }),
});

export const { useCreatePollMutation, useGetVotesQuery } = pollApi;
