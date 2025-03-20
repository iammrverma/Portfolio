import { useState } from "react";

const ImageInput = ({ images, setImages }) => {
  // const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadImage = async (file) => {
    setLoading(true);
    setProgress(10);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "portfolioProjects"); // Replace with your Cloudinary upload preset
    formData.append("folder", "portfolioProjects"); // Optional: Organize images in a "projects" folder

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dgelo2nee/image/upload`,
        { method: "POST", body: formData }
      );

      setProgress(50);
      const data = await response.json();
      setProgress(100);
      setLoading(false);

      return data.secure_url; // Return uploaded image URL
    } catch (error) {
      console.error("Upload failed:", error);
      return null;
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && images.length < 4) {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        setImages([...images, imageUrl]); // Store the uploaded image URL
      }
    }
  };
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="flex gap-4 flex-wrap">
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
            ✕
          </button>
        </div>
      ))}

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
    </div>
  );
};

export default ImageInput;
