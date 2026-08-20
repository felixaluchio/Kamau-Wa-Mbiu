export async function uploadToImgBB(file: File): Promise<string> {
  const apiKey = "831824fca12923abc68ae37cefc266e0"; // Direct ImgBB API key for sandbox
  
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return data.data.url;
    } else {
      throw new Error(data.error?.message || "Failed to upload image to ImgBB");
    }
  } catch (error) {
    console.error("ImgBB upload error:", error);
    throw error;
  }
}

export const uploadImage = uploadToImgBB;
export default uploadToImgBB;
