import { POST_DOC, storage } from 'fbase';
import { deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useState } from 'react';

const Post = ({ post, isOwner }) => {
  const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간
  const date = new Date(post.date + TIME_ZONE).toISOString().split('T')[0];
  const [isEdit, setIsEdit] = useState(false);
  const [editPost, setEditPost] = useState(post.post);
  const [delImage, setDelImage] = useState(false);

  const onDelClick = async () => {
    const ok = window.confirm('정말 삭제 할거임?');
    if (ok) {
      await delImgInStorage();
      await deleteDoc(POST_DOC(post.id));
    }
  };

  const toggleEdit = (e) => {
    setIsEdit(!isEdit);
    setDelImage(false);
  };

  const onChange = (e) => {
    const { value } = e.target;
    setEditPost(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (delImage) {
      delImgInStorage();
    }

    await updateDoc(POST_DOC(post.id), {
      post: editPost,
      imageUrl: delImage ? '' : post.imageUrl,
    });
    setIsEdit(false);
    setDelImage(false);
  };

  const onDelImgClick = () => {
    setDelImage(true);
  };

  const delImgInStorage = async () => {
    const curImgRef = ref(storage, post.imageUrl);
    await deleteObject(curImgRef);
  };

  return (
    <li>
      {post.imageUrl && (
        <div>
          {!delImage && <img src={post.imageUrl} alt={post.id} style={{ maxWidth: '100px' }} />}
          {isEdit && isOwner && !delImage && <button onClick={onDelImgClick}>이미지 삭제</button>}
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
