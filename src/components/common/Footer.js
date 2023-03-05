import Image from "next/image";
import styled from "styled-components";
import { Link } from "@nextui-org/react";

const FooterContainer = styled.div`
  background-color: #202430;
  margin-top: 72px;
`;

const FooterLink = styled(Link)`
  color: #d6ddeb;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div className='w-[80%] m-auto flex justify-between pt-16 pb-4 border-b border-solid border-[#FFFFFF]'>
        <div className='flex-1'>
          <div className='flex'>
            <Image
              src='/static/images/common/logo.svg'
              alt='logo'
              width={32}
              height={32}
            />
            <p className='ml-2 font-RedHatDisplay font-bold text-2xl text-[#FFFFFF]'>
              ProjectBuddy
            </p>
          </div>
          <p className='font-Epilogue text-[#D6DDEB] text-base mt-8'>
            Great platform for students and working <br /> professionals to pair
            up for a project.
          </p>
        </div>
        <div className='flex-[0.2]'>
          <p className='text-[#FFFFFF] font-Epilogue font-semibold text-lg'>
            Important Links
          </p>
          <ul>
            <li>
              <FooterLink href='/signup' className='text-[#D6DDEB]'>
                Sign Up
              </FooterLink>
            </li>
            <li>
              <FooterLink href='/login'>Login</FooterLink>
            </li>
            <li>
              <FooterLink href='/'>Featured Buddies</FooterLink>
            </li>
          </ul>
        </div>
      </div>
      <div className='text-center font-Epilogue font-medium text-[#FFFFFF] mt-10 pb-10'>
        Made with ❤
      </div>
    </FooterContainer>
  );
};

export default Footer;
