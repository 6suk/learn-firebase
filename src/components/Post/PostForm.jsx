import { useDataBase } from 'hooks/useDataBase';
import useInput from 'hooks/useInput';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PostPhotoForm from './PostPhotoForm';

const PostForm = () => {
  const user = useSelector((state) => state.user.user);
  const [image, setImage] = useState('');
  const { isDone, setDataBase } = useDataBase({ uid: user ? user.uid : '', image });
  const [inputValue, onChange, onSubmit] = useInput('', setDataBase, true);

  useEffect(() => {
    setImage('');
  }, [isDone]);

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
