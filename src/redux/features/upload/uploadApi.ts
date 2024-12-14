/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "../../api/baseApi";

const uploadFile = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (fileData) => {
        return {
          url: "/uploads",
          method: "POST",
          body: fileData,
        };
      },
    }),
  }),
});

export const { useUploadFileMutation } = uploadFile;
