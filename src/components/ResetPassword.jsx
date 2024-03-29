
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { useNavigate, useParams } from "react-router-dom";
import { postApiCall } from "../utils/apiCaller";
import {  toast } from "react-toastify";

const ResetPassword = () => {
  const navigateToLogin = useNavigate();
  const {token} = useParams();
  console.log(token);
  // const [searchParams] = useSearchParams();
  // const token = searchParams.get('token');
  
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm({
        defaultValues: {
    
        },
      });

    const onSubmit =(data)=>{
        console.log(data);
        postApiCall('/user/change/password',{
           token,
           password: data.password,
           
        })
        .then(res=>{
           if(res.status === 200){
          toast.success(`${res.data.message}`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            theme: "dark",
            })
          navigateToLogin('/login');
        }
        })
        .catch(err=>{
          console.err(err)
       })
    
    }


  return (
    <div>
      <Modal formInfo={{
        ModalTitle: "Forgot Password?",
        buttonTitle: "Forgot Password",
      }}>
        <form className="" action="" onSubmit={handleSubmit(onSubmit)}>
        <Input
              label="New Password"
              type="password"
              showPassword={true}
              placeholder="Enter New Password"
              register={() =>
                register("password", {
                  required: true,
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                    message:
                      "Password must contain at least 1 Capital letter, 1 small letter , 1 digit and a special character",
                  },
                })
              }
              errors={errors?.password?.message}
            />

            <Input
            type="password"
              label="Confirm New Password"
              showPassword={true}
              placeholder="Enter New Password Again"
              register={()=>
                register("confirm_password", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match"
               })
            }
              errors={errors?.confirm_password?.message}
            />


          <button className="w-full h-10 mt-4 mx-auto rounded  bg-blue-500" >
            <span className="text-white">
              Submit
            </span>
          </button>
        </form>
      </Modal>
    </div>
  )
};

export default ResetPassword;
