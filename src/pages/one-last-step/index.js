import styled from "styled-components";
import Image from "next/image";
import { Link } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { Checkbox } from "@nextui-org/react";
import Button from "../../components/common/Button";
import { loginUser } from "../../services/auth";
import { login } from "../../actions/index";
import ModalComponent from "../../components/common/modal";

import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";

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
  width: 20vw;
  text-align: center;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vw;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInputBox = styled.input`
  // width: 30vw;
  flex: 40%;
  border: 1px solid #d6ddeb;
  padding: 0.75rem 1rem;
  margin-bottom: 1.375rem;
  margin-right: 1.375rem;
  &::placeholder {
    color: #a8adb7;
    font-family: "Epilogue", "sans-serif";
  }
`;

const StyledCheckbox = styled.div``;

const step1Content = (
  setFirstName,
  setLastName,
  setAge,
  setGender,
  setUniversity,
  setCourse,
  setState
) => {
  return (
    <FormContainer>
      <div className='flex justify-evenly items-center flex-wrap mt-8'>
        <StyledInputBox
          id='firstName'
          type='text'
          placeholder='First Name*'
          onChange={(e) => setFirstName(e.target.value)}
        ></StyledInputBox>
        <StyledInputBox
          id='lastName'
          type='text'
          placeholder='Last Name*'
          onChange={(e) => setLastName(e.target.value)}
        ></StyledInputBox>
        <StyledInputBox
          id='age'
          type='number'
          placeholder='Age*'
          onChange={(e) => setAge(e.target.value)}
        ></StyledInputBox>
        <StyledInputBox
          id='gender'
          type='text'
          placeholder='Gender*'
          onChange={(e) => setGender(e.target.value)}
        ></StyledInputBox>
        <StyledInputBox
          id='university'
          type='text'
          placeholder='University*'
          onChange={(e) => setUniversity(e.target.value)}
        ></StyledInputBox>
        <StyledInputBox
          id='course'
          type='text'
          placeholder='Course*'
          onChange={(e) => setCourse(e.target.value)}
        ></StyledInputBox>
        <StyledInputBox
          id='state'
          type='text'
          placeholder='State*'
          onChange={(e) => setState(e.target.value)}
        ></StyledInputBox>
      </div>
    </FormContainer>
  );
};

const step2Content = (
  setTechStack,
  setSkills,
  setLinkedIn,
  setTwitter,
  setGithub,
  setDribble
) => {
  return (
    <FormContainer>
      <div className='flex justify-evenly items-center flex-wrap mt-8'>
        <StyledInputBox
          id='techStack'
          type='text'
          placeholder='Preferred Tech Stack*'
          onChange={(e) => setTechStack(e.target.value)}
        ></StyledInputBox>
        <StyledInputBox
          id='skills'
          type='text'
          placeholder='Skills*'
          onChange={(e) => setSkills(e.target.value)}
        ></StyledInputBox>
        <StyledInputBox
          id='linkedin'
          type='text'
          placeholder='LinkedIn Profile*'
          onChange={(e) => setLinkedIn(e.target.value)}
        ></StyledInputBox>
        <StyledInputBox
          id='github'
          type='text'
          placeholder='GitHub Profile*'
          onChange={(e) => setGithub(e.target.value)}
        ></StyledInputBox>
        <StyledInputBox
          id='twitter'
          type='text'
          placeholder='Twitter'
          onChange={(e) => setTwitter(e.target.value)}
        ></StyledInputBox>
        <StyledInputBox
          id='dribble'
          type='text'
          placeholder='Dribble'
          onChange={(e) => setDribble(e.target.value)}
        ></StyledInputBox>
      </div>
    </FormContainer>
  );
};

const OneLastStep = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [state, setState] = useState("");
  const [techStack, setTechStack] = useState("");
  const [skills, setSkills] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [dribble, setDribble] = useState("");

  const [modalDetails, setModalDetails] = useState({
    showModal: false,
    text: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const toggleCheck = () => setIsChecked((prevState) => !prevState);

  const onLogin = () => {
    setIsLoading(true);
    loginUser(email, pass)
      .then((res) => {
        if (res.message === "error")
          setModalDetails({ showModal: true, text: res.errorDetails });
        else {
          dispatch(login(res.data.name, res.data.email, res.authToken));
          router.push("/");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <OuterContainer>
      <LeftContainer>
        <div className='flex mt-6 justify-center items-center h-2/3'></div>
      </LeftContainer>
      <RightContainer>
        <div className='w-4/5 m-auto'>
          <p className='text-5xl text-Primary-title font-ClashDisplay font-semibold text-center'>
            One Last Step
          </p>

          <StepProgressBar
            stepClass='step'
            startingStep={0}
            // onSubmit={onFormSubmit}
            steps={[
              {
                label: "Step 1",
                name: "step 1",
                content: step1Content(
                  setFirstName,
                  setLastName,
                  setAge,
                  setGender,
                  setUniversity,
                  setCourse,
                  setState
                ),
              },
              {
                label: "Step 2",
                name: "step 2",
                content: step2Content(
                  setTechStack,
                  setSkills,
                  setLinkedIn,
                  setTwitter,
                  setGithub,
                  setDribble
                ),
              },
            ]}
          />
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

export default OneLastStep;
