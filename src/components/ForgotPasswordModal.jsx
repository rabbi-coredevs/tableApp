import Input from "./Input";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import {  toast } from "react-toastify";
import { postApiCall } from "../utils/apiCaller";
import { useNavigate, useParams } from "react-router-dom";





const ForgotPasswordModal = ({ setIsModalOpen =()=>undefined }) => {
    const navigateto = useNavigate();


    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
    
        },
      });

    const onSubmit =(data)=>{

      //forgot password api call
        postApiCall('/user/forgot/password',{
            email: data.email,
            // otp: data.otp,
        })
        .then(res=> {
           if(res.status === 200){
            // localStorage.setItem('forgotPasswordToken',res.data);
            // setOtp(res.data);
         toast.success(`OTP sent to ${data.email}`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            theme: "dark",
            })
            postApiCall('/user/verify/otp',{
              token:res.data,
              otp:'905638'
            })
            .then(respons=>{
              console.log(respons)
            })
            .catch(err=>{
               console.err(err)
            })
            // setIsModalOpen(false);
            // navigateto('/forgot-password');
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
         <Input
                label="Email"
                placeholder="Type your Email"
                register={() =>
                  register("email", {
                    required: "  Email required",
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  })
                }
                errors={errors?.email?.message}
              />
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
