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

const ProductManagement = () => {
  // Mock data for products (can be replaced with fetched data)
  const [products, setProducts] = useState([
    { id: "1", name: "Carrot", price: 2.5, category: "Root Vegetables" },
    { id: "2", name: "Spinach", price: 3.0, category: "Leafy Greens" },
    { id: "3", name: "Broccoli", price: 4.0, category: "Cruciferous" },
    // Add more products as needed
  ]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // State to handle modal form for create/edit
  const [productForm, setProductForm] = useState({
    id: "",
    name: "",
    price: "",
    categoryId: "",
    quantity: "",
    description: "",
    photo: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Create Blob URL for the selected file
    }
  };
  const PhotoUploader = () => {
    return (
      <div className="max-w-md w-full mb-8">
        <div className="">
          <label className="block pb-3 text-sm font-medium form-label text-gray-700">
            Upload Logo
          </label>

          {/* Wrapper label for the entire box to make it clickable */}
          <label
            htmlFor="file-upload"
            className=" flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-primary transition duration-200 ease-in-out"
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
              <div className="flex text-sm text-gray-600">
                <span className="bg-white rounded-md font-medium text-primary hover:text-primary-dark">
                  Upload logo
                </span>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </label>
        </div>
      </div>
    );
  };

  // Handle product form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditing) {
      // Edit product
      setProducts(
        products.map((product) =>
          product.id === productForm.id
            ? {
                ...product,
                name: productForm.name,
                price: parseFloat(productForm.price),
                category: productForm.categoryId,
                description: productForm.description,
                photo: productForm.photo,
              }
            : product
        )
      );
    } else {
      // Create new product
    //   setProducts([
    //     ...products,
    //     {
    //       id: Date.now().toString(),
    //       name: productForm.name,
    //       price: parseFloat(productForm.price),
    //       category: productForm.categoryId,
    //     //   description: productForm.description,
    //       quantity: productForm.quantity,
    //       photo: productForm.photo,
    //     },
    //   ]);
    }
    setProductForm({
      id: "",
      name: "",
      price: "",
      categoryId: "",
      description: "",
      photo: "",
      quantity: "",
    });
    setIsEditing(false);
  };

  // Open dialog for editing a product
  const openEditDialog = (product: any) => {
    setProductForm({
      id: product.id,
      name: product.name,
      price: product.price.toString(),
      categoryId: product.category,
      description: product.description,
      photo: product.photo,
      quantity: product.quantity,
    });
    setIsEditing(true);
  };

  // Open dialog for creating a new product
  const openCreateDialog = () => {
    setProductForm({
      id: "",
      name: "",
      price: "",
      categoryId: "",
      description: "",
      photo: "",
      quantity: "",
    });
    setIsEditing(false);
  };

  return (
    <div>
      <SectionHeader title="Product Management" />
      <div className="wrapper">
        <div className="w-full mb-6">
          <div className="flex justify-between items-end gap-3 flex-wrap">
            <h2 className="flex justify-between flex-col font-medium mb-2">
              All Products
            </h2>
            <div className="flex justify-center gap-3 flex-wrap">
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

                <DialogContent className="sm:max-w-[520px]">
                  <DialogHeader>
                    <DialogTitle className="font-normal">
                      Create New Product
                    </DialogTitle>
                    <DialogDescription>
                      <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 text-[16px] mt-4 gap-4">
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
                            <input
                              type="text"
                              value={productForm.categoryId}
                              onChange={(e) =>
                                setProductForm({
                                  ...productForm,
                                  categoryId: e.target.value,
                                })
                              }
                              placeholder="Enter product category"
                              className="form-input"
                            />
                          </div>
                          <div>
                            <label className="form-label">Quantity</label>
                            <input
                              type="text"
                              value={productForm.quantity}
                              onChange={(e) =>
                                setProductForm({
                                  ...productForm,
                                  categoryId: e.target.value,
                                })
                              }
                              placeholder="Enter product category"
                              className="form-input"
                            />
                          </div>
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
                              placeholder="Enter product description"
                              className="form-input"
                            />
                          </div>
                        </div>
                      </form>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <button type="submit" className="btn-primary bg-green-500">
                      {isEditing ? "Update Product" : "Create Product"}
                    </button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="h-[2px] bg-gray-200">
            <div className="h-[2px] bg-green-500 w-[100%] md:w-[150px]"></div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="font-medium">${product.price}</TableCell>
                <TableCell className="font-medium">
                  {product.category}
                </TableCell>
                <TableCell className="font-medium">12</TableCell>
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
                                  <input
                                    type="text"
                                    value={productForm.categoryId}
                                    onChange={(e) =>
                                      setProductForm({
                                        ...productForm,
                                        categoryId: e.target.value,
                                      })
                                    }
                                    placeholder="Enter product category"
                                    className="form-input"
                                  />
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
                            onClick={() =>
                              setProducts(
                                products.filter(
                                  (prod) => prod.id !== product.id
                                )
                              )
                            }
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
