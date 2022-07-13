import styled from "styled-components";

const OuterContainer = styled.button`
  background-color: ${(props) =>
    props.bgColor ? `${props.bgColor}` : "white"};

  color: ${(props) => (props.color ? `${props.color}` : "white")};
  font-size: 1rem;
  text-align: center;
  border: ${(props) =>
    props.borderColor ? `1px solid ${props.borderColor}` : "none"};
`;

const Button = (props) => {
  return (
    <OuterContainer
      color={props.color}
      bgColor={props.bgColor}
      borderColor={props.borderColor}
      className={props.className}
    >
      {props.children}
    </OuterContainer>
  );
};

export default Button;
