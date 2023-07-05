import { useSelector } from 'react-redux';

const Home = () => {
  const { post } = useSelector((state) => state);

  const onSubmit = (e) => {
    e.preventDefalt();
  };

  const onChange = (e) => {
    const { value } = e.target;
    console.log('value: ', value);
  };

  return (
    <>
      <form action="" onSubmit={onSubmit}>
        <input type="text" name="" id="" placeholder="내용 작성" maxLength={120} onChange={onChange} />
        <input type="submit" value="Nweet" />
      </form>
    </>
  );
};
export default Home;
