import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomeTab = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const tabContent = [
    {
      id: 0,
      title: '전체',
      url: '/',
      view: true,
    },
    {
      id: 1,
      title: '내가 작성한 게시물',
      url: '/post/user',
      view: user ? true : false,
    },
    {
      id: 2,
      title: user ? user.displayName : 'Profile',
      url: '/profile',
      view: true,
    },
  ];

  return (
    <nav>
      <ul className="hometab">
        {tabContent.map(
          (tb) =>
            tb.view && (
              <li onClick={() => navigate(tb.url)} key={tb.id}>
                {tb.title}
              </li>
            )
        )}
      </ul>
    </nav>
  );
};

export default HomeTab;
