import styled from "styled-components";
import Image from "next/image";
import Button from "../../components/common/Button";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout, updateAppState } from "../../actions";
import { fetchDetails } from "../../services/dashboard";
import GitHubCalendar from "react-github-calendar";
import LoadingComponent from "../../components/common/LoadingComponent";

const OuterContainer = styled.div`
  display: flex;
`;

const SideBarContainer = styled.div`
  width: 17vw;
  background-color: #f8f8fd;
  display: flex;
  flex-direction: column;
`;

const MainContainer = styled.div`
  width: 83vw;
`;

const LeftPane = styled.div`
  width: 65%;
`;

const RightPane = styled.div`
  margin-left: 16px;
  width: 35%;
`;

const BoxContainer = styled.div`
  border: 1px solid #d6ddeb;
  margin-bottom: 1.5rem;
`;

const skills = [
  "Communication",
  "Analytics",
  "Facebook Ads",
  "Content Planning",
  "Community Manager",
];

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (userDetails) setLoading(false);
  }, [userDetails]);

  const fetchUserDetails = async () => {
    setLoading(true);
    const res = await fetchDetails(user.authToken);
    setUserDetails(res.data);
  };

  const renderSkills = (skill) => {
    return (
      <div className='bg-BgColor px-2 py-1 mr-1 mb-3'>
        <p className='font-Epilogue text-base text-Primary '>{skill}</p>
      </div>
    );
  };

  const renderSocials = ([key, val]) => {
    switch (key) {
      case "github":
        return (
          <div className='flex items-center mt-3'>
            <Image
              src='/static/images/common/social/github.svg'
              width='24'
              height='24'
              className='self-start'
            />
            <div className='ml-2'>
              <p className='font-Epilogue text-base text-Primary-subtitle'>
                Github
              </p>
              <a href={val}>
                <p className='font-Epilogue text-base text-Primary'>{val}</p>
              </a>
            </div>
          </div>
        );
      case "twitter":
        return (
          <div className='flex items-center mt-3'>
            <Image
              src='/static/images/common/social/twitter.svg'
              width='24'
              height='24'
              className='self-start'
            />
            <div className='ml-2'>
              <p className='font-Epilogue text-base text-Primary-subtitle'>
                Twitter
              </p>
              <a href={val}>
                <p className='font-Epilogue text-base text-Primary'>{val}</p>
              </a>
            </div>
          </div>
        );
      case "linkedin":
        return (
          <div className='flex items-center mt-3'>
            <Image
              src='/static/images/common/social/linkedin.svg'
              width='24'
              height='24'
              className='self-start'
            />
            <div className='ml-2'>
              <p className='font-Epilogue text-base text-Primary-subtitle'>
                LinkedIn
              </p>
              <a href={val}>
                <p className='font-Epilogue text-base text-Primary'>{val}</p>
              </a>
            </div>
          </div>
        );
      case "dribble":
        return (
          <div className='flex items-center mt-3'>
            <Image
              src='/static/images/common/social/dribble.svg'
              width='24'
              height='24'
              className='self-start'
            />
            <div className='ml-2'>
              <p className='font-Epilogue text-base text-Primary-subtitle'>
                Dribble
              </p>
              <a href={val}>
                <p className='font-Epilogue text-base text-Primary'>{val}</p>
              </a>
            </div>
          </div>
        );
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(updateAppState("LOGGED_OUT"));
    router.push("/");
  };

  return (
    <OuterContainer>
      <SideBarContainer>
        <div className='pb-10 border-b border-[#CCCCF5]'>
          <div className='flex items-center mb-8 mt-4 pl-4'>
            <Image
              src='/static/images/common/logo.svg'
              width='32'
              height='32'
            />
            <p className='font-RedHatDisplay text-2xl text-Primary-subtitle2 ml-4 font-bold'>
              Project Buddy
            </p>
          </div>
          <div>
            <div
              className='flex items-center ml-8 mb-2 cursor-pointer'
              onClick={() => router.push("/browse-buddies")}
            >
              <Image
                src='/static/images/dashboard/sidebar/buddies.svg'
                width='24'
                height='24'
              />
              <p className='font-Inter text-base font-medium text-Primary-subtitle ml-2'>
                Browse Buddies
              </p>
            </div>
            <div className='flex '>
              <div className='w-1 h-8 bg-Primary'></div>
              <div className='flex justify-center items-center ml-4 bg-[#E9EBFD] px-3 cursor-pointer'>
                <Image
                  src='/static/images/dashboard/sidebar/user-profile.svg'
                  width='24'
                  height='24'
                />
                <p className='font-Inter text-base font-medium text-Primary-subtitle ml-2'>
                  My Public Profile
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='pt-10 ml-8'>
          <p className='text-Primary-subtitle2 font-Inter font-semibold text-sm uppercase mb-8'>
            Settings
          </p>
          <div className='flex mb-2 cursor-pointer'>
            <Image
              src='/static/images/dashboard/sidebar/settings.svg'
              width='24'
              height='24'
            />
            <p className='text-Primary-subtitle text-base font-medium font-Inter ml-2'>
              Settings
            </p>
          </div>
          <div className='flex cursor-pointer'>
            <Image
              src='/static/images/dashboard/sidebar/help-center.svg'
              width='24'
              height='24'
            />
            <p className='text-Primary-subtitle text-base font-medium font-Inter ml-2'>
              Help Center
            </p>
          </div>
        </div>
        <Button
          color='#FF6550'
          borderColor='#CCCCF5'
          className='flex px-4 py-2 mt-8 mx-2'
          onClick={() => logoutHandler()}
        >
          <Image
            src='/static/images/dashboard/sidebar/logout.svg'
            width='24'
            height='24'
          />
          <p className='font-Epilogue text-base font-medium ml-2'>Logout</p>
        </Button>
      </SideBarContainer>
      {loading ? (
        <div className='w-screen h-screen'>
          <LoadingComponent />
        </div>
      ) : (
        userDetails && (
          <>
            <MainContainer>
              {/* <div className='flex items-center justify-between p-4 border-b border-boxCard'>
                <p className='text-Primary-title text-3xl font-ClashDisplay font-semibold'>
                  My Profile
                </p>
                <Button
                  color='#FF6550'
                  borderColor='#CCCCF5'
                  className='flex px-4 py-2'
                >
                  <Image
                    src='/static/images/dashboard/sidebar/logout.svg'
                    width='24'
                    height='24'
                  />
                  <p className='font-Epilogue text-base font-medium ml-2'>
                    Logout
                  </p>
                </Button>
              </div> */}
              <div className='p-2 flex'>
                <LeftPane>
                  <BoxContainer>
                    <div
                      style={{
                        background:
                          "url('/static/images/dashboard/profile-header.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                        height: "120px",
                        textAlign: "right",
                        paddingTop: "8px",
                        paddingRight: "8px",
                      }}
                    >
                      <Image
                        src='/static/images/common/edit.svg'
                        width='36'
                        height='36'
                        className='ml-auto'
                      />
                    </div>
                    <div className='flex items-center px-5'>
                      <div className='overflow-hidden rounded-[50%] relative bottom-12'>
                        <img
                          src={userDetails.avatar_url}
                          width='140'
                          height='140'
                          className='border-[6px] rounded-[50%] border-[white]'
                        />
                      </div>
                      <div className='flex justify-between w-full'>
                        <div className='ml-10'>
                          <p className='font-ClashDisplay text-2xl text-Primary-subtitle2 font-semibold'>
                            {user.name}
                          </p>
                          <p className='font-Epilogue text-lg text-Primary-subtitle'>
                            Student
                          </p>
                          <div className='flex items-center'>
                            <Image
                              src='/static/images/common/location.svg'
                              width='20'
                              height='20'
                            />
                            <p className='font-Epilogue text-lg text-Primary-subtitle ml-1'>
                              {userDetails.state}
                            </p>
                          </div>
                        </div>
                        <Button
                          color='#4640DE'
                          borderColor='#CCCCF5'
                          className='px-3 py-2 font-Epilogue font-bold text-base self-start mt-2'
                        >
                          Edit Profile
                        </Button>
                      </div>
                    </div>
                  </BoxContainer>
                  <BoxContainer className='p-4'>
                    <div className='flex justify-between items-center'>
                      <p className='font-Epilogue font-semibold text-xl text-Primary-subtitle2'>
                        About me
                      </p>
                      <Image
                        src='/static/images/common/edit-primary.svg'
                        width='32'
                        height='32'
                      />
                    </div>
                    <p className='font-Epilogue text-base text-[#515B6F] mt-5'>
                      I’m a product designer + filmmaker currently working
                      remotely at Twitter from beautiful Manchester, United
                      Kingdom. I’m passionate about designing digital products
                      that have a positive impact on the world.
                      <br />
                      For 10 years, I’ve specialised in interface, experience &
                      interaction design as well as working in user research and
                      product strategy for product agencies, big tech companies
                      & start-ups.
                    </p>
                  </BoxContainer>
                  <BoxContainer className='p-4'>
                    <div className='flex justify-between items-center'>
                      <p className='font-Epilogue font-semibold text-xl text-Primary-subtitle2'>
                        Skills
                      </p>
                      <div className='flex'>
                        <Image
                          src='/static/images/common/add-primary.svg'
                          width='32'
                          height='32'
                          className='mr-2'
                        />
                        <Image
                          src='/static/images/common/edit-primary.svg'
                          width='32'
                          height='32'
                        />
                      </div>
                    </div>
                    <div className='flex items-center justify-between flex-wrap mt-5'>
                      {userDetails.skills &&
                        userDetails.skills.map(renderSkills)}
                    </div>
                  </BoxContainer>
                  <BoxContainer className='p-4'>
                    <div className='flex justify-between items-center'>
                      <p className='font-Epilogue font-semibold text-xl text-Primary-subtitle2'>
                        Github Contribution
                      </p>
                    </div>
                    <div className='flex items-center justify-center mt-5'>
                      <GitHubCalendar
                        username={
                          userDetails.github.match(
                            /(?:http?:\/\/|https?:\/\/)?(?:www\.)?github\.com\/(?:\/*)([\w\-\.\/]*)/
                          )[1]
                        }
                      />
                    </div>
                  </BoxContainer>
                </LeftPane>
                <RightPane>
                  <BoxContainer className='p-4'>
                    <div className='flex justify-between items-center'>
                      <p className='font-Epilogue font-semibold text-xl text-Primary-subtitle2'>
                        Additional Details
                      </p>
                      <Image
                        src='/static/images/common/edit-primary.svg'
                        width='32'
                        height='32'
                      />
                    </div>
                    <div className='mt-5'>
                      <div className='flex items-center'>
                        <Image
                          src='/static/images/common/email.svg'
                          width='24'
                          height='24'
                          className='self-start'
                        />
                        <div className='ml-2'>
                          <p className='font-Epilogue text-base text-Primary-subtitle'>
                            Email
                          </p>
                          <p className='font-Epilogue text-base text-Primary-title'>
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center mt-3'>
                        <Image
                          src='/static/images/common/university.svg'
                          width='24'
                          height='24'
                          className='self-start'
                        />
                        <div className='ml-2'>
                          <p className='font-Epilogue text-base text-Primary-subtitle'>
                            University
                          </p>
                          <p className='font-Epilogue text-base text-Primary-title'>
                            {userDetails.university}
                          </p>
                        </div>
                      </div>
                    </div>
                  </BoxContainer>
                  <BoxContainer className='p-4'>
                    <div className='flex justify-between items-center'>
                      <p className='font-Epilogue font-semibold text-xl text-Primary-subtitle2'>
                        Social Links
                      </p>
                      <Image
                        src='/static/images/common/edit-primary.svg'
                        width='32'
                        height='32'
                      />
                    </div>
                    <div className='mt-2'>
                      {Object.entries(userDetails).map(renderSocials)}
                    </div>
                  </BoxContainer>
                </RightPane>
              </div>
            </MainContainer>
          </>
        )
      )}
    </OuterContainer>
  );
};

export default UserProfile;
