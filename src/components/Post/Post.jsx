import PostForm from 'components/Post/PostForm';
import PostList from 'components/Post/PostList';
import UserPostList from 'components/Post/UserPostList';
import { useDataBase } from 'hooks/useDataBase';
import { useStorage } from 'hooks/useStorage';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

/**
 * 전체 포스트 리스트
 */
const Post = () => {
  const { type } = useParams();
  const { postFormToggle } = useSelector((state) => state.postToggle);
  const { addPost, updatePost, deletePost } = useDataBase();
  const { setStorage, updateStorage, deleteStorage } = useStorage();
  const [index, setIndex] = useState(null);

  const action = useMemo(() => {
    return [
      { updatePost, updateStorage },
      { deletePost, deleteStorage },
    ];
  }, []);

  useEffect(() => {
    console.log('Post 실행');

    switch (type) {
      case 'user':
        if (index !== 1) setIndex(1);
        break;
      default:
        if (index !== 0) setIndex(0);
        break;
    }
  }, [type]);

  return (
    <>
      {postFormToggle && <PostForm setAction={{ addPost, setStorage }} />}
      {index !== null && index === 0 && <PostList action={action} />}
      {index !== null && index === 1 && <UserPostList action={action} />}
    </>
  );
};

export default Post;
