import { List } from '@phosphor-icons/react/dist/ssr';
import { useSelector } from 'react-redux';
import DummyPeople from '../assets/dummyImg.jpg';
import { useEffect } from 'react';

const Header = ({sidebarOpen, setSidebarOpen = false, tableHeading = ''}) => {

  // const {isLoading, users, error} = useSelector(state => state.users);

  // // const [superAdmin = null] = superAdmins;

  // console.log(users)

  // const dispatch = useDispatch();
  // useEffect(()=>{
  //   dispatch(fetchUsers());
  // },[dispatch]);

  const {data, isLoading, error} = useSelector(state => state.userInfo);



  useEffect(() => {
    const handleOutsideClick = (event) => {
      const listElement = document.querySelector('.list-element'); // Change '.list-element' to the appropriate selector for your list component
      if (
        listElement &&
        !listElement.contains(event.target) 
      
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [setSidebarOpen]);

  // if(isLoading) return <h1>Loading...</h1>;

  return (
    <div className="flex justify-between px-5 py-[14px]  text-white items-center">  
      <div className='flex gap-2'>
      <List size={30} 
      className={`list-element ${sidebarOpen && `hidden` } lg:hidden cursor-pointer select-none `}
      onClick={()=>setSidebarOpen(!sidebarOpen)}
      >
      </List>
      <h1 className="text-[18px] font-semibold ">{tableHeading}</h1>
    </div>
    <div className="flex gap-3">
      <img className='w-[42px] rounded-md ' src={DummyPeople} alt="" />
      <div className="">
        <p className='text-base font-semibold'>{data?.userName|| ''}</p>
        <p className='text-xs font-normal'>{data?.role|| ''}</p>
      </div>
    </div>
    </div>
  )
};

export default Header;
