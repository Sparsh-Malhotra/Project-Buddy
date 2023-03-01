import styled from "styled-components";
import Image from "next/image";
import { Link } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import AsyncSelect from "react-select/async";

import { submitDetails } from "../../services/dashboard";
import { updateAppState } from "../../actions/index";
import ModalComponent from "../../components/common/modal";

import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import { getStates } from "../../services/common";
import { genderOptions, techStackOptions, skillsArray } from "../../constants";

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

const StyledSelect = styled(Select)`
  flex: 40%;
  border: 1px solid #d6ddeb;
  margin-bottom: 1.375rem;
  margin-right: 1.375rem;
  outline: none;
  &::placeholder {
    color: #a8adb7;
    font-family: "Epilogue", "sans-serif";
  }
`;

const StyledAsyncSelect = styled(AsyncSelect)`
  flex: 40%;
  border: 1px solid #d6ddeb;
  margin-bottom: 1.375rem;
  margin-right: 1.375rem;
  outline: none;
  &::placeholder {
    color: #a8adb7;
    font-family: "Epilogue", "sans-serif";
  }
`;

const Step1Content = ({ onChangeHandler }) => {
  const [statesOptions, setStateOptions] = useState(null);

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = () => {
    getStates()
      .then((res) => {
        const data = res.map((ele) => {
          return {
            label: ele.name,
            value: ele.name,
          };
        });
        setStateOptions(data);
      })
      .catch((err) => console.log(err));
  };

  const filterStates = (inputValue) => {
    if (!statesOptions) return;
    return statesOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  const loadStates = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterStates(inputValue));
      }, 1000);
    });

  return (
    <FormContainer>
      <div className='flex justify-evenly items-center flex-wrap mt-8'>
        <StyledInputBox
          id='firstName'
          type='text'
          placeholder='First Name*'
          onChange={(e) => onChangeHandler("firstName", e.target.value)}
        ></StyledInputBox>
        <StyledInputBox
          id='lastName'
          type='text'
          placeholder='Last Name*'
          onChange={(e) => onChangeHandler("lastName", e.target.value)}
        ></StyledInputBox>
        <StyledInputBox
          id='age'
          type='number'
          placeholder='Age*'
          onChange={(e) => onChangeHandler("age", e.target.value)}
        ></StyledInputBox>
        <StyledSelect
          id='gender'
          className='react-select'
          placeholder='Gender*'
          options={genderOptions}
          onChange={(e) => onChangeHandler("gender", e.value)}
        ></StyledSelect>
        <StyledInputBox
          id='university'
          type='text'
          placeholder='University*'
          onChange={(e) => onChangeHandler("university", e.target.value)}
        ></StyledInputBox>
        <StyledInputBox
          id='course'
          type='text'
          placeholder='Course*'
          onChange={(e) => onChangeHandler("course", e.target.value)}
        ></StyledInputBox>
        <StyledAsyncSelect
          id='state'
          placeholder='State*'
          loadOptions={loadStates}
          defaultOptions={statesOptions ? statesOptions : null}
          cacheOptions
          onChange={(e) => onChangeHandler("state", e.value)}
        ></StyledAsyncSelect>
      </div>
    </FormContainer>
  );
};

const Step2Content = ({ onChangeHandler }) => {
  return (
    <FormContainer>
      <div className='flex justify-evenly items-center flex-wrap mt-8'>
        <StyledSelect
          id='techStack'
          options={techStackOptions}
          className='react-select'
          placeholder='Preferred Tech Stack*'
          onChange={(e) => onChangeHandler("techStack", e.value)}
        ></StyledSelect>
        <StyledSelect
          id='skills'
          isMulti
          className='react-select'
          options={skillsArray}
          placeholder='Skills*'
          onChange={(e) => onChangeHandler("skills", e)}
        ></StyledSelect>
        <StyledInputBox
          id='linkedin'
          type='text'
          placeholder='LinkedIn Profile*'
          onChange={(e) => onChangeHandler("linkedin", e.target.value)}
        ></StyledInputBox>
        <StyledInputBox
          id='github'
          type='text'
          placeholder='GitHub Profile*'
          onChange={(e) => onChangeHandler("github", e.target.value)}
        ></StyledInputBox>
        <StyledInputBox
          id='twitter'
          type='text'
          placeholder='Twitter'
          onChange={(e) => onChangeHandler("twitter", e.target.value)}
        ></StyledInputBox>
        <StyledInputBox
          id='dribble'
          type='text'
          placeholder='Dribble'
          onChange={(e) => onChangeHandler("dribble", e.target.value)}
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
  const [skills, setSkills] = useState(null);
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [dribble, setDribble] = useState("");

  const [modalDetails, setModalDetails] = useState({
    showModal: false,
    text: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const onFormSubmit = async () => {
    const body = {
      firstName,
      lastName,
      age,
      gender,
      university,
      course,
      state,
      techStack,
      skills,
      linkedin,
      github,
    };
    const res = await submitDetails(body, user.authToken);
    if (res.message === "Success") {
      dispatch(updateAppState("LOGGED_IN"));
      const name = user.name.toLowerCase().replace(" ", "-");
      router.push(`/user/${name}`);
    }
  };

  const onChangeHandler = (type, payload) => {
    switch (type) {
      case "firstName":
        setFirstName(payload);
        break;
      case "lastName":
        setLastName(payload);
        break;
      case "age":
        setAge(payload);
        break;
      case "gender":
        setGender(payload);
        break;
      case "university":
        setUniversity(payload);
        break;
      case "course":
        setCourse(payload);
        break;
      case "state":
        setState(payload);
        break;
      case "techStack":
        setTechStack(payload);
        break;
      case "skills":
        setSkills(payload.map((ele) => ele.value));
        break;
      case "linkedin":
        setLinkedin(payload);
        // console.log(payload);
        break;
      case "github":
        setGithub(payload);
        break;
      case "twitter":
        setTwitter(payload);
        break;
      case "dribble":
        setDribble(payload);
        break;
    }
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
            onSubmit={onFormSubmit}
            steps={[
              {
                label: "Step 1",
                name: "step 1",
                content: (
                  <Step1Content
                    onChangeHandler={onChangeHandler}
                    // states={statesOptions}
                  />
                ),
              },
              {
                label: "Step 2",
                name: "step 2",
                content: <Step2Content onChangeHandler={onChangeHandler} />,
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
