const res1=document.querySelector('.geti')
let rpshtml=''
let result=''
score=JSON.parse(localStorage.getItem('score')) 
    || 
    {win:0,
        loss:0,
        tie:0
    };
let id=null;
const res2=document.querySelector('.move');
const res3=document.querySelector('.reset');
const res4=document.querySelector('.res');
const res5=document.querySelector('.auto');
const res6=document.querySelector('.mess');
res5.addEventListener('click',()=>autoPlay())
res3.addEventListener('click',()=> sure())
display()
show()
function show(){
    res4.innerHTML=`
            <P class='text'>win:${score.win},loss:${score.loss},tie:${score.tie}</p>
        `
}
function display(){
    let html=''
    array1=['rock','paper','scissors']
    array1.forEach((value)=>{
        html=`
            <button class='but1' onclick="compMove=computerMove(); resultDisplay('${value}',compMove)">
                <img class='imga' src='./imga/${value}-emoji.png'>
            </button>
        `
        rpshtml+=html
    })
    res1.innerHTML=rpshtml
}
function computerMove(){
    let val=Math.random()
    if(val<(1/3))
        return 'rock'
    else if(val<2/3)
        return 'paper'
    else
        return 'scissors'
}
function resultDisplay(myMove,compMove){
    score=JSON.parse(localStorage.getItem('score')) || {win:0,
        loss:0,
        tie:0
    };
    if(myMove=='rock')
    {
        if(compMove==='paper')
        {
            result='loss'
            score.loss+=1
        }
        else if(compMove==='scissors')
        {
            result='Win'
            score.win+=1
        }
        else
        {
            result='Tie'
            score.tie+=1
        }
    }
    else if(myMove=='paper')
    {
        if(compMove==='scissors')
        {
            result='loss'
            score.loss+=1
        }
        else if(compMove==='rock')
        {
            result='Win'
            score.win+=1
        }
        else
        {
            result='Tie'
            score.tie+=1
        }
    }
    else if(myMove=='scissors')
    {
        if(compMove==='rock')
        {
            result='loss'
            score.loss+=1
        }
        else if(compMove==='paper')
        {
            result='Win'
            score.win+=1
        }
        else
        {
            result='Tie'
            score.tie+=1
        }
    }
    localStorage.setItem('score',JSON.stringify(score))
    res2.innerHTML=`
        <p class='text2'>${result}</p>
        you <img class='imga' src='./imga/${myMove}-emoji.png'> computer Move<img class='imga' src='./imga/${compMove}-emoji.png'>
      `
    res4.innerHTML=`
        <P class='text'>win:${score.win},loss:${score.loss},tie:${score.tie}</p>
      `
}
function reset(){
    localStorage.removeItem('score')
    score={win:0 ,loss:0, tie:0};
    res2.innerHTML=''
    show()
}
function autoPlay(){
    if(!res5.classList.contains('autoPlay')){
       id=setInterval(
        ()=>{
            myMove=computerMove()
            compMove=computerMove()
            resultDisplay(myMove,compMove)}
            ,1000)
        res5.classList.add('autoPlay')
        res5.innerText='Stop Play'
    }
    else{
        clearInterval(id)
        res5.classList.remove('autoPlay')
        res5.innerHTML='Auto Play'
    }
}
document.body.addEventListener('keydown',(event)=>KeyEvents(event.key))
function KeyEvents(event1){
    if(event1==='a')
        autoPlay()
    else if(event1 === 'Backspace')
    {
        sure()
    }
}
function sure(){
    res6.innerHTML=`
        <p class='move-res'>Are you sure you want to reset the score?</p>
        <div class='reset-confirmation'>
            <button class='but2 yes-bu'>Yes</button>
            <button class='but2 no-bu'>No</button>
        </div>
    `
    document.querySelector('.yes-bu').addEventListener('click',()=>{ 
        reset();
        res6.innerHTML=''
    })
    document.querySelector('.no-bu').addEventListener('click',()=>{ 
        res6.innerHTML=''
    })

}

