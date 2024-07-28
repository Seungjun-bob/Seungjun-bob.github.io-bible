$(document).on('click', '.verse', (e) => {
    // 클릭한 것의 글씨 색이 흰색이 아니면 검색으로 바꾼다. 아니면 검은색으로 바꾼다.
    if ($(e.target).css('color') === 'rgb(255, 255, 255)') {
        $(e.target).css('color', 'rgb(33, 37, 41)')
    } else {
        $(e.target).css('color', 'rgb(255, 255, 255)')
    }
}) 

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
    verses.each((index, verse)=>{
        $(verse).css('color', 'rgb(255, 255, 255)')
    })
})

$(document).on('click', '#showVerses', ()=>{
    let verses = $('.verse')
    verses.each((index, verse)=>{
        $(verse).css('color', 'rgb(33, 37, 41)')
    })
})