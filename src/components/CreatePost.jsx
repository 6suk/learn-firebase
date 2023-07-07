import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty } from 'Util/util';
import { POST_COLLECTION, storage } from 'fbase';
import { addDoc, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPostList } from 'slice/post';
import { v4 as uuid } from 'uuid';

const CreatePost = () => {
  const [post, setPost] = useState('');
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const {
    postList: { data: postList },
    user: { user, isLogin },
  } = useSelector((state) => state);

  // Read (한 번 가져오기)
  const getPostList = async () => {
    const docs = await getDocs(POST_COLLECTION);
    const arr = [];
    docs.forEach((doc) => {
      const postObj = {
        id: doc.id,
        ...doc.data(),
      };
      arr.push(postObj);
    });
    dispatch(setPostList(arr));
  };

  // Create
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

  const onFileChange = (e) => {
    const { files } = e.target;
    const file = files[0];

    if (!isEmpty(file)) {
      const reader = new FileReader();

      reader.addEventListener('loadend', (e) => {
        // event 객체로 받을 수도 있음
        // console.log(e);

        // FileReader.result로도 받을 수 있음
        setImage(reader.result);
      });

      reader.readAsDataURL(file);
    }
  };

  const onClearImgClick = () => setImage('');

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
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="factoryInput__file"
        disabled={isLogin ? false : true}
      />
      {image ? (
        <div className="factoryForm__clear" onClick={onClearImgClick}>
          <span>Remove</span>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      ) : (
        <>
          <label htmlFor="attach-file" className="factoryInput__label">
            <span>Add photos</span>
            <FontAwesomeIcon icon={faPlus} />
          </label>
        </>
      )}

      {image && (
        <div className="factoryForm__attachment">
          <img
            src={image}
            style={{
              backgroundImage: image,
            }}
            alt="미리보기"
          />
        </div>
      )}
    </form>
  );
};

export default CreatePost;
