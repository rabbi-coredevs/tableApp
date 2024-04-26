import { useForm } from "react-hook-form";
import Input from "./Input";
// import image1 from '../assets/BgTop.png';
// import image2 from '../assets/TopLeft.png';
// import image3 from '../assets/Rignt.png'
import ForgotPasswordModal from "./ForgotPasswordModal";
import { useEffect, useState } from "react";
import { userLogin } from "../features/admins/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const [isForgotPasswordModalOpen,setIsForgotPasswordModalOpen] =useState(false);
    const {data, isLoading, error}=useSelector(state=>state.userInfo);
    const dispatch= useDispatch();
    const navigate= useNavigate();
  
  
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {

    },
  });


  const onSubmit = (data) =>  dispatch(userLogin(data));
 
  useEffect(()=>{
    if(data) navigate('/');

  },[data]);

 const handleForgetPassword =()=>{
  setIsForgotPasswordModalOpen(true);
 
 }

  return (
    <div className="relative">
      {/* Background image positioned at top center */}
      {/* <div className="absolute top-0 left-1/3 w-1/3 h-1/3 bg-cover bg-no-repeat bg-center" style={{ backgroundImage:`url(${image1})`, }}></div> */}
      {/* Background image positioned at right center */}
      {/* <div className="absolute right-0 top-1/3  w-1/3 h-1/3 bg-cover bg-no-repeat bg-center" style={{ backgroundImage:`url(${image3})`, }}></div> */}
      {/* Background image positioned at left right */}
      {/* <div className="absolute left-0 top-1/3 w-1/3 h-1/3 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${image2})`, }}></div> */}
      
        <div className="flex items-center justify-center min-h-screen gap-1">
          <div className="relative bg-[#141C29] w-96 lg:w-1/3 p-[50px] rounded-lg shadow-lg border border-sky-500 ">
            <div className="flex flex-col items-center">
              <h1 className="text-[32px] text-[#0094ff]">Whale Swap</h1>
              <p className="text-white text-xl text-bold">Welcome Back</p>
              <p className="text-[#717c8b] text-[14px]">
                Login with whale Swap
              </p>
            </div>
            <div className="w-full">
              {
                isForgotPasswordModalOpen && (
                  <ForgotPasswordModal 
                  setIsModalOpen={setIsForgotPasswordModalOpen}
                  />
                )
              }

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

                <button className="w-full h-10 mt-4 mx-auto rounded  bg-blue-500">
                  <span className="text-white" onClick={() => clearErrors()}>
                    Login
                  </span>
                </button>
              </form>
              <div className="flex justify-end">
              <a href="#" className="text-[#717c8b]" onClick={handleForgetPassword}>Forget Password</a>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default LoginPage;
