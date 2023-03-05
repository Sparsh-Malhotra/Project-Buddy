import Image from "next/image";
import styled from "styled-components";

import { BsArrowRight } from "react-icons/bs";

const CardContainer = styled.div`
  border: 1px solid #d6ddeb;
  margin: 3rem 2rem 0 0;
  padding: 1rem 1.55rem;
  flex: 5 0 auto;
  cursor: pointer;
  &:hover {
    background-color: #4640de;
    .home-svg {
      filter: brightness(0) invert(1);
    }
  }
`;

const CategoryCard = (props) => {
  const { id, name, count, onClick } = props;
  return (
    <CardContainer className='group' onClick={onClick}>
      <img
        src={`/static/images/common/categories/${id}.svg`}
        alt='category-img'
        className='home-svg'
      />
      <p className='text-title text-Primary-title group-hover:text-[#FFFFFF] font-Epilogue font-semibold mt-4 mb-2'>
        {name}
      </p>
      <div className='flex justify-between items-baseline'>
        <p className='text-lg text-Primary-subtitle group-hover:text-[#FFFFFF] font-Epilogue'>
          {count} buddies available
        </p>
        <BsArrowRight className='home-svg' />
      </div>
    </CardContainer>
  );
};

export default CategoryCard;
