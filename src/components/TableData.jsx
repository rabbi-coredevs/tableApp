import { useEffect, useState } from "react";
import TableComp from "./TableComp";
import rawData from './Admins.json';
import { CaretLeft, CaretRight } from "@phosphor-icons/react";





//Limit Component
const LimitComponent= ({onChangeLimit=()=>undefined})=>{
  return (
    <div>
    <label>Showing 1 results</label>
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
        onChange={(e) => handelCheckAll(e)}
      />
    </>
  );
};

const TableData = () => {
  const [checkedData,setCheckedData] = useState([]);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);


  console.log(checkedData)
  
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

  const config = [
    {
      Head: CheckboxComp,
      key: "select",
      headProp:{
        handelCheckAll,
      },
      Comp: function comp({ data }) {
        return <input type="checkbox" checked={checkedData.includes(data.id)} onChange={(e)=>{handleisChecked(e,data)}} />;
      },
    },
    {
      head: "ID",
      key: "id",
     // modify: (val) => "#" + val.slice(0, 4),
    },
    {
      head: "Admin Name",
      key: "name",
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
      Icon: function Edit({ data, handleClicks }) {
        return (
          <>
            {handleClicks.map(({ click, name }, id) => {
              return (
                <p
                  key={name + id}
                  onClick={() => click(data)}
                  className="border p-2 "
                  style={{ cursor: "pointer", margin: "auto" }}
                >
                  {name}
                </p>
              );
            })}
          </>
        );
      },
      handleClicks: [
        {
          name: "Edit",
          click: () => console.log("Edit clicked"),
        },
        {
          name: "Remove",
          click: () => console.log("Remove clicked"),
        },
      ],
    },
  ];


  useEffect(()=>{
    setData(rawData.slice((page-1)*limit, (page-1)*limit+limit));
  },[page, limit]);


  const styles={
    wrapper: {
      style: { width: "80%", margin: "auto", backgroundColor:'#222d3c', border: "1px solid red",},
      className: ``,
    },
    table: {
      headerGroup: {
        style: { border: "2px solid red" },
        className: ``,
      },
      headerRow: {
        style: {
          borderBottom: "1px solid #E1E3E5", borderTop: "1px solid #E1E3E5", textTransform: "uppercase", textAlign: "left", fontSize: "16px", color: "#001E17"
        },
        className: ``,
      },
      header: {
        style: { paddingTop: "4px", paddingBottom: "4px", border: "2px solid #E1E3E5", backgroundColor:'#222d3c'},
        className: ``,
      },
      headerAction: {
        style: { border: "2px solid bla ck" },
        className: ``,
      },
      body: {
        style: { border: "2px solid gre en" },
        className: ``,
      },
      row: {
        style: { borderTop: "1px solid #E1E3E5", borderBottom: "1px solid #E1E3E5", fontSize: "16px", textAlign: "left", color: "#001E17", ":hover": {} },
        className: ``,
      },
      rowData: {
        style: { border: "2px solid yel low" },
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
        style: { border: "1px solid gre en" },
        className: ``
      },
      text: {
        style: { border: "1px solid gre en" },
        className: ``
      },
      buttonWrapper: {
        style: { border: "1px solid gr een" },
        className: ``
      },
      buttons: {
        style: { background: "green" },
        className: ``
      },
      prev: {
        style: { border: "2px solid red" },
        className: ``
      },
      next: {
        style: { border: "2px solid blue" },
        className: ``
      },
      pages: {
        style: { background: "blu e" },
        className: ``
      },
      activePage: {
        style: { background: "re d" },
        className: ``
      }
    }
  }


  return (
    <div>
      <TableComp 
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
        },
        LimitComp:LimitComponent,
        chooseLimit:true,
      }}
      />
    </div>
  );
};

export default TableData;
