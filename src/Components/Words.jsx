import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import codes from "../codes.js";

const Words = () => {
  const [word, setWord] = useState("");
  const [syns, setSyns] = useState([]);
  const [notFound, setNotFound] = useState();
  const [type, setType] = useState("");
  const [selected, setSelected] = useState();
  const [prevWords, setPrevWords] = useState([]);
  const [prevSelected, setPrevSelected] = useState("");
  const [codesxd, setCodesxd] = useState(codes);
  {
    /*  const [start, setStart] = useState(false); */
  }

  useEffect(() => {
    const prevUp = JSON.parse(localStorage.getItem("prev")) || [];
    setPrevWords(prevUp);
  }, []);

  const handleSyn = (newWord) => {
    fetch(`https://api.datamuse.com/words?rel_${prevSelected}=${newWord}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setSyns(data);
          setNotFound(false);
          const prevs = [...prevWords, newWord];
          if (!prevWords.includes(newWord)) {
            setPrevWords(prevs.slice(-4).reverse());
          }
          localStorage.setItem("prev", JSON.stringify(prevs));
        } else {
          setSyns([]);
          setNotFound(true);
        }
      });
    setWord(newWord);
  };

  const submit = (e) => {
    e.preventDefault();
    fetch(`https://api.datamuse.com/words?rel_${type}=${word}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setSyns(data);
          setNotFound(false);
          setPrevWords((previes) => [...previes, word].slice(-4).reverse());
        } else {
          setSyns([]);
          setNotFound(true);
        }
      });
    const sel = codes.findIndex((item) => item.code === type);

    if (sel !== -1) {
      const obj = codes.splice(sel, 1)[0];
      codes.unshift(obj);
    }
    setCodesxd([...codes]);
  };

  const th = codes.find((code) => code.code === selected)?.name;

  return (
    <div className="container">
      <Navbar />
      <form
        className="form"
        onSubmit={(event) => {
          submit(event);
        }}
      >
        <label htmlFor="word">
          Type your word
          <input
            placeholder="a word"
            type="search"
            id="word"
            value={word}
            onChange={(event) => {
              setWord(event.target.value);
            }}
          />
        </label>
        <p>Last searched words:</p>
        <div className="prevs">
        
          {prevWords &&
            prevWords.map((prevs, index) => (
              <p
                key={index}
                onClick={() => {
                  handleSyn(prevs);
                }}
              >
                {prevs}
              </p>
            ))}
          
        </div>

        <p onClick={()=>{
              const clear = localStorage.clear()
              setPrevWords([clear])
            }}>Clear</p>

        <div className="options-container">
          {codesxd.map((code) => (
            <div key={code.code} className="option" title={code.description}>
              <button
                className={selected === code.code ? "seleccionado" : "button"}
                onClick={() => {
                  setPrevSelected(selected);
                  setType(code.code);
                  setSelected(code.code);
                }}
              >
                {code.name}{" "}
              </button>
            </div>
          ))}
        </div>
      </form>
      <div className="words-container">
        {notFound ? (
          <p>No words found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>
                  {th} for ({word}) {syns.length}
                </th>
              </tr>
            </thead>
            <tbody>
              {syns.map((syn) => (
                <tr key={syn.word}>
                  <td className="word" onClick={() => handleSyn(syn.word)}>
                    {syn.word}
                  </td>
                  {/*  <td>
                   {index+1} 
                  </td>*/}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Words;
