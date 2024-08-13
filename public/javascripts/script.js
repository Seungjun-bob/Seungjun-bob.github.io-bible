
// 모든 verse 에 span 태그로 감싸고 각각 만큼 width 를 준다
let verses = $('.verse')
verses.each((index, verse) => {
    let text = $(verse).text()
    let textArray = text.split(' ')
    let spanText = ''
    textArray.forEach((word) => {
        spanText += `<span style="width: ${word.length * 10}px">${word}</span> `
    })
    $(verse).html(spanText)
})

// $(document).on('click', '.verse', (e) => {
//     // 클릭한 것의 글씨 색이 흰색이 아니면 검색으로 바꾼다. 아니면 검은색으로 바꾼다.
//     if ($(e.target).css('color') === 'rgb(255, 255, 255)') {
//         $(e.target).css('color', 'rgb(33, 37, 41)')
//     } else {
//         $(e.target).css('color', 'rgb(255, 255, 255)')
//     }
// }) 

// number 클릭하면 해당 .book 의 data-number 로 스크롤 이동한다.
$(document).on('click', '.number', (e) => {
    const number = $(e.target).text()
    // const book = $(e.target).closest('.book').data('number')
    const bible = $(`.book[data-number=${number}]`)
    // top 에서 조금 아래
    const top = bible.position().top - 100
    
    // bible 의 색을 파란색으로 바꾼다.
    bible.css('color', 'rgb(0, 0, 255)')
    // 다른 애들은 다 검은색으로 바꾼다.
    $('.book').not(bible).css('color', 'rgb(33, 37, 41)')

    $('html, body').animate({
        scrollTop: top
    }, 200)
})

$(document).on('click', '#hideVerses', ()=>{
    let verses = $('.verse')
    let bookNames = $('.book-name')
    verses.each((index, verse)=>{
        let word = $(verse).find('span')
        $(verse).css('color', 'rgb(255, 255, 255)')
        $(word).addClass('random-hide')
    })
    bookNames.each((index, bookName)=>{
        $(bookName).css('color', 'rgb(255, 255, 255)')
    })

    // icon 변경
    let showIcon = $('.show-icon')
    showIcon.each((index, icon)=>{
        $(icon).removeClass('fa-eye').addClass('fa-eye-slash')
    })
})

$(document).on('click', '#showVerses', ()=>{
    let verses = $('.verse')
    let bookNames = $('.book-name')
    verses.each((index, verse)=>{
        let word = $(verse).find('span')
        $(verse).css('color', 'rgb(33, 37, 41)')
        $(word).removeClass('random-hide')
    })
    bookNames.each((index, bookName)=>{
        $(bookName).css('color', 'rgb(33, 37, 41)')
    })

    // icon 변경
    let showIcon = $('.show-icon')
    showIcon.each((index, icon)=>{
        $(icon).removeClass('fa-eye-slash').addClass('fa-eye')
    })
})

// 첫 페이지 로드 일때 scroll 위치가 100 이상이면 top-btn 을 보이게 한다.
$(document).ready(()=>{
    if ($(window).scrollTop() > 100) {
        $('.top-btn').show()
    }else{
        $('.top-btn').hide()
    }
})

// 스크롤 했을때 top-btn 이 맨 위로 올라가면 없애고 아니면 보이게 한다.

$(window).scroll(()=>{
    if ($(window).scrollTop() > 100) {
        console.log("2")
        $('.top-btn').show()
    } else {
        console.log("3")
        // 찬천히 사라지게 한다.
        $('.top-btn').fadeOut()
    }
})

$(document).on('click', '.show-icon', (e) => {
    // 클릭한 icon css 변경
    if($(e.target).hasClass('fa-eye')) {
        $(e.target).removeClass('fa-eye').addClass('fa-eye-slash');
        
        // bible 클래스의 하위에 있는 verse와 book-name 요소를 찾음
        let bible = e.target.closest('.bible-div');
        let verse = $(bible).find('.verse');
        let bookName = $(bible).find('.book-name');
        
        $(verse).css('color', 'rgb(255, 255, 255)');
        $(bookName).css('color', 'rgb(255, 255, 255)');

        // span 태그 클래스 넣기
        let words = $(verse).find('span')
        words.each((index, word)=>{
            $(word).addClass('random-hide')
        })
    } else {
        $(e.target).removeClass('fa-eye-slash').addClass('fa-eye');
        
        // bible 클래스의 하위에 있는 verse와 book-name 요소를 찾음
        let bible = $(e.target).closest('.bible-div');
        let verse = $(bible).find('.verse');
        let bookName = $(bible).find('.book-name');
        
        $(verse).css('color', 'rgb(33, 37, 41)');
        $(bookName).css('color', 'rgb(33, 37, 41)');

        // span 태그 클래스 제거
        let words = $(verse).find('span')
        words.each((index, word)=>{
            $(word).removeClass('random-hide')
        })
    }
});

$(document).on('click', '#random', ()=>{
    let verses = $('.verse')
    verses.each((index, verse)=>{
        let words = $(verse).find('span')

        let randomIndex = Math.floor(Math.random() * words.length)
        $(words[randomIndex]).addClass('random-hide')
        let randomIndex2 = Math.floor(Math.random() * words.length)
        $(words[randomIndex2]).addClass('random-hide')
        let randomIndex3 = Math.floor(Math.random() * words.length)
        $(words[randomIndex3]).addClass('random-hide')

    })
})

// 힌트 버튼을 누르면 안보이는 것중 하나를 보여준다.
$(document).on('click', '.hint', (e)=>{
    console.log(e.target)
    let bible = e.target.closest('.bible-div');
    let verse = $(bible).find('.verse');
    let bibleName = $(bible).find('.book-name');
    if($(bibleName).css('color') === 'rgb(255, 255, 255)') {
        $(bibleName).css('color', 'rgb(33, 37, 41)');
        return;
    }


    let words = $(verse).find('span')
    console.log(words)
    let randomIndex = Math.floor(Math.random() * words.length)
    $(words[randomIndex]).removeClass('random-hide')

    // verse 색을 검은색으로 바꾼다.
    $(verse).css('color', 'rgb(33, 37, 41)')
})