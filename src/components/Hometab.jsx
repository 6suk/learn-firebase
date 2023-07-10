import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const HomeTab = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const tabContent = [
    {
      id: 0,
      title: 'HOME',
      url: '/',
      view: true,
      group: true,
    },
    {
      id: 1,
      title: '내가 작성한 게시물',
      url: '/post/user',
      view: user ? true : false,
      group: true,
    },
  ];

  const tabProfile = {
    id: 2,
    title: user ? `${user.displayName || ''} Profile` : 'LogIn',
    url: user ? '/profile' : '/login',
    view: true,
    group: false,
  };

  return (
    <nav>
      <ul className="hometab main">
        <li>
          {tabContent.map(
            (tb) =>
              tb.view && (
                <p onClick={() => navigate(tb.url)} key={tb.id} className={pathname === tb.url && 'on'}>
                  {tb.title}
                </p>
              )
          )}
        </li>
        <li onClick={() => navigate(tabProfile.url)} className={pathname === tabProfile.url && 'on'}>
          {tabProfile.title}
        </li>
      </ul>
    </nav>
  );
};

export default HomeTab;
