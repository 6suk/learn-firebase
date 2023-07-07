import { useState } from 'react';
import { useSelector } from 'react-redux';

const ProfileForm = ({ refreshUser }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user.displayName);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (user.displayName !== name) {
      await user.updateProfile({
        displayName: name,
      });
      refreshUser();
    }
  };

  const onChange = (e) => {
    const { value } = e.target;
    setName(value);
  };

  return (
    <form onSubmit={onSubmit} className="profileForm">
      <input type="text" value={name} onChange={onChange} autoFocus className="formInput" />
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
