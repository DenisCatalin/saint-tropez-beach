import gallery from "../utils/gallery.json";

export const getImages = () => {
  return gallery.items.map(item => {
    return {
      id: item?.id,
      url: item?.url,
    };
  });
};
