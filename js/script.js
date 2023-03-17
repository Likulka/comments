'use strict'


let form = document.querySelector('.form');
let comments = document.querySelector('.comments__items');
let errorTurned = false;


form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validateForm()) addComment();
});


function removeError(input){
    if (input.parentElement.classList.contains('not-valid')){
        input.parentElement.classList.remove('not-valid');
        input.parentElement.lastChild.remove();
    }
}

function setDate(date){
    let now = new Date();
    if (!date || date.toDateString() == now.toDateString() ) {
        date = new Date();
    };

    let yesterday = new Date(new Date() - 24*3600*1000);
    yesterday = yesterday.toDateString();
    now = now.toDateString();
    let commentDate = date.toDateString();

    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    switch (true) {
        case now == commentDate:
            return 'сегодня, '+ hours + ':' + minutes;
        case commentDate == yesterday:
            return 'вчера, ' + hours + ':' + minutes;
        default:
            return date.toLocaleString().slice(0, -3);
    }
}



function addComment(){
    validateForm()
    let commentItem = document.createElement('div');
    commentItem.className = 'comment__item';
    commentItem.innerHTML = `<div class="comment__body">
                                <p class="comment__user atribute">${form.name.value}</p>
                                <p class="comment__date atribute">${setDate(form.date.valueAsDate)}</p>
                                </div>`;
                                        
    let text = document.createElement('p');
    text.classList.add('comment__text');
    text.innerHTML=form.text.value;

    let remBtn = document.createElement('button');
    remBtn.className = 'comment__remove';
    remBtn.onclick = function(event){event.target.parentNode.parentNode.remove()};
    
    let favorite = document.createElement('button');
    favorite.className = 'comment__favorite';
    favorite.onclick = function(event) { event.target.classList.toggle('like')};
    
    commentItem.firstChild.append(text);
    commentItem.firstChild.append(favorite);
    commentItem.firstChild.append(remBtn);
                            
    comments.append(commentItem);
    for (let elem of form.elements){
        elem.value = '';
    }
}

function validateForm(){
    let result = true;
    let inputs = document.querySelectorAll('input:not(input[id=date]), textarea');

    for (let input of inputs){

        let errorMsg = '';

        switch (true){
            case input.value.length < 1:
                errorMsg='Поле не может быть пустым';
                break;
            case input.name == 'name' && !input.value.match(/^[a-zA-Z0-9_.]{1,30}$/):
                errorMsg ='Имя может содержать только латинские буквы, цифры, точку и _'
                break;
        }
        errorMsg && (result = false);
        if (errorMsg && !input.parentElement.classList.contains('not-valid')) {
            
            input.addEventListener('input',(event) => removeError(event.target), {once: true} )
            setErrorMsg(errorMsg, input.parentElement);
        }
    }

    return result;
}

function setErrorMsg(errorMsg, elem){
    let errorBlock = document.createElement('div');
    errorBlock.className = 'form__error error';
    elem.classList.add('not-valid');
    errorBlock.innerText = errorMsg;
    elem.append(errorBlock);
}



