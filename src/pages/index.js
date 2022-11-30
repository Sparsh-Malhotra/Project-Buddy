import Head from "next/head";
import Image from "next/image";
import fs from "fs/promises";
import path from "path";
import { Link } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../actions/index";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";

import Button from "../components/common/Button";
import CategoryCard from "../components/home/CategoryCard";
import FeaturedBuddiesCard from "../components/home/FeaturedBuddiesCard";
import Footer from "../components/common/Footer";

import styles from "../styles/Home.module.css";

const OuterContainer = styled.div``;

const Header = styled.div`
  background-color: #f8f8fd;
  height: 100vh;
`;

const NavContainer = styled.nav`
  width: 80%;
  margin: auto;
  margin-bottom: 0.5rem;
`;

const Seperator = styled.div`
  border-left: 1px solid #d6ddeb;
  height: 2rem;
`;

const HeaderBody = styled.main`
  display: flex;
  width: 80%;
  margin: auto;
  margin-bottom: 0.5rem;
`;

const HeaderLeft = styled.div`
  padding-top: 5rem;
`;

const SearchContainer = styled.div`
  background-color: white;
  padding: 0.75rem 1rem 0.75rem 2rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: left;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const StyledInputContainer = styled.input`
  margin-left: 1rem;
  border-bottom: 1px solid #d6ddeb;
  width: 28rem;
  ::placeholder {
    font-family: "Epilogue", "sans-serif";
    font-size: 0.875rem;
    color: "#7C8493";
  }
`;

const HeaderRight = styled.div``;

const BodyContainer = styled.div`
  width: 80%;
  margin: auto;
  margin-bottom: 0.5rem;
  margin-top: 2.5rem;
`;

const Home = (props) => {
  const { categories } = props;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <OuterContainer>
      <Header>
        <NavContainer>
          <div className='flex justify-between items-center'>
            <div className='flex flex-[3.5] pt-[1.3rem]'>
              <Image
                src='/static/images/common/logo.svg'
                alt='logo'
                width={32}
                height={32}
              ></Image>
              <p className='ml-2 font-RedHatDisplay text-title'>ProjectBuddy</p>
            </div>
            <div className='flex items-center justify-between flex-1 pt-[0.875rem]'>
              {user.authToken && user.authToken.length > 0 ? (
                <>
                  <p className='font-Epilogue font-bold py-2 px-6 w-full'>
                    Hello {user.name}
                  </p>
                  <Button
                    bgColor='#4640DE'
                    className='font-Epilogue font-bold py-2 px-6'
                    onClick={() => {
                      dispatch(logout());
                    //   console.log(user);
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href='/login'>
                    <Button
                      bgColor='#F8F8FD'
                      color='#4640DE'
                      className='font-Epilogue font-bold py-2 px-6'
                    >
                      Login
                    </Button>
                  </Link>
                  <Seperator className='mx-4 my-4 ml-0'></Seperator>
                  <Link href='/signup'>
                    <Button
                      bgColor='#4640DE'
                      className='font-Epilogue font-bold py-2 px-6'
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </NavContainer>
        <HeaderBody>
          <HeaderLeft>
            <p className='font-ClashDisplay font-semibold text-6xl text-Primary-title'>
              Looking for a <br />
              <span className='text-Primary-highlight'>
                Project <br />
                Partner ?
              </span>
            </p>
            <Image
              src='/static/images/home/title-underline.svg'
              alt='underline'
              width={455}
              height={40}
              style={{ marginTop: "0.7rem" }}
            />
            <p className='text-lg text-[#515B6F] font-Epilogue tracking-wide mt-4'>
              Great platform for students and working
              <br /> professionals to pair up for a project.
            </p>
            <SearchContainer>
              <FiSearch
                style={{
                  color: "#25324B",
                  width: "1.2rem",
                  height: "1.2rem",
                  marginBottom: "5px",
                }}
              />
              <StyledInputContainer
                type='text'
                placeholder='Role / Tech Stack'
                className='pb-2'
              />
              <Button
                bgColor='#4640DE'
                className='py-2 px-12 ml-4 mb-1 text-lg font-Epilogue font-semibold'
              >
                Search
              </Button>
            </SearchContainer>
            <p className='text-base text-Primary-subtitle2 font-Epilogue font-medium tracking-normal'>
              <span className='font-normal'>Popular</span> : UI Designer, UX
              Researcher, Android, Admin
            </p>
          </HeaderLeft>
          <HeaderRight>
            {/* <div className="relative z-[2]">
              <Image
                src='/static/images/home/header-image.png'
                alt='temp-image'
                width={501}
                height={707}
              />
            </div> */}
            <img
              src='/static/images/home/header-patterns.svg'
              alt='pattern'
              className='w-[800px] h-[545px]'
              style={{ position: "absolute", top: "50px", right: "0" }}
            />
          </HeaderRight>
        </HeaderBody>
      </Header>
      <BodyContainer>
        <div className='flex justify-between items-center'>
          <p className='text-5xl text-Primary-title font-ClashDisplay font-semibold'>
            Explore by <span className='text-Primary-highlight'>category</span>
          </p>
          <div className='flex justify-center items-center text-center text-Primary text-base font-Epilogue font-semibold cursor-pointer'>
            <span className='mr-4'>Show all categories</span>
            <BsArrowRight style={{ width: "1.5rem", height: "1.5rem" }} />
          </div>
        </div>
        <div className='flex justify-evenly items-center flex-wrap'>
          {props.categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              count={category.count}
            />
          ))}
        </div>
        <div className='flex justify-between items-center pt-[38px]'>
          <p className='text-5xl text-Primary-title font-ClashDisplay font-semibold'>
            Featured <span className='text-Primary-highlight'>buddies</span>
          </p>
          <div className='flex justify-center items-center text-center text-Primary text-base font-Epilogue font-semibold cursor-pointer'>
            <span className='mr-4'>Show all buddies</span>
            <BsArrowRight style={{ width: "1.5rem", height: "1.5rem" }} />
          </div>
        </div>
        <div className='flex justify-evenly items-center flex-wrap'>
          {props.featuredBuddies.map((buddy) => (
            <FeaturedBuddiesCard
              key={buddy.id}
              id={buddy.id}
              name={buddy.name}
              designation={buddy.designation}
              location={buddy.location}
              about={buddy.about}
              categories={buddy.selectedCategories}
            />
          ))}
        </div>
      </BodyContainer>
      <Footer />
    </OuterContainer>
  );
};

export async function getStaticProps() {
  const filePath = path.join(
    process.cwd(),
    "src",
    "dummy-data",
    "categories.json"
  );
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const filePath2 = path.join(
    process.cwd(),
    "src",
    "dummy-data",
    "featured-buddies.json"
  );
  const jsonData2 = await fs.readFile(filePath2);
  const data2 = JSON.parse(jsonData2);

  return {
    props: {
      categories: data.categories,
      featuredBuddies: data2.featuredBuddies,
    },
  };
}

export default Home;