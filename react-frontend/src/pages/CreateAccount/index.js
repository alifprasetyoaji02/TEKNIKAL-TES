import axios from "axios";
import styled from "styled-components";
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications';
import { useState } from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://www.wallpapertip.com/wmimgs/196-1963020_website-backgrounds-website-login-page-background.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [phone, setPhone] = useState('')

    const history = useHistory();
    const { addToast } = useToasts();

    const onSubmit = () => {

        const formLogin = new FormData()

        formLogin.append('email',email);
        formLogin.append('password',password)
        formLogin.append('username',username)
        formLogin.append('firstname',firstname)
        formLogin.append('lastname',lastname)
        formLogin.append('phone',phone)

        axios.post('http://192.168.0.121:4000/v1/auth/register', formLogin,{"Content-Type": "multipart/form-data" })
        .then(result => {
            localStorage.setItem("idUser", JSON.stringify(result.data.data));
            addToast('Register Successfully', { appearance: 'success',autoDismiss:true });
            setTimeout(() => {
                history.push('/')
            }, 2000);

        })
        .catch(err => {
          console.log(err)
          addToast('Failed, Please Complate your input', { appearance: 'error',autoDismiss:true });
      })



    }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE ACCOUNT</Title>
        <Form>
          <Input placeholder="first name" onChange={(e) => setFirstname(e.target.value)} />
          <Input placeholder="last name" onChange={(e) => setLastname(e.target.value)} />
          <Input placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
          <Input placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
          <Input placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
          <Input placeholder="phone" onChange={(e) => setPhone(e.target.value)}/>
          <Agreement>
            Data anda akan kami jaga semaksimal mungkin <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={onSubmit}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
