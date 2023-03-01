import styled from "styled-components";
import Image from "next/image";
import Button from "../../components/common/Button";
import { Link } from "@nextui-org/react";
import { useState, useEffect } from "react";
import DashboardBuddyCard from "../../components/dashboard/DashboardBuddyCard";
import PaginationComponent from "../../components/dashboard/PaginationComponent";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { Collapse, Checkbox } from "@nextui-org/react";
import { FiSearch } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { getStates } from "../../services/common";
import LoadingComponent from "../../components/common/LoadingComponent";
import { skillsArray, techStackOptions } from "../../constants";
import { getAllBuddies } from "../../services/dashboard";
import { useSelector } from "react-redux";

const OuterContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const SideBarContainer = styled.div`
  width: 17vw;
  background-color: #f8f8fd;
  display: flex;
  flex-direction: column;
`;

const MainContainer = styled.div`
  width: 83vw;
  height: 100vh;
`;

const BoxContainer = styled.div`
  border: 1px solid #d6ddeb;
  padding: 1rem;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  border-bottom: 1px solid #d6ddeb;
  margin-left: 0.6rem;
  width: 80%;
`;

const StyledAsyncSelect = styled(AsyncSelect)`
  width: 60%;
  border-bottom: 1px solid #d6ddeb;
  margin-left: 0.6rem;
  outline: none;
  &::placeholder {
    color: #a8adb7;
    font-family: "Epilogue", "sans-serif";
  }
`;

const FilterContainer = styled.div`
  width: 18vw;
  padding: 1.5rem 1rem;
  height: 100%;
`;

const DataContainer = styled.div`
  width: 100%;
  height: 60vh;
  margin-top: 1rem;
  padding-right: 1rem;
`;

const StyledSelect = styled(Select)`
  width: 100%;
  border: 1px solid #d6ddeb;
  margin-bottom: 1.375rem;
  margin-right: 1.375rem;
  outline: none;
  &::placeholder {
    color: #a8adb7;
    font-family: "Epilogue", "sans-serif";
  }
`;

const BrowseBuddies = () => {
  const [loading, setLoading] = useState(false);
  const [statesOptions, setStateOptions] = useState(null);
  const [buddies, setBuddies] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalBuddies, setTotalBuddies] = useState(0);
  const [filters, setFilters] = useState({ searchString: "", location: "" });
  const [params, setParams] = useState({
    page: 1,
    searchString: "",
    techStack: "",
    location: "",
    skill: "",
  });

  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetchBuddies();
  }, [params]);

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

  const fetchBuddies = () => {
    setLoading(true);
    getAllBuddies(user.authToken, params)
      .then((res) => {
        const { success, result } = res;
        if (success) {
          setBuddies(result?.buddies);
          setTotalPages(result?.totalPages);
          setTotalBuddies(result?.totalBuddies);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
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

  const onPageChange = (page) => {
    setParams((prev) => ({ ...prev, page: page }));
  };

  const onApplyFilters = () => {
    setParams((prev) => ({ ...prev, ...filters }));
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
            <div className='flex '>
              <div className='w-1 h-8 bg-Primary'></div>
              <Link className='flex justify-center items-center ml-4 bg-[#E9EBFD] px-3 cursor-pointer'>
                <Image
                  src='/static/images/dashboard/sidebar/buddies.svg'
                  width='24'
                  height='24'
                />
                <p className='font-Inter text-base font-medium text-Primary-subtitle ml-2'>
                  Featured Buddies
                </p>
              </Link>
            </div>
            <Link
              href='/browse-buddies'
              className='flex items-center ml-8 mb-2 cursor-pointer'
            >
              <Image
                src='/static/images/dashboard/sidebar/user-profile.svg'
                width='24'
                height='24'
              />
              <p className='font-Inter text-base font-medium text-Primary-subtitle ml-2'>
                My Public Profile
              </p>
            </Link>
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
          <Button
            color='#FF6550'
            borderColor='#CCCCF5'
            className='flex px-4 py-2 mt-8'
            onClick={() => logoutHandler()}
          >
            <Image
              src='/static/images/dashboard/sidebar/logout.svg'
              width='24'
              height='24'
            />
            <p className='font-Epilogue text-base font-medium ml-2'>Logout</p>
          </Button>
        </div>
      </SideBarContainer>
      <MainContainer>
        <div className='p-4 flex justify-between items-center'>
          <p className='font-ClashDisplay text-3xl text-Primary-title font-medium'>
            Find Buddies
          </p>
          <Button
            color='#4640DE'
            borderColor='#CCCCF5'
            className='py-2 px-3 font-Epilogue text-base font-semibold'
          >
            Back to Homepage
          </Button>
        </div>
        <div className='p-4 border-[#D6DDEB] border-t border-b'>
          <BoxContainer>
            <div className='flex items-center flex-[1.5]'>
              <FiSearch
                style={{
                  color: "#25324B",
                  width: "1.2rem",
                  height: "1.2rem",
                }}
              />
              <SearchInput
                type='text'
                placeholder='Search Buddies'
                value={filters.searchString}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    searchString: e.target.value,
                  }));
                }}
              />
            </div>
            <div className='w-[1px] bg-Primary-subtitle2 h-8'></div>
            <div className='flex items-center flex-[2] ml-4'>
              <GrLocation
                style={{
                  color: "#25324B",
                  width: "1.2rem",
                  height: "1.2rem",
                }}
              />
              <StyledAsyncSelect
                id='state'
                placeholder='State'
                loadOptions={loadStates}
                defaultOptions={statesOptions ? statesOptions : null}
                cacheOptions
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, location: e.value }))
                }
                styles={{
                  control: (styles) => ({ ...styles, border: 0 }),
                }}
              />
              <Button
                bgColor='#4640DE'
                className='py-2 px-12 ml-4 text-lg font-Epilogue font-semibold'
                onClick={onApplyFilters}
              >
                Search
              </Button>
            </div>
          </BoxContainer>
        </div>
        <div className='flex items-start'>
          <FilterContainer>
            <Collapse
              title={
                <p className='text-base font-semibold text-Primary-title'>
                  Tech Stack
                </p>
              }
              divider={false}
              className='collapse-container'
              expanded
            >
              {techStackOptions.map((ele) => (
                <Checkbox
                  style={{ margin: 0 }}
                  key={ele.value}
                  value={ele.value}
                  color='primary'
                  className='checkbox'
                  onChange={(checked) => {
                    if (checked)
                      setParams((prev) => ({
                        ...prev,
                        techStack: ele.value,
                      }));
                    else
                      setParams((prev) => ({
                        ...prev,
                        techStack: "",
                      }));
                  }}
                >
                  {ele.label}
                </Checkbox>
              ))}
            </Collapse>
            <Collapse
              title={
                <p className='text-base font-semibold text-Primary-title'>
                  Categories
                </p>
              }
              divider={false}
              className='collapse-container'
            >
              <Checkbox
                style={{ margin: 0 }}
                key='student'
                value='student'
                color='primary'
                className='checkbox'
              >
                Student
              </Checkbox>
              <Checkbox
                style={{ margin: 0 }}
                key='professional'
                value='professional'
                color='primary'
                className='checkbox'
              >
                Professional
              </Checkbox>
            </Collapse>
            <Collapse
              title={
                <p className='text-base font-semibold text-Primary-title'>
                  Skills
                </p>
              }
              divider={false}
              className='collapse-container'
            >
              <StyledSelect
                className='react-select'
                options={skillsArray}
                placeholder='Skills'
                menuPosition='fixed'
                menuPlacement='top'
                clearable={false}
                styles={{
                  menuPortal: (styles) => ({ ...styles, zIndex: "1000" }),
                }}
                onChange={(e) =>
                  setParams((prev) => ({ ...prev, skill: e.value }))
                }
              />
            </Collapse>
          </FilterContainer>
          <DataContainer>
            {loading ? (
              <div className='w-full h-full'>
                <LoadingComponent />
              </div>
            ) : (
              buddies && (
                <>
                  <p className='text-2xl font-ClashDisplay font-semibold text-Primary-title'>
                    All Buddies
                  </p>
                  <p className='text-sm font-Epilogue text-Primary-title mb-4'>
                    Showing {totalBuddies} results
                  </p>
                  <div>
                    {buddies.map((buddy) => (
                      <DashboardBuddyCard buddy={buddy} key={buddy._id} />
                    ))}
                  </div>
                </>
              )
            )}
            <PaginationComponent
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </DataContainer>
        </div>
      </MainContainer>
    </OuterContainer>
  );
};

export default BrowseBuddies;
