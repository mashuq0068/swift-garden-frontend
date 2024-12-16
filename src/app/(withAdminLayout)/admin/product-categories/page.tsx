/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SectionHeader from "@/components/Shared/SectionHeader";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbPlus } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUploadFileMutation } from "@/redux/features/upload/uploadApi";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/redux/features/category/category.api";
import toast from "react-hot-toast";

const CategoryManagement = () => {
  const [cloudinaryUrl, setCloudinaryUrl] = useState("");
  const [uploadPhoto] = useUploadFileMutation();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [categoryForm, setCategoryForm] = useState({ id: "", name: "" });
  const { data: categories } = useGetCategoriesQuery(undefined);

  // Open dialog for editing a category
  const openEditDialog = (category: any) => {
    setCategoryForm({ id: category.id, name: category.name });
    // setIsEditing(true);
  };

  // Open dialog for creating a new category
  const openCreateDialog = () => {
    setCategoryForm({ id: "", name: "" });
    // setIsEditing(false);
  };

  // Handle image change
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await uploadPhoto(formData).unwrap();
        setCloudinaryUrl(res?.data?.photo);
      } catch (error) {
        console.error("File upload failed:", error);
      }
    }
  };

  // Photo uploader component
  const PhotoUploader = () => (
    <div className="max-w-md w-full mb-8">
      <label className="block pb-3 text-sm font-medium form-label text-gray-700">
        Upload Product Photo
      </label>
      <label
        htmlFor="file-upload"
        className="flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-primary transition duration-200 ease-in-out"
      >
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          className="sr-only"
          onChange={handleImageChange}
        />
        <div className="space-y-1 text-center">
          {cloudinaryUrl ? (
            <img
              src={cloudinaryUrl}
              alt="Selected"
              className="h-48 w-auto mx-auto rounded"
            />
          ) : (
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H20a4 4 0 00-4 4v1H8a4 4 0 00-4 4v18a4 4 0 004 4h32a4 4 0 004-4V17a4 4 0 00-4-4h-8v-1a4 4 0 00-4-4z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 29l7 7 7-7M14 17v20"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </label>
    </div>
  );
  const handleCreateCategory = async () => {
    const data = {
      name: categoryForm.name,
      image: cloudinaryUrl,
    };
    if (!data.name || !data.image) {
      toast.error("All fields are required");
    }
    try {
      await createCategory(data).unwrap();
      toast.success("Category created successfully");
      setCloudinaryUrl("");
    } catch {
      toast.error("Failed to create category");
    }
  };
  const handleEditCategory = async (category: any) => {
    const data = {
      name: categoryForm.name || category.name,
      image: cloudinaryUrl || category.image,
      id: category.id,
    };
    console.log(data?.id);
    if (!data.name || !data.image) {
      toast.error("All fields are required");
    }
    try {
      await updateCategory(data).unwrap();
      toast.success("Category created successfully");
      setCloudinaryUrl("");
    } catch {
      toast.error("Failed to create category");
    }
  };
  const handleEditDialogClose = () => {
    setCloudinaryUrl("")
  }
  // delete
  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      toast.success("Category deleted successfully");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <SectionHeader title="Category Management" />
      <div className="wrapper">
        <div className="w-full mb-6">
          <div className="flex justify-between items-end gap-3 flex-wrap">
            <h2 className=" flex justify-between  flex-col font-medium mb-2">
              All Categories
            </h2>
            <div className="flex justify-center  gap-3 flex-wrap">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    onClick={openCreateDialog}
                    className="btn-primary mb-3 bg-green-500"
                  >
                    <TbPlus className="mr-2" />
                    Create New Category
                  </button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className=" font-normal">
                      Create New Category
                    </DialogTitle>
                    <DialogDescription>
                      <form>
                        {/* Category Name */}
                        <div className="grid grid-cols-1 text-[16px] mt-4 gap-4">
                          <div>
                            <PhotoUploader />
                            <label className="form-label">Category Name</label>
                            <input
                              type="text"
                              value={categoryForm.name}
                              onChange={(e) =>
                                setCategoryForm({
                                  ...categoryForm,
                                  name: e.target.value,
                                })
                              }
                              placeholder="Enter category name"
                              className="form-input"
                            />
                          </div>
                        </div>
                      </form>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <button
                      onClick={handleCreateCategory}
                      type="submit"
                      className="btn-primary bg-green-500 font-normal"
                    >
                      Create Category
                    </button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className={`h-[2px] bg-gray-200`}>
            <div
              className={`h-[2px] bg-green-500 w-[100%]  md:w-[150px]`}
            ></div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category Name</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.data?.map((category: any) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium flex gap-3 items-center">
                  {" "}
                  <img
                    src={category?.image}
                    alt="logo"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {category.name}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Dialog onOpenChange={handleEditDialogClose}>
                      <DialogTrigger asChild>
                        <button
                          onClick={() => openEditDialog(category)}
                          className="btn-outline border border-green-500 rounded-lg text-black hover:text-white hover:bg-green-500 transition duration-300"
                        >
                          <CiEdit size={18} />
                        </button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle className="font-normal">
                            Edit Category
                          </DialogTitle>
                          <DialogDescription>
                            <form>
                              {/* image */}
                              <div className="max-w-md w-full mb-8">
                                <label className="block pb-3 text-sm font-medium form-label text-gray-700">
                                  Upload Product Photo
                                </label>
                                <label
                                  htmlFor="file-upload"
                                  className="flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-primary transition duration-200 ease-in-out"
                                >
                                  <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                    onChange={handleImageChange}
                                  />
                                  <div className="space-y-1 text-center">
                                    {cloudinaryUrl ? (
                                      <img
                                        src={cloudinaryUrl}
                                        alt="Selected"
                                        className="h-48 w-auto mx-auto rounded"
                                      />
                                    ) : (
                                      <img
                                        src={category?.image}
                                        alt="Selected"
                                        className="h-48 w-auto mx-auto rounded"
                                      />
                                    )}

                                    {(!cloudinaryUrl || !category?.image) && (
                                      <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                      >
                                        <path
                                          d="M28 8H20a4 4 0 00-4 4v1H8a4 4 0 00-4 4v18a4 4 0 004 4h32a4 4 0 004-4V17a4 4 0 00-4-4h-8v-1a4 4 0 00-4-4z"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M14 29l7 7 7-7M14 17v20"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    )}

                                    <p className="text-xs text-gray-500">
                                      PNG, JPG, GIF up to 10MB
                                    </p>
                                  </div>
                                </label>
                              </div>
                              {/* Category Name */}
                              <div className="grid grid-cols-1 text-[16px] mt-4 gap-4">
                                <div>
                                  <label className="form-label">
                                    Category Name
                                  </label>
                                  <input
                                    type="text"
                                    defaultValue={category.name}
                                    onChange={(e) =>
                                      setCategoryForm({
                                        ...categoryForm,
                                        name: e.target.value,
                                      })
                                    }
                                    placeholder="Enter category name"
                                    className="form-input"
                                  />
                                </div>
                              </div>
                            </form>
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <button
                            onClick={() => handleEditCategory(category)}
                            type="submit"
                            className="btn-primary bg-green-500 "
                          >
                            Update Category
                          </button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="btn-outline border border-red-400 rounded-lg text-red-400 hover:text-white hover:bg-red-400 transition duration-300">
                          <RiDeleteBinLine size={18} />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. It will permanently
                            delete the category.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="btn-primary bg-gray-200 text-black hover:text-black hover:bg-gray-300">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(category.id)}
                            className="btn-primary bg-red-500 hover:bg-red-600"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CategoryManagement;
