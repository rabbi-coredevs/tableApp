
import Input from "./Input";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { postApiCall } from "../utils/apiCaller";

const AddAdminModal = ({ setIsModalOpen = false , handlePostData = () =>{console.log('error in handlePostData')}}) => {
  
  const formInfo = {
    ModalTitle:'Add New Admin',
    buttonTitle:' Confirm to add new admin',
  }

    const {
        register,
        handleSubmit,
        watch,
        clearErrors,
        formState:{errors}
    } = useForm({
      defaultValues:{
      }
    });

    const onSubmit = (data) => {
      // console.log(data); 
      delete data.confirm_password;
      data.role = 'admin';

   
      // //Making a POST request to '/user' endpoint with the admin data
      // postApiCall('/user', data)
      //    .then(response => {
      //     // console.log(response.data);
      //       if(response.data && response) {
      //         setIsModalOpen(false);
      //       }   
      //    })
      //    .catch(error => {
      //       console.error('Error:', error); 
      //    });

      handlePostData(data);
   };
   

  return (
    <div>
      <Modal setIsModalOpen={setIsModalOpen} formInfo={formInfo}>
      <form className="" action="" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Full Name"
              placeholder="Type Your Full Name"
              register={() =>
                register("userName", {
                  required: "Name is required",
                  maxLength: {
                    value: 12,
                    message: "Max length exceeded",
                  },
                })
              }
              errors={errors?.fullName?.message}
            />

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
             <Input
              label="Password"
              type="password"
              showPassword={true}
              placeholder="Type your Password"
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
              label="Confirm Password"
              showPassword={true}
              placeholder="Type your Password Again"
              register={()=>
                register("confirm_password", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match"
               })
            }
              errors={errors?.confirm_password?.message}
            />
            <button className="w-full h-10 mt-4 mx-auto rounded  bg-blue-500 text-white">
              <span className="" onClick={() => clearErrors()}>
                {formInfo.buttonTitle}
              </span>
            </button>
          </form>
      </Modal>
        
    </div>
  )
};

export default AddAdminModal;
