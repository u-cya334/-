const quiz = [
    {
        question : 'てすと１',
        answers : [
            'テスト回答１',
            'テスト回答２',
            'テスト回答３',
            'テスト回答４'
        ],
        correct : "テスト回答４"
    },{
        question : 'てすと2',
        answers : [
            'test回答１',
            'test回答２',
            'test回答３',
            'test回答４'
        ],
        correct : "test回答２"
    },{
        question : 'てすと3',
        answers : [
            'テスト回答１',
            'テスト回答２',
            'テスト回答３',
            'テスト回答４'
        ],
        correct : "テスト回答１"
    }

];
const quizLength = quiz.length;
let quizIndex = 0;
let score = 0;

const $button = document.getElementsByTagName('button')
const buttonLength = $button.length;

//文字列をHTMLに反映させる
const setupQuiz = function(){
    document.getElementById("js-question").textContent = quiz[quizIndex].question;
    let buttonIndex = 0;

    while(buttonIndex < buttonLength){
        $button[buttonIndex].textContent = quiz[quizIndex].answers[buttonIndex];
        buttonIndex++;
    }    
}
setupQuiz()

const clickBotton = (elm) => {
    if(quiz[quizIndex].correct === elm.textContent){
        window.alert("正解");
        score ++;
    } else {
        window.alert("不正解");
    }

    quizIndex++;

    if(quizIndex < quizLength){
        setupQuiz()
    } else {
        window.alert('終了!あなたのスコアは' + score + '/' + quizLength + "です。")
};
}

let buttonIndex = 0;
while(buttonIndex < buttonLength){
    $button[buttonIndex].addEventListener("click", (e) => {
        clickBotton(e.target);
    });
    buttonIndex++;
}
//eはマウスイベント。何のボタンが押されたかが分かる

