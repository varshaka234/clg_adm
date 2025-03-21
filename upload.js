const handleUpload = async () => {
    if (!photo || !signature) {
      setError("Both Photo and Signature are required!");
      return;
    }
  
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("signature", signature);
  
    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("Upload Success:", response.data);
  
      // ✅ Show success message
      alert("Upload Successful!");
  
      // ✅ Move to Next Page (Course Selection)
      navigate("/course-selection");
    } catch (err) {
      console.error("Upload Failed:", err);
      setError("Failed to upload files. Please try again.");
    }
  };
  
  <button
  onClick={handleUpload} // ✅ Triggers the upload function
  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
>
  Upload & Continue
</button>
