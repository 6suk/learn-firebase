import useInitUser from 'hooks/useInitUser';
import useInput from 'hooks/useInput';
import { useSelector } from 'react-redux';

const ProfileForm = () => {
  const { user } = useSelector((state) => state.user);
  const { refreshUser } = useInitUser();

  const submitProfile = async (input) => {
    if (user.displayName !== input) {
      await user.updateProfile({
        displayName: input,
      });
      refreshUser();
    }
  };

  const [inputValue, onChange, onSubmit] = useInput(user.displayName, submitProfile);

  return (
    <form onSubmit={onSubmit} className="profileForm">
      <input type="text" value={inputValue} onChange={onChange} autoFocus className="formInput" />
      <input
        type="submit"
        value="수정하기"
        className="formBtn"
        style={{
          marginTop: 10,
        }}
      />
    </form>
  );
};

export default ProfileForm;
