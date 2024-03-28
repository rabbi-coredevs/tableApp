
const OtpReceiver = () => {
  return (
    <div>
      <div
      className={`fixed inset-0 overflow-y-auto transition-opacity duration-500`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-transparent backdrop-blur-xl backdrop-opacity-80"></div>
        <div className="modal relative bg-[#141C29] w-96 lg:w-1/3 p-[50px] rounded-lg shadow-lg border border-sky-500">
          <div className='flex gap-2'>
             <input type="number" className="w-20 h-20" /> 
             <input type="number" className="w-20 h-20" />            
             <input type="number" className="w-20 h-20" />     
             <input type="number" className="w-20 h-20" />     
             <input type="number" className="w-20 h-20" />     
             <input type="number" className="w-20 h-20" /> 
          </div>
        </div>
      </div>
    </div>
    </div>
  )
};

export default OtpReceiver;
