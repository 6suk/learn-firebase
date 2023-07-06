import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = () => {
  const {
    user: { displayName },
  } = useSelector((state) => state.user);

  return (
    <nav>
      <ul>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/Profile'}>{displayName}의 Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
