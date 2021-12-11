// INITIAL DATA
let currentWord;
let currentWordValidator;
let currentGuess = "";
let guessedLetters = [];
let targetScore = 0;
let currentScore = 0;
let currentMisses = 0;
let miss = true;
let valid = true;

let playerBody = document.querySelector(".jogo .body");
let cemiterio = document.querySelector(".cemiterio");
let result = document.querySelector(".results");
let input = document.querySelector("#guess");

// EVENTS
input.addEventListener("keyup", (event) => {
  if(event.keyCode === 13) {
    event.preventDefault();
    document.querySelector(".header .input .btn").click();
  }
});
document.querySelectorAll(".play-btn").forEach(button => button.addEventListener("click", generateWord));
document.querySelector(".header .input .btn").addEventListener("click", () => {
  currentGuess = input.value.toUpperCase();
  input.value = "";
  showGuess();
});

// FUNCTIONS
function generateWord() {
  // Escolhe uma palavra aleatória da lista, sem repetir com a anterior
  let random = Math.floor(Math.random() * 300);
  let aux = palavras[random].toUpperCase();
  while(aux == currentWord) {
    random = Math.floor(Math.random() * 300);
    aux = palavras[random].toUpperCase();
  }
  currentWord = aux;

  // Verifica se a palavra possui espaços
  currentWordValidator = currentWord.split(/\s/);
  valid = (currentWord.length == currentWordValidator[0].length) ? true : false;
  beginGame();
}

function beginGame() {
  let button = document.querySelector(".play-btn");
  let title = document.querySelector("body .container h1");
  let forms = document.querySelector("body .container .input");
  let game = document.querySelector(".jogo");
  let letras  = document.querySelector(".jogo-letras");

  // Limpa os dados
  input.disabled = false;
  currentGuess = "";
  cemiterio.innerHTML = "";
  guessedLetters = [];
  targetScore = 0;
  currentScore = 0;
  currentMisses = 0;

  // Faz o botão, título e palavra anterior desaparecerem
  title.style.visibility = "hidden";
  title.style.opacity = 0;
  button.style.visibility = "hidden";
  button.style.opacity = 0;
  result.style.visibility = "hidden";
  result.style.opacity = 0;
  letras.style.visibility = "hidden";
  letras.style.opacity = 0;
  document.querySelector(".body .body-head").style.visibility = "hidden";
  document.querySelector(".body .body-head").style.opacity = 0;
  document.querySelector(".body .noose").style.visibility = "hidden";
  document.querySelector(".body .noose").style.opacity = 0;
  document.querySelector(".body-body").style.visibility = "hidden";
  document.querySelector(".body-body").style.opacity = 0;
  document.querySelector(".body-arms .right-arm").style.visibility = "hidden";
  document.querySelector(".body-arms .right-arm").style.opacity = 0;
  document.querySelector(".body-arms .left-arm").style.visibility = "hidden";
  document.querySelector(".body-arms .left-arm").style.opacity = 0;
  document.querySelector(".body-legs .right-leg").style.visibility = "hidden";
  document.querySelector(".body-legs .right-leg").style.opacity = 0;
  document.querySelector(".body-legs .left-leg").style.visibility = "hidden";
  document.querySelector(".body-legs .left-leg").style.opacity = 0;
  document.querySelector(".body-arms .right-arm").style.transform = "rotate(-55deg)";
  document.querySelector(".body-arms .left-arm").style.transform = "rotate(55deg)";
  document.querySelector(".body-legs .right-leg").style.transform = "rotate(-65deg)";
  document.querySelector(".body-legs .left-leg").style.transform = "rotate(65deg)";
  setTimeout(() => {
    title.style.display = "none";
    button.style.display = "none";
    playerBody.style.display = "none"
    result.style.display = "none";
  }, 500);

  // Faz os elementos do jogo aparecerem
  setTimeout(() => {
    forms.style.display = "flex";
    game.style.display = "flex";
    cemiterio.style.display = "flex";
    setTimeout(() => {
      forms.style.visibility = "visible";
      forms.style.opacity = 1;
      game.style.visibility = "visible";
      game.style.opacity = 1;
      cemiterio.style.visibility = "visible";
      cemiterio.style.opacity = 1;
    }, 10);
  }, 505);

  // Mostra os espaços na tela.
  setTimeout(() => {
    showSpaces();
    letras.style.visibility = "visible";
    letras.style.opacity = 1;
  }, 600);
}

function showSpaces() {
  let field;
  let word;
  let aux;
  let letterFields = document.querySelector(".jogo-letras");
  letterFields.innerHTML = "";

  // Palavra única
  if(valid) { 
    aux = 0;
    targetScore = currentWord.length;

    word = document.createElement("div");
    word.classList.add("palavra");

    for(let i = 0; i < currentWord.length; i++) {
      aux++;

      field = document.createElement("div");
      field.classList.add("letra-palavra");
      field.innerHTML = "";
      
      word.appendChild(field);
    }

    letterFields.appendChild(word);

    // Verifica se a palavra é muito longa
    if(aux >= 10) {
      document.querySelectorAll(`.jogo-letras .palavra:nth-child(${1}) .letra-palavra`).forEach(letter => {
        letter.style.width = "60px" ;
        letter.style.fontSize = "50px";
      });
    }

    // Múltiplas palavras
  } else { 
    for(let i = 0; i < currentWordValidator.length; i++) {
      aux = 0;

      targetScore += currentWordValidator[i].length;

      word = document.createElement("div");
      word.classList.add("palavra");

      for(let j = 0; j < currentWordValidator[i].length; j++) {
        aux++;
        field = document.createElement("div");
        field.classList.add("letra-palavra");
        field.innerHTML = "";

        word.appendChild(field);
      }

      letterFields.appendChild(word);

      // Verifica se a palavra é muito longa
      if(aux >= 10) {
        document.querySelectorAll(`.jogo-letras .palavra:nth-child(${i+1}) .letra-palavra`).forEach(letter => {
          letter.style.width = "60px" ;
          letter.style.fontSize = "50px";
        });
      }
    }
  }
}

function showGuess() {
  miss = true;
  // Retira os espaços das palavras se aplicável
  currentWord = currentWord.replace(/\s/g,"");
  currentGuess = currentGuess.replace(/\s/g,"");

  // Verifica se o usuário digitou algo
  if(currentGuess != "") { 

    // Validação do chute de uma única letra
    if(currentGuess.length == 1) { 

      // Verifica se a letra ja foi chutada
      for(let i = 0; i < guessedLetters.length; i++) if(currentGuess == guessedLetters[i]) return false;
      guessedLetters.push(currentGuess);

      // Verifica se a letra chutada faz parte da palavra
      for(let i = 0; i < currentWord.length; i++) checkGuess(i);

      // Verifica se errou o chute para chamar a função de erro
      if(miss) {
        wrongGuess();
        if(currentMisses == 7) {
          showResults();
        }
      } else {
        if(currentScore == targetScore) {
          showResults();
        }
      }
      
      // Validação do chute da palavra inteira
    } else { 
      let hasGuessed;

      if(currentGuess == currentWord) {
        currentScore = targetScore;

        // Mostra a palavra inteira
        for(let i = 0; i < currentGuess.length; i++) {
          hasGuessed = false;

          for(let j = 0; j < guessedLetters.length; j++) {
            if(currentGuess[i] == guessedLetters[j]) {
              hasGuessed = true;
              break;
            }
          }

          if(!hasGuessed) checkGuess(i);
        }

        // Tela de resultados
        setTimeout(() => {
          showResults();
        }, 100);

      } else {
        for(let i = currentMisses; i < 7; i++){
          wrongGuess();
        }
        setTimeout(() => {
          showResults();
        }, 100);
      }
    }
  }
}

function checkGuess(index) {
  let field = document.querySelectorAll(`.letra-palavra`);
  switch(currentGuess) {
    case "A":
      if(currentGuess == currentWord[index]) {
        field[index].innerHTML = "A";
        miss = false;
        currentScore += 1;
      } else if("\u00c1" == currentWord[index]) {
        field[index].innerHTML = "\u00c1";
        miss = false;
        currentScore += 1;
      } else if("\u00c0" == currentWord[index]) {
        field[index].innerHTML = "\u00c0";
        miss = false;
        currentScore += 1;
      } else if("\u00c2" == currentWord[index]) {
        field[index].innerHTML = "\u00c2";
        miss = false;
        currentScore += 1;
      } else if("\u00c3" == currentWord[index]) {
        field[index].innerHTML = "\u00c3";
        miss = false;
        currentScore += 1;
      }
    break

    case "E":
      if(currentGuess == currentWord[index]) {
        field[index].innerHTML = "E";
        miss = false;
        currentScore += 1;
      } else if("\u00c9" == currentWord[index]) {
        field[index].innerHTML = "\u00c9";
        miss = false;
        currentScore += 1;
      } else if("\u00c8" == currentWord[index]) {
        field[index].innerHTML = "\u00c8";
        miss = false;
        currentScore += 1;
      } else if("\u00ca" == currentWord[index]) {
        field[index].innerHTML = "\u00ca";
        miss = false;
        currentScore += 1;
      }
    break

    case "I":
      if(currentGuess == currentWord[index]) {
        field[index].innerHTML = "I";
        miss = false;
        currentScore += 1;
      } else if("\u00cd" == currentWord[index]) {
        field[index].innerHTML = "\u00cd";
        miss = false;
        currentScore += 1;
      } else if("\u00cc" == currentWord[index]) {
        field[index].innerHTML = "\u00cc";
        miss = false;
        currentScore += 1;
      } else if("\u00ce" == currentWord[index]) {
        field[index].innerHTML = "\u00ce";
        miss = false;
        currentScore += 1;
      }

    break

    case "O":
      if(currentGuess == currentWord[index]) {
        field[index].innerHTML = "O";
        miss = false;
        currentScore += 1;
      } else if("\u00d3" == currentWord[index]) {
        field[index].innerHTML = "\u00d3";
        miss = false;
        currentScore += 1;
      } else if("\u00d2" == currentWord[index]) {
        field[index].innerHTML = "\u00d2";
        miss = false;
        currentScore += 1;
      } else if("\u00d4" == currentWord[index]) {
        field[index].innerHTML = "\u00d4";
        miss = false;
        currentScore += 1;
      } else if("\u00d5" == currentWord[index]) {
        field[index].innerHTML = "\u00d5";
        miss = false;
        currentScore += 1;
      } 

    break

    case "U":
      if(currentGuess == currentWord[index]) {
        field[index].innerHTML = "U";
        miss = false;
        currentScore += 1;
      } else if("\u00da" == currentWord[index]) {
        field[index].innerHTML = "\u00da";
        miss = false;
        currentScore += 1;
      } else if("\u00d9" == currentWord[index]) {
        field[index].innerHTML = "\u00d9";
        miss = false;
        currentScore += 1;
      } else if("\u00db" == currentWord[index]) {
        field[index].innerHTML = "\u00db";
        miss = false;
        currentScore += 1;
      }

    break

    case "C":
      if(currentGuess == currentWord[index]) {
        field[index].innerHTML = "C";
        miss = false;
        currentScore += 1;
      } else if("\u00c7" == currentWord[index]) {
        field[index].innerHTML = "\u00c7";
        miss = false;
        currentScore += 1;
      }

    break

    case currentWord:
      field[index].innerHTML = currentGuess[index];
    break

    default:
      if(currentGuess == currentWord[index]) {
        field[index].innerHTML = currentGuess;
        miss = false;
        currentScore += 1;
      }
    break
  }
}

function wrongGuess() {
  if(currentGuess.length == 1) {
    let deadLetter = document.createElement("div");

    deadLetter.classList.add("letra-cemiterio");
    deadLetter.innerHTML = currentGuess;
    cemiterio.appendChild(deadLetter);
  }

  switch(currentMisses) {
    case 0:
      playerBody.style.display = "flex";
      setTimeout(() => {
        document.querySelector(".body .body-head").style.visibility = "visible";
        document.querySelector(".body .body-head").style.opacity = 1;
        document.querySelector(".head-eyes .right-eye").innerHTML = "0";
        document.querySelector(".head-eyes .left-eye").innerHTML = "0";
        document.querySelector(".head-mouth").innerHTML = ")";
        document.querySelector(".body .noose").style.visibility = "visible";
        document.querySelector(".body .noose").style.opacity = 1;
      }, 5);
      currentMisses++;    
    break;
    
    case 1:
      setTimeout(() => {
        document.querySelector(".head-eyes .right-eye").innerHTML = "O";
        document.querySelector(".head-eyes .left-eye").innerHTML = "O";
        document.querySelector(".head-mouth").innerHTML = ")";
        document.querySelector(".body-body").style.visibility = "visible";
        document.querySelector(".body-body").style.opacity = 1;
      }, 5);
      currentMisses++;
    break;

    case 2:
      setTimeout(() => {
        document.querySelector(".head-eyes .right-eye").innerHTML = "o";
        document.querySelector(".head-eyes .left-eye").innerHTML = "o";
        document.querySelector(".head-mouth").innerHTML = ")";
        document.querySelector(".body-arms .right-arm").style.visibility = "visible";
        document.querySelector(".body-arms .right-arm").style.opacity = 1;
      }, 5);
      currentMisses++;
    break;

    case 3:
      setTimeout(() => {
        document.querySelector(".head-eyes .right-eye").innerHTML = ">";
        document.querySelector(".head-eyes .left-eye").innerHTML = "o";
        document.querySelector(".head-mouth").innerHTML = ")";
        document.querySelector(".body-arms .left-arm").style.visibility = "visible";
        document.querySelector(".body-arms .left-arm").style.opacity = 1;
      }, 5);
      currentMisses++;
    break;

    case 4:
      setTimeout(() => {
        document.querySelector(".head-eyes .right-eye").innerHTML = ">";
        document.querySelector(".head-eyes .left-eye").innerHTML = "<";
        document.querySelector(".head-mouth").innerHTML = ")";
        document.querySelector(".body-legs .right-leg").style.visibility = "visible";
        document.querySelector(".body-legs .right-leg").style.opacity = 1;
      }, 5);
      currentMisses++;
    break;

    case 5:
      setTimeout(() => {
        document.querySelector(".head-eyes .right-eye").innerHTML = ">";
        document.querySelector(".head-eyes .left-eye").innerHTML = "<";
        document.querySelector(".head-mouth").innerHTML = "|";
        document.querySelector(".body-legs .left-leg").style.visibility = "visible";
        document.querySelector(".body-legs .left-leg").style.opacity = 1;
      }, 5);
      currentMisses++;
    break;

    case 6:
      setTimeout(() => {
        document.querySelector(".head-eyes .right-eye").innerHTML = "X";
        document.querySelector(".head-eyes .left-eye").innerHTML = "X";
        document.querySelector(".head-mouth").innerHTML = "|";
        document.querySelector(".body-arms .right-arm").style.transform = "rotate(-75deg)";
        document.querySelector(".body-arms .left-arm").style.transform = "rotate(75deg)";
        document.querySelector(".body-legs .right-leg").style.transform = "rotate(-80deg)";
        document.querySelector(".body-legs .left-leg").style.transform = "rotate(80deg)";
      }, 5);
      currentMisses++;
    break;
  }

}

function showResults() {
  input.disabled = true;

  if(currentScore == targetScore) {
    document.querySelector(".result-img img").src = `assets/images/victory.png`;
    document.querySelector(".result-img img").alt = `victory icon`;
    document.querySelector(".result-title").innerHTML = `VITÓRIA`;
    document.querySelector(".result-info").innerHTML = `Parabéns, você acertou todas as letras de ${currentWord}!`;
  } else {
    document.querySelector(".result-img img").src = `assets/images/defeat.png`;
    document.querySelector(".result-img img").alt = `defeat icon`;
    document.querySelector(".result-title").innerHTML = `DERROTA`;
    document.querySelector(".result-info").innerHTML = `Não foi dessa vez! <br> Sua palavra era ${currentWord}!`;
  }

  setTimeout(() => {
    result.style.zIndex = 0;
    result.style.display = "flex";
    setTimeout(() => {
      result.style.visibility = "visible";
      result.style.opacity = 1;
    }, 50);
  }, 10);
}


