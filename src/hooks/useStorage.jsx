import { storage } from 'fbase';
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import { isEmpty } from 'utils/util';
import { v4 as uuid } from 'uuid';

/**
 *
 * @returns
 */
export const useStorage = () => {
  const setStorage = async (uid, image) => {
    let imageUrl = '';
    if (image !== '') {
      const fileRef = ref(storage, `${uid}/${uuid()}`);
      const uploadResult = await uploadString(fileRef, image, 'data_url');
      imageUrl = await getDownloadURL(uploadResult.ref);
    }
    return imageUrl;
  };

  const deleteStroage = async (imageUrl) => {
    if (!isEmpty(imageUrl)) {
      try {
        const curImgRef = ref(storage, imageUrl);
        await deleteObject(curImgRef);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateStorage = async (uid, image, imageUrl) => {
    if (image !== imageUrl) {
      await deleteStroage(imageUrl);
      const newImageUrl = await setStorage(uid, image);
      return newImageUrl;
    } else {
      return imageUrl;
    }
  };

  return { setStorage, updateStorage, deleteStroage };
};
