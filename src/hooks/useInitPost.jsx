import { get_user_by_uid, POST_COLLECTION } from 'fbase';
import { onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPostList } from 'slice/post';
import { setMyPostList } from 'slice/user';
import { isEmpty } from 'utils/util';

const all_query = query(POST_COLLECTION, orderBy('date', 'desc'));

export const useInitPost = (userLoading) => {
  const [postLoading, setPostLoading] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userLoading) initPostList();
  }, [userLoading, user]);

  const initPostList = () => {
    onSnapshot(all_query, async (snapshop) => {
      const myPostList = [];
      const postList = await Promise.all(
        snapshop.docs.map(async (doc) => {
          const uid = doc.data().uid;
          const isOwner = !isEmpty(user) && uid === user.uid;
          let postObj = {
            id: doc.id,
            ...doc.data(),
            displayName: '',
          };
          if (isOwner) {
            postObj.displayName = user.displayName;
            myPostList.push(postObj);
            return postObj;
          } else {
            postObj.displayName = await get_user_by_uid(uid).then((v) => v.displayName);
            return postObj;
          }
        })
      );
      dispatch(setPostList(postList));
      dispatch(setMyPostList(myPostList));
      setPostLoading(true);
    });
  };

  return [postLoading];
};
