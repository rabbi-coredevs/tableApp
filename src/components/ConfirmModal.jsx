 import Modal from "./Modal";
 import axios from "axios";
import { toast } from "react-toastify";


const ConfirmModal = ({setIsModalOpen = ()=>{}, data = [], checkedData = [],setData=()=>{}, setCheckedData =()=>undefined,}) => {
    const modalInfo = {
        ModalTitle: 'Are you sure you want to remove this Admin?'
    }


    const handleDelete = async () => {
      try {
        // Filter out the items that are checked
        const newData = data.filter(item => !checkedData.includes(item.id));
    
        // Send a DELETE request to the server with the list of IDs in the request body
        await axios.delete(`http://localhost:4000/api/user/remove`, {
          data: { ids: checkedData },
          withCredentials: true,
        });
    
        // Update the state with the new data
        setData(newData);
    
        // Display success message
        toast.success('Selected items removed!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          theme: 'dark',
        });
    
        // Clear checkedData and close modal
        setCheckedData([]);
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error deleting users:', error);
      }
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

export default ConfirmModal;
