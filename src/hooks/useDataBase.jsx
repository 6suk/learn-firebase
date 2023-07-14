import { POST_COLLECTION, POST_DOC } from 'fbase';
import { addDoc, deleteDoc, updateDoc } from 'firebase/firestore';

export const useDataBase = () => {
  const addPost = async (uid, inputValue, imageUrl) => {
    await addDoc(POST_COLLECTION, {
      date: Date.now(),
      post: inputValue,
      uid,
      imageUrl,
    });
  };

  const updatePost = async (pid, inputValue, imageUrl) => {
    await updateDoc(POST_DOC(pid), {
      post: inputValue,
      imageUrl,
    });
  };

  const deletePost = async (pid) => {
    await deleteDoc(POST_DOC(pid));
  };

  return { addPost, updatePost, deletePost };
};
