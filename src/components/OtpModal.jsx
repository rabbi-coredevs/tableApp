import Input from "./Input";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


const OtpModal = ({setIsModalOpen =() => undefined}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
    
        },
      });

    const onSubmit =(data)=>{
        console.log(data);
        
    }


  return (
    <div>
        <Modal setIsModalOpen={setIsModalOpen} formInfo={{
          ModalTitle: "Enter OTP",
          buttonTitle: "Send OTP",
        }}>
          <form className="" action="" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Enter OTP"
              type="text"
              placeholder="Enter OTP"
              register={register}
              errors={errors.otp}
            />
            <div className="flex justify-between items-center px-4 h-10 rounded focus:border focus:border-blue-400 bg-[#121a27] border-[1px] border-[#717c8b]">
              <button
                type="submit"
                className="focus:outline-none bg-transparent w-full text-white "
              >
                Send OTP
              </button>
            </div>
          </form>
        </Modal>
      
    </div>
  )
};

export default OtpModal;
