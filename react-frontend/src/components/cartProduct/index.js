import React from "react";
import styled from "styled-components";
import { useCart } from 'react-use-cart';
import { RestoreFromTrash } from "@mui/icons-material";

const Product = styled.div`
display: flex;
justify-content: space-between;
`;

const ProductDetail = styled.div`
flex: 2;
display: flex;
`;

const Image = styled.img`
width: 200px;
`;

const Details = styled.div`
padding: 20px;
display: flex;
flex-direction: column;
justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
flex: 1;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const ProductAmountContainer = styled.div`
display: flex;
align-items: center;
margin-bottom: 20px;
`;

const ProductAmount = styled.div`
font-size: 24px;
margin: 5px;
`;

const ProductPrice = styled.div`
font-size: 30px;
font-weight: 200;
`;

const Hr = styled.hr`
background-color: #eee;
border: none;
height: 1px;
`;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
const CartProduct = (props) => {

    const {
        removeItem,
        updateItemQuantity,
      } = useCart()

    return(
        <div>
            <Product>
                <ProductDetail>
                <Image src={props.img} />
                <Details>
                    <ProductName>
                    <b>Product:</b> {props.title}
                    </ProductName>
                    <ProductId>
                    <b>ID:</b> {props.id}
                    </ProductId>
                    <ProductSize>
                    </ProductSize>
                </Details>
                </ProductDetail>
                <PriceDetail>
                <ProductAmountContainer>
                    <Button style={{cursor:'pointer'}} onClick={() => updateItemQuantity(props.idItem, props.quantity-1)}>-</Button>
                    <ProductAmount>{props.quantity}</ProductAmount>
                    <Button style={{cursor:'pointer'}} onClick={() => updateItemQuantity(props.idItem, props.quantity+1)}>+</Button>
                </ProductAmountContainer>
                <ProductPrice>{props.itemTotal}</ProductPrice>
                <RestoreFromTrash style={{width:50,height:50,cursor:'pointer'}} onClick={() => removeItem(props.idItem)} />
                </PriceDetail>
            </Product>
            <Hr />
        </div>
    )
}

export default CartProduct