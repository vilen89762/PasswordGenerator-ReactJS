//Import React
import { React } from "react";

//Import Hooks
import { useCallback, useEffect, useState, useRef } from "react";

function Password() {
  //Create states for managing passwords
  const [length, setlength] = useState(8); //To manage length state
  const [isnumber, setnumber] = useState(false); //To manage number state
  const [ischar, setchar] = useState(false); //To manage character state
  const [password, setpassword] = useState(""); //To manage and update password state

  //Password Reference to Copy it
  const passwordref = useRef(null);

  //Callback function to optimize and memoize the generatePassword Function
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isnumber) str += "1234567890";
    if (ischar) str += "!@#$%^&*()_+-=";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
      setpassword(pass);
    }
  }, [length, isnumber, ischar, setpassword]);

  //UseEffect to run the function passwordGenerator
  useEffect(() => {
    passwordGenerator();
  }, [length, isnumber, ischar]);

  //Function to copy Password
  const copyPassword = useCallback(() => {
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  //Return HTML
  return (
    <>
      {/*Main Container*/}
      <div className="w-full py-11 px-3 my-8 rounded-md text-orange-600 max-w-screen-md bg-gray-700 mx-auto mt-32">
        {/*Heading Password Generator*/}
        <h1 className="text-white text-center text-2xl font-bold">
          Password Generator
        </h1>

        {/*Input Bar where password will displayed*/}
        <div className="mt-5 flex shadow rounded-lg overflow-hidden mb-3">
          <input
            className="outline-none rounded-md py-3 px-3 w-full"
            type="text"
            value={password}
            placeholder="Enter password"
            ref={passwordref}
            readOnly
          />
          {/*Copy Button mapped with copyPassword to copy Password*/}
          <button
            onClick={copyPassword}
            className="bg-blue-800 px-3 shrink-0 py-0.5 text-white"
          >
            copy
          </button>
        </div>

        {/*Input Bar for Length range mapped with setLength to change Length's Value*/}
        <div className="flex text-sm gap-x-5">
          <div className="flex items-center gap-x-3">
            <input
              onChange={(e) => setlength(e.target.value)}
              className="cursor-pointer"
              type="range"
              name=""
              id=""
              min={6}
              max={50}
              value={length}
            />
            <label className="text-xl">Length: {length}</label>
          </div>

          {/*Input Bar for number checkbosx mapped with setnumber to check if isnumber true of false*/}
          <div className="flex items-center gap-x-3">
            <input
              defaultChecked={isnumber}
              onChange={() => {
                setnumber((prev) => !prev);
              }}
              className="cursor-pointer"
              type="checkbox"
              id="numberinput"
            />
            <label className="text-xl">Numbers</label>
          </div>

          {/*Input Bar for character mapped with setchar to check if ischar true or false*/}
          <div className="flex items-center gap-x-3">
            <input
              defaultChecked={ischar}
              onChange={() => {
                setchar((prevs) => !prevs);
              }}
              className="cursor-pointer"
              type="checkbox"
              id="charinput"
            />
            <label className="text-xl">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

//Export Password Component
export default Password;
