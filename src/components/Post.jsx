import { dateUtil } from 'Util/util';
import { POST_DOC, storage } from 'fbase';
import { deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useState } from 'react';

const Post = ({ post, isOwner }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editPost, setEditPost] = useState(post.post);
  const [clearImage, setClearImage] = useState(false);

  // DB UPDATE
  const onEditSubmit = async (e) => {
    e.preventDefault();

    if (clearImage) {
      delImgInStorage();
    }

    await updateDoc(POST_DOC(post.id), {
      post: editPost,
      imageUrl: clearImage ? '' : post.imageUrl,
    });
    setIsEdit(false);
    setClearImage(false);
  };

  const toggleEdit = (e) => {
    setIsEdit(!isEdit);
    setClearImage(false);
  };

  const onEditChange = (e) => {
    const { value } = e.target;
    setEditPost(value);
  };

  // DB DELETE
  const onDelSubmit = async () => {
    const ok = window.confirm('정말 삭제 할거임?');
    if (ok) {
      await delImgInStorage();
      await deleteDoc(POST_DOC(post.id));
    }
  };

  // STORAGE DELETE
  const delImgInStorage = async () => {
    const curImgRef = ref(storage, post.imageUrl);
    await deleteObject(curImgRef);
  };

  const toggleClearImg = () => {
    setClearImage(true);
  };

  return (
    <li>
      {post.imageUrl && !clearImage && <img src={post.imageUrl} alt={post.id} style={{ maxWidth: '100px' }} />}
      {isEdit ? (
        <>
          <form onSubmit={onEditSubmit}>
            <input type="text" value={editPost} onChange={onEditChange} required />
            <p>{dateUtil(post.date)}</p>
            {post.imageUrl && !clearImage && <button onClick={toggleClearImg}>이미지 삭제</button>}
            <button onClick={toggleEdit}>취소</button>
            <input type="submit" value="수정 완료" />
          </form>
        </>
      ) : (
        <>
          <h4>{post.post}</h4>
          <p>{dateUtil(post.date)}</p>
          {isOwner && (
            <>
              <button onClick={toggleEdit}>수정</button>
              <button onClick={onDelSubmit}>삭제</button>
            </>
          )}
        </>
      )}
    </li>
  );
};

export default Post;
