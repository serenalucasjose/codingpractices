const _ = require('lodash');

document.addEventListener("DOMContentLoaded", () => {

  // URL Parser
  function parseUrl() {
    const { value: url } = document.querySelector('#url-input');
    const result = _
      .chain(url)
      .split(/(?:\/|\?|&)+/)
      .compact()
      .map(i => {
        return _.replace(i,/^.+=/,'');
      })
      .value();

    const [version, ,collection,id,sort,limit] = result;

    const paramsSnapshot = JSON.stringify({
      version,
      collection,
      id,
      sort,
      limit
    });

    return paramsSnapshot;
  }

  function printResult(str) {
    const textArea = document.querySelector('#url-output');
    textArea.value = str;
  }

  // JS Zoo Prototype
  function Animal(animalType) {
    this.animalType = animalType;
    this.phrase = () => {
      let phrase = "";
      switch (this.animalType) {
        case "Lion":
          phrase = "I\'m a lion";
          break;
        case "Tiger":
          phrase = "Lion sucks!";
          break;
        default:
          phrase = "Guess i don't know what kind of animal i am!"
          break;
      }
      return phrase;
    }
    this.speak = () => `The ${this.animalType} says ${this.phrase()}`;
  }

  /* App common logic */

  // Parse URL onClick
  const urlParseButton = document.querySelector('#url-parse-button');
  urlParseButton.addEventListener('click', () => {
    printResult(parseUrl());
  });
  
  // Init Zoo
  const lionButton = document.querySelector('#lion-details');
  const tigerButton = document.querySelector('#tiger-details');
  lionButton.addEventListener('click', ()=> {
    const lion = new Animal("Lion");
    document.querySelector('#lion-phrase').innerHTML = `<em>${lion.speak()}</em>`;
  });
  tigerButton.addEventListener('click', ()=> {
    const tiger = new Animal("Tiger");
    document.querySelector('#tiger-phrase').innerHTML = `<em>${tiger.speak()}</em>`;
  });
});