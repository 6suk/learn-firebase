import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PostEdit from 'components/Post/PostEditForm';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPostFormToggle } from 'slice/postToggle';
import { dateUtil } from 'utils/util';

const PostItem = ({ post, isOwner, action }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const { deletePost, deleteStorage } = action[1];

  const toggleEdit = () => {
    setIsEdit(!isEdit);
    dispatch(setPostFormToggle());
  };

  const onDelSubmit = async () => {
    const check = window.confirm('정말 삭제하실건가요?');
    if (check) {
      await deleteStorage(post.imageUrl);
      await deletePost(post.id);
    }
  };

  return (
    <li className={'nweet'}>
      {isEdit ? (
        <PostEdit post={post} toggleEdit={toggleEdit} updateAction={action[0]} />
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
