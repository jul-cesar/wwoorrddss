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

  export default codes