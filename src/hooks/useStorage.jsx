import { storage } from 'fbase';
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import { isEmpty } from 'utils/util';
import { v4 as uuid } from 'uuid';

export const useStorage = (uid, image, imageUrl = '') => {
  const setStorage = async () => {
    if (image !== '') {
      const fileRef = ref(storage, `${uid}/${uuid()}`);
      const uploadResult = await uploadString(fileRef, image, 'data_url');
      imageUrl = await getDownloadURL(uploadResult.ref);
    } else {
      imageUrl = '';
    }
    return imageUrl;
  };

  const updateStorage = async () => {
    if (image !== imageUrl) {
      await deleteStroage();
      return await setStorage();
    } else {
      return imageUrl;
    }
  };

  const deleteStroage = async () => {
    if (!isEmpty(imageUrl)) {
      try {
        const curImgRef = ref(storage, imageUrl);
        await deleteObject(curImgRef);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return { setStorage, updateStorage, deleteStroage };
};
