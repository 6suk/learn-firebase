import useInput from 'hooks/useInput';
import { useState } from 'react';
import { dateUtil } from 'utils/util';
import PostPhotoForm from './PostPhotoForm';
import { useSelector } from 'react-redux';

const PostEdit = ({
  post: { imageUrl, id, post, date },
  toggleEdit,
  updateAction: { updateStorage, updateDataBase },
}) => {
  const { uid } = useSelector((state) => state.user.user);
  const [image, setImage] = useState(imageUrl || '');

  const submitAction = async (inputValue) => {
    const newImageUrl = await updateStorage(uid, image, imageUrl);
    await updateDataBase(id, inputValue, newImageUrl);
    toggleEdit();
  };

  const [inputValue, onChange, onSubmit] = useInput(post, submitAction);

  return (
    <form onSubmit={onSubmit} className="container nweetEdit">
      <input type="text" onChange={onChange} value={inputValue} required autoFocus maxLength={120} />
      <p>{dateUtil(date)}</p>
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
