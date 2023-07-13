import { POST_COLLECTION, POST_DOC } from 'fbase';
import { addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';

export const useDataBase = () => {
  const [isDone, setIsDone] = useState(false);

  const setDataBase = async (uid, inputValue, imageUrl) => {
    await addDoc(POST_COLLECTION, {
      date: Date.now(),
      post: inputValue,
      uid,
      imageUrl,
    });
    setIsDone(true);
  };

  const updateDataBase = async (pid, inputValue, imageUrl) => {
    await updateDoc(POST_DOC(pid), {
      post: inputValue,
      imageUrl,
    });
    setIsDone(true);
  };

  const deleteDataBase = async (pid) => {
    await deleteDoc(POST_DOC(pid));
    setIsDone(true);
  };

  return { isDone, setDataBase, updateDataBase, deleteDataBase };
};
