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

const CategoryManagement = () => {
  // Mock data for categories (can be replaced with fetched data)
  const [categories, setCategories] = useState([
    { id: "1", name: "Leafy Greens" },
    { id: "2", name: "Root Vegetables" },
    { id: "3", name: "Cruciferous" },
    // Add more categories as needed
  ]);

  // State to handle modal form for create/edit
  const [categoryForm, setCategoryForm] = useState({ id: "", name: "" });
//   const [isEditing, setIsEditing] = useState(false);

  // Handle category form submission
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (isEditing) {
//       // Edit category
//       setCategories(
//         categories.map((category) =>
//           category.id === categoryForm.id
//             ? { ...category, name: categoryForm.name }
//             : category
//         )
//       );
//     } else {
//       // Create new category
//       setCategories([
//         ...categories,
//         { id: Date.now().toString(), name: categoryForm.name },
//       ]);
//     }
//     setCategoryForm({ id: "", name: "" });
//     setIsEditing(false);
//   };

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
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Dialog>
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
                              {/* Category Name */}
                              <div className="grid grid-cols-1 text-[16px] mt-4 gap-4">
                                <div>
                                  <label className="form-label">
                                    Category Name
                                  </label>
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
                          <button type="submit" className="btn-primary bg-green-500 ">
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
                            onClick={() =>
                              setCategories(
                                categories.filter(
                                  (cat) => cat.id !== category.id
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

export default CategoryManagement;
