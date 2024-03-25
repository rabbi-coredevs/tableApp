import { useEffect, useState } from 'react';
// import rawData from './Message.json';
import RemoveButton from '../../assets/Remove.svg?react';
import { CaretLeft, CaretRight,} from "@phosphor-icons/react";
import EditAdminModal from '../EditAdminModal';
import Table from '../Table';
import RemoveIcon from '../../assets/RemoveAll.svg?react'
import MessageModal from './MessageModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import { getApiCall } from '../../utils/apiCaller';

//Limit Component
const LimitComponent= ({ onChangeLimit=()=>undefined })=>{
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
  
  const CheckboxComp = ({ handleCheckAll }) => {
    return (
      <>
        <input
          type="checkbox"
          className=""
          onChange={(e) => handleCheckAll(e)}
        />
      </>
    );
  };

const Message = () => {
    const [isAddModalOpen,setIsAddModalOpen] = useState(false);
    const [isEditModalOpen,setIsEditModalOpen] = useState(false);
    const [checkedData,setCheckedData] = useState([]);
    const [page, setPage] = useState(1);
    const [rawData,setRawData] = useState([]);
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(10); 
    const [isConfirmModalOpen,setIsConfirmModalOpen] = useState(false);
    const [selectedRow,setSelectedRow] = useState([]);

  
    const handleisChecked = (e,data) => {
      if(e.target.checked && !checkedData.includes(data._id)){
        setCheckedData(prev=>[...prev, data._id])
      }else{
        setCheckedData(prev=> prev.filter(item => item !== data._id));
      }
    };
  
    const handleCheckAll = (e) => {
      if(e.target.checked){
        const ids = data.map(({_id})=>_id);
        return setCheckedData(ids);
      }
      return setCheckedData([]);
    };
  
  
    const handleisCheckedDelete = () =>{
      // setData(data.filter(item => !checkedData.includes(item.id)))
      setIsConfirmModalOpen(true);
  
    }
  
  
  
    const config = [
      {
        Head: CheckboxComp,
        key: "select",
        headProp:{
          handleCheckAll,
        },
        Comp: function comp({ data }) {
          return <input type="checkbox" checked={checkedData.includes(data._id)} onChange={(e)=>{handleisChecked(e,data)}} />;
        },
      },

      {
        head: "Messages",
        key: "message",
        onClick: (val) => console.log(val),
      },
      {
        head: "Date",
        key: "deletion_date",
      },
      {
        head:'Time',
        key: 'deletion_time',
      }
  
    ];
  
    const actions = [
      {
        name: "Action",
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
                       <div className="flex items-center gap-1 select-none text-red-500">
                       <Icon/>
                       {name}
                       </div>
                      </div>
                    );
                  })}
                </>
                );
        },
        handleClicks: [
          {
            name: "Remove",
            Icon:RemoveButton,
            click: (row) => {
              setIsConfirmModalOpen(true);
              setSelectedRow(row._id);
              // setData(data.filter(item => item._id !== row._id))
            },
          },
        ],
        
      },
    ];


    useEffect(()=>{
      getApiCall('/messages')
       .then(res=>{
          console.log(res.data);
          setRawData(res.data);
        })
        .catch(error => {
          console.error('Error:', error); 
         });
    },[]);

    
  
  
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
  
    return (
      <div className="p-5 flex flex-col gap-5 ">
        <div className="w-full bg-[#141f2f] p-3 flex justify-end rounded-lg border-1 border-white">
          <div 
            className=" ">
         {
            !checkedData.length ? (<div className="flex justify-center items-center gap-2 h-9 bg-blue-500 rounded-md text-white px-4 py-0 cursor-pointer select-none"
            onClick={()=>setIsAddModalOpen(true)}
          >
          <span  className="text-[16px]">Send Message to all users</span>
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
              <MessageModal
              setIsModalOpen={setIsAddModalOpen} 
              />
            }
            {
              isConfirmModalOpen && 
              <DeleteConfirmModal
              setIsModalOpen={setIsConfirmModalOpen} 
              data = {data}
              setData = {setData}
              selectedRow = {selectedRow}         
              setSelectedRow = {setSelectedRow} 
              />
            }
          </div>
        </div>
        <div className='p-5 bg-[#141f2f] rounded-lg min-h-[calc(100vh-180px)]'>
        <div>
        <Table
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
            />
          )
        }
      </div>
        </div>
      </div>
    )
  };

export default Message;
