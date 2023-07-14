import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty } from 'utils/util';
import { useSelector } from 'react-redux';
import imageCompression from 'browser-image-compression';

const imageCompressedOption = {
  maxSizeMB: 0.5,
  maxWidthOrHeight: 150,
  useWebWorker: true,
};

const PostPhotoForm = ({ image, setImage }) => {
  const { isLogin } = useSelector((state) => state.user);

  // 이미지 최적화
  const handleImageCompress = async (image) => {
    const compressedBlob = await imageCompression(image, imageCompressedOption);
    const compressedDataURL = await imageCompression.getDataUrlFromFile(compressedBlob);
    return compressedDataURL;
  };

  const onFileChange = async (e) => {
    const { files } = e.target;
    const file = files[0];

    if (!isEmpty(file)) {
      setImage(await handleImageCompress(file));
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
