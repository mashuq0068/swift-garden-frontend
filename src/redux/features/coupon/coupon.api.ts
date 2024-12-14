import baseApi from "../../api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCoupon: builder.mutation({
      query: (coupon) => ({
        url: "/coupons",
        method: "POST",
        body: coupon,
      }),
      invalidatesTags: ["coupon"],
    }),
    getCoupons: builder.query({
      query: () => ({
        url: "/coupons",
        method: "GET",
      }),
      providesTags: ["coupon"],
    }),
    getSingleCoupon: builder.query({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: "GET",
      }),
    }),
    updateCoupon: builder.mutation({
      query: (data) => ({
        url: `/coupons/${data.id}`,
        method: "PUT",
        body: data.coupon,
      }),
      invalidatesTags: ["coupon"],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["coupon"],
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useGetCouponsQuery,
  useGetSingleCouponQuery,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = couponApi;
