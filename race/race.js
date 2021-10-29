const $title = document.getElementById("racetitle")
const $start = document.getElementById("start");
const windowWidth = $(window).width();
const windowSm = 640
let bet = [
    {
        money : 0 //1匹目への掛け金
    },{
        money : 0 //2匹目への掛け金
    },{
        money : 0 //3匹目への掛け金
    },{
        money : 0 //4匹目への掛け金
    }
]
let charStatus = [
    {
        //1匹目のステータス
        no : 0, //番号
        speed : 0, //1歩進むのにかかる時間0に近いほど早い
        power : 0, //1歩の幅。大きいほど進める
        luck : 0, //1歩進める確率。大きいほど確率高
        condition : 0, //能力値のブレ。大きいほど調子が良い
        pace : 0 ,//大きいほど後半ペースアップ
        total: 0 ,//総合能力
        magnification:0//ばいりつ
    },{
        //2匹目のステータス
        no : 1, //番号
        speed : 0, //1歩進むのにかかる時間0に近いほど早い
        power : 0, //1歩の幅。大きいほど進める
        luck : 0, //1歩進める確率。大きいほど確率高
        condition : 0, //能力値のブレ。大きいほど調子が良い
        pace : 0, //大きいほど後半ペースアップ
        total: 0,
        magnification:0
    },{
        //3匹目のステータス
        no : 2, //番号
        speed : 0, //1歩進むのにかかる時間0に近いほど早い
        power : 0, //1歩の幅。大きいほど進める
        luck : 0, //1歩進める確率。大きいほど確率高
        condition : 0, //能力値のブレ。大きいほど調子が良い
        pace : 0, //大きいほど後半ペースアップ
        total: 0,
        magnification:0
    },{
        //4匹目のステータス
        no : 3, //番号
        speed : 0, //1歩進むのにかかる時間0に近いほど早い
        power : 0, //1歩の幅。大きいほど進める
        luck : 0, //1歩進める確率。大きいほど確率高
        condition : 0, //能力値のブレ。大きいほど調子が良い
        pace : 0 ,//大きいほど後半ペースアップ
        total: 0,
        magnification:0
    }]
let count = [{
    bet,//掛け金テキスト
    m:0//掛け金表示用数字
},{
    bet,
    m:0
},{
    bet,
    m:0
},{
    bet,
    m:0
},]
let mag = [{
    n:0
},{
    n:0
},{
    n:0
},{
    n:0
},]
let coin = 1000;//初期コイン(仮)
const animbox = document.getElementById('anim-box')
let stat = "start"//現在の画面の状態

//賭け画面のキャラ表示
const createCharacter = function(imgElement,no){
    //初期化
    bet[no].money=0;
    count[no].m=0;
    imgElement = document.createElement("img"); //img要素の追加
    imgElement.src = "img/mendako"+no+".png";
    imgElement.alt = "めんだこ"+String(no);
    imgElement.id = "mendako"+String(no);
    console.log(imgElement.id);
    //ウィンドウサイズによって大きさを変える
    if (windowWidth<=windowSm){
        //スマホ用
        imgElement.width = 100;
        imgElement.height = 93;        
    }else{
        //PC・タブレット
        imgElement.width = 140;
        imgElement.height = 132;
    }
    count[no].bet = document.createElement("div");//BET数の表示用の要素の作成
    count[no].bet.textContent = "掛け金"+count[no].m;//表示するテキスト
    mag[no].n = document.createElement("div");//強さ表示する用の要素
    mag[no].n.textContent = "倍率"+charStatus[no].magnification;
    mag[no].n.classList.add("total");
    //ボタンを押された時の処理
    imgElement.addEventListener('click',function(){
        if(stat==="BET"&& coin >=10){
            bet[no].money += 10;//掛け金を増やす
            count[no].m += 10;
            coin -= 10
        }
        count[no].bet.textContent = "掛け金"+count[no].m;//掛け金を表示するテキスト
        $title.textContent = "所持金"+coin
        console.log(count[no].bet);
        console.log(imgElement.alt+':'+bet[no].money);
    })
    animbox.appendChild(imgElement);
    animbox.appendChild(count[no].bet);
    animbox.appendChild(mag[no].n);
}

//ステータス決定
const createStatus = function(no){
    let random = new Uint8Array(1); //0~255の乱数を作る
    window.crypto.getRandomValues(random);
    charStatus[no].pace = (10000+Math.round(random[0]/255*200))/10000;//1.00~1.02 
    startPace = Math.round((charStatus[no].pace ** 5)*100)/100;
    console.log(startPace)
    window.crypto.getRandomValues(random);
    charStatus[no].speed = (10*startPace);//10
    window.crypto.getRandomValues(random);
    charStatus[no].power = (15+Math.round(random[0]/255*10)/startPace);//15~25
    window.crypto.getRandomValues(random);
    charStatus[no].luck = (70+Math.round(random[0]/255*20)/startPace);//70~90
    charStatus[no].total = Math.round(((charStatus[no].power-15)/10*130 + (charStatus[no].luck-70)/20*70)/2)//総合評価
    charStatus[no].condition = 4;
    console.log(charStatus[no])
}

//倍率決定
const decideMagnification=(no,ave)=>{
    charStatus[no].magnification = Math.round(ave /charStatus[no].total *3 *10) /10 // 平均/総合能力*２＝倍率
    console.log('倍率'+charStatus[no].magnification)
}

//賭け画面作成・能力値決め
const BET = function(){
    $title.textContent = "どのキャラにかける？"
    i=0;
    while (i < 4){
        createStatus(i); 
        i++;
    }
    average=0 // 平均値の初期化
    totalSum=0 //合計地の初期化
    i=0;
    while(i<4){
        totalSum += charStatus[i].total// 平均用の合計値
        i++;
    }
    average = totalSum/4 // 平均値

    i=0;
    while(i < 4){
        //作られたステータスをもとに倍率、キャラクター本体を作っていく
        decideMagnification(i,average);
        createCharacter(i,i);
        i++;
    }
}

//レースキャラの設置
const receSet = function(i){
    count[i].bet.remove();
    mag[i].n.remove();
    if (windowWidth<=windowSm){ //スマホ用の処理
        cher = document.getElementById("mendako"+i);
        cher.width = 60;
        cher.height = 54;
        cher.style.top = "0px";
        cher.style.left = i*9+"%";        
    }else{ //PC、タブレットの処理
        cher = document.getElementById("mendako"+i);
        cher.width = 55;
        cher.height = 50;
        cher.style.top = "0px";
        cher.style.left = i*20+10+"%";
    }
}

//レース画面へ
const rece = function(){
    console.log(windowWidth)
    console.log("rece!")
    i=0;
    while(i<4){
        receSet(i);
        i++;
    } 
    //線を引く
    line = document.createElement('p');
    line.id = "line";
    line.style = "border-bottom:3px solid";
    animbox.appendChild(line);
    //上の文字を変える
    $title.textContent = 'レース準備完了！！スタートを押そう！！';
}   
let finish = false
//レース本編
class RaceMain{
    constructor(obj){
        this.no = obj.no;
        this.characterId = document.getElementById(obj.characterId);
        this.spd = obj.spd;
        this.Top = obj.Top;
        finish = false;
        this.Top = 0; //キャラの進み具合の初期化
        this.spd = 0; //進行メーターの初期化
    }
    run(){
        let array = new Uint8Array(1); //0~255の乱数を作る
        this.spd++;
        if(this.spd>charStatus[this.no].speed){
            //luckが乱数より高ければ進める
            window.crypto.getRandomValues(array);
            if (array[0]<=charStatus[this.no].luck){
                this.Top += charStatus[this.no].power;//パワー分だけ進める
                this.characterId.style.top = this.Top + "px";
                this.spd = 0;
                charStatus[this.no].speed *= 2-charStatus[this.no].pace;
                charStatus[this.no].power *= charStatus[this.no].pace;
                charStatus[this.no].luck *= charStatus[this.no].pace;
            }else{
                
            }if (this.Top>395){
                //if文だらけでくそ見ずらいゾーン
                if(finish===false){
                    //1位の処理
                    if(bet[this.no].money>0){
                        coin += bet[this.no].money * charStatus[this.no].magnification //賭けた金額*倍率分賞金がもらえる
                        //勝ったメンダコに賭けていたら褒められる
                        $title.textContent =this.no+1+'番の勝ちおめでとう！  所持金：'+coin;
                        
                    }else{
                        //賭けていなければ通常メッセージ
                        $title.textContent =this.no+1+'番の勝ち  所持金'+coin;                        
                    }
                    //勝利アニメーションとレース終了の設定
                    this.characterId.classList.add('animate');
                    finish = true;
                }else{
                    //敗北アニメーション
                    this.characterId.classList.add('loseAnimate')
                }
                //インターバルを止める
                clearInterval(this.id);
                //ボタンを再表示＆テキスト表示
                $start.style.display ="block";
                $start.textContent = "もう一度";
            }
        }
    }
    id = setInterval(this.run.bind(this),90);
}
//レース本編へのつなぎ
const receMain = function(){
    $title.textContent = "レース開始！！"
    new RaceMain({
        no : 0,
        characterId : "mendako0",
        spd : 0,
        Top : 0
    });
    new RaceMain({
        no : 1,
        characterId : "mendako1",
        spd : 0,
        Top : 0
    });
    new RaceMain({
        no : 2,
        characterId : "mendako2",
        spd : 0,
        Top : 0
    });
    new RaceMain({
        no : 3,
        characterId : "mendako3",
        spd : 0,
        Top : 0
    });
}

//新しいレースが始まったときに前のキャラクターを消す
const characterDelete = function(i){
    cher = document.getElementById("mendako"+i);
    cher.remove();
}


$start.addEventListener("click",function(){
    if(stat==="start"){
        BET(); //賭け場面へ移動
        stat = "BET";//状態を賭け場面へ
    }
    else if (stat==="BET"){
        console.log(stat);
        rece();//レース画面へ移動
        stat = "receset";//状態をレース状態に
    }
    else if (stat==="receset"){
        console.log(stat);
        $start.style.display ="none";
        stat = "rece";
        receMain();
    }
    else if (stat === "rece"){
        stat = "BET";
        i = 0;
        while (i <4){
            characterDelete(i);
            i++;
        }
        line = document.getElementById('line');
        line.remove();
        BET();
        $start.textContent = "スタート"
    }
})

