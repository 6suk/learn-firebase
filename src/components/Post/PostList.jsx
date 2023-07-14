import { memo } from 'react';
import { useSelector } from 'react-redux';
import { keyframes, styled } from 'styled-components';
import { isEmpty } from 'utils/util';
import PostItem from './PostItem';

const PostList = ({ action }) => {
  const user = useSelector((state) => state.user.user);
  const postList = useSelector((state) => state.postList.data);

  return (
    <>
      <PostAnimation>
        {isEmpty(postList) ? (
          <div className="nweet__nopost">등록된 게시물이 없어요!</div>
        ) : (
          <PostWrap>
            {postList.map((post) => {
              const isOwner = user && user.uid === post.uid;
              return <PostItem post={post} isOwner={isOwner} action={action} key={post.id} />;
            })}
          </PostWrap>
        )}
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

const PostWrap = styled.ul`
  margin-top: 30px;
`;

const PostAnimation = styled.div`
  animation: ${Animation} 0.5s ease-in-out;
`;

export default memo(PostList);
