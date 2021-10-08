import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import Header from "../../components/header";
import { Grid } from "@mui/material";
import styled from "styled-components";
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom'
import axios from 'axios';


const Wrapper = styled.div`
  width: 50%;
  padding: 20px;
  background-color: white;
  align-items: center;
  justify-content: center;
  margin-left:20%;

`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Label = styled.h5`
  font-size: 15px;
  font-weight: 300;
  margin-bottom:-2px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 5px 0;
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
const CreateCategory = observer(() => {

  const [image, setImage] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [name, setName] = useState('')
  const { addToast } = useToasts();
  const history = useHistory();


  const uploadImages = (e) => {
    const file = e.target.files[0]
    setImage(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const onSubmit = () => {
      
    const formData = new FormData()
    formData.append('name',name)
    formData.append('image',image)

    axios.post('http://192.168.0.121:4000/v1/category/createCategory',formData)
        .then(response => {
            console.log(response)
            addToast('Create Successfully', { appearance: 'success',autoDismiss:true });
            setTimeout(() => {
              history.push('/admin/category')
            }, 1000);
        })
        .catch(err => {
            console.log(err)
            addToast('Create Failed', { appearance: 'error',autoDismiss:true });

        })
  }

    return(
      <div>
        <Header />
        <div style={{marginLeft:'10%',marginRight:'10%'}}>
          <div style={{marginTop:40}}></div>
            <Grid container spacing={2}>
                
                <Wrapper>
                  <Title>ADD CATEGORY</Title>
                  <Form>
                    <Label>Title</Label>
                    <Input placeholder="title" onChange={(e) => setName(e.target.value)}/>
                    <Label>File Gambar</Label>
                    <Input placeholder="file" type="file" onChange={(e) => uploadImages(e)} img={imagePreview}  />
                    <Button onClick={onSubmit}>SUBMIT</Button>
                  </Form>
                </Wrapper>
            </Grid>
        </div>
    </div>
    )
})

export default CreateCategory