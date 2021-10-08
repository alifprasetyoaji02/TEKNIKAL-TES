import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications';
import MyStore from '../../config/store';
import { observer } from 'mobx-react-lite';

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
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

// const Link = styled.Link`
//   margin: 5px 0px;
//   font-size: 12px;
//   text-decoration: underline;
//   cursor: pointer;
// `;

const Login = observer(() => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();
    const { addToast } = useToasts();

    const cekData = localStorage.getItem("idUser")

    if(cekData){
       history.push('/')
    }
    

    const onSubmit = () => {


        const formLogin = new FormData()

        formLogin.append('email',email);
        formLogin.append('password',password)

        axios.post('http://192.168.0.121:4000/v1/auth/login', formLogin,{"Content-Type": "multipart/form-data" })
        .then(result => {
            MyStore.login = result.data.data
            localStorage.setItem("idUser", JSON.stringify(result.data.data));

            addToast('Login Successfully', { appearance: 'success',autoDismiss:true });
            setTimeout(() => {
                history.push('/')
            }, 2000);

        })
        .catch(err => {
          console.log(err)
          addToast('Failed, Please Check Username or Password', { appearance: 'error',autoDismiss:true });
      })

    }

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="password" onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={onSubmit}>LOGIN</Button>
          <Link to="/register" style={{margin: 5,fontSize: 12,textDecoration:'underline',cursor:'pointer'}}>CREATE ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
});

export default Login;
