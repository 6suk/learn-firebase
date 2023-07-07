import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <ul className="navWrap">
        <li>
          <Link to={'/'} className="navHome">
            <FontAwesomeIcon icon={faTwitter} color={'#04AAFF'} size="2x" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
