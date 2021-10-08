import React, { useState } from 'react'
import styled from "styled-components";
import axios from 'axios'
import { useCart } from 'react-use-cart';


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 30px;
`;


const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  margin-top:20px;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;
const DetailProduct = (props) => {
    
    const[detailProduct,setDetailProduct] = useState([])
    const { addItem } = useCart()
    
    async function getDetailProduct() {

        try {  
          const _id = props.match.params.id
          const resp = await axios.get(`http://192.168.0.121:4000/v1/products/productById/${_id}`)
          setDetailProduct(resp.data.data)        

        } catch (err) {
          console.log(err)
        }
    }
    getDetailProduct()

    return(
        <Container style={{marginLeft:'10%',marginRight:'10%'}}>
        <Wrapper>
          <ImgContainer>
            <Image src={`http://192.168.0.121:4000/${detailProduct.image}`} />
          </ImgContainer>
          <InfoContainer>
            <Title>{detailProduct.title}</Title>
            <Desc>
              {detailProduct.description}
            </Desc>
            <Price>Harga : {detailProduct.price}</Price>
            <AddContainer>
              <Button style={{cursor:'pointer'}} onClick={() =>addItem(detailProduct)}>ADD TO CART</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      </Container>
    )
}

export default DetailProduct