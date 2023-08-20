import { S3URL } from "./AppConst";

export const IMG_URL = (imageId?: string) => {
  if (imageId) {
    return `${S3URL}/${imageId}`;
  }
  return false;
};
