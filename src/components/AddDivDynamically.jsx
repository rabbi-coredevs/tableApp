import React, { useState } from 'react';

const AddDivDynamically = () => {
  const [divs, setDivs] = useState([]);

  const addDiv = () => {
    setDivs([...divs, 
         <div
         key={divs.length} 
         className="w-1/2 bg-white h-10 border"
         >
         Div {divs.length}
         <button onClick={() => removeDiv(divs.length)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded">Remove</button>
         </div>]);
  };

  const removeDiv = (indexToRemove) => {
    const newDivs = divs.filter((div, index) => index !== indexToRemove);
    setDivs(newDivs);
  };

  return (
    <div>
      <button className="ml-2 px-2 py-1 bg-blue-500 text-white rounded" onClick={addDiv}>Add Div</button>
      <div>
        {divs.map((div, index) => (
          <React.Fragment key={index}>
            {div}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AddDivDynamically;
