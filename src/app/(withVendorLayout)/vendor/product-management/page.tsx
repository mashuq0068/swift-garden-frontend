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
import {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateSingleProductMutation,
  useDeleteSingleProductMutation,
} from "@/redux/features/product/productApi";
import toast from "react-hot-toast";
import Placeholder from "@/helpers/placeholder";
import { useGetCategoriesQuery } from "@/redux/features/category/category.api";
import { json } from "stream/consumers";

const initialFormState = {
  id: "",
  name: "",
  price: "",
  categoryId: "",
  inventory: "",
  description: "",
};

const ProductManagement = () => {
  const { data } = useGetProductsQuery(undefined);
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateSingleProductMutation();
  const [deleteProduct] = useDeleteSingleProductMutation();
  const { data: categoryData } = useGetCategoriesQuery(undefined);
  const [productForm, setProductForm] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  console.log("isEditing = >",isEditing);
  console.log(productForm.photo);

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  // Handle form submission for create or update
  const handleSubmit = async () => {
    const isAllFieldsFilled = (productForm: any) => {
      const requiredFields = ["name", "price", "categoryId", "inventory"]; // Adjust based on which fields are required
      return requiredFields.every((field) => productForm[field] !== "");
    };

    if (!isAllFieldsFilled(productForm) || !selectedFile) {
      toast.error("All fields are required");
      return;
    }

    try {
      const shopId = localStorage.getItem("shop");
      const formData = new FormData();
      formData.append("name", productForm.name);
      formData.append("price", parseFloat(productForm.price).toString());
      formData.append("categoryId", productForm.categoryId);
      formData.append("inventory", Number(productForm.inventory).toString());
      formData.append("description", productForm.description || ""); // Optional field
      formData.append("shopId", shopId as string); // Assuming the shopId is fixed for now
      formData.append("photo", selectedFile); // Append the image file

      // Now send this FormData object to your API
      if (isEditing) {
        await updateProduct({ id: productForm.id, product: formData }).unwrap();
        toast.success("Product updated successfully");
      } else {
        const res = await addProduct(formData).unwrap();
        console.log(res?.data);
        toast.success("Product created successfully");
      }

      resetForm();
    } catch (error) {
      console.error("Failed to save product:", error);
      toast.error("Failed to create product");
    }
  };

  // Handle product deletion
  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  // Open create dialog
  const openCreateDialog = () => {
    setIsEditing(false);
    setProductForm(initialFormState);
    setSelectedImage(null);
    setSelectedFile(null);
  };

  // Open edit dialog
  const openEditDialog = (product: any) => {
    setIsEditing(true);
    setProductForm({
      id: product.id,
      name: product.name,
      price: product.price.toString(),
      categoryId: product.categoryId,
      inventory: product.inventory,
      description: product.description,
      photo: product.photo,
    });
    setSelectedImage(product.photo); // Set the pre-existing image
  };

  // Reset form and states
  const resetForm = () => {
    setProductForm(initialFormState);
    setSelectedImage(null);
    setIsEditing(false);
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
          {selectedImage ? (
            <img
              src={selectedImage}
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

  return (
    <div>
      <SectionHeader title="Product Management" />
      <div className="wrapper">
        <div className="flex justify-between items-end gap-3 flex-wrap mb-6">
          <h2 className="font-medium">All Products</h2>
          <Dialog>
            <DialogTrigger asChild>
              <button
                onClick={openCreateDialog}
                className="btn-primary mb-3 bg-green-500"
              >
                <TbPlus className="mr-2" />
                Create New Product
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditing ? "Edit Product" : "Create New Product"}
                </DialogTitle>
                <DialogDescription>
                  <form className="space-y-3">
                    <PhotoUploader />
                    <div>
                      <label className="form-label">Product Name</label>
                      <input
                        type="text"
                        value={productForm.name}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            name: e.target.value,
                          })
                        }
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        value={productForm.price}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            price: e.target.value,
                          })
                        }
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="form-label">Quantity</label>
                      <input
                        type="number"
                        value={productForm.inventory}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            inventory: e.target.value,
                          })
                        }
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="form-label">Category</label>
                      <select
                        value={productForm.categoryId}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            categoryId: e.target.value,
                          })
                        }
                        className="form-input"
                      >
                        <option value="">Select a category</option>
                        {categoryData?.data?.map((category: any) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Description Field */}
                    <div>
                      <label className="form-label">Description</label>
                      <textarea
                        value={productForm.description}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            description: e.target.value,
                          })
                        }
                        className="form-input"
                        rows={4}
                      />
                    </div>
                  </form>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="btn-primary bg-green-500"
                >
                  {isEditing ? "Update Product" : "Create Product"}
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((product: any) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="font-medium">${product.price}</TableCell>
                <TableCell className="font-medium">
                  {product.category.name}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          onClick={() => openEditDialog(product)}
                          className="btn-outline border border-green-500 rounded-lg text-black hover:text-white hover:bg-green-500 transition duration-300"
                        >
                          <CiEdit size={18} />
                        </button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-[520px]">
                        <DialogHeader>
                          <DialogTitle className="font-normal">
                            Update Product
                          </DialogTitle>
                          <DialogDescription>
                            <form onSubmit={handleSubmit}>
                              <div className="grid grid-cols-1 text-[16px] mt-4 gap-4">
                                <PhotoUploader />
                                <div>
                                  <label className="form-label">
                                    Product Name
                                  </label>
                                  <input
                                    type="text"
                                    value={productForm.name}
                                    onChange={(e) =>
                                      setProductForm({
                                        ...productForm,
                                        name: e.target.value,
                                      })
                                    }
                                    placeholder="Enter product name"
                                    className="form-input"
                                  />
                                </div>
                                <div>
                                  <label className="form-label">Price</label>
                                  <input
                                    type="number"
                                    value={productForm.price}
                                    onChange={(e) =>
                                      setProductForm({
                                        ...productForm,
                                        price: e.target.value,
                                      })
                                    }
                                    placeholder="Enter product price"
                                    className="form-input"
                                  />
                                </div>
                                <div>
                                  <label className="form-label">Category</label>
                                  <select
                                    defaultValue={productForm.categoryId}
                                    onChange={(e) =>
                                      setProductForm({
                                        ...productForm,
                                        categoryId: e.target.value,
                                      })
                                    }
                                    className="form-input"
                                  >
                                    <option value="">Select a category</option>
                                    {categoryData?.data?.map(
                                      (category: any) => (
                                        <option
                                          key={category.id}
                                          value={category.id}
                                        >
                                          {category.name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </div>
                                <div>
                                  <label className="form-label">
                                    Description
                                  </label>
                                  <textarea
                                    value={productForm.description}
                                    onChange={(e) =>
                                      setProductForm({
                                        ...productForm,
                                        description: e.target.value,
                                      })
                                    }
                                    placeholder="Enter product description"
                                    className="form-input"
                                  />
                                </div>
                              </div>
                            </form>
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <button
                            type="submit"
                            onSubmit={handleSubmit}
                            className="btn-primary bg-green-500"
                          >
                            {isEditing ? "Update Product" : "Create Product"}
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
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action will permanently delete the product.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="btn-primary bg-gray-200 text-black hover:text-black hover:bg-gray-300">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(product?.id)}
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

export default ProductManagement;
