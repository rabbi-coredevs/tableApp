import { useParams } from "react-router-dom";

const ForgotPass = () => {
    const {token}=useParams();
  return (
    <div>
        {
            token
        }
      
    </div>
  )
};

export default ForgotPass;
