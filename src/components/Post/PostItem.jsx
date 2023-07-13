import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPostFormToggle } from 'slice/postToggle';
import { dateUtil } from 'utils/util';
import PostEdit from './PostEditForm';

const PostItem = ({ post, isOwner, deleteAction: { deleteDataBase, deleteStroage }, updateAction }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);

  const toggleEdit = () => {
    setIsEdit(!isEdit);
    dispatch(setPostFormToggle());
  };

  const onDelSubmit = async () => {
    const check = window.confirm('정말 삭제하실건가요?');
    if (check) {
      await deleteStroage(post.imageUrl);
      await deleteDataBase(post.id);
    }
  };

  return (
    <li className={'nweet'}>
      {isEdit ? (
        <PostEdit post={post} toggleEdit={toggleEdit} updateAction={updateAction} />
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
