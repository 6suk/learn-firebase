import AuthForm from 'components/AuthForm';
import AuthSocial from 'components/AuthSocial';
import { motion } from 'framer-motion';

const Auth = () => {
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <AuthForm />
        <AuthSocial />
      </motion.div>
    </>
  );
};
export default Auth;
