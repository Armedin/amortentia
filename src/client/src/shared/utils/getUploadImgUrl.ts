const getUploadImgUrl = (
  url: string,
  width: number = 3840,
  quality: number = 75
) => {
  return `/api/image?url=${url}&w=${width}&q=${quality}`;
};

export default getUploadImgUrl;
