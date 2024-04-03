import { Controller, useForm } from "react-hook-form";
import Modal from "../Modal";
import DatePick from "./DatePick";
import DatePickerIcon from "../../assets/Icon (7).svg?react";
import UploadIcon from "../../assets/uploadFile 1.svg?react";
import { useRef, useState } from "react";
import { postApiCall } from "../../utils/apiCaller";
import CustomTimePicker from "./CustomTimePicker";

const MessageModal = ({ setIsModalOpen }) => {
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const fileInputRef = useRef();
  const [image, setImage] = useState({ preview: '', raw: '' });

  const handleImageChange = (event) => {
    setImage({
      preview: URL.createObjectURL(event.target.files[0]),
      raw: event.target.files[0]
    })
  };

  const onSubmit = (data) => {
    // console.log(typeof data.deletion_time);
    console.log(image)
    postApiCall("/message", data)
       .then(response =>{
        console.log(response)
        // setIsModalOpen(false)
       })
       .catch(error => {
        console.error('Error:', error); 
       });
  };

  
  return (
    <div className="">
      <Modal setIsModalOpen={setIsModalOpen} formInfo={{
          ModalTitle: "Send Message to All Users",
          buttonTitle: "Send Message to All Users",
        }}>


        <form className="" action="" onSubmit={handleSubmit(onSubmit)}>
          {/* implementing text area form message */}
          <div className="w-full">
            <label className="text-white text-base">Message</label>
            <Controller
              name="message"
              control={control}
              defaultValue=""
              rules={{ required: true, minLength: 10 }}
              render={({ field }) => (
                <div>
                  <textarea
                    className="w-full p-2 bg-[#121a27] text-white focus:outline-none"
                    placeholder="Enter your message here"
                    {...field}
                  />
                  {errors.message && errors.message.type === "minLength" && (
                    <p className="text-red-600">
                      Minimum length atleast 10 characters long
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div>
            <label className="text-white">Deletion Date</label>
            <Controller
              control={control}
              name="deletion_date"
              rules={{ required: "Deletion date is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <div>
                  <DatePick
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    DatePickerIcon={DatePickerIcon}
                  />
                  {errors.deletion_date && (
                    <p className="text-red-600">
                      {errors.deletion_date.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="">
            <label className="text-white text-[16px]">Deletion Time</label>
            <Controller
              control={control}
              name="deletion_time"
              rules={{ required: "Deletion time is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <div>
                  <CustomTimePicker
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    
                  />
                  {errors.deletion_time && (
                    <p className="text-red-600">
                      {errors.deletion_time.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div>
            <label className="text-white text-[16px]">Upload File</label>
            <input
              className="hidden"
              type="file"
              // accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>

          <div
            className="flex flex-col w-full h-[100px] items-center rounded-md bg-[#121a27] justify-between"
           
            style={{ cursor: "pointer", color: "white" }}
          >
            <div className="flex items-center gap-2">
              <UploadIcon />
              <p>Drag and Drop files here</p>
            </div>
            <div>Or</div>
            {
              image.preview?
              (<div className="flex gap-2">
                <p >{image.raw.name} Uploaded</p>
                <p className="text-red-600" onClick={()=>setImage({ preview: '', raw: '' })}>X</p>
              </div>)
              :
              (<div
                className="bg-[#112f4b] p-1 rounded-md" 
                onClick={() => fileInputRef.current.click()}
                >
                  Choose File
                </div>)
            }
          </div>

          <button className="w-full h-10 mt-4 mx-auto rounded  bg-blue-500">
            <span className="text-white" onClick={() => clearErrors()}>
            Send Message to All Users
            </span>
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default MessageModal;
