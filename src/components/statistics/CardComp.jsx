const CardComp = ({title='',value=null,Icon, styles = {}}) => {

    return (
      <>
        <div className="flex justify-between w-full px-5 py-4 rounded-lg bg-gradient-to-r from-[#253241]  to-[#1c2938] " >
          <div className="left">
              {/* left side contains title and a value */}
              <h1 className="text-[#f5f5f5] text-sm font-normal">{title}</h1>
              <p className="text-[#0094FF] text-xl font-bold">{value}</p>
          </div>
          <div className="flex items-center justify-center w-[42px] h-[42px] bg-[#253241] rounded-lg">
              {/* svg icon goes here */}
              <Icon />
          </div>
        </div>
      </>
    )
  };
  
  export default CardComp;