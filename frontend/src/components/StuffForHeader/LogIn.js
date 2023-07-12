import { useContext, useState } from 'react';
import { styled } from 'styled-components';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';


const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { refetch, setRefetch } = useContext(UserContext)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      
      if (response.ok) {
        // Signin successful
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data));
        setEmail('');
        setPassword('');
        setError(null);
        setRefetch(!refetch)
        alert('User signed in successfully');
        navigate('/');
      } else {
        // Server error or invalid credentials
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      // Error occurred
      setError('Server error');
    }
  };

  return (
    <div>
    <Container>
      <h2>Log In</h2>
      <Form onSubmit={handleSubmit}>
        <Label>
          Email:
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Label>
        <Label>
          Password:
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Label>
        {error && <Error>{error}</Error>}
        <Button type="submit">Sign In</Button>
      </Form>
    </Container>
    </div>
  );
};



const Container = styled.div`
  background-color: #262a2b;
  color: white;
  padding: 1rem;
  margin: 0 auto 250px;
  border: black solid 1px;
  border-radius: 5px;
  max-width: 500px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`;

const Input = styled.input`
  margin: 0.3rem;
  padding: 0.3rem;
  background-color: #1d2324;
  border: black solid 1px;
  color: white;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  cursor: pointer;
  background-color: #1d2324;
  border: black solid 1px;
  color: white;
  border-radius: 5px;
  max-width: 70px;
  margin: 0.4rem auto;
`;

const Error = styled.p`
  color: var(--error-color);
`;

export default LogIn;