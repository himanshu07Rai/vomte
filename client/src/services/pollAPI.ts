import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";

export const pollApi = createApi({
  reducerPath: "pollApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vomte.herokuapp.com/api/poll",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      // console.log(token);

      if (token) {
        headers.set("auth-token", `${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Polls"],
  endpoints: (builder) => ({
    getPolls: builder.query({
      query: () => {
        return {
          url: "/",
          method: "get",
          // headers,
        };
      },
      providesTags: ["Polls"],
    }),
    createPoll: builder.mutation({
      query: (body) => {
        return {
          url: "/",
          method: "post",
          body,
        };
      },
      invalidatesTags: ["Polls"],
    }),
  }),
});

export const { useCreatePollMutation, useGetPollsQuery } = pollApi;
