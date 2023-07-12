import { set_user_doc } from 'fbase';
import useInput from 'hooks/useInput';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from 'slice/user';

const ProfileForm = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [nickName, setNickName] = useState(user.displayName);

  const refreshUser = () => {
    if (nickName !== user.displayName) {
      const userObj = { ...user };
      userObj.displayName = nickName;
      set_user_doc(userObj);
      dispatch(setLogin(userObj));
    }
  };

  useEffect(() => {
    refreshUser();
  }, [nickName]);

  const submitProfile = async (input) => {
    if (user.displayName !== input) {
      setNickName(input);
      await user.updateProfile({
        displayName: input,
      });
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
