import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDataBase } from 'hooks/useDataBase';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPostFormToggle } from 'slice/postToggle';
import { dateUtil } from 'utils/util';
import PostEdit from './PostEditForm';

const PostItem = ({ post, isOwner }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const { deleteDataBase } = useDataBase({
    imageUrl: post.imageUrl,
    pid: post.id,
  });

  const toggleEdit = () => {
    setIsEdit(!isEdit);
    dispatch(setPostFormToggle());
  };

  const onDelSubmit = async () => {
    await deleteDataBase('정말 삭제 하실건가요?');
  };

  return (
    <li className={'nweet'}>
      {isEdit ? (
        <PostEdit post={post} toggleEdit={toggleEdit} />
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
