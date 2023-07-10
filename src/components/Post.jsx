import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { POST_DOC, storage } from 'fbase';
import { deleteDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { keyframes, styled } from 'styled-components';
import { dateUtil, isEmpty } from 'util/util';
import PostEdit from './PostEditForm';
import CreatePost from './PostForm';

/**
 * 전체 포스트 리스트
 */
const Post = () => {
  const {
    postList: { data: postList },
    user: { user, myPostList, isLogin },
  } = useSelector((state) => state);
  const { type } = useParams();
  const [data, setData] = useState([]);
  const [togglePostForm, setTogglePostForm] = useState(true);

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

  const postItmeProps = {
    togglePostForm,
    setTogglePostForm,
  };

  return (
    <>
      {togglePostForm && <CreatePost />}
      <PostAnimation>
        {data.length === 0 && <div className="nweet__nopost">등록된 게시물이 없어요!</div>}
        <ul style={{ marginTop: 30 }}>
          {data.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              isOwner={isLogin && user.uid === post.uid}
              postItmeProps={postItmeProps}
            />
          ))}
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
const PostItem = ({ post, isOwner, postItmeProps: { togglePostForm, setTogglePostForm } }) => {
  const [editPost, setEditPost] = useState(post.post);
  const [isEdit, setIsEdit] = useState(false);

  // STORAGE DELETE
  const delImgInStorage = async () => {
    if (!isEmpty(post.imageUrl)) {
      const curImgRef = ref(storage, post.imageUrl);
      await deleteObject(curImgRef);
    }
  };

  const toggleEdit = (e) => {
    setIsEdit(!isEdit);
    setTogglePostForm(!togglePostForm);
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
    editPost,
    toggleEdit,
    setTogglePostForm,
    setEditPost,
    setIsEdit,
    delImgInStorage,
  };

  return (
    <li className={'nweet'}>
      {isEdit ? (
        <PostEdit editProps={editProps} />
      ) : (
        <>
          {post.imageUrl && <img src={post.imageUrl} alt={post.id} style={{ maxWidth: '100px' }} />}
          <h4>{post.post}</h4>
          <p>{dateUtil(post.date)}</p>
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
