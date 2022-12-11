import React from "react";
import styled from "styled-components";
import { FaCircleNotch } from "react-icons/fa";
import Image from "next/image";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  height: 100%;
  width: 100%;
  background: #ffffff;
  border-radius: 12px 12px 0 0;
`;

const LoadingIcon = styled(FaCircleNotch)`
  font-size: 2rem;
  color: ${(props) => (props.color ? props.color : "black")};
`;

const LoadingComponent = ({ color, borderRadius }) => (
  <LoadingContainer style={{ borderRadius }}>
    <Image src='/static/images/common/loader.svg' width='48' height='48' />
  </LoadingContainer>
);

export default LoadingComponent;
