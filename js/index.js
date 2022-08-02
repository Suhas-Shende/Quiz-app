/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener('DOMContentLoaded', () => {
  const start = document.querySelector('#start');
  const display = document.querySelector('#time');
  const submit = document.querySelector('#btnSubmit');
  const reset = document.querySelector('#btnReset');
  const score = document.querySelector('#score');
  start.addEventListener('click', function (e) {
    let oneMinute = 60 * 1;   
    startTimer(oneMinute, display);
    document.querySelector('#quizBlock').style.display = 'block'; 
    start.style.display = 'none';
  });
  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: 'Which of these are names of national parks located in Madhya Pradesh?',
      o: ['Krishna and Kanhaiya', 'Kanha and Madhav', 'Ghanshyam and Murari', 'Girdhar and Gopal'],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: 'The wife of which of these famous sports persons was once captain of Indian volleyball team?',
      o: ['K.D.Jadav', 'Dhyan Chand', 'Prakash Padukone', 'Milkha Singh'],
      a: 3,
    },
    {
      q: 'Which of these spices is the smallest in size?',
      o: ['Ajwain', 'Jeera', 'Saunf', 'Methi Seeds'],
      a: 0,
    },
    {
      q: 'Which language the Brazilian people speak?',
      o: ['Spanish', 'Portuguese', 'Latin', 'Brazilian'],
      a: 1,
    },
    {
      q: 'Which country is NOT located in North America?',
      o: ['USA', 'Canada', 'Colombia', 'Mexico'],
      a: 2,
    }
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Calculate the score
  
  const calculateScore = () => {
    let score = 0;
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        // console.log(li);
        // console.log(r);
        liElement = document.querySelector('#' + li);
        // console.log(liElement);
        radioElement = document.querySelector('#' + r);
        // console.log(radioElement);

        if (quizItem.a == i) {
          //change background color of li element here
          liElement.style.backgroundColor = '#ddf2da'; 
        }

        if (radioElement.checked && quizItem.a === i) {
          // code for task 1 goes here                   
            score = score + 1;        
        }
      }
    });
    // submit.style.display = 'none';
    return score;
  };
  
  let quizSubmitted = 0;
  const startTimer = (duration, display) => {
    let timer = duration, minutes, seconds;
    let timerDown = setInterval(() => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ':' + seconds;
      if (display.textContent == '00:00'){
        totalScore = calculateScore();
        score.innerHTML = `Total score: ${totalScore}`;
        display.textContent = "Your time is up";
        submit.style.display = 'none';
        return
      }

      if(quizSubmitted === 1){
        clearInterval(timerDown);
        display.textContent = "Quiz submitted.";
      }

      if (--timer < 0){
        timer = duration;
      }
    }, 1000)
  }
  
  // submit button event listener
  submit.addEventListener('click', (e) => {
    e.preventDefault();
    totalScore = calculateScore();
    score.innerHTML = `Total score: ${totalScore}`;
    submit.style.display = 'none';
    quizSubmitted = 1;
  });
  // reset button event listener to reload the page
  reset.addEventListener('click', () => {
      window.location.reload();
    })
  // call the displayQuiz function
  displayQuiz();
});
