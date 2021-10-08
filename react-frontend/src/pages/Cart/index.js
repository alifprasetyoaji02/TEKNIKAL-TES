import React from "react";
import { useCart } from "react-use-cart";
import styled from "styled-components";
import CartProduct from "../../components/cartProduct";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useToasts } from 'react-toast-notifications';
import { useHistory } from "react-router";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

`;

const Info = styled.div`
  flex: 3;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 52vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  margin-top:'-10px';
`;

const Cart = () => {
  const { addToast } = useToasts();

  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    emptyCart,
  } = useCart()
  
  const history = useHistory();

  
  if(isEmpty) return <h1>Your Cart is Empty</h1>

  const onCheckout = () => {
    emptyCart()
    addToast('Login Successfully', { appearance: 'success',autoDismiss:true });
    setTimeout(() => {
      history.push('/')
    }, 2000);
  }

  return (
   <div className="main-app-wrapper">
   <div className="header-wrapper">
       <Header />
   </div>
    <div className="main-wrapper">
          <Container style={{marginLeft:'10%',marginRight:'10%'}}>
          <Wrapper>
            <Title>YOUR CART</Title>
            <Top>
              <TopButton>CONTINUE SHOPPING</TopButton>
              <TopTexts>
                <TopText>Shopping Bag ({totalUniqueItems}) </TopText>
                <TopText>Your Wishlist ({totalItems})</TopText>
              </TopTexts>
              <TopButton type="filled" onClick={emptyCart}>Empty Cart</TopButton>
            </Top>
            <Bottom>
              <Info>
                {items.map((item,index) =>
                  <CartProduct idItem={item.id} itemTotal={item.itemTotal} id={item._id} img={`http://192.168.0.121:4000/${item.image}`} title={item.title} description={item.description} price={item.price} quantity={item.quantity} key={index} />
                
                )}
              </Info>
              <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>{cartTotal}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Estimasi Pengiriman</SummaryItemText>
                  <SummaryItemPrice>20</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>{cartTotal+20}</SummaryItemPrice>
                </SummaryItem>
                <Button style={{cursor:'pointer'}} onClick={onCheckout}>CHECKOUT NOW</Button>
              </Summary>
            </Bottom>
          </Wrapper>
        </Container>
    </div>
    <div className="footer-wrapper">
        <Footer />
    </div>
  </div>
  );
};

export default Cart;
