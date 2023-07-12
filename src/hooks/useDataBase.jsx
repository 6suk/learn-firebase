import { POST_COLLECTION, POST_DOC } from 'fbase';
import { addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useStorage } from './useStorage';

export const useDataBase = ({ uid, pid, image, imageUrl }) => {
  const { setStorage, updateStorage, deleteStroage } = useStorage(uid, image, imageUrl);
  const [isDone, setIsDone] = useState(false);

  /**
   * 게시물 등록
   *
   * @async
   * @param {String} inputValue Submit시 useInput에서 전달
   * @param {*} uid
   * @param {*} image
   */
  const setDataBase = async (inputValue) => {
    await addDoc(POST_COLLECTION, {
      date: Date.now(),
      post: inputValue,
      uid: uid,
      imageUrl: await setStorage(),
    });
    setIsDone(true);
  };

  /**
   * 게시물 수정
   *
   * @async
   * @param {String} inputValue Submit시 useInput에서 전달
   * @param {*} pid
   * @param {*} image
   * @param {*} imageUrl useStorage의 리턴값으로 전달
   */
  const updateDataBase = async (inputValue) => {
    await updateDoc(POST_DOC(pid), {
      post: inputValue,
      imageUrl: await updateStorage(),
    });
    setIsDone(true);
  };

  /**
   * 게시물 삭제
   *
   * @async
   * @param {String} message 컨펌 메세지
   * @param {*} pid
   * @param {*} imageUrl
   */
  const deleteDataBase = async (message) => {
    const check = window.confirm(message);
    if (check) {
      await deleteStroage();
      await deleteDoc(POST_DOC(pid));
    }
  };

  return { isDone, setDataBase, updateDataBase, deleteDataBase };
};
