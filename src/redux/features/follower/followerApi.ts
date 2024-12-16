import baseApi from "../../api/baseApi";

const followerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addFollower: builder.mutation({
      query: (follower) => ({
        url: "/followers",
        method: "POST",
        body: follower,
      }),
      invalidatesTags: ["follower"],
    }),
    toggleFollower: builder.mutation({
      query: (data) => ({
        url: "/followers/toggle",
        method: "POST",
        body: data, // { userId, shopId }
      }),
      invalidatesTags: ["follower" , "user" , "shop"],
    }),
    getFollowers: builder.query({
      query: () => ({
        url: "/followers",
        method: "GET",
      }),
      providesTags: ["follower"],
    }),
    getFollowersByShop: builder.query({
      query: (shopId) => ({
        url: `/followers/shop/${shopId}`,
        method: "GET",
      }),
      providesTags: ["follower"],
    }),
    getFollowedShopsByUser: builder.query({
      query: (userId) => ({
        url: `/followers/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["follower"],
    }),
    deleteFollower: builder.mutation({
      query: (data) => ({
        url: "/followers",
        method: "DELETE",
        body: data, // { userId, shopId }
      }),
      invalidatesTags: ["follower"],
    }),
  }),
});

export const {
  useAddFollowerMutation,
  useToggleFollowerMutation,
  useGetFollowersQuery,
  useGetFollowersByShopQuery,
  useGetFollowedShopsByUserQuery,
  useDeleteFollowerMutation,
} = followerApi;

export default followerApi;
