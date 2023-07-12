import { POST_DOC, storage } from 'fbase';
import { updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import useInput from 'hooks/useInput';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { dateUtil } from 'utils/util';
import { v4 as uuid } from 'uuid';
import PostPhotoForm from './PostPhotoForm';

const PostEdit = ({ editProps }) => {
  const { post, delImgInStorage, toggleEdit } = editProps;
  const [image, setImage] = useState(post.imageUrl);
  const { user } = useSelector((state) => state.user);

  // DB UPDATE
  const onEditSubmit = async (input) => {
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
        } else {
          imageUrl = '';
        }
      }

      // DB Update
      await updateDoc(POST_DOC(post.id), {
        post: input,
        imageUrl: imageUrl,
      });

      toggleEdit();
    } catch (error) {
      console.log(error);
    }
  };
  const [inputValue, onChange, onSubmit] = useInput(post.post, onEditSubmit);

  return (
    <form onSubmit={onSubmit} className="container nweetEdit">
      <input type="text" onChange={onChange} value={inputValue} required autoFocus maxLength={120} />
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
