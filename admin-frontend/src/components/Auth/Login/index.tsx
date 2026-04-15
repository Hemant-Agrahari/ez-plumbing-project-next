"use client"
import { useState} from 'react';
import { useRouter } from 'next/navigation';
import { publicHandler } from '@/helper/requestHandler';
import { setroleIdCookie, setTokenCookie, setUserIdCookie } from '@/helper/auth';
import styles from './Login.module.css';
import Link from 'next/link';
import { toast } from 'react-toastify';
import DynamicInput from '@/components/UI/Input';
import { asyncHandler } from '@/utils/asyncHandler';
import { DomainList } from '@/utils/domainList';
const Login = () => {
  const [email, setEmail] = useState('');
  const [domain, setDomain] = useState(DomainList[0].value);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleFormSubmit = async (values: { email: string; password: string }) => {
    await asyncHandler(async () => {
      const response = await publicHandler('/login', values, 'POST');
      if (response && response.data && response.data.jwt_token) {
        setTokenCookie('auth', response.data.jwt_token);
        setUserIdCookie('userId', response.data.id);
        setroleIdCookie('role', response.data.role);
        router.push('/');
        toast.success(response.message || 'Login successful');
      } else {
        toast.error(response.message || 'Invalid credentials');
      }
    })();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleFormSubmit({ email, password });
  };

  return (

    <div className={styles.login1}>
      <div className={styles.loginItem} />

      <div className={styles.loginContainer}>
        <h1 className={styles.login2}>Login</h1>
      </div>
      <form className={styles.frameParent} onSubmit={handleSubmit}>
        <DynamicInput
          placeholder="Email Address"
          type="text"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <DynamicInput
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />
        <Link
          href="/forgot-password"
          className={styles.forgotPasswordWrapper}
        >
          <div className={styles.forgotPassword}>Forgot Password?</div>
        </Link>
        {error && <div className={styles.error}>{error}</div>}
        <button className={styles.rectangleContainer} type="submit">
          <div className={styles.frameInner} />
          <div className={styles.login3}>Login</div>
        </button>
      </form>
    </div>
  );
};

export default Login;
