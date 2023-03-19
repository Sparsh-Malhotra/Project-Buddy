import styled from "styled-components";
import Select from "react-select";
import { Modal } from "@nextui-org/react";
import { skillsArray } from "../../constants";
import Button from "../common/Button";
import { useState } from "react";

const Label = styled.p`
  font-family: "Epilogue", "sans-serif";
  font-size: 1rem;
  font-weight: 500;
  color: #25324b;
  margin-bottom: 0.5rem !important;
`;

const StyledSelect = styled(Select)`
  border: 1px solid #d6ddeb;
  outline: none;
`;

const StyledInputBox = styled.input`
  border: 1px solid #d6ddeb;
  padding: 0.75rem 1rem;
  margin-bottom: 1.375rem;
  margin-right: 1.375rem;
  &::placeholder {
    color: #a8adb7;
    font-family: "Epilogue", "sans-serif";
  }
`;

const EditDetailsModal = ({ showModal, onCloseModal, modalKey, onConfirm }) => {
  const [updatedValue, setUpdatedValue] = useState({});

  const renderModalBody = (key) => {
    switch (key) {
      case "profile":
        return (
          <>
            <Label>Are you a Student or Professional ?</Label>
            <StyledSelect
              id="category"
              className="react-select"
              options={[
                { label: "Student", value: "student" },
                { label: "Professional", value: "professional" },
              ]}
              styles={{
                container: (baseStyles, state) => ({
                  ...baseStyles,
                }),
                placeholder: (baseStyles, state) => ({
                  ...baseStyles,
                  color: "#a8adb7",
                  fontFamily: '"Epilogue", "sans-serif"',
                }),
              }}
              onChange={(e) => setUpdatedValue({ category: e.value })}
            ></StyledSelect>
          </>
        );
      case "about":
        return (
          <>
            <Label>Tell us something about yourself ?</Label>
            <textarea
              rows={3}
              className="w-full border border-[#e3e3e3] px-4 py-2"
              onChange={(e) => setUpdatedValue({ about: e.target.value })}
            ></textarea>
          </>
        );
      case "skills":
        return (
          <>
            <Label>List your skills</Label>
            <StyledSelect
              isMulti
              className="react-select"
              options={skillsArray}
              placeholder="Skills*"
              onChange={(e) => setUpdatedValue({ skills: e})}
              styles={{
                placeholder: (baseStyles, state) => ({
                  ...baseStyles,
                  color: "#a8adb7",
                  fontFamily: '"Epilogue", "sans-serif"',
                }),
              }}
            ></StyledSelect>
          </>
        );
      case "additional-details":
        return (
          <>
            <Label>Enter your college/university name</Label>
            <StyledInputBox
              id="university"
              type="text"
              placeholder="University*"
              onChange={(e) => setUpdatedValue({ universty: e.target.value })}
            ></StyledInputBox>
          </>
        );
      case "social":
        return (
          <>
            <StyledInputBox
              id="linkedin"
              type="text"
              placeholder="LinkedIn Profile*"
              onChange={(e) =>
                setUpdatedValue((prev) => ({
                  ...prev,
                  linkedin: e.target.value,
                }))
              }
            ></StyledInputBox>
            <StyledInputBox
              id="github"
              type="text"
              placeholder="GitHub Profile*"
              onChange={(e) =>
                setUpdatedValue((prev) => ({
                  ...prev,
                  github: e.target.value,
                }))
              }
            ></StyledInputBox>
            <StyledInputBox
              id="twitter"
              type="text"
              placeholder="Twitter"
              onChange={(e) =>
                setUpdatedValue((prev) => ({
                  ...prev,
                  twitter: e.target.value,
                }))
              }
            ></StyledInputBox>
            <StyledInputBox
              id="dribble"
              type="text"
              placeholder="Dribble"
              onChange={(e) =>
                setUpdatedValue((prev) => ({
                  ...prev,
                  dribble: e.target.value,
                }))
              }
            ></StyledInputBox>
          </>
        );
    }
  };

  return (
    <Modal
      closeButton
      open={showModal}
      onClose={onCloseModal}
      aria-labelledby="modal-title"
      width={450}
      css={{ minHeight: "60vh" }}
    >
      <Modal.Header
        justify="flex-start"
        css={{ borderBottom: "1px solid #e3e3e3", paddingTop: 0 }}
      >
        <p className="text-Primary-title font-Epilogue font-semibold text-xl">
          Edit Details
        </p>
      </Modal.Header>
      <Modal.Body>{renderModalBody(modalKey)}</Modal.Body>
      <Modal.Footer justify="space-between">
        <Button
          color="#FF6550"
          borderColor="#CCCCF5"
          className="px-6 py-2"
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          bgColor="#4640DE"
          className="font-Epilogue font-bold py-2 px-6"
          onClick={() => {
            onConfirm(updatedValue);
            onCloseModal();
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditDetailsModal;
