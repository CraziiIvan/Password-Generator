import { useRef, useState } from "react";
import { Copy, Check } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [passCount, setPassCount] = useState(5);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const [displayPassword, setDisplayPassword] = useState("");

  const showPassRef = useRef(null);

  const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "1234567890",
    symbols: "!@#$%&*?",
  };

  function generatePassword() {
    let passwordDraft = characters.lowercase;

    if (includeUppercase) passwordDraft += characters.uppercase;
    if (includeNumbers) passwordDraft += characters.numbers;
    if (includeSymbols) passwordDraft += characters.symbols;

    let finalPassword = "";

    for (let i = 0; i < passCount; i++) {
      finalPassword +=
        passwordDraft[Math.floor(Math.random() * passwordDraft.length)];
    }

    setDisplayPassword(finalPassword);
  }

  function copyPasswordHandler() {
    navigator.clipboard.writeText(displayPassword);

    toast.success("Copy to the clipboard !", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <div className=" w-screen h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-400 to-indigo-800">
      <div className=" bg-white py-5 px-10 rounded-lg font-primary w-[410px]">
        <h1 className=" text-2xl font-medium mb-8">Password Generator</h1>
        <div className=" bg-zinc-50 border border-zinc-100 rounded-md text-zinc-800 pl-5 pr-2 py-2 items-center flex justify-between mb-7">
          <p ref={showPassRef} className="w-60 truncate">
            {displayPassword || "Password will appear in here"}
          </p>
          <button
            onClick={copyPasswordHandler}
            className=" p-2 rounded-md bg-white cursor-pointer active:scale-95  "
          >
            <Copy size={18} />
          </button>
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
        <input
          value={passCount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassCount(Number(e.target.value));
          }}
          type="range"
          step={1}
          min={5}
          max={20}
          className=" cursor-pointer w-full h-1.5 bg-sky-100 appearance-none rounded-lg mb-2"
        />
        <p className=" text-sm text-zinc-700 mb-5">
          Password length is {passCount}
        </p>
        <div className=" w-full px-5 py-3 rounded-md bg-zinc-50 border border-zinc-100 mt-2 flex justify-between">
          <span>Include Uppercase</span>
          <button
            onClick={() => setIncludeUppercase(!includeUppercase)}
            className={` flex items-center p-1 rounded-full active:scale-95 ${
              includeUppercase ? "bg-green-500" : "bg-zinc-300"
            }`}
          >
            <Check size={16} color="white" />
          </button>
        </div>
        <div className=" w-full px-5 py-3 rounded-md bg-zinc-50 border border-zinc-100 mt-2 flex justify-between">
          <span>Include Numbers</span>
          <button
            onClick={() => setIncludeNumbers(!includeNumbers)}
            className={` flex items-center p-1 rounded-full active:scale-95 ${
              includeNumbers ? "bg-green-500" : "bg-zinc-300"
            }`}
          >
            <Check size={16} color="white" />
          </button>
        </div>
        <div className=" w-full px-5 py-3 rounded-md bg-zinc-50 border border-zinc-100 mt-2 flex justify-between">
          <span>Include Symbols</span>
          <button
            onClick={() => setIncludeSymbols(!includeSymbols)}
            className={` flex items-center p-1 rounded-full active:scale-95 ${
              includeSymbols ? "bg-green-500" : "bg-zinc-300"
            }`}
          >
            <Check size={16} color="white" />
          </button>
        </div>
        <button
          onClick={generatePassword}
          className=" w-full text-center p-3.5 mt-10 bg-indigo-600 rounded-md font-medium text-white hover:bg-indigo-700"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
