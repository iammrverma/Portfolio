import { useState } from "react";
import { Delete } from "../Icons";

const ImageInput = ({ images, setImages }) => {
  const [uploadingCount, setUploadingCount] = useState(0);

  const uploadImage = async (file) => {
    setUploadingCount((prev) => prev + 1);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "portfolioProjects");
    formData.append("folder", "portfolioProjects");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dgelo2nee/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await response.json();
      return data.secure_url; // Return uploaded image URL
    } catch (error) {
      console.error("Upload failed:", error);
      return null;
    } finally {
      setUploadingCount((prev) => prev - 1);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && images.length >= 4) return;

    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      setImages((prev) => [...prev, imageUrl]); // Store the uploaded image URL
      console.log("Image uploaded:", imageUrl);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full p-6 flex flex-col gap-2 rounded-lg text-dark/75 dark:text-light/75 border">
      <h2 className="text-lg font-bold ">Upload Images</h2>
      <div className="flex flex-wrap gap-2">
        {/* Image Upload Button */}
        {images.length < 4 && (
          <label className="w-24 h-24 flex items-center justify-center border border-dashed border-gray-400 rounded-lg cursor-pointer">
            <span className="text-3xl text-gray-400">+</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        )}

        {/* Render uploaded images */}
        {images.map((img, index) => (
          <div
            key={index}
            className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-300"
          >
            <img
              src={img}
              alt={`Uploaded ${index}`}
              className="w-full h-full object-cover"
            />

            <button
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-black text-white p-1 text-xs opacity-80 hover:opacity-100"
            >
              <Delete width="16" height="16" />
            </button>
          </div>
        ))}
        {uploadingCount > 0 &&
          Array.from({ length: uploadingCount }).map((_, index) => (
            <div
              key={index}
              className="w-24 h-24 flex items-center justify-center border border-dashed border-gray-400 rounded-lg"
            >
              <img src="/images/spinner.gif" alt="Uploading"/>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageInput;
