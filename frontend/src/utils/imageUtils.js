// Utility function to compress Cloudinary image URLs
function getCompressedImageUrl(url) {
  if (!url) return url;
  // Check if it's a Cloudinary URL
  if (url.includes("res.cloudinary.com")) {
    // Insert transformation params after '/upload/'
    return url.replace(
      /\/upload\//,
      "/upload/q_auto:eco,f_auto,w_400,h_300,c_fill/"
    );
  }
  return url;
}

export { getCompressedImageUrl };