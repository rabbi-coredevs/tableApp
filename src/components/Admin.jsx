import { useEffect, useState } from "react";
import EditButton from '../assets/Group.svg?react';
import RemoveButton from '../assets/Remove.svg?react';
import AddIcon from '../assets/Icon(1).svg?react';
import RemoveIcon from '../assets/RemoveAll.svg?react';
import { CaretLeft, CaretRight,} from "@phosphor-icons/react";
import AddAdminModal from "./AddAdminModal";
// import rawData from './Admins.json';
import AdminTable from "./AdminTable";
import EditAdminModal from "./EditAdminModal";
import ConfirmModal from "./ConfirmModal";
import { getApiCall, postApiCall } from "../utils/apiCaller";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmins } from "../features/admins/adminSlice";

//Limit Component
const LimitComponent= ({onChangeLimit=()=>undefined})=>{
  return (
    <div>
    <label className="text-white">Showing 1 results  </label>
    <select onChange={(e)=>onChangeLimit(e.target.value)}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
    </select>
    </div>
  )
}

const CheckboxComp = ({handelCheckAll}) => {
  return (
    <>
      <input
        type="checkbox"
        className="w-4 h-4"
        onChange={(e) => handelCheckAll(e)}
      />
    </>
  );
};



const Admin = () => {
  const [isAddModalOpen,setIsAddModalOpen] = useState(false);
  const [isEditModalOpen,setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen,setIsConfirmModalOpen] = useState(false);
  const [rawData,setRawData] = useState([]);
  const [checkedData,setCheckedData] = useState([]);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10); 
  const [editItem, setEditItem] = useState(null);
  const [isLoading,setIsLoading] = useState(true);

  // console.log(checkedData);
   const {admins, error}=useSelector(state => ({
    admins: state.admins,
   }));

   console.log(admins.admins)
  const dispatch  = useDispatch();

  useEffect(() => {
    dispatch(fetchAdmins())
    setRawData(admins.admins)
    setIsLoading(false);
  },[]);

  // console.log(rawData)
  // useEffect(() => {
  //   getApiCall('/user',{
  //     role:"admin"
  //   }).then(res =>{
  //     console.log(res.data);
  //     setRawData(res.data);
  //     setIsLoading(false);
  //   })
  // },[]);

  const handleisChecked = (e,data) => {
    if(e.target.checked && !checkedData.includes(data.id)){
      setCheckedData(prev=>[...prev, data.id])
    }else{
      setCheckedData(prev=> prev.filter(item => item !== data.id));
    }
  };

  const handelCheckAll = (e) => {
    if(e.target.checked){
      const ids = data.map(({id})=>id);
      return setCheckedData(ids);
    }
    return setCheckedData([]);
  };


  const handleisCheckedDelete = () =>{
    // setData(data.filter(item => !checkedData.includes(item.id)))
    setIsConfirmModalOpen(true);

  }

  const handlePostData = (data) =>{
       //Making a POST request to '/user' endpoint with the admin data
       postApiCall('/user', data)
       .then(response => {
        // console.log(response.data);
          if(response.data && response) {
            setRawData([...rawData, response.data]);
            setIsAddModalOpen(false);
          }   
       })
       .catch(error => {
          console.error('Error:', error); 
       });
  }

 






  const config = [
    {
      Head: CheckboxComp,
      key: "select",
      headProp:{
        handelCheckAll,
      },
      Comp: function comp({ data }) {
        return <input type="checkbox" checked={checkedData.includes(data.id)} onChange={(e)=>{handleisChecked(e,data)}} className="w-4 h-4" />;
      },
    },
    {
      head: "ID",
      key: "id",
     modify: (val) => "#" + val.slice(-7),
    },
    {
      head: "Admin Name",
      key: "userName",
      onClick: (val) => console.log(val),
    },
    {
      head: "Email Address",
      key: "email",
    },

  ];

  const actions = [
    {
      name: "Actions",
      Icon: function Edit({ data, handleClicks, row}) {
              return (
                <>
                {handleClicks.map(({ click, name, Icon }, id) => {
                  return (
                    <div
                      key={name + id}
                      onClick={() => click(row)}
                      className="p-2 "
                      style={{ cursor: "pointer", margin: "auto" }}
                    >
                     <div className="flex items-center gap-1 select-none">
                     <Icon/>
                     <span className={`${name ==='Remove' ? 'text-red-800' : ''}`}>{name}</span>
                     </div>
                    </div>
                  );
                })}
              </>
              );
      },
      handleClicks: [
        {
          name: "Edit",
          Icon:EditButton,
          click: (row) => {
            // console.log('edit this admin',data.filter(item => item.id == row.id)[0].id)
            const itemId = data.find(item => item.id === row.id) ? data.find(item => item.id === row.id).id : null;
            setEditItem(itemId);
            setIsEditModalOpen(true);
          }
        },
        {
          name: "Remove",
          Icon:RemoveButton,
          click: (row) => {
            // setData(data.filter(item => item.id !== row.id))
            // console.log(row.id);
            axios.delete(`http://localhost:4000/api/user/${row.id}`,{
              withCredentials: true,
            })
            .then(response => {
              if (response && response.data) {
                // Display success message
                toast.success(`${row.userName} Removed!`, {
                 position: "top-center",
                 autoClose: 3000,
                 hideProgressBar: false,
                 theme: "dark",
                 });
             }
            })
            .catch(error => {
              console.error('Error updating user:', error);
            });
          },
        },
      ],
      
    },
  ];


  useEffect(()=>{
    setData(rawData.slice((page-1)*limit, (page-1)*limit+limit));
  },[page, limit,rawData]);


  const styles={
    wrapper: {
      style: { width: "100%", margin: "auto", backgroundColor:'#142030', border: "1px solid red",},
      className: ``,
    },
    table: {
      tableMain:{
        style: { border: "",backgroundColor:'#142030', padding:'',borderRadius:'10px' },
        className: `w-full`,
      },
      headerGroup: {
        style: { border: "2px solid red" },
        className: ``,
      },
      checkBox:{
        style: { border: "",backgroundColor:'', padding:'',borderRadius:'' },
        className: `w-6 h-6 accent-black`,
      },
      headerRow: {
        style: {
          borderBottom: "1px solid #E1E3E5", borderTop: "1px solid #E1E3E5", textTransform: "uppercase", textAlign: "left", fontSize: "16px", color: "#001E17",borderRadius: "20px"
        },
        className: ``,
      },
      header: {
        style: { paddingTop: "16px", paddingBottom: "16px", paddingLeft:'',paddingRight:'', borderRadius: "", backgroundColor:'#212c3a', color: 'white',fontSize: "14px",fontWeight:'400',textAlign: 'left' },
        className: ``,
      },
      headerAction: {
        style: { border: "2px solid bla ck" },
        className: ``,
      },
      body: {
        style: { border: "", paddingLeft:'20xp'},
        className: ``,
      },
      row: {
        style: {paddingLeft:'', borderTop: "", borderBottom: "1px solid #212c3a", fontSize: "14px", fontWeight:'400', textAlign: "left", color: "white", ":hover": {} },
        className: ``,
      },
      rowData: {
        style: { border: "2px solid yellow" },
        className: ``
      },
      rowAction: {
        style: { border: "2px solid gree n" },
        className: ``,
      },
      actionIcon: {
        style: { margin: "auto" },
        className: ``
      },
      loadingWrapper: {
        style: { border: "2px solid gre en" },
        className: ``
      },
      loading: {
        style: { border: "2px solid blu e", },
        className: ``
      }
    },
    pagination: {
      wrapper: {
        style: { border: "", marginTop: "20px",color: "" },
        className: ``
      },
      text: {
        style: { border: "1px solid gre en" },
        className: ``
      },
      buttonWrapper: {
        style: { border: "" },
        className: ``
      },
      buttons: {
        style: { background: "",padding:'12px',color: "white" },
        className: ``
      },
      pageButton: {
        style: { border: "1px solid #004B81 " , padding:'4px',borderRadius:'8px',height:'36px',width:'40px',color: "white" },
        className: ``
      },
      prev: {
        style: { border: "1px solid #004B81" , borderRadius:'8px',height:'36px',width:'40px' },
        className: ``
      },
      next: {
        style: { border: "1px solid #004B81" , borderRadius:'8px',height:'36px',width:'40px' },
        className: ``
      },
      pages: {
        style: { border: "1px solid #004B81" , borderRadius:'8px',color:'white' },
        className: ``
      },
      activePage: {
        style: { background: "#0094FF" ,color:'white', padding:'4px',borderRadius:'8px',height:'36px',width:'40px'},
        className: ``
      }
    }
  }

  if(isLoading) return <h1>Data Loading....</h1>

  return (
    <div className="p-5 flex flex-col gap-5 ">
      <div className="w-full bg-[#141f2f] p-3 flex justify-end rounded-lg border-1 border-white">
        <div 
          className=" ">
          {
            !checkedData.length ? (<div className="flex justify-center items-center gap-2 w-[182px] h-9 bg-blue-500 rounded-md text-white px-4 py-0 cursor-pointer select-none"
            onClick={()=>setIsAddModalOpen(true)}
          >
          <AddIcon className='w-4'/>
          <span  className="text-[16px]">Add New Admin</span>
          </div>)
          :
          (<div className="flex items-center text-lg text-white">
          <span className="mr-5">{checkedData.length} users selected</span>
          <div className="flex justify-center items-center gap-2 w-[182px] h-9 bg-[#de353c] rounded-md text-white px-4 py-0 cursor-pointer select-none"
          onClick={handleisCheckedDelete}
          >
        <RemoveIcon className='w-4 text-white'/>
        <span  className="text-[16px]">Remove All</span>
        </div>
          </div>)
          }
          {
            isAddModalOpen &&
            <AddAdminModal
            setIsModalOpen={setIsAddModalOpen} 
            handlePostData = {handlePostData}
            />
          }
          {
            isConfirmModalOpen && 
            <ConfirmModal
            setIsModalOpen={setIsConfirmModalOpen} 
            data = {data}
            setData = {setData}
            checkedData = {checkedData}         
            setCheckedData = {setCheckedData}
            />
          }
        </div>
      </div>
      <div className='p-5 bg-[#141f2f] rounded-lg min-h-[calc(100vh-180px)]'>
      <div>
      <AdminTable
      actions={actions} 
      config={config} 
      data={data} 
      styles = {styles} 
      pagination={{
        showPage: true,
        totalDocs: rawData.length,
        totalPage: Math.ceil(rawData.length/limit),
        page,
        limit,
        onChange: (num) => setPage(num),
        onChangeLimit:(num)=>setLimit(num),
        buttons: {
          Prev: CaretLeft ,
          Next: CaretRight,
          Edit:EditButton,
          Remove: RemoveButton
        },
        LimitComp:LimitComponent,
        chooseLimit:true,
      }}
      />
      {
        isEditModalOpen && (
          <EditAdminModal
            setIsModalOpen = {setIsEditModalOpen}
            editItem = {editItem}

          />
        )
      }
    </div>
      </div>
    </div>
  )
};

export default Admin;
