import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = () => {
  const {
    user: { displayName },
  } = useSelector((state) => state.user);

  return (
    <nav>
      <ul className="navWrap">
        <li>
          <Link to={'/'} className="navHome">
            <FontAwesomeIcon icon={faTwitter} color={'#04AAFF'} size="2x" />
          </Link>
        </li>
        {/* <li>
          <Link to={'/Profile'} className="navProfile">
            <FontAwesomeIcon icon={faUser} color={'#04AAFF'} size="2x" />
            <span style={{ marginTop: 10 }}>{displayName ? `${displayName}` : 'Profile'}</span>
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Nav;
