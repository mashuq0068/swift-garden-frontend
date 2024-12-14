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
          body: data
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
