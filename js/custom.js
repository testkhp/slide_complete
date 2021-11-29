/*필요한 변수 세팅 */

/*점심시간 후에 세팅할 것들
  하단 동그라미 버튼 배치
  동그라미 버튼 클릭시 화면 순서값 받아오기
  슬라이더 움직이기
  (리팩토링 작업(비효율적으로 작성한 코드 개선))
*/

const view = document.querySelector(".view");
//움직이는 슬라이드 화면
const leftBtn = document.querySelector(".leftBtn");
//클릭할 이전버튼
const rightBtn = document.querySelector(".rightBtn");
//클릭한 이후버튼

const pager = document.querySelectorAll(".pager li");
//pager안에 li태그 5마리 선택 (배열형태)

const pagerLength = pager.length;
//pager안에 있는 li태그 갯수(길이) 값 담아놓음

const stopBtn = document.querySelector(".stop");
//멈춤버튼 대상 

const playBtn = document.querySelector(".play");
//재생버튼 대상


let slideNumber = 0;
//버튼 클릭시 순번 바뀔 값


//이전버튼 클릭시 슬라이드 이동
leftBtn.addEventListener("click",(e)=>{
    if(slideNumber == 0)
    {
        slideNumber = pagerLength - 1;
    }
    else
    {
        slideNumber--;
    }

    //동그라미 버튼들 클래스 on 전부 제거
    for(let i=0; i < pager.length; i++)
    {
        pager[i].classList.remove("on");
    }

    pager[slideNumber].classList.add("on");
    //sliderNumber 숫자값과 매칭되는 li태그 버튼만 선택

    view.style.marginLeft = -100*slideNumber+"%";
});



//이후버튼 클릭시 슬라이드 이동
rightBtn.addEventListener("click",()=>{
    if(slideNumber == pagerLength - 1)
    {
        slideNumber = 0;
    }
    else
    {
        slideNumber++;
    }

    //동그라미 버튼들 클래스 on 전부 제거
    for(let i=0; i < pager.length; i++)
    {
        pager[i].classList.remove("on");
    }
 
    pager[slideNumber].classList.add("on");
    //sliderNumber 숫자값과 매칭되는 li태그 버튼만 선택

    view.style.marginLeft = -100*slideNumber+"%";

});


//pager li태그를 클릭했을 때 data-index 값을 가지고옴
for(let i=0; i < pager.length; i++)
{
    pager[i].addEventListener("click",(e)=>{
        //동그라미 클릭하면 색상변경
        for(let j=0; j < pager.length; j++)
        {
            pager[j].classList.remove("on");
        }
        //클릭을 한 나 자신(li태그)
        e.currentTarget.classList.add("on");
        //클릭한 li태그의 data-index 속성값을 가지고 옴
        slideNumber = e.currentTarget.getAttribute("data-index");
        //슬라이드 화면 움직임
        view.style.marginLeft = -100*slideNumber+"%";
    });
}

//중복 코드가 많아요... 다음주나 추석지나고 리팩토링

//시작하자마자 자동실행
let autoSlide = setInterval(()=>{

    if(slideNumber == pagerLength-1)
    {
        slideNumber = 0;
    }
    else
    {
        slideNumber++;
    }

    // 동그라미 클래스 전부 제거
    for(let i=0; i < pagerLength; i++)
    {
        //li태그들 0번째부터~4번째까지 클래스 제거
        pager[i].classList.remove("on");
    }
    //다음순번의 동그라미 클래스 추가
    pager[slideNumber].classList.add("on");

    //슬라이드 화면 넘어감
    view.style.marginLeft = -100 * slideNumber + "%";

},3000);


//멈춤버튼을 눌렀을 때 자동실행 멈춤
stopBtn.addEventListener("click",()=>{

    stopBtn.style.display = "none"; //멈춤버튼 사라지게
    playBtn.style.display = "block"; //재생버튼 나오게

    clearInterval(autoSlide);
    //자동기능이 들어가있는 변수이름으로 설정해야
    //자동실행 기능이 멈춰지는 동작 실행
});


//재생버튼을 눌렀을 때 자동실행 시작
playBtn.addEventListener("click",()=>{

    stopBtn.style.display = "block";
    playBtn.style.display = "none";

    autoSlide = setInterval(()=>{

        if(slideNumber == pagerLength-1)
        {
            slideNumber = 0;
        }
        else
        {
            slideNumber++;
        }

        // 동그라미 클래스 전부 제거
        for(let i=0; i < pagerLength; i++)
        {
            //li태그들 0번째부터~4번째까지 클래스 제거
            pager[i].classList.remove("on");
        }
        //다음순번의 동그라미 클래스 추가
        pager[slideNumber].classList.add("on");
    
        //슬라이드 화면 넘어감
        view.style.marginLeft = -100 * slideNumber + "%";
    
    },3000);
   

});
