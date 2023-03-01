import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import { Button as NextButton } from "@nextui-org/react";

const OuterContainer = styled(NextButton)`
  background-color: ${(props) =>
    props.bgColor ? `${props.bgColor}` : "white"};

  color: ${(props) => (props.color ? `${props.color}` : "white")};
  font-size: 1rem;
  text-align: center;
  border: ${(props) =>
    props.borderColor ? `1px solid ${props.borderColor}` : "none"};
  border-radius: 0;
`;

const Button = (props) => {
  return (
    <OuterContainer
      color={props.color}
      bgColor={props.bgColor}
      borderColor={props.borderColor}
      className={props.className}
      onClick={(e) => (props.onClick ? props.onClick() : e.stopPropagation())}
    >
      {props.loading ? (
        <ClipLoader
          color={"#ffffff"}
          loading={props.loading}
          size={24}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      ) : (
        props.children
      )}
    </OuterContainer>
  );
};

export default Button;
