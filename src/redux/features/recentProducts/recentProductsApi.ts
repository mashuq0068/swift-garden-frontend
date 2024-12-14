import baseApi from "../../api/baseApi";

const recentProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRecentProduct: builder.mutation({
      query: (recentProduct) => ({
        url: "/recent-products",
        method: "POST",
        body: recentProduct,
      }),
      invalidatesTags: ["recentProduct"],
    }),
    getRecentProducts: builder.query({
      query: () => ({
        url: "/recent-products",
        method: "GET",
      }),
      providesTags: ["recentProduct"],
    }),
    getSingleRecentProduct: builder.query({
      query: (id) => ({
        url: `/recent-products/${id}`,
        method: "GET",
      }),
    }),
    updateRecentProduct: builder.mutation({
      query: (data) => ({
        url: `/recent-products/${data.id}`,
        method: "PUT",
        body: data.recentProduct,
      }),
      invalidatesTags: ["recentProduct"],
    }),
    deleteRecentProduct: builder.mutation({
      query: (id) => ({
        url: `/recent-products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["recentProduct"],
    }),
  }),
});

export const {
  useCreateRecentProductMutation,
  useGetRecentProductsQuery,
  useGetSingleRecentProductQuery,
  useUpdateRecentProductMutation,
  useDeleteRecentProductMutation,
} = recentProductApi;
