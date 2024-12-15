/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, FormEvent } from "react";
import { FiEdit } from "react-icons/fi"; // Edit Icon
import SectionHeader from "@/components/Shared/SectionHeader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"; // Import dialog components

import toast from "react-hot-toast";
import { useAppSelector } from "@/redux/hooks";
import { useUploadFileMutation } from "@/redux/features/upload/uploadApi";
import { useAddShopMutation, useGetSingleShopQuery } from "@/redux/features/shop/shopApi";

const ShopPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [shopId] = useState(localStorage.getItem("shop"));
  const [addShop] = useAddShopMutation();
  const [cloudinaryUrl, setCloudinaryUrl] = useState("");
  const [uploadPhoto] = useUploadFileMutation();
  const auth = useAppSelector((state) => state.auth);
  const { data , refetch } = useGetSingleShopQuery(shopId);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
  });
  console.log(formValues.name);

  const handleEditSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  // handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle image change
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
    if (file && isEditing) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await uploadPhoto(formData).unwrap();
        setCloudinaryUrl(res?.data?.photo);
      } catch (error) {
        console.error("File upload failed:", error);
      }
    }
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Create Blob URL for the selected file
    }
  };
  // handle create shop
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    console.log(formValues);
    formData.append("name", formValues.name);
    formData.append("description", formValues.description);
    formData.append("userId", auth.id as string);

    if (selectedFile) {
      formData.append("logo", selectedFile);
    }
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    try {
      const res = await addShop(formData).unwrap();
      console.log(res);
      toast.success("Shop created successfully!");
      localStorage.setItem("shop", res?.data?.id);
    } catch (error) {
      console.error("Error creating shop:", error);
      toast.error("Failed to create the shop.");
    }
  };
  const handleEditShop = async () => {
    const shopData = {
      name: formValues.name || data?.data?.name,
      description: formValues.description || data?.data?.description,
      logo: cloudinaryUrl || data?.data?.logo,
    };

    console.log("shop data =>", shopData);

    try {
      const res = await fetch(`http://localhost:5000/api/shops/${shopId}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(shopData), 
      });

      // Handle response
      if (res.ok) {
        const data = await res.json(); 
        console.log("Shop updated successfully:", data);
        toast.success("Shop updated successfully!");
        refetch()
        setIsEditing(false); 
      } else {
      
        // const errorData = await res.json();
        // console.log("Error updating shop:", errorData);
        toast.error("Failed to update shop.");
      }
    } catch (error) {
      // console.log("Error updating shop:", error);
      console.error(error);
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
              ) : isEditing ? (
                <img
                  src={cloudinaryUrl || data?.data?.logo}
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
              {}
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
  // check is this vendor created shop or not
  const isShop = localStorage.getItem("shop");
  return (
    <div>
      {isShop ? (
        <>
          <SectionHeader title="My Shop" />
          <div className="shop-dashboard wrapper relative">
            <h2 className="text-lg flex justify-between font-medium items-center">
              {data?.data?.name}
              <button
                onClick={() => setIsEditing(true)}
                className="ml-2 p-1 rounded-full hover:bg-gray-200"
              >
                <FiEdit size={20} />
              </button>
            </h2>
            <img
              src={data?.data?.logo}
              alt="Shop Logo"
              className="w-36 h-36 rounded-full object-cover my-4"
            />
            <p className="text-gray-600 text-base">{data?.data?.description}</p>
          </div>
        </>
      ) : (
        <div className="">
          <SectionHeader title="Create Your Shop" />
          <div className="wrapper">
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <PhotoUploader />
              <div>
                <label className="form-label" htmlFor="name">
                  Shop Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter shop name"
                  className="form-input"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="form-label" htmlFor="description">
                  Shop Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter shop description"
                  className="form-input"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="btn-primary bg-green-500 mt-6">
                Create Shop
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      {isEditing && (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Shop Details</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4 mt-4">
              <div>
                <label className="form-label" htmlFor="edit-name">
                  Shop Name
                </label>
                <input
                  id="edit-name"
                  type="text"
                  defaultValue={data?.data?.name}
                  name="name"
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="form-label" htmlFor="edit-description">
                  Shop Description
                </label>
                <textarea
                  id="edit-description"
                  defaultValue={data?.data?.description}
                  name="description"
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <PhotoUploader />
              <DialogFooter>
                <button
                  onClick={handleEditShop}
                  type="submit"
                  className="btn-primary bg-green-500"
                >
                  Save Changes
                </button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ShopPage;
