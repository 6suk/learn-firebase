import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty } from 'utils/util';
import { useSelector } from 'react-redux';

const PostPhotoForm = ({ image, setImage }) => {
  const { isLogin } = useSelector((state) => state.user);

  const onFileChange = (e) => {
    const { files } = e.target;
    const file = files[0];

    if (!isEmpty(file)) {
      const reader = new FileReader();

      reader.addEventListener('loadend', (e) => {
        // FileReader.result로도 받을 수 있음
        setImage(reader.result);
      });

      reader.readAsDataURL(file);
    }
  };

  const onClearImgClick = () => setImage('');
  return (
    <>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="factoryInput__file"
        disabled={!isLogin}
      />
      {image ? (
        <div className="factoryForm__clear" onClick={onClearImgClick}>
          <span>Remove</span>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      ) : (
        <label htmlFor="attach-file" className="factoryInput__label">
          <span>Add photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
      )}
      {image && (
        <div className="factoryForm__attachment">
          <img src={image} alt="미리보기" />
        </div>
      )}
    </>
  );
};

export default PostPhotoForm;
