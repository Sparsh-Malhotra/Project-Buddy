import styled from "styled-components";
import Image from "next/image";
import { Link } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { Checkbox } from "@nextui-org/react";
import Button from "../../components/common/Button";
import { loginUser } from "../../services/auth";
import { login, updateAppState } from "../../actions/index";
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

const StyledCheckbox = styled.div``;

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [modalDetails, setModalDetails] = useState({
    showModal: false,
    text: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const appState = useSelector((state) => state.app.appState);

  useEffect(() => {
    if (appState === "LOGGED_IN") {
      router.replace("/");
    } else if (appState === "ONE_LAST_STEP") {
      router.replace("/one-last-step");
    }
  }, [appState]);

  const toggleCheck = () => setIsChecked((prevState) => !prevState);

  const onLogin = () => {
    setIsLoading(true);
    loginUser(email, pass)
      .then((res) => {
        if (res.message === "error")
          setModalDetails({ showModal: true, text: res.errorDetails });
        else {
          dispatch(login(res.data.name, res.data.email, res.authToken));
          dispatch(updateAppState("LOGGED_IN"));
          router.push("/");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <OuterContainer>
      <LeftContainer>
        <div className='flex mt-6 justify-center items-center h-2/3'>
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
            Welcome Back
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
            <p className='ml-2.5 font-Epilogue font-bold'>Login with Google</p>
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
              Or login up with email
            </span>
            <div
              className='flex-grow border-t'
              style={{ borderColor: "#D6DDEB" }}
            ></div>
          </div>
          <FormContainer>
            <FormLabel htmlFor='email'>Email Address</FormLabel>
            <StyledInputBox
              id='email'
              type='email'
              placeholder='Enter email address'
              onChange={(e) => setEmail(e.target.value)}
            ></StyledInputBox>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <StyledInputBox
              id='password'
              type='password'
              placeholder='Enter password'
              onChange={(e) => setPass(e.target.value)}
            ></StyledInputBox>
          </FormContainer>
          <Checkbox size='sm'>Remember me</Checkbox>
          <Button
            bgColor='#4640DE'
            className='py-3 w-full flex justify-center items-center mb-6 font-Epilogue font-bold'
            onClick={() => onLogin()}
            loading={isLoading}
          >
            Continue
          </Button>
          <div className='flex text-[#202430] font-Epilogue'>
            Dont have an account?{" "}
            <Link href='/signup'>
              <span className='text-Primary ml-2 font-semibold'>Sign Up</span>
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

export default Login;
