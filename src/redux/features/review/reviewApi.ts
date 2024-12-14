import baseApi from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (review) => ({
        url: "/reviews",
        method: "POST",
        body: review,
      }),
      invalidatesTags: ["review"],
    }),
    getReviews: builder.query({
      query: () => ({
        url: "/reviews",
        method: "GET",
      }),
      providesTags: ["review"],
    }),
    getSingleReview: builder.query({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "GET",
      }),
    }),
    updateReview: builder.mutation({
      query: (data) => ({
        url: `/reviews/${data.id}`,
        method: "PUT",
        body: data.review,
      }),
      invalidatesTags: ["review"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetReviewsQuery,
  useGetSingleReviewQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
