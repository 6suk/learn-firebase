import { storage } from 'fbase';
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import { isEmpty } from 'utils/util';
import { v4 as uuid } from 'uuid';

/**
 *
 * @returns
 */
export const useStorage = () => {
  // console.log('useStorage 실행');

  const setStorage = async (uid, image) => {
    // console.log('setStorage: 실행');
    let imageUrl = '';
    if (image !== '') {
      const fileRef = ref(storage, `${uid}/${uuid()}`);
      const uploadResult = await uploadString(fileRef, image, 'data_url');
      imageUrl = await getDownloadURL(uploadResult.ref);
    }
    return imageUrl;
  };

  const updateStorage = async (image, imageUrl) => {
    // console.log('updateStorage: 실행');
    if (image !== imageUrl) {
      await deleteStroage(imageUrl);
      return await setStorage(image);
    } else {
      return imageUrl;
    }
  };

  const deleteStroage = async (imageUrl) => {
    // console.log('deleteStroage: 실행');
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
