import baseApi from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (order) => {
        return {
          url: "/orders",
          method: "POST",
          body: order,
        };
      },
      invalidatesTags: ["order"],
    }),
    getOrders: builder.query({
      query: (id) => {
        return {
          url: `/orders/${id}`,
          method: "GET",
          
        };
      },
      providesTags: ["order"],
    }),
    // getSingleOrder: builder.query({
    //   query: (id) => {
    //     return {
    //       url: `/orders/${id}`,
    //       method: "GET",
    //     };
    //   },
    // }),
    updateSingleOrder: builder.mutation({
      query: (data) => {
        return {
          url: `/orders/${data?.id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["order"],
    }),
    deleteSingleOrder: builder.mutation({
      query: (id) => {
        return {
          url: `/orders/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetOrdersQuery,
//   useGetSingleOrderQuery,
  useUpdateSingleOrderMutation,
  useDeleteSingleOrderMutation,
} = orderApi;
