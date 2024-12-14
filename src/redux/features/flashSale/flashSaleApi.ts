import baseApi from "../../api/baseApi";

const flashSaleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFlashSale: builder.mutation({
      query: (flashSale) => ({
        url: "/flash-sales",
        method: "POST",
        body: flashSale,
      }),
      invalidatesTags: ["flashSale"],
    }),
    getFlashSales: builder.query({
      query: () => ({
        url: "/flash-sales",
        method: "GET",
      }),
      providesTags: ["flashSale"],
    }),
    getSingleFlashSale: builder.query({
      query: (id) => ({
        url: `/flash-sales/${id}`,
        method: "GET",
      }),
    }),
    updateFlashSale: builder.mutation({
      query: (data) => ({
        url: `/flash-sales/${data.id}`,
        method: "PUT",
        body: data.flashSale,
      }),
      invalidatesTags: ["flashSale"],
    }),
    deleteFlashSale: builder.mutation({
      query: (id) => ({
        url: `/flash-sales/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["flashSale"],
    }),
  }),
});

export const {
  useCreateFlashSaleMutation,
  useGetFlashSalesQuery,
  useGetSingleFlashSaleQuery,
  useUpdateFlashSaleMutation,
  useDeleteFlashSaleMutation,
} = flashSaleApi;
