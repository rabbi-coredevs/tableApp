import Modal from "../Modal";

const DeleteConfirmModal = ({setIsModalOpen = ()=>{}, data = [],setData=()=>{},selectedRow = [],setSelectedRow =()=>undefined}) => {
    const modalInfo = {
        ModalTitle: 'Do you want to remove this message?'
    }

    const handleDelete = ()=>{

    console.log(data)
    console.log(selectedRow)
        setData(data.filter(item => item._id !== selectedRow));
        setIsModalOpen(false)
    }


    // console.log(data)


  return (
    <div>
       <Modal setIsModalOpen={setIsModalOpen} formInfo={modalInfo}>
        <div className="flex justify-center p-10 gap-[10px] text-white">
            <button 
            className="bg-blue-500 py-[7.5px] px-5 font-bold rounded"
            onClick={()=>setIsModalOpen(false)}
            >Cancel</button>
            <button 
            className="bg-[#DE353C] py-[7.5px] px-5 font-bold rounded"
            onClick={handleDelete}
            >Delete</button>
        </div>

       </Modal>
      
     
    </div>
  )
};

export default DeleteConfirmModal;
