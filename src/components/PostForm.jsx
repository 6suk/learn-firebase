import { POST_COLLECTION, storage } from 'fbase';
import { addDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import useInput from 'hooks/useInput';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import PostPhotoForm from './PostPhotoForm';

const CreatePost = () => {
  const [image, setImage] = useState('');
  const { user, isLogin } = useSelector((state) => state.user);

  // SAVE
  const saveFireStore = async (post) => {
    try {
      let imageUrl = '';

      // 이미지 storage 저장 및 Url 가져오기
      if (image !== '') {
        const fileRef = ref(storage, `${user.uid}/${uuid()}`);
        const uploadResult = await uploadString(fileRef, image, 'data_url');
        imageUrl = await getDownloadURL(uploadResult.ref);
      }

      // DB저장
      await addDoc(POST_COLLECTION, {
        date: Date.now(),
        post,
        uid: user.uid,
        imageUrl,
      });

      // 초기화
      setImage('');
    } catch (error) {
      console.log(error);
    }
  };

  const [inputValue, onChange, onSubmit] = useInput('', saveFireStore, true);

  return (
    <form action="" onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          type="text"
          placeholder={isLogin ? '내용 작성' : '로그인 후 이용 가능 합니다!'}
          maxLength={120}
          value={inputValue}
          onChange={onChange}
          className="factoryInput__input"
          disabled={isLogin ? false : true}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" disabled={isLogin ? false : true} />
      </div>
      <PostPhotoForm image={image} setImage={setImage} />
    </form>
  );
};

export default CreatePost;
