import { POST_DOC, storage } from 'fbase';
import { deleteDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPostFormToggle } from 'slice/postToggle';
import { dateUtil, isEmpty } from 'utils/util';
import PostEdit from './PostEditForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

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

export default PostItem;
