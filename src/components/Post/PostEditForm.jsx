import { useDataBase } from 'hooks/useDataBase';
import useInput from 'hooks/useInput';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dateUtil } from 'utils/util';
import PostPhotoForm from './PostPhotoForm';

const PostEdit = ({ post: { imageUrl, id, post, date }, toggleEdit }) => {
  const [image, setImage] = useState(imageUrl);
  const user = useSelector((state) => state.user.user);
  const { isDone, updateDataBase } = useDataBase({ uid: user ? user.uid : '', image, imageUrl, pid: id });
  const [inputValue, onChange, onSubmit] = useInput(post, updateDataBase);

  useEffect(() => {
    setImage(imageUrl);
    if (isDone) toggleEdit();
  }, [isDone]);

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
