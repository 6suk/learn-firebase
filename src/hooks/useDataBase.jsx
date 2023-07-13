import { POST_COLLECTION, POST_DOC } from 'fbase';
import { addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';

export const useDataBase = () => {
  // console.log('useDataBase 실행');
  const [isDone, setIsDone] = useState(false);

  const setDataBase = async (uid, inputValue, imageUrl) => {
    // console.log('setDataBase 실행');
    await addDoc(POST_COLLECTION, {
      date: Date.now(),
      post: inputValue,
      uid,
      imageUrl,
    });
    setIsDone(true);
  };

  const updateDataBase = async (pid, inputValue, imageUrl) => {
    // console.log('updateDataBase 실행');
    await updateDoc(POST_DOC(pid), {
      post: inputValue,
      imageUrl,
    });
    setIsDone(true);
  };

  const deleteDataBase = async (pid) => {
    // console.log('deleteDataBase 실행');
    await deleteDoc(POST_DOC(pid));
    setIsDone(true);
  };

  return { isDone, setDataBase, updateDataBase, deleteDataBase };
};
