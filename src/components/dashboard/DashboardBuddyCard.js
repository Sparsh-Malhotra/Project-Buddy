import styled from "styled-components";
import Button from "../common/Button";
import { Avatar } from "@nextui-org/react";

const CardContainer = styled.div`
  padding: 1rem;
  border: 1px solid #d6ddeb;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const bgColor = (category) => {
  switch (category) {
    case "ui/ux":
      return "bg-[#EB8533]/10";

    case "frontend":
      return "bg-[#56CDAD]/10";

    case "backend":
      return "bg-[#4640DE]/10";
  }
};

const txtColor = (category) => {
  switch (category) {
    case "ui/ux":
      return "text-[#FFB836]";

    case "frontend":
      return "text-[#56CDAD]";

    case "backend":
      return "text-[#4640DE]";
  }
};

const DashboardBuddyCard = ({ buddy }) => {
  return (
    <CardContainer>
      <div className='flex items-center'>
        <Avatar text='John' size='xl' />
        <div className='ml-3 self-start'>
          <p className='text-base font-Epilogue font-semibold text-Primary-title'>
            {buddy?.firstName + " " + buddy?.lastName}
          </p>
          <p className='text-sm font-Epilogue text-Primary-subtitle'>
            {buddy?.state}
          </p>
          <div className='flex items-center mt-1'>
            <div
              className={`rounded-[80px] ${bgColor(
                buddy?.techStack
              )} ${txtColor(
                buddy?.techStack
              )} font-Epilogue font-semibold text-xs py-1 px-3`}
            >
              {buddy?.techStack.charAt(0).toUpperCase() +
                buddy?.techStack.substring(1)}
            </div>
          </div>
        </div>
      </div>
      <Button
        bgColor='#4640DE'
        className='py-2 px-5 font-Epilogue font-medium text-sm self-start'
      >
        Connect
      </Button>
    </CardContainer>
  );
};

export default DashboardBuddyCard;
