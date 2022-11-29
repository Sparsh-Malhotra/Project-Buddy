import styled from "styled-components";
import Image from "next/image";
import { Link } from "@nextui-org/react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../components/common/Button";
import { registerUser } from "../../services/auth";
import { login } from "../../actions/index";
import ModalComponent from "../../components/common/modal";

const OuterContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const LeftContainer = styled.div`
  background: url("static/images/signup/bg.svg");
  background-color: #f8f8fd;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  width: 44vw;
  text-align: center;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 56vw;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  margin-bottom: 4px;
  font-size: 1rem;
  color: #515b6f;
  font-family: "Epilogue", "sans-serif";
  font-weight: 600;
`;

const StyledInputBox = styled.input`
  border: 1px solid #d6ddeb;
  padding: 0.75rem 1rem;
  margin-bottom: 1.375rem;
  &::placeholder {
    color: #a8adb7;
    font-family: "Epilogue", "sans-serif";
  }
`;

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [modalDetails, setModalDetails] = useState({
    showModal: false,
    text: "",
  });

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onSignUp = () => {
    registerUser(name, email, pass)
      .then((res) => {
        if (res.message === "error")
          setModalDetails({ showModal: true, text: res.errorDetails });
        else dispatch(login(res.name, res.email));
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <OuterContainer>
      <LeftContainer>
        <div className='flex mt-6 justify-center'>
          <Image
            src='/static/images/common/logo.svg'
            alt='logo'
            width={32}
            height={32}
          ></Image>
          <div className='text-Primary-title text-title font-RedHatDisplay font-bold leading-normal items-center ml-2'>
            ProjectBuddy
          </div>
        </div>
      </LeftContainer>
      <RightContainer>
        <div className='w-1/2 m-auto'>
          <div className='text-Primary-title font-ClashDisplay text-3xl font-semibold text-center mb-6'>
            Find your Project Partner
          </div>
          <Button
            color='#4640DE'
            borderColor='#CCCCF5'
            className='py-3 w-full flex justify-center items-center mb-6'
          >
            <Image
              src='/static/images/signup/google.svg'
              alt='google'
              width={20}
              height={20}
            ></Image>
            <p className='ml-2.5 font-Epilogue font-bold'>
              Sign up with Google
            </p>
          </Button>
          <div className='relative flex items-center mb-6'>
            <div
              className='flex-grow border-t'
              style={{ borderColor: "#D6DDEB" }}
            ></div>
            <span
              className='flex-shrink mx-4 font-Epilogue'
              style={{ color: "#202430" }}
            >
              Or sign up with email
            </span>
            <div
              className='flex-grow border-t'
              style={{ borderColor: "#D6DDEB" }}
            ></div>
          </div>
          <FormContainer>
            <FormLabel>Full Name</FormLabel>
            <StyledInputBox
              type='text'
              placeholder='Enter your full name'
              onChange={(e) => setName(e.target.value)}
            ></StyledInputBox>
            <FormLabel>Email Address</FormLabel>
            <StyledInputBox
              type='email'
              placeholder='Enter email address'
              onChange={(e) => setEmail(e.target.value)}
            ></StyledInputBox>
            <FormLabel>Password</FormLabel>
            <StyledInputBox
              type='password'
              placeholder='Enter password'
              onChange={(e) => setPass(e.target.value)}
            ></StyledInputBox>
          </FormContainer>
          <Button
            bgColor='#4640DE'
            className='py-3 w-full flex justify-center items-center mb-6 font-Epilogue font-bold'
            onClick={() => onSignUp()}
          >
            Continue
          </Button>
          <div className='flex text-[#202430] font-Epilogue'>
            Already have an account?{" "}
            <Link href='/login'>
              <span className='text-Primary ml-2 font-semibold'>Login</span>
            </Link>
          </div>
        </div>
      </RightContainer>
      {modalDetails.showModal && (
        <ModalComponent
          text={modalDetails.text}
          onClose={() => setModalDetails({ showModal: false, text: "" })}
        />
      )}
    </OuterContainer>
  );
};

export default Signup;
