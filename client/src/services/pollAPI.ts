import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";

export const pollApi = createApi({
  reducerPath: "pollApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/poll",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      console.log(token);

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("auth-token", `${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    createPoll: builder.mutation({
      query: (body) => {
        return {
          url: "/",
          method: "post",
          body,
        };
      },
    }),
    getPolls: builder.query({
      query: () => {
        return {
          url: "/",
          method: "get",
          // headers,
        };
      },
    }),
  }),
});

export const { useCreatePollMutation, useGetPollsQuery } = pollApi;
