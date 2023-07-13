import useInput from 'hooks/useInput';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import PostPhotoForm from './PostPhotoForm';

const PostForm = ({ setAction: { setDataBase, setStorage } }) => {
  const [image, setImage] = useState('');
  const { user } = useSelector((state) => state.user);

  const submitAction = async (inputValue) => {
    const imageUrl = await setStorage(user.uid, image);
    await setDataBase(user.uid, inputValue, imageUrl);
    setImage('');
  };
  const [inputValue, onChange, onSubmit] = useInput('', submitAction, true);

  return (
    <form action="" onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          type="text"
          placeholder={user ? '내용 작성' : '로그인 후 이용 가능 합니다!'}
          maxLength={120}
          value={inputValue}
          onChange={onChange}
          className="factoryInput__input"
          disabled={user ? false : true}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" disabled={user ? false : true} />
      </div>
      <PostPhotoForm image={image} setImage={setImage} />
    </form>
  );
};

export default PostForm;
