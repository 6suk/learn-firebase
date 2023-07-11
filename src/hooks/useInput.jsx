import { useState } from 'react';

const useInput = (initValue, submitAction, isBlank = false) => {
  const [inputValue, setInputValue] = useState(initValue);

  const onSubmit = async (e) => {
    e.preventDefault();
    submitAction(inputValue);
    if (isBlank) setInputValue('');
  };

  const onChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  return [inputValue, onChange, onSubmit];
};

export default useInput;
