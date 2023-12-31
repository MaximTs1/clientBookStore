import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ConfirmationModal = ({
  isOpen,
  itemDetails,
  onContinueShopping,
  onAddToCartAndGoToCart,
}) => {
  if (!isOpen) return null;

  const { id, image, name, category, price } = itemDetails;

  const handleAddToCart = () => {
    onAddToCartAndGoToCart(id, 1, {
      customId: id,
      image,
      name,
      category,
      price,
    });
  };

  const handleContinueShopping = () => {
    onContinueShopping(id, 1, {
      customId: id,
      image,
      name,
      category,
      price,
    });
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <p>Item added to cart. What would you like to do next?</p>
        <ButtonGroup>
          <StyledButton onClick={handleContinueShopping}>
            Continue Shopping
          </StyledButton>
          <StyledButton primary onClick={handleAddToCart}>
            Go to Cart
          </StyledButton>
        </ButtonGroup>
      </ModalContent>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const StyledButton = styled.button`
  background: ${({ primary }) => (primary ? "orange" : "#4CAF50")};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ${({ primary }) => (primary ? "grey" : "grey")};
  }
`;

export default ConfirmationModal;
