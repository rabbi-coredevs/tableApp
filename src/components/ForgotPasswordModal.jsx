import axios from "axios";
import Input from "./Input";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { postApiCall } from "../utils/apiCaller";
const ForgotPasswordModal = ({ setIsModalOpen =()=>undefined }) => {
    const [otp,setOtp] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
    
        },
      });

    const onSubmit =(data)=>{
        postApiCall('/user/admin',{
            email: data.email,
            // otp: data.otp,
        })
        .then(res=> {
            console.log(res)
           if(res.status === 200){
         toast.success(`OTP sent to ${data.email}`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            theme: "dark",
            })
            setIsModalOpen(false);
            setOtp(true);
           }

        })
        .catch(error => {
            console.error('Error:', error);
         });
       
    }


  return (
    <div>
      <Modal setIsModalOpen={setIsModalOpen} formInfo={{
        ModalTitle: "Forgot Password?",
        buttonTitle: "Forgot Password",
      }}>
        <form className="" action="" onSubmit={handleSubmit(onSubmit)}>
          {
            otp ? 
              (<div>Enter your password</div>)
              :
              (<Input
                label="Email"
                placeholder="Type your Email"
                register={() =>
                  register("email", {
                    required: "  Email required",
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  })
                }
                errors={errors?.email?.message}
              />)
          }
          <button className="w-full h-10 mt-4 mx-auto rounded  bg-blue-500" >
            <span className="text-white">
              Send
            </span>
          </button>
        </form>
      </Modal>
    </div>
  )
};

export default ForgotPasswordModal;
