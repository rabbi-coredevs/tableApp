const Review = ({ reviewed = false }) => {
    
    return (
      <>
        <div className={`flex items-center justify-center ${reviewed ? 'gap-[0.375rem]': 'gap-[0.625rem]'} h-7 ${reviewed ? "w-[6.375rem] bg-[#D7EEEC]" : "w-[6.938rem] bg-[#FFE3DB]"} py-[0.375rem] px-3 rounded-md`}>
          <div className={`w-2 h-2 rounded-full ${reviewed ? "bg-[#39AA9E]":"bg-[#FF754C]"}`}></div>
          <h1 className={`text-sm ${reviewed ? "text-[#39AA9E]" : "text-[#FF754C]"}`}>
            {reviewed ? "Reviewed" : "In Review"}
          </h1>
        </div>
      </>
    );
  };
  
  export default Review;
