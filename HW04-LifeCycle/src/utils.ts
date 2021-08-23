export const ImageLink = "https://picsum.photos/id";
export const DefaultImageSize = 200;

type GetURLFunction = (id: number, size?: number) => string;

export const getUrl: GetURLFunction = (id, size = DefaultImageSize) => {
  const goodId = Math.min(1000, Math.max(1, id));
  return `${ImageLink}/${goodId}/${size}`;
};
