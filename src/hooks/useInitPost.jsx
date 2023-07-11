import { GET_USER_BY_UID, POST_COLLECTION } from 'fbase';
import { onSnapshot, orderBy, query } from 'firebase/firestore';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPostList } from 'slice/post';
import { setMyPostList } from 'slice/user';
import { isEmpty } from 'utils/util';

export const useInitPost = () => {
  const dispatch = useDispatch();
  const [postLoading, setPostLoading] = useState(true);
  const allQuery = query(POST_COLLECTION, orderBy('date', 'desc'));

  const initPostList = (user) => {
    onSnapshot(allQuery, async (snapshop) => {
      const myPostList = [];
      const postList = await Promise.all(
        snapshop.docs.map(async (doc) => {
          const { uid } = doc.data();
          let postObj = {
            id: doc.id,
            ...doc.data(),
          };
          if (!isEmpty(user) && uid === user.uid) {
            postObj = {
              ...postObj,
              displayName: user.displayName,
            };
            myPostList.push(postObj);
            return postObj;
          } else {
            return {
              ...postObj,
              displayName: await GET_USER_BY_UID(uid).then((v) => v.displayName),
            };
          }
        })
      );
      dispatch(setPostList(postList));
      dispatch(setMyPostList(myPostList));
      setPostLoading(false);
    });
  };

  return { initPostList, postLoading };
};
