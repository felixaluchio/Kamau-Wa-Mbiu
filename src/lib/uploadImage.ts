export async function uploadToImgBB(file: File): Promise<string> {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY || "831824fca12923abc68ae37cefc266e0";
  
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success && data.data) {
      return data.data.display_url || data.data.url;
    } else {
      throw new Error(data.error?.message || "Failed to upload image to ImgBB");
    }
  } catch (error) {
    console.error("ImgBB upload error:", error);
    throw error;
  }
}

export async function uploadMultipleToImgBB(files: File[]): Promise<string[]> {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY || "831824fca12923abc68ae37cefc266e0";
  
  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success && data.data) {
      return (data.data.display_url || data.data.url) as string;
    } else {
      throw new Error(data.error?.message || `Failed to upload ${file.name} to ImgBB`);
    }
  });

  return Promise.all(uploadPromises);
}

export const uploadImage = uploadToImgBB;
export default uploadToImgBB;
