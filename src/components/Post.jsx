import { db, storage } from 'fbase';
import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useState } from 'react';
import { isEmpty } from 'Util/util';

const Post = ({ post, isOwner }) => {
  const COLLECTION_NAME = 'nweets';
  const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간
  const date = new Date(post.date + TIME_ZONE).toISOString().split('T')[0];
  const [isEdit, setIsEdit] = useState(false);
  const [editPost, setEditPost] = useState(post.post);

  const onDelClick = async () => {
    const ok = window.confirm('정말 삭제 할거임?');
    if (ok) {
      await onDelImgClick();
      await deleteDoc(doc(db, COLLECTION_NAME, post.id));
    }
  };

  const toggleEdit = (e) => {
    setIsEdit(!isEdit);
  };

  const onChange = (e) => {
    const { value } = e.target;
    setEditPost(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, COLLECTION_NAME, post.id), {
      post: editPost,
    });
    setIsEdit(false);
  };

  // 이미지 삭제
  const onDelImgClick = async () => {
    if (!isEmpty(post.imageUrl)) {
      const curImgRef = ref(storage, post.imageUrl);
      await deleteObject(curImgRef);
      await updateDoc(doc(db, COLLECTION_NAME, post.id), {
        imageUrl: '',
      });
    }
  };

  return (
    <li>
      {post.imageUrl && (
        <div>
          <img src={post.imageUrl} alt={post.id} style={{ maxWidth: '100px' }} />
          <button onClick={onDelImgClick}>이미지 삭제</button>
        </div>
      )}
      {isEdit && isOwner ? (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" value={editPost} onChange={onChange} required />
            <p>{date}</p>
            <button onClick={toggleEdit}>취소</button>
            <input type="submit" value="수정 완료" />
          </form>
        </>
      ) : (
        <>
          <h4>{post.post}</h4>
          <p>{date}</p>
          {isOwner && (
            <>
              <button onClick={toggleEdit} name="edit">
                수정
              </button>
              <button onClick={onDelClick}>삭제</button>
            </>
          )}
        </>
      )}
    </li>
  );
};

export default Post;
