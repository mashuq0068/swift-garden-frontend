
import baseApi from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (user ) => {
        return {
          url: "/auth/signup",
          method: "POST",
          body: user,
        };
      },
    }),
    login: builder.mutation({
      query: (user) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: user,
        };
      },
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = authApi;
