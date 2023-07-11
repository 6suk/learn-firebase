import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { POST_DOC, storage } from 'fbase';
import { deleteDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setPostFormToggle } from 'slice/postToggle';
import { keyframes, styled } from 'styled-components';
import { dateUtil, isEmpty } from 'utils/util';
import PostEdit from './PostEditForm';
import CreatePost from './PostForm';

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
      {postFormToggle && <CreatePost />}
      <PostAnimation>
        {data.length === 0 && <div className="nweet__nopost">등록된 게시물이 없어요!</div>}
        <ul style={{ marginTop: 30 }}>
          {data.map((post) => {
            const isOwner = isLogin && user.uid === post.uid;
            return <PostItem key={post.id} post={post} isOwner={isOwner} />;
          })}
        </ul>
      </PostAnimation>
    </>
  );
};

/**
 * 각각 포스트
 * @param {*} post
 * @param {*} isOwner
 */
const PostItem = ({ post, isOwner }) => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const toggleEdit = () => {
    setIsEdit(!isEdit);
    dispatch(setPostFormToggle());
  };

  // STORAGE DELETE
  const delImgInStorage = async () => {
    if (!isEmpty(post.imageUrl)) {
      const curImgRef = ref(storage, post.imageUrl);
      await deleteObject(curImgRef);
    }
  };

  // DB DELETE
  const onDelSubmit = async () => {
    try {
      const ok = window.confirm('정말 삭제 할거임?');
      if (ok) {
        await delImgInStorage(post.imageUrl);
        await deleteDoc(POST_DOC(post.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editProps = {
    post,
    delImgInStorage,
    toggleEdit,
  };

  return (
    <li className={'nweet'}>
      {isEdit ? (
        <PostEdit editProps={editProps} />
      ) : (
        <>
          {post.imageUrl && <img src={post.imageUrl} alt={post.id} style={{ maxWidth: '100px' }} />}
          <h4>{post.post}</h4>
          <p>
            {post.displayName} <span>{dateUtil(post.date)}</span>
          </p>
          {isOwner && (
            <>
              <div className="nweet__actions">
                <span onClick={onDelSubmit}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={toggleEdit}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </div>
            </>
          )}
        </>
      )}
    </li>
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

export default Post;
