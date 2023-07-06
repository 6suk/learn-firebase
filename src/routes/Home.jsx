import { collection, addDoc, getDoc, getDocs, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { POST_COLLECTION, db, storage } from 'fbase';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPostList } from 'slice/post';
import Post from 'components/Post';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { v4 as uuid } from 'uuid';

const Home = () => {
  const dispatch = useDispatch();
  const {
    postList: { data: postList },
    user: { user },
  } = useSelector((state) => state);
  const [post, setPost] = useState('');
  const [image, setImage] = useState('');

  // Read (실시간 가져오기)
  useEffect(() => {
    // 등록된 시간별 정렬 쿼리
    const q = query(POST_COLLECTION, orderBy('date', 'desc'));

    onSnapshot(q, (querySnapshot) => {
      const arr = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setPostList(arr));
    });
  }, []);

  // Read (1번 가져오기)
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

    const reader = new FileReader();

    reader.addEventListener('loadend', (e) => {
      // event 객체로 받을 수도 있음
      // console.log(e);

      // FileReader.result로도 받을 수 있음
      setImage(reader.result);
    });

    reader.readAsDataURL(file);
  };

  const onClearImgClick = () => setImage('');

  return (
    <>
      <form action="" onSubmit={onSubmit}>
        {image && (
          <div>
            <img src={image} width="80px" height="80px" alt="미리보기" />
            <button onClick={onClearImgClick}>이미지 삭제</button>
          </div>
        )}
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="text" placeholder="내용 작성" maxLength={120} onChange={onChange} value={post} />
        <input type="submit" value="Nweet" />
      </form>

      <ul>
        {postList.map((post) => (
          <Post post={post} key={post.id} isOwner={user.uid === post.uid} />
        ))}
      </ul>
    </>
  );
};
export default Home;
