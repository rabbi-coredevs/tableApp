import NotFoundImg from '../../assets/Content.png'

const NotFound = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
        <img className='h-auto' src={NotFoundImg} alt="not found" />
      
    </div>
  )
};

export default NotFound;
