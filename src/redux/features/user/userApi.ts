import baseApi from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (data) => {
        return {
          url: "/users/me",
          method: "PUT",
          body: data,
        };
      },
    }),
    getProfile: builder.query({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    getAllUsers: builder.query({
      query: (queryParams) => {
        return {
          url: "/users",
          method: "GET",
          params: queryParams,
        };
      },
      providesTags: ["user"],
    }),
    updateSingleUser: builder.mutation({
      query: (data) => {
        return {
          url: `/users/${data?.id}`,
          method: "PATCH",
          body: data.user,
        };
      },
      invalidatesTags: ["user"],
    }),
    deleteSingleUser: builder.mutation({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useUpdateSingleUserMutation,
  useDeleteSingleUserMutation,
} = userApi;
