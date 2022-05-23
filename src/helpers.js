export function formatPrice(cents) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

export function validate(input, regex, expected) {
  let rgx;
  
  if (regex === "number")
  {
    rgx = /^[0-9\b]+$/;
  }

  else if (regex === "string")
  {
    rgx = /[A-Za-z0-9 _.,!"'/$]*/;
  }
  
  if (!rgx.test(input))
  {
      return {
        valid: false,
        message: "This field can contain only " + expected + "." 
      }
  }

  if (input === "")
  {
    return {
      valid: false,
      message: "This field cannot be blank."
    }
  }

  return {
    valid: true,
    message: ""
  };
}

export function fishValidation(values) {
  // currently there are three inputs that need to be validated - these can be updated easily by adding to the "expected" column
  let value = true;
  // name is a string
  const validName = validate(values[0], "string", "letters");
  // price is a number
  const validPrice = validate(values[1], "number", "numbers");
  // desc is a string
  const validDesc = validate(values[2], "string", "letters");
  console.log(validName["valid"]);
  if (!validName["valid"]) {
    value = false;
  }
  
  if (!validPrice["valid"]) {
    value = false;
  }

  if (!validDesc["valid"]) {
    value = false;
  }

  return { 
    value: value,
    validName: validName,
    validPrice: validPrice,
    validDesc: validDesc  
  }
  
}

export function fixNav() {
const nav = document.querySelector('.navbar');
const topOfNav = nav.offsetTop;
console.log('were');

    if (topOfNav <= window.scrollY)
    {
      document.body.style.paddingTop = nav.offsetHeight +'px';
      document.body.classList.add('fixed-nav');
    }
    else
    {
      document.body.style.paddingTop = 0;
      document.body.classList.remove('fixed-nav');
    }
}


export function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function getFunName() {
  const adjectives = [
    "adorable",
    "beautiful",
    "clean",
    "drab",
    "elegant",
    "fancy",
    "glamorous",
    "handsome",
    "long",
    "magnificent",
    "old-fashioned",
    "plain",
    "quaint",
    "sparkling",
    "ugliest",
    "unsightly",
    "angry",
    "bewildered",
    "clumsy",
    "defeated",
    "embarrassed",
    "fierce",
    "grumpy",
    "helpless",
    "itchy",
    "jealous",
    "lazy",
    "mysterious",
    "nervous",
    "obnoxious",
    "panicky",
    "repulsive",
    "scary",
    "thoughtless",
    "uptight",
    "worried"
  ];

  const nouns = [
    "teeth",
    "leaves",
    "mice",
    "geese",
    "halves",
    "knives",
    "lives",
    "elves",
    "loaves",
    "potatoes",
    "tomatoes",
    "cacti",
    "foci",
    "fungi",
    "nuclei",
    "syllabuses",
    "analyses",
    "diagnoses",
    "oases",
    "theses",
    "crises",
    "phenomena",
    "criteria",
    "data"
  ];

  return `${rando(adjectives)}-${rando(adjectives)}-${rando(nouns)}`;
}
