import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberallowed, setNumberAllowed] = useState(false);
  const [charcterallowed, setChartcterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const paaswordRef = useRef(null)

  const randomPasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberallowed)  str = str + "1234567890";
    if (charcterallowed)  str = str + "!@#$%^&*()_+{}?";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass = pass + str.charAt(char);
    }
    setPassword(pass);
    console.log("inside")
  }, [length, numberallowed, charcterallowed, setPassword]);

  useEffect(() => {
    randomPasswordGenerator()
  }, [length, numberallowed, charcterallowed, randomPasswordGenerator]);

  const copyToClipboard = () => {
    paaswordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }

  return (
    <>
      <div>
        <div className="flex">
          <input ref={paaswordRef} className="border border-black" type="text" value={password} placeholder="password" readOnly />
          <button className="border border-blue-700" onClick={copyToClipboard}>copy</button>
        </div>
        <div className="flex">
          <div>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={numberallowed}
              onChange={() => {setNumberAllowed((prev) => !prev)}}
            />
            <label>Number</label>
          </div>
          <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charcterallowed}
              id="characterInput"
              onChange={() => {
                  setChartcterAllowed((prev) => !prev )
              }}
          />
          <label>Characters</label>
      </div>
        </div>
      </div>
    </>
  );
}

export default App;
