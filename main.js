(() => {

    //Создаем приветствие
    function createWelcome() {
        const label = document.createElement('label');
        const span = document.createElement('span');
        span.textContent = 'Количество карточек по вертикали / горизонтали';
        span.classList.add('welcome__span');
        const input = document.createElement('input');
        input.classList.add('welcome__input');
        input.size = '1';
        const button = document.createElement('button');
        button.textContent = 'Начать игру';
        button.classList.add('button');

        label.append(span, input);
        const welcomeSection = document.querySelector('.welcome');
        welcomeSection.append(label, button);

        return {
            label,
            input,
            button,
            welcomeSection,
        };
    };

    //Создаем завершение игры
    function createNext() {
        const button = document.createElement('button');
        button.textContent = 'Сыграть еще раз';
        button.classList.add('button');

        const nextSection = document.querySelector('.next');
        nextSection.append(button);
        nextSection.style.display = 'none';

        return {
            button,
            nextSection,
        };
    }

    //Функция создания массива с парными числами
    function createNumbers(count) {
        let arrNumbers = [1, 1];
        for (let i = 1; i < (Math.pow(count, 2) - 1); i += 2) {
            arrNumbers.push(arrNumbers[i] + 1);
            arrNumbers.push(arrNumbers[i] + 1);
        }
        return arrNumbers;
    }

    // Функция перемешивания массива
    function createMixNumbers(arr) {
        for (let i = 0; i < (arr.length - 1); ++i) {
            let j = Math.round(Math.random() * (arr.length - 1));
            let temp;
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }

    // Функция создания перемешенного массива 
    function startGame(count) {
        let mixNumbers = createMixNumbers(createNumbers(count));
        return mixNumbers;
    }

    //Функция проверки ввода input
    function checkInput(input) {
        if ((input.value % 2) === 0 && input.value > 1 && input.value < 11) {
            count = input.value;
        } else {
            count = 4;
        }
        return count;
    }

    document.addEventListener('DOMContentLoaded', () => {
        const welcome = createWelcome();
        const next = createNext();
        const main = document.querySelector('.main');
        const WAIT_TIME_GAME_MS = 6e4;
        let timeoutGame;

        welcome.button.addEventListener('click', () => {
            clearTimeout(timeoutGame);
            welcome.welcomeSection.style.display = 'none';
            main.style.display = 'flex';
            let startNumbers = startGame(checkInput(welcome.input));
            let cardArr = [];
            let count = 0;

            for (let i = 0; i < startNumbers.length; ++i) {
                const card = document.createElement('div');
                card.textContent = startNumbers[i];
                card.open = false;
                const container = document.querySelector('.container');
                card.style.width = (container.offsetWidth - ((checkInput(welcome.input) - 1) * 30)) / checkInput(welcome.input) + 'px';

                card.style.height = card.style.width;
                card.style.boxSizing = 'border-box';
                card.style.fontSize = (parseInt(card.style.width) / 2) + 'px';
                card.style.padding = (parseInt(card.style.width) / 5) + 'px';
                card.classList.add('main__card');

                main.append(card);

                card.addEventListener('click', () => {
                    card.open = true;
                    card.style.color = '#fff';
                    card.style.backgroundImage = 'none';
                    card.style.backgroundColor = '#20B2AA';
                })

            };

            main.addEventListener('click', () => {
                count++;
                cardArr = document.querySelectorAll('.main__card');
                const WAIT_TIME_MS = 250;
                let timeout;

                if (count % 2 === 0) {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        for (let i = 0; i < cardArr.length; ++i) {
                            if (cardArr[i].open === true) {
                                for (let j = 0; j < cardArr.length; ++j) {
                                    if ((cardArr[j].open === true) && (i !== j)) {
                                        if (cardArr[i].textContent !== cardArr[j].textContent) {
                                            cardArr[i].style.backgroundImage = 'url("./img/back-card1.jpg")';
                                            cardArr[j].style.backgroundImage = 'url("./img/back-card1.jpg")';
                                            cardArr[i].style.color = 'transparent';
                                            cardArr[j].style.color = 'transparent';
                                            cardArr[i].open = false;
                                            cardArr[j].open = false;
                                        } else {
                                            cardArr[i].open = 'check';
                                            cardArr[j].open = 'check';
                                        }
                                    }
                                }
                            }
                        }
                    }, WAIT_TIME_MS);

                    let openArr = [];
                    for (let i = 0; i < cardArr.length; ++i) {
                        openArr.push(cardArr[i].open);
                    }

                    if (!openArr.includes(false)) {
                        next.nextSection.style.display = 'block';
                    };

                }

            })

            timeoutGame = setTimeout(() => {
                main.style.display = 'none';
                next.nextSection.style.display = 'block';
            }, WAIT_TIME_GAME_MS);

        })



        next.button.addEventListener('click', () => {
            main.style.display = 'none';
            next.nextSection.style.display = 'none';
            welcome.welcomeSection.style.display = 'block'
            welcome.input.value = '';
            const cardArr = document.querySelectorAll('.main__card');
            for (const card of cardArr) {
                card.remove();
            }
        })


    });
})();





