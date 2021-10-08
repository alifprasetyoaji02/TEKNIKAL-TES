import React, { useState, useEffect } from 'react';
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
const EditCategory = (props) => {

  const [image, setImage] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [name, setName] = useState('')
  const { addToast } = useToasts();
  const history = useHistory();
  const[detailCategory,setDetailCategory] = useState([])

  useEffect(() => {
    const _id = props.match.params.id
    
    axios.get(`http://192.168.0.121:4000/v1/category/categoryById/${_id}`)
    .then(result => {
        setDetailCategory(result.data.data)
                
        if(detailCategory){
            if(!name){
            setName(detailCategory.name)
            }
        }    
    })
    .catch(err => console.log(err))
},)

  const uploadImages = (e) => {
    const file = e.target.files[0]
    setImage(file)
    setImagePreview(URL.createObjectURL(file))
  }


  const onSubmit = () => {

    const id = props.match.params.id

    const formData = new FormData()
    formData.append('name',name)
    formData.append('image',image)
    formData.append('id',id)

    axios.post('http://192.168.0.121:4000/v1/category/updateCategory',formData,{"Content-Type": "multipart/form-data" })
        .then(response => {
            console.log(response.data)
            addToast('Update Successfully', { appearance: 'success',autoDismiss:true });
            setTimeout(() => {
              history.push('/admin/category')
            }, 1000);
        })
        .catch(err => {
            console.log(err)
            addToast('Update Failed', { appearance: 'error',autoDismiss:true });

        })
  }

    return(
      <div>
        <Header />
        <div style={{marginLeft:'10%',marginRight:'10%'}}>
          <div style={{marginTop:40}}></div>
            <Grid container spacing={2}>
                
                <Wrapper>
                  <Title>EDIT CATEGORY</Title>
                  <Form>
                    <Label>Name</Label>
                    <Input placeholder="Name" onChange={(e) => setName(e.target.value)} defaultValue={detailCategory.name}/>
                    <Label>File Gambar</Label>                    <Input placeholder="file" type="file" onChange={(e) => uploadImages(e)} img={imagePreview}  />

                    <Button onClick={onSubmit}>SUBMIT</Button>
                  </Form>
                </Wrapper>
            </Grid>
        </div>
    </div>
    )
}

export default EditCategory