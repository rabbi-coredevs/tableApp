import Close from '../assets/Close.svg?react'


const Modal = ({ setIsModalOpen = ()=>{}, children, formInfo = {}}) => {
  const {ModalTitle} = formInfo;
  
  return (
    <div
      className={`fixed inset-0 overflow-y-auto transition-opacity duration-500`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-transparent backdrop-blur-xl backdrop-opacity-80"></div>
        <div className="modal relative bg-[#141C29] w-96 lg:w-1/3 p-[50px] rounded-lg shadow-lg border border-sky-500">
          <div className="flex justify-between ">
            <h2 className="text-lg font-bold mb-4 text-white">{ModalTitle}</h2>
            <Close
              className=" text-gray-600 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            ></Close>
          </div>
          <div className=''>
            {
              children
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
