/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, FormEvent, DragEvent, ChangeEvent } from "react";
import { FiEdit } from "react-icons/fi"; // Edit Icon
import SectionHeader from "@/components/Shared/SectionHeader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"; // Import dialog components
import { useAddShopMutation } from "@/redux/features/follower/followerApi";
import toast from "react-hot-toast";
import { useAppSelector } from "@/redux/hooks";

interface Shop {
  name: string;
  description: string;
  logo: string;
  userId: string;
}

interface ShopData {
  exists: boolean;
  shop?: Shop;
}

const initialShopData: ShopData = {
  exists: false,
  shop: {
    name: "Green Veggies Store",
    description:
      "Welcome to Green Veggies Store! We provide fresh vegetables, leafy greens, and other healthy options for your family. Shop with us for freshness and quality.",
    logo: "https://via.placeholder.com/150",
    //  // Placeholder for shop logo
    userId: "1",
  },
};

const ShopPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [addShop] = useAddShopMutation();
  const auth = useAppSelector((state) => state.auth);
  console.log(auth);
  const [shopData, setShopData] = useState<ShopData>(initialShopData);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
  });

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
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
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
  // check is this vendor created shop or not
  const isShop = localStorage.getItem("shop");
  return (
    <div>
      {isShop ? (
        <>
          <SectionHeader title="My Shop" />
          <div className="shop-dashboard wrapper relative">
            <h2 className="text-lg flex justify-between font-medium items-center">
              {shopData.shop.name}
              <button
                onClick={() => setIsEditing(true)}
                className="ml-2 p-1 rounded-full hover:bg-gray-200"
              >
                <FiEdit size={20} />
              </button>
            </h2>
            <img
              src={shopData.shop.logo}
              alt="Shop Logo"
              className="w-36 h-36 rounded-full my-4"
            />
            <p className="text-gray-600 text-base">
              {shopData.shop.description}
            </p>
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
                  name="description"
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <PhotoUploader />
              <DialogFooter>
                <button type="submit" className="btn-primary bg-green-500">
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
