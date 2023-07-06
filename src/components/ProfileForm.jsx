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
    <form onSubmit={onSubmit}>
      <input type="text" value={name} onChange={onChange} />
      <input type="submit" value="수정하기" />
    </form>
  );
};

export default ProfileForm;
