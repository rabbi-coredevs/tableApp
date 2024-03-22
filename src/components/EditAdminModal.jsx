import Input from "./Input";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { useEffect, useState  } from "react";
import { getApiCall } from "../utils/apiCaller";
import axios from "axios";

const EditAdminModal = ({setIsModalOpen =()=>undefined , editItem = null }) => {
  const [error,setError] = useState('');

    const formInfo = {
        ModalTitle:'Edit Admin',
        buttonTitle:'Save Changes',
      }

    const {
        register,
        handleSubmit,
        clearErrors,
        formState:{errors},
        setValue,
    } = useForm();



    const onSubmit = (data) => {
      delete data.password;
      // console.log(data);

      axios.patch(`http://localhost:4000/api/user/${editItem}`, data,{
        withCredentials: true,
     })
      .then(res => {
        // console.log(res.data);
        if(res && res.data) setIsModalOpen(false);
      })
      .catch(error => {
        console.error('Error updating user:', error);
        setError(error.response.statusText);
      });
     };


     useEffect(() => {
      getApiCall(`/user/profile/${editItem}`).then(res=>{
        setValue('email', res.data.email);
        setValue('userName', res.data.userName);
      })
    },[editItem,setValue])


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
                  // required: true,
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

            <button className="w-full h-10 mt-4 mx-auto rounded  bg-blue-500">
              <span className="text-white" onClick={() => clearErrors()}>
                {formInfo.buttonTitle}
              </span>
            </button>
          </form>
          {error && <p className="text-red-500 text-right">{error}</p>}
      </Modal>
      
    </div>
  )
};

export default EditAdminModal;
