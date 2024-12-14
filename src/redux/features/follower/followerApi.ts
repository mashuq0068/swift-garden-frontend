import baseApi from "../../api/baseApi";

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addShop: builder.mutation({
      query: (shop) => {
        return {
          url: "/shops",
          method: "POST",
          body: shop,
        };
      },
      invalidatesTags: ["shop"],
    }),
    getShops: builder.query({
      query: () => {
        return {
          url: "/shops",
          method: "GET",
        };
      },
      providesTags: ["shop"],
    }),
    getSingleShop: builder.query({
      query: (id) => {
        return {
          url: `/shops/${id}`,
          method: "GET",
        };
      },
    }),
    updateSingleShop: builder.mutation({
      query: (data) => {
        return {
          url: `/shops/${data?.id}`,
          method: "PUT",
          body: data?.shop,
        };
      },
      invalidatesTags: ["shop"],
    }),
    deleteSingleShop: builder.mutation({
      query: (id) => {
        return {
          url: `/shops/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["shop"],
    }),
  }),
});

export const {
  useAddShopMutation,
  useGetShopsQuery,
  useGetSingleShopQuery,
  useUpdateSingleShopMutation,
  useDeleteSingleShopMutation,
} = shopApi;

const followerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addFollower: builder.mutation({
      query: (follower) => {
        return {
          url: "/followers",
          method: "POST",
          body: follower,
        };
      },
      invalidatesTags: ["follower"],
    }),
    getFollowers: builder.query({
      query: () => {
        return {
          url: "/followers",
          method: "GET",
        };
      },
      providesTags: ["follower"],
    }),
    getSingleFollower: builder.query({
      query: (id) => {
        return {
          url: `/followers/${id}`,
          method: "GET",
        };
      },
    }),
    updateSingleFollower: builder.mutation({
      query: (data) => {
        return {
          url: `/followers/${data?.id}`,
          method: "PUT",
          body: data?.follower,
        };
      },
      invalidatesTags: ["follower"],
    }),
    deleteSingleFollower: builder.mutation({
      query: (id) => {
        return {
          url: `/followers/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["follower"],
    }),
  }),
});

export const {
  useAddFollowerMutation,
  useGetFollowersQuery,
  useGetSingleFollowerQuery,
  useUpdateSingleFollowerMutation,
  useDeleteSingleFollowerMutation,
} = followerApi;
