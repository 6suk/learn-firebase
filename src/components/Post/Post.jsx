import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { keyframes, styled } from 'styled-components';
import PostForm from './PostForm';
import PostItem from './PostItem';

/**
 * 전체 포스트 리스트
 */
const Post = () => {
  const {
    postList: { data: postList },
    user: { user, myPostList, isLogin },
    postToggle: { postFormToggle },
  } = useSelector((state) => state);
  const { type } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    switch (type) {
      case 'user':
        setData(myPostList);
        break;
      default:
        setData(postList);
        break;
    }
  }, [type, postList, myPostList]);

  return (
    <>
      {postFormToggle && <PostForm />}
      <PostAnimation>
        {data.length === 0 && <div className="nweet__nopost">등록된 게시물이 없어요!</div>}
        <PostWrap>
          {data.map((post) => {
            const isOwner = isLogin && user.uid === post.uid;
            return <PostItem post={post} isOwner={isOwner} key={post.id} />;
          })}
        </PostWrap>
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
