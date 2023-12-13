console.log("suc");
//題目一：無障礙彈跳視窗
//dom
const openBtn = document.querySelector('.openBtn');
const closeBtn = document.querySelector('.closeBtn');
const popUp = openBtn.previousElementSibling;

//(打開) > 當點擊「彈跳視窗按鈕」，打開彈跳視窗

openBtn.addEventListener("click", (e)=>{
    //console.log(popUp);
   // popUp.classList.add('dialog--active');
   popUp.setAttribute("class", "dialog dialog--active")
    closeBtn.focus(); //將焦點 (focus) 放在「OK 按鈕」上，方便鍵盤用戶選取視窗內的選項
    document.body.style.overflow = "hidden" // 避免使用者在打開視窗的狀況下頁面是可滑動的
    
});

closeBtn.addEventListener("click", (e) =>{
    //popUp.classList.remove('dialog--active');
    popUp.setAttribute("class", "dialog")
    document.body.style.overflow = "" 
    openBtn.focus()
  
});

// 點擊彈跳視窗以外的區域或點選 OK 來關閉
const body = document.querySelector('body')
body.addEventListener('click', (e)=>{
   // console.log(e.target.getAttribute("class"))
   e.preventDefault()
  // console.log(e.target.getAttribute("class"))
    if(e.target.getAttribute("class") !== "dialog dialog--active" ){
        return
    }else{
      // console.log("有按到");
        popUp.setAttribute("class", "dialog");
        document.body.style.overflow = "" 
        openBtn.focus()
    }
});
//(關閉) > 當按下「ESC」或點擊「OK 按鈕」，關閉彈跳視窗
document.addEventListener('keydown', (e)=>{
    if(e.key == "Escape"){
        popUp.setAttribute("class", "dialog");
        document.body.style.overflow = "" 
        openBtn.focus() //將焦點放在「打開彈跳視窗」按鈕上
    }
});

//題目二：書本查詢器
//dom
const bookList = document.querySelector('.bookList');
const recommendList = document.querySelector('.recommendList')
const searchBook = recommendList.previousElementSibling;

let data = 
[{"bookName":"Harry Potter", "content": "content 01"},{"bookName":"Old Man And Sea", "content": "content 02"},{"bookName":"Hello World", "content": "content 03"}]

render(data); //(加載網頁時) > 將預備好的資料注入在網頁上，呈現：「書名 - 介紹」的清單

//console.log(data);
function render(data){
    data.map((item)=>`<li>${item.bookName} - ${item.content}</li>`)
    bookList.innerHTML = data.map((item)=>`<li>${item.bookName} - ${item.content}</li>`).join('');
};

//(用戶輸入時) > 從預備好的資料中搜尋，並過濾所有清單。
searchBook.addEventListener("input", (e)=>{
   // console.log(searchBook.value);
    if(searchBook.value == ""){
        recommendList.innerHTML = ``;
        render(data)
        return
    };
    let filterData = [];
    data.forEach((item)=>{
       let bookName = item.bookName.toLocaleLowerCase();
       if(bookName.includes(searchBook.value)){
           filterData.push(item)
       
    }}); //bookName 字串如果有包含searchbook.value, 把item推進去filterData[];
    console.log(filterData);
    //recommend 按鈕會出現
    recommendList.innerHTML = filterData.map((item)=>`<li><button>${item.bookName}</button></li>`).join('');
    return

});

recommendList.addEventListener('click', (e)=>{
    if(e.target.nodeName !== 'BUTTON'){
        return
    }
    console.log(e.target.innerText);
    let filterData = [];
    data.forEach((item)=>{
        if(item.bookName == e.target.innerText){
            filterData.push(item)
        }
    });
    render(filterData)
});

// 題目三：回饋跑馬燈
let feedBackData = [
    {
      "photo":"https://picsum.photos/200",
      "title":"Person #1",
      "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit." 
    },
    {
        "photo":"https://picsum.photos/200",
        "title":"Person #2",
        "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit." 
       },
    {
        "photo":"https://picsum.photos/200",
        "title":"Person #3",
        "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit." 
    },
    {
        "photo":"https://picsum.photos/200",
        "title":"Person #4",
        "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit." 
    },
    {
        "photo":"https://picsum.photos/200",
        "title":"Person #5",
        "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit." 
    },
    {
        "photo":"https://picsum.photos/200",
        "title":"Person #6",
        "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit." 
    },
];

//dom
const feedbackScroll = document.querySelector('.feedbackScroll');
const prevBtn = document.querySelector('.prevBtn');
const nextBtn = document.querySelector('.nextBtn');
//用currentIndex方法來判斷現在到陣列的哪一項
let currentIndex = 0;

//初始化
feedBackRender()

nextBtn.addEventListener('click', (e)=>{
    currentIndex +=1;
    //因為到倒數第二個陣列元素後,會渲染到最後一個元素,不減2的話會導致undefined
    if(currentIndex>=feedBackData.length-2){
        currentIndex = feedBackData.length-2
    };
    if(feedBackData.length==1){
        currentIndex = 0;
    };
    console.log(currentIndex);
    feedBackRender()
});
prevBtn.addEventListener('click', (e)=>{
    currentIndex -=1;
    if(currentIndex<0){
        currentIndex = 0;
    }
    console.log(currentIndex);
    feedBackRender()
});
//初始化最初畫面,如果有，把第一、二個feedBackData值渲染到畫面
function feedBackRender(){
    feedbackScroll.innerHTML = `<li style="background-color:brown; display:grid; justify-content:center; padding:40px; margin-left: 30px; margin-right: 30px;">
    <img src="${feedBackData[currentIndex].photo}" alt="" style="border-radius:180px;margin:auto" >
    <h4 style="text-align:center">${feedBackData[currentIndex].title}</h4>
    <p style="text-align:center">${feedBackData[currentIndex].content}</p>
    </li>
    <li style="background-color:brown; display:grid; justify-content:center; padding:40px; margin-left: 30px; margin-right: 30px;">
    <img src="${feedBackData[currentIndex+1].photo}" alt="" style="border-radius:180px;margin:auto" >
    <h4 style="text-align:center">${feedBackData[currentIndex+1].title}</h4>
    <p style="text-align:center">${feedBackData[currentIndex+1].content}</p>
    </li>`
};

function singleRender(){
    feedbackScroll.innerHTML = `<li style="background-color:brown; display:grid; justify-content:center; padding:40px; margin-left: 30px; margin-right: 30px;">
    <img src="${feedBackData[currentIndex].photo}" alt="" style="border-radius:180px;margin:auto" >
    <h4 style="text-align:center">${feedBackData[currentIndex].title}</h4>
    <p style="text-align:center">${feedBackData[currentIndex].content}</p>
    </li>`
}

//最大卡片數量
const changeQuantity = document.querySelector('.changeQuantity');
const changeMax = changeQuantity.previousElementSibling;

changeQuantity.addEventListener('click', (e)=>{
    let changeMaxInput = changeMax.value;
    console.log(changeMaxInput);
    if(changeMaxInput<=0){
        console.log("最大數量需>0")
        return
    };
    if(changeMaxInput == 1){
        feedBackData.splice(1)
        currentIndex = 0;
        singleRender()
       
    return
    };

    if(changeMaxInput<=feedBackData.length){
       feedBackData.splice(changeMaxInput);
       console.log(feedBackData)
       currentIndex = 0;
       feedBackRender()
        return
    };
    if(changeMaxInput>feedBackData.length){
        for(let i = feedBackData.length+1; i <= changeMaxInput; i++){
            feedBackData.push(JSON.parse(`{
                "photo":"https://picsum.photos/200",
                "title":"Person #${i}",
                "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit." 
            }`))
        };
        console.log(feedBackData)
        currentIndex = 0;
        feedBackRender()
        return
    }
});

//卡片起始位置
const changeStart = document.querySelector('.changeStart');
const startIndex = changeStart.previousElementSibling;

changeStart.addEventListener('click', (e)=>{
    let startIndexValue = startIndex.value;
    console.log(startIndexValue);
    if(startIndexValue<=0 || startIndexValue>feedBackData.length){
    return
    }//如果起始位置是陣列資料的最後一項，只要顯示一個
    else if(startIndexValue == feedBackData.length){
        currentIndex = startIndexValue-1;
        singleRender()
      
    }
    else {console.log(startIndexValue);
        currentIndex = startIndexValue-1;
        feedBackRender()}
        
    
});

//題目四
//dom
//步驟一
const processOne = document.querySelector('.processOne');
const email = processOne.querySelector('input');
const password = processOne.querySelector('.password')
const processOneInput = processOne.querySelectorAll('input');
//步驟二
const processTwo = document.querySelector('.processTwo');
const add = document.querySelector('.add');
const city = document.querySelector('.city')
//步驟三
const processThree = document.querySelector('.processThree');
const name = document.querySelector('.name');
const phone = document.querySelector('.phone');

let userData = {};

processOne.addEventListener('click', (e)=>{
    if(e.target.nodeName !== "BUTTON" ){
        return ///console.log("沒按到")
     };
     if(password.value == "" ){
        password.focus()
        return console.log("沒填寫密碼")
     };
     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if(emailPattern.test(email.value)){
        userData.email = email.value;
        userData.password = password.value;
        console.log(userData);
        processOne.classList.add('dialog');
        processTwo.classList.remove('dialog')
     }else{
         email.focus();
         console.log("不是有效的email")
     }
});

processTwo.addEventListener('click',(e)=>{
    if(e.target.nodeName !== "BUTTON"){
        return
    };
    if(e.target.nodeName == "BUTTON" && e.target.innerText == "上一步"){
        console.log("上一步");
        processOne.classList.remove('dialog');
        processTwo.classList.add('dialog')
        return
    };
    if(e.target.nodeName == "BUTTON" && e.target.innerText == "下一步"){
        if(add.value == ""){
            add.focus();
            return console.log("沒寫地址")
        };
        if(city.value ==""){
            city.focus();
            return console.log("沒寫城市")
        };
        const pattern = 
        userData.add = add.value;
        userData.city = city.value;
        console.log(userData);
        console.log("下一步");
        processTwo.classList.add('dialog');
        processThree.classList.remove('dialog')
    };
  

} );

processThree.addEventListener('click',(e)=>{
    if(e.target.nodeName !== "BUTTON"){
        return
    };
    if(e.target.nodeName == "BUTTON" && e.target.innerText == "上一步"){
        console.log("上一步");
        processTwo.classList.remove('dialog');
        processThree.classList.add('dialog')
        return
    };
    if(e.target.nodeName == "BUTTON" && e.target.innerText == "下一步"){
        if(name.value == "" ){
            name.focus()
            return console.log("沒寫名字")
        };
        if(phone.value ==""){
            phone.focus()
            return console.log("沒寫電話")
        };
        userData.name = name.value;
        userData.phone = phone.value;
        console.log("下一步");
        console.log(userData);
        processThree.classList.add('dialog')
    };
  

} );

//題目五：心理測驗
const psychoTest = document.querySelector('.psychoTest');
const testOne = document.querySelector('.testOne')
const testTwo = document.querySelector('.testTwo')
const testThree = document.querySelector('.testThree')
const testFour = document.querySelector('.testFour')
const result = document.querySelector('.result')

let score = 0;

psychoTest.addEventListener('click', (e)=>{
    if(e.target.nodeName !== "BUTTON"){
        return console.log('沒按到')
    };
    psychoTest.nextElementSibling.classList.add('dialog--active');
    document.body.style.overflow = "hidden" // 避免使用者在打開視窗的狀況下頁面是可滑動的
})

testOne.addEventListener('click', (e)=>{
    if(e.target.nodeName !== "BUTTON"){
        return
    };
    testOne.classList.remove('dialog--active');
    testTwo.classList.add('dialog--active')

});

testTwo.addEventListener('click', (e)=>{
    if(e.target.nodeName !== "INPUT"){
        return console.log("沒按到")
    };
    console.log(e.target.getAttribute('class'));
    if(e.target.getAttribute('class')=="yes"){
        score +=2.5;
    };
    testTwo.classList.remove('dialog--active');
    testThree.classList.add('dialog--active')
});

testThree.addEventListener('click', (e)=>{
    if(e.target.nodeName !== "INPUT"){
        return console.log("沒按到")
    };
    console.log(e.target.getAttribute('class'));
    if(e.target.getAttribute('class')=="yes"){
        score +=2.5;
    };
    testThree.classList.remove('dialog--active');
    testFour.classList.add('dialog--active')
});

testFour.addEventListener('click', (e)=>{
    if(e.target.nodeName !== "INPUT"){
        return console.log("沒按到")
    };
    console.log(e.target.getAttribute('class'));
    if(e.target.getAttribute('class')=="yes"){
        score +=2.5;
    };
    testFour.classList.remove('dialog--active');
    result.classList.add('dialog--active')
    if(score >=5){
        result.innerHTML = `
        <div class="dialog__window ">
        <h2>恭喜你！</h2>
        <p>
            你是coding奇才
        </p>
        <button class="close">關閉</button>
        </div>
        `
        score = 0;
        return
    }else{
        result.innerHTML = `
    <div class="dialog__window ">
    <h2>OOPS</h2>
    <p>
        厭世的工程師
    </p>
    <button class="close">關閉</button>
    </div>  
    `
    score = 0;}
});

result.addEventListener('click', (e)=>{
    if(e.target.nodeName !== "BUTTON"){
        return
    }
    result.classList.remove('dialog--active')
});