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
        console.log("有按到");
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

let showFeedBackdata = [];
//初始化
feedBackInit();


nextBtn.addEventListener('click', (e)=>{
    next()
    return
});
prevBtn.addEventListener('click', (e)=>{
    prep();
});
//初始化最初畫面,如果有，把第一、二個feedBackData值渲染到畫面
function feedBackInit(){
    if(feedBackData[0] !== undefined){
        showFeedBackdata.push(feedBackData[0]);
    };
    if(feedBackData[1] !== undefined){
        showFeedBackdata.push(feedBackData[1]);
    };
    feedbackScroll.innerHTML = showFeedBackdata.map((item)=>`<li style="background-color:brown; display:grid; justify-content:center; padding:40px; margin-left: 30px; margin-right: 30px;">
    <img src="${item.photo}" alt="" style="border-radius:180px;margin:auto" >
    <h4 style="text-align:center">${item.title}</h4>
    <p style="text-align:center">${item.content}</p>
    </li>`).join('');
};

function next(){
    if(feedBackData.length <=2 ){//初始化後會推前兩個feedBackdata到showFeedBackData, 如果只有兩個直接渲染
        feedBackRender()
      return;
    };
    //當showFeedBackdata資料和feedbackdata一樣多時，不用在push了,不然會造成undefined
    if(showFeedBackdata.length == feedBackData.length || showFeedBackdata.length ==1){
        return
    };
    //如果showFeedBackdata 的最後一筆和feedbackdata最後一筆一樣,return
    if(showFeedBackdata[showFeedBackdata.length-1] ==feedBackData[feedBackData.length-1]){
        console.log("o")
        return
    }
   
   showFeedBackdata.push(feedBackData[showFeedBackdata.length]);
   console.log(showFeedBackdata.length);
   feedBackRender()
};

function prep(){
 //   console.log(showFeedBackdata.length);
    if(showFeedBackdata.length>2){
        showFeedBackdata.pop();
        feedBackRender();
    };
};

//如果showFeedBackData只有一個，只渲染一個; 有兩個，渲染兩個
function feedBackRender(){
    if(showFeedBackdata.length <2){
        feedbackScroll.innerHTML = 
        `<li style="background-color:brown; display:grid; justify-content:center; padding:40px; margin-left: 30px; margin-right: 30px;">
       <img src="${showFeedBackdata[showFeedBackdata.length-1].photo}" alt="" style="border-radius:180px;margin:auto" >
       <h4 style="text-align:center">${showFeedBackdata[showFeedBackdata.length-1].title}</h4>
       <p style="text-align:center">${showFeedBackdata[showFeedBackdata.length-1].content}</p>
        </li>`
    }else{
        feedbackScroll.innerHTML = 
        `<li style="background-color:brown; display:grid; justify-content:center; padding:40px; margin-left: 30px; margin-right: 30px;">
       <img src="${showFeedBackdata[showFeedBackdata.length-2].photo}" alt="" style="border-radius:180px;margin:auto" >
       <h4 style="text-align:center">${showFeedBackdata[showFeedBackdata.length-2].title}</h4>
       <p style="text-align:center">${showFeedBackdata[showFeedBackdata.length-2].content}</p>
        </li>
        <li style="background-color:brown; display:grid; justify-content:center; padding:40px; margin-left: 30px; margin-right: 30px;">
        <img src="${showFeedBackdata[showFeedBackdata.length-1].photo}" alt="" style="border-radius:180px;margin:auto" >
        <h4 style="text-align:center">${showFeedBackdata[showFeedBackdata.length-1].title}</h4>
        <p style="text-align:center">${showFeedBackdata[showFeedBackdata.length-1].content}</p>
         </li>`;
    }
    
  
};







