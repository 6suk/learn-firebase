import { useDataBase } from 'hooks/useDataBase';
import { useStorage } from 'hooks/useStorage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { keyframes, styled } from 'styled-components';
import { isEmpty } from 'utils/util';
import PostForm from './PostForm';
import PostItem from './PostItem';

/**
 * 전체 포스트 리스트
 */
const Post = () => {
  const { type } = useParams();
  const { postFormToggle } = useSelector((state) => state.postToggle);
  const { myPostList, user, isLogin } = useSelector((state) => state.user);
  const postList = useSelector((state) => state.postList.data);
  const { addPost, updatePost, deletePost } = useDataBase();
  const { setStorage, updateStorage, deleteStorage } = useStorage();
  const setAction = { addPost, setStorage };
  const updateAction = { updatePost, updateStorage };
  const deleteAction = { deletePost, deleteStorage };

  const data = useMemo(() => {
    switch (type) {
      case 'user':
        return myPostList;
      default:
        return postList;
    }
  }, [type, myPostList, postList]);

  return (
    <>
      {postFormToggle && <PostForm setAction={setAction} />}
      <PostAnimation>
        <>
          {isEmpty(data) ? (
            <div className="nweet__nopost">등록된 게시물이 없어요!</div>
          ) : (
            <PostWrap>
              {data.map((post) => {
                const isOwner = isLogin && user.uid === post.uid;
                return (
                  <PostItem
                    post={post}
                    isOwner={isOwner}
                    updateAction={updateAction}
                    deleteAction={deleteAction}
                    key={post.id}
                  />
                );
              })}
            </PostWrap>
          )}
        </>
      </PostAnimation>
    </>
  );
};

const Animation = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const PostAnimation = styled.div`
  animation: ${Animation} 0.5s ease-in-out forwards;
`;

const PostWrap = styled.ul`
  margin-top: 30px;
`;

export default Post;
