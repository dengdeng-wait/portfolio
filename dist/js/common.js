window.onload = () => {
  init();
  console.dir([]);
}

const init = () => {
  sliderOpacity();
}

//slide opacity  
const sliderOpacity = () => {
  const SHOWING_CLASS = 'showing';
  const slideBox = document.querySelector('.slider_list');

  if(slideBox){
    function slide() {
      const currentSlide = document.querySelector(`.${SHOWING_CLASS}`);
      const slideItem = document.querySelectorAll('.slider_item');
      const firstSlide = slideBox.firstElementChild;
      //console.dir(firstSlide);
    
      if(currentSlide) {
        currentSlide.classList.remove(SHOWING_CLASS);
        const nextSlide = currentSlide.nextElementSibling;
        //const prevSlide = currentSlide.previousElementSibling;
        if(nextSlide) {
          nextSlide.classList.add(SHOWING_CLASS);
        } else {
          firstSlide.classList.add(SHOWING_CLASS);
        }
      }
      else {
        firstSlide.classList.add(SHOWING_CLASS);
      }
    }
    slide();
    //setInterval(slide, 2000);
  }
}

//button click - scroll smmoth move
const scorllTargetMove = () => {
  const listEle = document.querySelectorAll('ul li');

  listEle.forEach(el => {
    const btn = el.firstElementChild;
    btn.addEventListener('click', scrollFocus);
  });

  function scrollFocus(e) {
    e.preventDefault();
    const attr = this.getAttrbute('href');
    const aName = attr.substring(1, 6);
    const ele = document.getElementById(aName);

    ele.scrollIntoView({behavior: 'smooth', block: 'start'});
  }
}

//scroll 휠 반응
const scrollWheel = () => {
  var prevScrollpos = window.pageYOffset;
  console.log(prevScrollpos);
  window.onscroll = () => {
    var currentScrollPos = window.pageYOffset;
    console.log(currentScrollPos);
    if (prevScrollpos > currentScrollPos) {
      //document.getElementById("navbar").style.top = "0";
      console.log('before');
    } else {
      console.log('current');
      //document.getElementById("navbar").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
  }
}

//scroll btn mov - ver1
const scorllTagetMv = () => {
  const header = document.querySelector('#header');
  const headerH = header.clientHeight;
  const btn = document.querySelectorAll('.list_btn > li');
  const targetSection = $('.target');
  const sectionHeightArr = [];

  for(let i = 0; i < btn.length; i++) {
    (function(h) {
      btn[h].addEventListener('click', function(e) {
        e.preventDefault;
        dataId = btn[h].querySelector('a').getAttribute('data-id');
        scrollAction(dataId);
      });
    })(i)
  }

  for (let i = 0; i < btn.length; i++) {
    (function(a) {
      let h = Math.ceil(targetSection.eq(a).offset().top);
      sectionHeightArr.push(h);
    })(i)
  }
  function scrollAction(dataId) {
    let calcScroll = sectionHeightArr[dataId] - 140;

    $('html, body').animate({scrollTop : calcScroll});
  }
}

//scroll btn mov - ver2(jquery)
// const scrollIdTargetMv = () => {
//   $(window).on('click', '.menu .btn', (ev) => {
//     let header = $('header').outerHeight();
//     ev.preventDefault;
//     $('html, body').animate({
//       scrollTop: $(this.hash).offset().top - header
//     },300);
//   });
// }

class Accordion {
  constructor(getEle, value) {
    this.ele = document.querySelector(getEle);
    this.value = {
      childBtn: this.ele.querySelectorAll(value.childBtn),
      ico: this.ele.querySelectorAll(value.ico),
      viewCont: this.ele.querySelectorAll(value.viewCont)
    }
    this.init();
  }
  init() {
    this.onClick();
  }
  onClick() {
    const accBtn = this.value.childBtn;
    accBtn.forEach(el => {
      el.addEventListener('click', this.toggleAction.bind(this));
    })
  }
  toggleAction(el) {
    const target = el.currentTarget;
    const targetView = target.nextElementSibling.classList;
    const targetIcon = target.children[1];
    console.log(target);

    const accIcon = this.value.ico,
    accView = this.value.viewCont;
    
    if (targetView.contains('active')) {
      targetView.remove('active');
      targetIcon.classList.remove('ani');
    }
    else {
      console.log(accIcon)
      accIcon.forEach(el => {
        el.classList.remove('ani');
      });
      accView.forEach(el => {
        el.classList.remove('active');
      });
      targetView.add('active');
      targetIcon.classList.add('ani');
    }
  }
}

//instance
// new acc = new Accordion('.acc-wrap', {
//   childBtn: '.button',
//   ico: 'btn-arrow',
//   viewCont: 'content'
// });

//pop
class ModalPop {
  constructor() {
    this.openBtn = null;
    this.contents = null;
    this.closeBtn = null;
    this.closeBtnDim = null;
  }
  init({ openBtn: openBtn, openPop: contents, closeBtn: closeBtn, closeBtnDim: closeBtnDim }) {
    this.openBtn = document.querySelectorAll(openBtn);
    this.openBtn.forEach(el => {
      el.addEventListener('click', this.open.bind(this));
    });
    this.contents = document.querySelectorAll(contents);
    this.closeBtn = document.querySelectorAll(closeBtn);
    this.closeBtn.forEach(el => {
      el.addEventListener('click', this.close.bind(this));
    });
    this.closeBtnDim = document.querySelectorAll(closeBtnDim);
    this.closeBtnDim.forEach(el => {
      el.addEventListener('click', this.close.bind(this));
    });
  }
  open(el) {
    document.body.classList.add('pop-open');
    const target = el.currentTarget.getAttribute('data-modal-type');
    const contTarget = document.querySelector(`[data-modal-pop=${target}]`);
    const contEle = contTarget.querySelector('.modal');
    const dim = contTarget.querySelector('.dim');

    contTarget.style.display = 'block';
    dim.style.display = 'block';
    setTimeout(() => {
      contEle.classList.add('active');
    }, 100);
  }
  close(e) {
    if (e.currentTarget.className == 'dim') {
      e.currentTarget.previousElementSibling.classList.remove('active');
      e.currentTarget.style.display = 'none';
    }
    else {
      e.currentTarget.closest('.modal').classList.remove('active');
    }
    this.contents.forEach(el => {
      const attrEl = el.getAttribute('data-modal-pop');
      console.log(attrEl);
      if (attrEl == 'alert') { //alert 팝업 사용할 경우
        document.body.classList.remove('pop-open');
        el.style.display = 'none';
      }
      else {
        setTimeout(() => {
          el.style.display = 'none';
          document.body.classList.remove('pop-open');
        }, 200);
      }
    })
    console.log(this.closeBtnDim);
  }
}

//instance
// const openPop = new ModalPop();
// openPop.init({
//   openBtn: '.btn-open-pop',
//   openPop: '.pop-cont-area',
//   closeBtn: '.btn-close',
//   closeBtnDim: '.dim'
// });

//dropdown
class Dropdown {
  constructor() {
    this.dropdown = null;
    this.btn = null;
    this.content = null;
    this.backBtn = null;
  }
  init({ dropdownSec: secEle }) {
    this.dropdown = document.querySelectorAll(secEle);
    this.onClick();
  }
  onClick() {
    for (let i = 0; i < this.dropdown.length; i++) {
      this.btn = this.dropdown[i].querySelector('.dropdown-name');
      this.content = this.dropdown[i].querySelector('.dropdown-content');
      this.content.style.display = 'none';
      this.backBtn = this.dropdown[i].querySelector('.back-btn');
      this.backBtn.style.display = 'none';
      this.btn.addEventListener('click', this.contView);
      this.backBtn.addEventListener('click', this.backHandler);
    }
  }
  contView(e) {
    const targetCont = e.currentTarget.nextElementSibling,
      targetBackBtn = e.currentTarget.closest('.dropdown').querySelector('.back-btn');

    targetCont.style.display = 'block';
    targetBackBtn.style.display = 'block';
  }
  backHandler(e) {
    const target = e.currentTarget,
      targetCont = e.currentTarget.previousElementSibling;
    console.log(targetCont)

    target.style.display = 'none';
    targetCont.style.display = 'none';
  }
}

//instance
// const dropdownPlay = new Dropdown();
// dropdownPlay.init({
//   dropdownSec: '.dropdown'
// });

//tab
class Tab {
  constructor() {
    this.tab = null,
    this.menus = null,
    this.contents = null
  }
  init({ tabSec: tabEle }) {
    this.tab = document.querySelector(tabEle);
    this.menus = this.tab.querySelectorAll('.tab-menu > li');
    this.menus[0].classList.add('active');
    if (this.menus.length == 1) this.menus[0].classList.remove('active');
    this.contents = this.tab.querySelectorAll('.tab-cont > li');
    this.contents[0].classList.add('active');
    this.menu();
  }
  menu() {
    [...this.menus].map((item, i) => {
      item.querySelector('.btn').addEventListener('click', function (e) {
        this.menus.forEach(el => {
          el.classList.remove('active');
        });
        e.target.parentElement.classList.add('active');
        this.content(i);
      }.bind(this));
    });
  }
  content(index) {
    this.contents.forEach(el => {
      el.classList.remove('active');
    });
    this.contents[index].classList.add('active');
  }
}

//instance
// const tabMenu = new Tab();
// tabMenu.init({
//   tabSec: '.tabs'
// });

//데이터 정의
class InsertData {
  constructor() {
    this.year = null;
  }
  init({ dataPortfolio: portFolioEle, dataYear: portFolioYear, dataContents: portFolioContents }) {
    const tabsCheck = document.querySelectorAll('.tabs');
    for (let i = 1; i < tabsCheck.length+1; i++) {
      const ss = document.querySelector(`[data-portfolio-type${i}=${portFolioEle}]`);
      console.log(ss[i]);
    }
    this.dataEle1 = document.querySelector(`[data-portfolio-type1=${portFolioEle}]`);
    this.dataEle2 = document.querySelector(`[data-portfolio-type2=${portFolioEle}]`);
    this.dataEle3 = document.querySelector(`[data-portfolio-type3=${portFolioEle}]`);
    this.dataEleYear1 = this.dataEle1.querySelector(`[data-year1=${portFolioYear}]`); //22~17
    this.dataEleYear2 = this.dataEle2.querySelector(`[data-year2=${portFolioYear}]`); //16~11
    this.dataEleYear3 = this.dataEle3.querySelector(`[data-year3=${portFolioYear}]`); //10~나머지
    this.dataEleContents1 = this.dataEle1.querySelector(`[data-contents1=${portFolioContents}]`); //22~17
    this.dataEleContents2 = this.dataEle2.querySelector(`[data-contents2=${portFolioContents}]`); //16~11
    this.yearList(3); //년도 메뉴 리스트
    this.contentsArticle(); //상세내역
  }
  yearList(n) {
    this.year = ['2022~2021', '2020~2019', '2018~2017', '2016~2015', '2014~2013', '2012~2011', '2010~2006 이하 잡코리아 이력서 참고'];
    const arr = this.year;
    const len = arr.length;
    // console.log(len);
    const cnt = Math.floor(len / n) + (Math.floor(len % n) > 0 ? 1 : 0);
    const tmp = [];

    for (let i = 0; i < cnt; i++) {
      tmp.push(arr.splice(0, n));
      tmp[i].forEach(el => {
        if (i == 0) this.dataEleYear1.innerHTML += `<li><button class="btn">${el}</button></li>`;
        if (i == 1) this.dataEleYear2.innerHTML += `<li><button class="btn">${el}</button></li>`;
        if (i == 2) this.dataEleYear3.innerHTML += `<li><button class="btn">${el}</button></li>`;
      });
    }
  }
  contentsArticle() {
    //year : 년도 , title : 프로젝트 이름, desc1: 포지션, desc2: 스킬
    this.year = ['2022~2021', '2020~2019', '2018~2017', '2016~2015', '2014~2013', '2012~2011', '2010~2006 이하 잡코리아 이력서 참고'];
    this.title1 = ['하나은행 마이브런치 운영', '신한카드 플레이 운영 및 스크립트 운영 가이드 구축', '신한카드 지역화폐 운영', '신한카드 지역화폐 구축']; //22~21
    this.title2 = ['신한카드 비대면 구축', '하나은행 개인디지털뱅킹 - 미래금융팀 운영', '하나은행 개인디지털뱅킹 - 미래금융팀 챗봇 하이 리뉴얼 ', '하나은행 개인디지털뱅킹 - 미래금융팀 챗봇 하이 개선', '현대리바트 WSI']; //20~19
    this.title3 = ['EBS 블록체인지식커뮤니티 프로토타입', 'EBSE 재구조화', 'KB카드 리브메이트 APP리뉴얼', '대한민국 구석구석(한국관광공사) 반응형웹 구축', 'SK M&S 베네피아 경기도청, 대검찰청 구축', 'SK M&S 행복스토어 및 베네피아 헬스피아 운영', '이케아 고도화작업', 'KTH GIGA B2B 홈매니저']; //18~17
    this.title4 = ['기상청 기상기후 빅데이터 분석 플랫폼', '키움증권 회원가입 및 하우투스탁 웹접근성고도화작업', '신한카드 스마트 리포트', 'ING생명 LSP2.0', '메트라이프 리쿠르팅', 'NH농협생명 리쿠르팅', '삼성 sericeo 및 이하 관리 관공서,기업,금융 웹 및 모바일사이트', '웅진씽크빅 북클럽투데이']; //16~15
    this.title5 = ['SK SPSS(smart promotion support service)', '보건복지부 및 산하기관 리뉴얼(개발) 및 운영', '국립나주병원 리뉴얼', '국립목포병원 리뉴얼', '국립부곡병원 / 국립춘천병원 / 국립공주병원 / 국립재활원 / 국립소록도병원 / 국립마산병원 / 국립망향의동산관리원', '한국사이버평생교육원 이러닝 컨텐츠 표준화', '삼성사회봉사단(국문) / 삼성사회봉사단(영문)','뚜레쥬르 쇼핑몰']; //14~13
    this.title6 = ['CJ TVING', '이데이몰', '고용노동부 yes프로젝트 청년층', '고용노동부 새일찾기 프로젝트 중장년층', '국민건강보험 심사평가원', '삼성전자서비스', 'LG전자서비스', 'LG전자서비스 모바일', '한국사이버평생교육원(웹,모바일)','쥬비스 PC & 모바일']; //12~11
    this.desc1 = ['퍼블리셔 PL', '퍼블리셔 팀원', '퍼블리셔 단독작업', '퍼블리셔', '디자이너'];
    this.desc2 = ['모바일', 'PC', '반응형웹', '웹접근성', '하이브리드앱(앱접근성)', 'JS', 'JQ', '태블릿'];
    
    const eleWrap1 = this.dataEleContents1;
    const eleWrap2 = this.dataEleContents2;
    const eleListArticle1 = eleWrap1.querySelectorAll('article');
    const eleListArticle2 = eleWrap2.querySelectorAll('article');
    
    //22~17
    for (let i = 0; i < eleListArticle1.length; i++) {
      eleListArticle1[i].querySelector('h2').innerText += this.year[i];
      if (i == 0) {
        const eleListLi = eleListArticle1[0].querySelectorAll('li');
        eleListLi.forEach((el, idx) => {
          if (idx == 0) {
            el.children[0].innerText += this.title1[0];
            el.querySelector('.cont1').innerText += this.desc1[0];
            el.querySelector('.cont2').innerText += `[${this.desc2[0]}, ${this.desc2[5]}]`
          }
          if (idx == 1)
          {
            el.children[0].innerText += this.title1[1];
            el.querySelector('.cont1').innerText += this.desc1[1];
            el.querySelector('.cont2').innerText += `[${this.desc2[0]}, ${this.desc2[5]}]`
          }
          if (idx == 2)
          {
            el.children[0].innerText += this.title1[2];
            el.querySelector('.cont1').innerText += this.desc1[2];
            el.querySelector('.cont2').innerText += `[${this.desc2[0]}, ${this.desc2[5]}]`
          }
          if (idx == 3) {
            el.children[0].innerText += this.title1[3];
            el.querySelector('.cont1').innerText += this.desc1[0];
            el.querySelector('.cont2').innerText += `[${this.desc2[0]}, ${this.desc2[5]}, ${this.desc2[6]}]`
          }
        });
      }
      if (i == 1) {
        const eleListLi = eleListArticle1[1].querySelectorAll('li');
        eleListLi.forEach((el, idx) => {
          if (idx == 0) {
            el.children[0].innerText += this.title2[0];
            el.querySelector('.cont1').innerText += this.desc1[0];
            el.querySelector('.cont2').innerText += `[${this.desc2[0]}, ${this.desc2[5]}, ${this.desc2[6]}]`
          }
          if (idx == 1) {
            el.children[0].innerText += this.title2[1];
            el.querySelector('.cont1').innerText += this.desc1[0];
            el.querySelector('.cont2').innerText += `[${this.desc2[0]}, ${this.desc2[5]}, ${this.desc2[6]}]`
          }
          if (idx == 2) {
            el.children[0].innerText += this.title2[2];
            el.querySelector('.cont1').innerText += this.desc1[0];
            el.querySelector('.cont2').innerText += `[${this.desc2[0]}, ${this.desc2[5]}, ${this.desc2[6]}]`
          }
          if (idx == 3) {
            el.children[0].innerText += this.title2[3];
            el.querySelector('.cont1').innerText += this.desc1[0];
            el.querySelector('.cont2').innerText += `[${this.desc2[0]}, ${this.desc2[5]}, ${this.desc2[6]}]`
          }
          if (idx == 4) {
            el.children[0].innerText += this.title2[4];
            el.querySelector('.cont1').innerText += this.desc1[0];
            el.querySelector('.cont2').innerText += `[${this.desc2[0]}, ${this.desc2[5]}, ${this.desc2[6]}]`
          }
        });
      }
      if (i == 2) {
        const eleListLi = eleListArticle1[2].querySelectorAll('li');
        eleListLi.forEach((el, idx) => {
          if (idx == 0) {
            el.children[0].innerText += this.title3[0];
            el.querySelector('.cont1').innerText += this.desc1[2];
            el.querySelector('.cont2').innerText += `[${this.desc2[0]}, ${this.desc2[2]}, ${this.desc2[5]}, ${this.desc2[6]}]`
          }
          if (idx == 1) {
            el.children[0].innerText += this.title3[1];
            el.querySelector('.cont1').innerText += this.desc1[2];
            el.querySelector('.cont2').innerText += `[${this.desc2[0]}, ${this.desc2[2]}, ${this.desc2[5]}, ${this.desc2[6]}]`
          }
          if (idx == 2) {
            el.children[0].innerText += this.title3[2];
            el.querySelector('.cont1').innerText += this.desc1[1];
            el.querySelector('.cont2').innerText += `[${this.desc2[0]}, ${this.desc2[1]}, ${this.desc2[4]}, ${this.desc2[5]}, ${this.desc2[6]}]`
          }
          if (idx == 3) {
            el.children[0].innerText += this.title3[3];
            el.querySelector('.cont1').innerText += this.desc1[2];
            el.querySelector('.cont2').innerText += `[${this.desc2[2]}, ${this.desc2[5]}, ${this.desc2[6]}]`
          }
          if (idx == 4) {
            el.children[0].innerText += this.title3[4];
            el.querySelector('.cont1').innerText += this.desc1[2];
            el.querySelector('.cont2').innerText += `[${this.desc2[1]}, ${this.desc2[5]}, ${this.desc2[6]}]`
          }
          if (idx == 5) {
            el.children[0].innerText += this.title3[5];
            el.querySelector('.cont1').innerText += this.desc1[2];
            el.querySelector('.cont2').innerText += `[${this.desc2[1]}, ${this.desc2[5]}, ${this.desc2[6]}]`
          }
          if (idx == 6) {
            el.children[0].innerText += this.title3[6];
            el.querySelector('.cont1').innerText += this.desc1[1];
            el.querySelector('.cont2').innerText += `[${this.desc2[0]},${this.desc2[1]}, ${this.desc2[5]}, ${this.desc2[6]}]`
          }
          if (idx == 7) {
            el.children[0].innerText += this.title3[7];
            el.querySelector('.cont1').innerText += this.desc1[0];
            el.querySelector('.cont2').innerText += `[${this.desc2[2]}, ${this.desc2[5]}, ${this.desc2[6]}]`
          }
        });
      }
    }
    //17~11
    for (let i = 0; i < eleListArticle2.length; i++) {
      // console.log(eleListArticle2[i]);
      eleListArticle2[i].querySelector('h2').innerText += this.year[i + 3];
      if (i == 0) {
        const eleListLi = eleListArticle2[0].querySelectorAll('li');
        eleListLi.forEach((el, idx) => {
          if (idx == 0) {
            el.children[0].innerText += this.title4[0];
            el.querySelector('.cont1').innerText += this.desc1[2];
            el.querySelector('.cont2').innerText += `[${this.desc2[2]}, ${this.desc2[1]}, ${this.desc2[5]}, ${this.desc2[6]}]`
          }
          if (idx == 1) {
            el.children[0].innerText += this.title4[1];
            el.querySelector('.cont1').innerText += this.desc1[2];
            el.querySelector('.cont2').innerText += `[${this.desc2[1]},${this.desc2[3]}, ${this.desc2[1]}, ${this.desc2[5]}]`
          }
          if (idx == 2) {
            el.children[0].innerText += this.title4[2];
            el.querySelector('.cont1').innerText += this.desc1[2];
            el.querySelector('.cont2').innerText += `[${this.desc2[0]}, ${this.desc2[5]}]`
          }
          if (idx == 3) {
            el.children[0].innerText += this.title4[3];
            el.querySelector('.cont1').innerText += this.desc1[2];
            el.querySelector('.cont2').innerText += `[${this.desc2[7]}, ${this.desc2[5]}, ${this.desc2[6]}]`
          }
          if (idx == 4) {
            el.children[0].innerText += this.title4[4];
            el.querySelector('.cont1').innerText += this.desc1[2];
            el.querySelector('.cont2').innerText += `[${this.desc2[7]}, ${this.desc2[5]}, ${this.desc2[6]}]`
          }
          if (idx == 5) {
            el.children[0].innerText += this.title4[5];
            el.querySelector('.cont1').innerText += this.desc1[2];
            el.querySelector('.cont2').innerText += `[${this.desc2[7]}, ${this.desc2[5]}, ${this.desc2[6]}]`
          }
          if (idx == 6) {
            el.children[0].innerText += this.title4[6];
            el.querySelector('.cont1').innerText += this.desc1[2];
            el.querySelector('.cont2').innerText += `[${this.desc2[0]},${this.desc2[1]}, ${this.desc2[5]}, ${this.desc2[6]}]`
          }
          if (idx == 7) {
            el.children[0].innerText += this.title4[7];
            el.querySelector('.cont1').innerText += this.desc1[2];
            el.querySelector('.cont2').innerText += `[${this.desc2[7]}, ${this.desc2[5]}, ${this.desc2[6]}]`
          }
        });
      }
      if (i == 1) {
        const eleListLi = eleListArticle2[1].querySelectorAll('li');
        eleListLi.forEach((el, idx) => {
          if (idx == 0) {
            el.children[0].innerText += this.title5[0];
            el.querySelector('.cont1').innerText += this.desc1[2];
            el.querySelector('.cont2').innerText += `[${this.desc2[0]},${this.desc2[1]},${this.desc2[2]}, ${this.desc2[5]}, ${this.desc2[6]}]`
          }
          if (idx == 1) {
            el.children[0].innerText += this.title5[1];
            el.querySelector('.cont1').innerText += this.desc1[1];
            el.querySelector('.cont2').innerText += `[${this.desc2[1]}, ${this.desc2[3]}]`
          }
          if (idx == 2) {
            el.children[0].innerText += this.title5[2];
            el.querySelector('.cont1').innerText += this.desc1[1];
            el.querySelector('.cont2').innerText += `[${this.desc2[0]}, ${this.desc2[3]}]`
          }
          if (idx == 3) {
            el.children[0].innerText += this.title5[3];
            el.querySelector('.cont1').innerText += this.desc1[1];
            el.querySelector('.cont2').innerText += `[${this.desc2[0]}, ${this.desc2[3]}]`
          }
          if (idx == 4) {
            el.children[0].innerText += this.title5[4];
            el.querySelector('.cont1').innerText += this.desc1[1];
            el.querySelector('.cont2').innerText += `[${this.desc2[1]}, ${this.desc2[3]}]`
          }
          if (idx == 5) {
            el.children[0].innerText += this.title5[5];
            el.querySelector('.cont1').innerText += this.desc1[2];
            el.querySelector('.cont2').innerText += `[${this.desc2[1]}]`
          }
          if (idx == 6) {
            el.children[0].innerText += this.title5[6];
            el.querySelector('.cont1').innerText += this.desc1[2];
            el.querySelector('.cont2').innerText += `[${this.desc2[1]}, ${this.desc2[3]}, ${this.desc2[5]}, ${this.desc2[6]}]`
          }
          if (idx == 7) {
            el.children[0].innerText += this.title5[7];
            el.querySelector('.cont1').innerText += this.desc1[2];
            el.querySelector('.cont2').innerText += `[${this.desc2[1]}, ${this.desc2[3]}, ${this.desc2[5]}, ${this.desc2[6]}]`
          }
        });
      }
      if (i == 2) {
        const eleListLi = eleListArticle2[2].querySelectorAll('li');
        eleListLi.forEach((el, idx) => {
          if (idx == 0) {
            el.children[0].innerText += this.title6[0];
            el.querySelector('.cont1').innerText += this.desc1[3];
            el.querySelector('.cont2').innerText += `[${this.desc2[1]}]`
          }
          if (idx == 1) {
            el.children[0].innerText += this.title6[1];
            el.querySelector('.cont1').innerText += this.desc1[3];
            el.querySelector('.cont2').innerText += `[${this.desc2[1]}]`
          }
          if (idx == 2) {
            el.children[0].innerText += this.title6[2];
            el.querySelector('.cont1').innerText += this.desc1[3];
            el.querySelector('.cont2').innerText += `[${this.desc2[1]}]`
          }
          if (idx == 3) {
            el.children[0].innerText += this.title6[3];
            el.querySelector('.cont1').innerText += this.desc1[3];
            el.querySelector('.cont2').innerText += `[${this.desc2[1]}]`
          }
          if (idx == 4) {
            el.children[0].innerText += this.title6[4];
            el.querySelector('.cont1').innerText += this.desc1[3];
            el.querySelector('.cont2').innerText += `[${this.desc2[1]}]`
          }
          if (idx == 5) {
            el.children[0].innerText += this.title6[5];
            el.querySelector('.cont1').innerText += this.desc1[3];
            el.querySelector('.cont2').innerText += `[${this.desc2[1]}]`
          }
          if (idx == 6) {
            el.children[0].innerText += this.title6[6];
            el.querySelector('.cont1').innerText += this.desc1[3];
            el.querySelector('.cont2').innerText += `[${this.desc2[1]}]`
          }
          if (idx == 7) {
            el.children[0].innerText += this.title6[7];
            el.querySelector('.cont1').innerText += this.desc1[3];
            el.querySelector('.cont2').innerText += `[${this.desc2[1]}]`
          }
          if (idx == 8) {
            el.children[0].innerText += this.title6[8];
            el.querySelector('.cont1').innerText += this.desc1[3];
            el.querySelector('.cont2').innerText += `[${this.desc2[1]}]`
          }
          if (idx == 9) {
            el.children[0].innerText += this.title6[9];
            el.querySelector('.cont1').innerText += `${this.desc1[3]}, ${this.desc1[4]}`;
            el.querySelector('.cont2').innerText += `[${this.desc2[0]}, ${this.desc2[1]}]`
          }
        });
      }
    }
  }
}