import { saveAs } from "file-saver";
import JSZip from "jszip";
import { useRef, useState } from "react";

const Zip = () => {
  const fileInputRef = useRef();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleZipDownload = () => {
    if (!file) {
      alert("Please upload a file.");
      return;
    }

    var zip = new JSZip();
    zip.file("Hello.txt", "Hello World\n");
    // var img = zip.folder("images"); //create a folder name images
    //img.file(file.name, file) //if you want to add your image in a folder
    zip.file(file.name, file);
    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "myzip.zip");
    });
  };

  return (
    <div className="border w-1/3 flex flex-col items-center justify-center">
      <h1 className="text-white text-3xl text-center">Upload your file here</h1>
      <div>
        <label className="text-white text-[16px]">Upload File</label>
        <input
          className="hidden"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
      {file ? (
        <div className="flex gap-2">
          <p>{file.name} Uploaded</p>
          <p
            className="text-red-600"
            onClick={() => setFile(null)}
          >
            Cancel
          </p>
        </div>
      ) : (
        <div
          className="bg-[#112f4b] p-1 rounded-md cursor-pointer"
          onClick={() => fileInputRef.current.click()}
        >
          Choose File
        </div>
      )}
      <button className="p-3 text-white bg-emerald-500" onClick={handleZipDownload}>
        Download as zip
      </button>
    </div>
  );
};

export default Zip;
