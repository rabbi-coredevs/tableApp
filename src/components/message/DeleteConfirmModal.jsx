import axios from "axios";
import Modal from "../Modal";

const DeleteConfirmModal = ({setIsModalOpen = ()=>{}, data = [],setData=()=>{},selectedRow = [],setSelectedRow =()=>undefined}) => {
    const modalInfo = {
        ModalTitle: 'Do you want to remove this message?'
    }

    const handleDelete = () => {
      axios.delete(`http://localhost:4000/api/message/${selectedRow}`, {
        withCredentials: true, // Send cookies for authentication
      })
      .then(res => {
        console.log(res); // Log the response
        setIsModalOpen(false); // Close modal window upon successful deletion
      })
      .catch(error => {
        console.error('Error:', error); // Log any errors
        // You might want to handle errors or show error messages to the user here
      });
    };
    



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
