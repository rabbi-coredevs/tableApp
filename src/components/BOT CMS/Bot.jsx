import { useState } from 'react';
import EditIcon from '../..//assets/Group.svg?react';
import CloseIcon from '../..//assets/Close.svg?react';
import SaveIcon from '../..//assets/Save.svg?react';

import botText from './BotText.json';

const Bot = () => {
    const [data, setData] = useState(botText);

    const handleEdit = (id) => {
        setData(prevData => prevData.map(item => ({
            ...item,
            isEditOpen: item._id === id,
            isEditing: item._id === id // Toggle isEditing property
        })));
    };

    const handleCancel = (id) => {
        setData(prevData => prevData.map(item => ({
            ...item,
            isEditOpen: false,
            isEditing: false // Reset isEditing property
        })));
    };

    const handleSave = (id) => {
        setData(prevData => prevData.map(item => {
            if (item._id === id) {
                const newText = document.getElementById(`text-${id}`).innerText;
                return {
                    ...item,
                    isEditOpen: false,
                    isEditing: false,
                    text: newText
                };
            }
            return item;
        }));
    };

    return (
      <div className="m-5 bg-[#141F2F] rounded-lg flex text-white">
        <div>
          {data.map((item, index) => (
            <div className="px-5 py-[10px] w-full" key={index}>
              <div className={`bg-[#141c29] rounded-md p-5 `}>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-[18px]">{item.title}</div>
                  {item.isEditOpen ? (
                    <div className="flex gap-3">
                      <div
                        className="flex text-white bg-red-700 text-[14px]  px-3 py-2 rounded items-center gap-1 cursor-pointer select-none"
                        onClick={() => handleCancel(item._id)}
                      >
                        <CloseIcon />
                        <span>Cancel</span>
                        
                      </div>
                      <div
                        className="flex text-white bg-blue-700 text-[14px]  px-3 py-2 rounded items-center gap-1 cursor-pointer select-none "
                        onClick={() => handleSave(item._id)}
                      >
                        <SaveIcon />
                        <span>Save</span>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="flex items-center text-white text-[14px] border-[1px] px-3 py-2 rounded  gap-1 cursor-pointer select-none"
                      onClick={() => handleEdit(item._id)}
                    >
                      <EditIcon />
                      <span>Edit</span>
                    </div>
                  )}
                </div>
                <div
                  className={`bg-[#1f2733] px-5 py-4 rounded-md ${item.isEditing ? 'border-2 border-blue-500' : ''}`}
                  id={`text-${item._id}`}
                  contentEditable={item.isEditOpen} // Allow editing only if isEditOpen is true
                >
                  {item.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Bot;
