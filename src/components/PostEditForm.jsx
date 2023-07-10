import { POST_DOC, storage } from 'fbase';
import { updateDoc } from 'firebase/firestore';
import { dateUtil } from 'util/util';
import PostPhotoForm from './PostPhotoForm';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

const PostEdit = ({ editProps }) => {
  const { post, editPost, toggleEdit, setTogglePostForm, setEditPost, setIsEdit, delImgInStorage } = editProps;
  const [image, setImage] = useState(post.imageUrl);
  const { user } = useSelector((state) => state.user);

  // DB UPDATE
  const onEditSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = post.imageUrl;

      // 이미지 변경 시
      if (post.imageUrl !== image) {
        delImgInStorage();
        // 이미지 storage 저장 및 Url 가져오기
        if (image !== '') {
          const fileRef = ref(storage, `${user.uid}/${uuid()}`);
          const uploadResult = await uploadString(fileRef, image, 'data_url');
          imageUrl = await getDownloadURL(uploadResult.ref);
        }
      }

      // DB Update
      await updateDoc(POST_DOC(post.id), {
        post: editPost,
        imageUrl: imageUrl,
      });

      setIsEdit(false);
      setTogglePostForm(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onEditChange = (e) => {
    const { value } = e.target;
    setEditPost(value);
  };

  return (
    <form onSubmit={onEditSubmit} className="container nweetEdit">
      <input type="text" value={editPost} onChange={onEditChange} required autoFocus maxLength={120} />
      <p>{dateUtil(post.date)}</p>
      <PostPhotoForm image={image} setImage={setImage} />
      <div className="editBtns">
        <button onClick={toggleEdit} className="formBtn cancelBtn">
          취소
        </button>
        <input type="submit" value="수정 완료" className="formBtn" />
      </div>
    </form>
  );
};

export default PostEdit;
