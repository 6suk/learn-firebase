import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dateUtil } from 'util/util';
import { POST_DOC } from 'fbase';
import { updateDoc } from 'firebase/firestore';

const PostEdit = ({ editProps }) => {
  const { editPost, clearImage, post, setIsEdit, setClearImage, setEditPost, toggleEdit, delImgInStorage } = editProps;

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

  const onEditChange = (e) => {
    const { value } = e.target;
    setEditPost(value);
  };

  const toggleClearImg = () => {
    setClearImage(true);
  };

  return (
    <form onSubmit={onEditSubmit} className="container nweetEdit">
      <input type="text" value={editPost} onChange={onEditChange} required autoFocus />

      <p>{dateUtil(post.date)}</p>
      {post.imageUrl && !clearImage && <button onClick={toggleClearImg}>이미지 삭제</button>}
      <input id="attach-file" type="file" accept="image/*" className="factoryInput__file" />
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Edit photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <button onClick={toggleEdit} className="formBtn cancelBtn">
        취소
      </button>
      <input type="submit" value="수정 완료" className="formBtn" />
    </form>
  );
};

export default PostEdit;
