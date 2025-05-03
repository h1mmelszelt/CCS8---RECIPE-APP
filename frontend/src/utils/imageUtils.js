function getCompressedImageUrl(url) {
  if (!url) return url;
  if (url.includes("res.cloudinary.com")) {
    return url.replace(
      /\/upload\//,
      "/upload/q_auto:eco,f_auto,w_400,h_300,c_fill/"
    );
  }
  return url;
}

export { getCompressedImageUrl };