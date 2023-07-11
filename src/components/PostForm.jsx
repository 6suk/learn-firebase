import { POST_COLLECTION, storage } from 'fbase';
import { addDoc, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPostList } from 'slice/post';
import { v4 as uuid } from 'uuid';
import PostPhotoForm from './PostPhotoForm';

const CreatePost = () => {
  const [post, setPost] = useState('');
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const {
    user: { user, isLogin },
  } = useSelector((state) => state);

  // SAVE
  const onSubmit = async (e) => {
    e.preventDefault();
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
      setPost('');
      setImage('');
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    const { value } = e.target;
    setPost(value);
  };

  return (
    <form action="" onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          type="text"
          placeholder={isLogin ? '내용 작성' : '로그인 후 이용 가능 합니다!'}
          maxLength={120}
          onChange={onChange}
          value={post}
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
