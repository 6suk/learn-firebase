import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dateUtil, isEmpty } from 'Util/util';
import { POST_DOC, storage } from 'fbase';
import { deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CreatePost from './CreatePost';

const Post = () => {
  const { type } = useParams();
  const {
    postList: { data: postList },
    user: { user, myPostList },
  } = useSelector((state) => state);
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
      <CreatePost />
      <ul style={{ marginTop: 30 }}>
        {data.map((post) => (
          <PostItem key={post.id} post={post} isOwner={user.uid === post.uid} />
        ))}
      </ul>
    </>
  );
};

const PostItem = ({ post, isOwner }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editPost, setEditPost] = useState(post.post);
  const [clearImage, setClearImage] = useState(false);

  // DB UPDATE
  const onEditSubmit = async (e) => {
    e.preventDefault();

    if (clearImage) {
      delImgInStorage();
    }

    await updateDoc(POST_DOC(post.id), {
      post: editPost,
      imageUrl: clearImage ? '' : post.imageUrl,
    });
    setIsEdit(false);
    setClearImage(false);
  };

  const toggleEdit = (e) => {
    setIsEdit(!isEdit);
    setClearImage(false);
  };

  const onEditChange = (e) => {
    const { value } = e.target;
    setEditPost(value);
  };

  // DB DELETE
  const onDelSubmit = async () => {
    try {
      const ok = window.confirm('정말 삭제 할거임?');
      if (ok) {
        await delImgInStorage();
        await deleteDoc(POST_DOC(post.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // STORAGE DELETE
  const delImgInStorage = async () => {
    if (!isEmpty(post.imageUrl)) {
      const curImgRef = ref(storage, post.imageUrl);
      await deleteObject(curImgRef);
    }
  };

  const toggleClearImg = () => {
    setClearImage(true);
  };

  return (
    <li className={'nweet'}>
      {post.imageUrl && !clearImage && <img src={post.imageUrl} alt={post.id} style={{ maxWidth: '100px' }} />}
      {isEdit ? (
        <>
          <form onSubmit={onEditSubmit} className="container nweetEdit">
            <input type="text" value={editPost} onChange={onEditChange} required autoFocus />
            <p>{dateUtil(post.date)}</p>
            {post.imageUrl && !clearImage && <button onClick={toggleClearImg}>이미지 삭제</button>}
            <button onClick={toggleEdit} className="formBtn cancelBtn">
              취소
            </button>
            <input type="submit" value="수정 완료" className="formBtn" />
          </form>
        </>
      ) : (
        <>
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

export default Post;
