import baseApi from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (product) => {
        return {
          url: "/products",
          method: "POST",
          body: product,
        };
      },
      invalidatesTags: ["product"],
    }),
    getProducts: builder.query({
      query: (searchTerm) => {
        return {
          url: "/products",
          method: "GET",
          params: searchTerm,
        };
      },
      providesTags: ["product"],
    }),
    getSingleProduct: builder.query({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "GET",
        };
      },
    }),
    updateSingleProduct: builder.mutation({
      query: (data) => {
        return {
          url: `/products/${data?.id}`,
          method: "PUT",
          body: data?.product,
        };
      },
      invalidatesTags: ["product"],
    }),
    deleteSingleProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["product"],
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useAddProductMutation,
  useUpdateSingleProductMutation,
  useDeleteSingleProductMutation,
} = productApi;
