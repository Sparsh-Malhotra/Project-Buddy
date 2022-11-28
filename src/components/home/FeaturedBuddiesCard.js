import Image from "next/image";
import styled from "styled-components";

const CardContainer = styled.div`
  border: 1px solid #d6ddeb;
  margin: 3rem 2rem 0 0;
  padding: 1rem 0rem 1rem 1.55rem;
  flex: 5 0 auto;
  cursor: pointer;
`;

const CategoryContainer = styled.div`
  padding: 0.25rem 1rem;
`;

const bgColor = (category) => {
  switch (category) {
    case "UI/UX":
      return "bg-[#EB8533]/10";

    case "Frontend":
      return "bg-[#56CDAD]/10";
  }
};

const txtColor = (category) => {
  switch (category) {
    case "UI/UX":
      return "text-[#FFB836]";

    case "Frontend":
      return "text-[#56CDAD]";
  }
};

const FeaturedBuddiesCard = (props) => {
  const { id, name, designation, location, about, categories } = props;
  return (
    <CardContainer>
      <div className="flex justify-center mb-4">
        <Image
          src='https://i.pravatar.cc/48?img=68'
          alt='avatar'
          width={48}
          height={48}
          style={{ textAlign: "center" }}
        />
      </div>
      <div className='font-Epilogue font-semibold text-lg text-Primary-title'>
        {name}
      </div>
      <div className='flex justify-start items-center font-Epilogue text-Primary-subtitle text-xs'>
        <div>{designation}</div>
        <div className='h-1 w-1 bg-[#515B6F] rounded-[50%] mx-2'></div>
        <div>{location}</div>
      </div>
      <div className='mt-4 font-Inter text-Primary-subtitle'>
        {about.substring(0, 24) + "........."}
      </div>
      <div className='mt-4 flex'>
        {categories.map((category) => {
          const classes = `rounded-[80px] ${bgColor(category)} ${txtColor(
            category
          )} mr-2 font-Epilogue font-semibold text-sm`;
          return (
            <CategoryContainer key={category} className={classes}>
              {category}
            </CategoryContainer>
          );
        })}
      </div>
    </CardContainer>
  );
};

export default FeaturedBuddiesCard;
