import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";

const db = getFirestore(app);
// const storage = getStorage(app);

const AddProduct = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file);
      
      setImageFile(file);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
        console.error("No image selected");
        return;
    }
    console.log(1234, 'Image file', imageFile);
    
    const storageRef = ref(storage, `images/${imageFile.name}`); // Create a reference for the file in Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    // Set uploading state to true when starting the upload
    setUploading(true);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress); // Update progress
            console.log(`Upload is ${progress}% done`);
        },
        (error) => {
            console.error("Error uploading file:", error); // Handle errors
            setUploading(false); // Set uploading state to false
        },
        async () => {
            // Get the download URL of the uploaded file
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setImageUrl(downloadURL); // Set the image URL
            console.log("File available at", downloadURL);

            const newProduct = {
                image: downloadURL, // Use the actual image URL here
                title,
                category,
                price: parseFloat(price),
                rating: parseFloat(rating),
                description,
            };

            try {
                await addDoc(collection(db, "products"), newProduct);
                console.log("Product added:", newProduct);
                // Clear form fields after successful submission
                setImageFile(null);
                setTitle("");
                setCategory("");
                setPrice("");
                setRating("");
                setDescription("");
                setUploading(false); // Reset uploading state
            } catch (error) {
                console.error("Error adding product to Firestore:", error);
                setUploading(false); // Reset uploading state in case of error
            }
        }
    );
};

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-xl font-bold text-center mb-5">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Image:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Rating:</label>
          <input
            type="number"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
