import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty } from 'util/util';
import { useSelector } from 'react-redux';

const PostPhotoForm = ({ image, setImage }) => {
  const {
    postList: { data: postList },
    user: { user, isLogin },
  } = useSelector((state) => state);

  const onFileChange = (e) => {
    const { files } = e.target;
    const file = files[0];

    if (!isEmpty(file)) {
      const reader = new FileReader();

      reader.addEventListener('loadend', (e) => {
        // event 객체로 받을 수도 있음
        // console.log(e);

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
        disabled={isLogin ? false : true}
      />
      {image ? (
        <div className="factoryForm__clear" onClick={onClearImgClick}>
          <span>Remove</span>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      ) : (
        <>
          <label htmlFor="attach-file" className="factoryInput__label">
            <span>Add photos</span>
            <FontAwesomeIcon icon={faPlus} />
          </label>
        </>
      )}
      {image && (
        <div className="factoryForm__attachment">
          <img
            src={image}
            style={{
              backgroundImage: image,
            }}
            alt="미리보기"
          />
        </div>
      )}
    </>
  );
};

export default PostPhotoForm;
