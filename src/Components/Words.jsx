import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Words = () => {
  const [word, setWord] = useState("");
  const [syns, setSyns] = useState([]);
  const [notFound, setNotFound] = useState();
  const [type, setType] = useState("");
  const [selected, setSelected] = useState();
  const [prevWords, setPrevWords] = useState([])
{/*  const [start, setStart] = useState(false); */}



    useEffect(()=>{
      const prevUp = JSON.parse(localStorage.getItem("prev")) || []
      setPrevWords(prevUp)
      
    }, [])



  const handleSyn = (newWord) => {
    fetch(`https://api.datamuse.com/words?rel_syn=${newWord}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setSyns(data);
          setNotFound(false);
          const prevs = [...prevWords, newWord]
          setPrevWords(prevs)
          localStorage.setItem("prev", JSON.stringify(prevs) )
        } else {
          setSyns([]);
          setNotFound(true);
        }
      });
    setWord(newWord);
  };

  useEffect(() => {
    fetch(`https://api.datamuse.com/words?rel_${type}=${word}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setSyns(data);
          setNotFound(false);
        } else {
          setSyns([]);
          setNotFound(true);
        }
      });
      
  }, [word, type]);



  const codes = [
    {
      code: "jja",
      name: "Popular Nouns Modified by Adjective",
      description:
        "Popular nouns modified by the given adjective, per Google Books Ngrams",
    },
    {
      code: "jjb",
      name: "Popular Adjectives Used to Modify Noun",
      description:
        "Popular adjectives used to modify the given noun, per Google Books Ngrams",
    },
    {
      code: "syn",
      name: "Synonyms",
      description: "Synonyms (words contained within the same WordNet synset)",
    },
    {
      code: "trg",
      name: "Triggers",
      description:
        "Triggers (words that are statistically associated with the query word in the same piece of text)",
    },
    { code: "ant", name: "Antonyms", description: "Antonyms (per WordNet)" },
    {
      code: "spc",
      name: "Kind of",
      description: "Kind of (direct hypernyms, per WordNet)",
    },
    {
      code: "gen",
      name: "More General Than",
      description: "More general than (direct hyponyms, per WordNet)",
    },
    {
      code: "com",
      name: "Comprises",
      description: "Comprises (direct holonyms, per WordNet)",
    },
    {
      code: "par",
      name: "Part of",
      description: "Part of (direct meronyms, per WordNet)",
    },
    {
      code: "bga",
      name: "Frequent Followers",
      description: "Frequent followers, per Google Books Ngrams",
    },
    {
      code: "bgb",
      name: "Frequent Predecessors",
      description: "Frequent predecessors, per Google Books Ngrams",
    },
    {
      code: "rhy",
      name: "Rhymes",
      description: "Rhymes (perfect rhymes, per RhymeZone)",
    },
    {
      code: "nry",
      name: "Approximate Rhymes",
      description: "Approximate rhymes, per RhymeZone",
    },
    {
      code: "hom",
      name: "Homophones",
      description: "Homophones (sound-alike words)",
    },
  ];

  const th = codes.find((code) => code.code === selected)?.name;
  console.log(prevWords)

  return (
    <div className="container">
      <Navbar />
      <div className="form">
        <label htmlFor="word">
          Type your word
          <input
            placeholder="a word"
            type="text"
            id="word"
            value={word}
            onChange={(event) => {
              setWord(event.target.value)
            }}
          />
        </label>
        <p>Last searched words :</p>
        <div className="prevs">
          
          {prevWords && prevWords.slice(-3).map(prevs => (
            <p key={prevs}>{prevs}</p>
          ))}
        </div>

        <div className="options-container">
          {codes.map((code) => (
            <div key={code.code} className="option" title={code.description}>
              <button
                className={selected === code.code ? "seleccionado" : "button"}
                onClick={() => {
                  setType(code.code);
                  setSelected(code.code);
                  
                }}
              >
                {code.name}{" "}
              </button>
            </div>
          ))}
        </div>
      </div>
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
