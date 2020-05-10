// Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки.
// Придумать шаблон, который заменяет одинарные кавычки на двойные.

let str = "One:Â 'Hi Mary.' " +
    "Two:Â 'Oh, hi.'\n" +
    "One:Â 'How are you doing?'\n" +
    "Two:Â 'I'm doing alright. How about you?'\n" +
    "One:Â 'Not too bad. The weather is great isn't it?'\n" +
    "Two:Â 'Yes. It's absolutely beautiful today.'\n" +
    "One:Â 'I wish it was like this more frequently.'\n" +
    "Two:Â 'Me too.'\n" +
    "One:Â 'So where are you going now?'\n" +
    "Two:Â 'I'm going to meet a friend of mine at the department store.'\n" +
    "One:Â 'Going to do a little shopping?'\n" +
    "Two:Â 'Yeah, I have to buy some presents for my parents.'\n" +
    "One:Â 'What's the occasion?'\n" +
    "Two:Â 'It's their anniversary.'\n" +
    "One:Â 'That's great. Well, you better get going. You don't want to be late.'\n" +
    "Two:Â 'I'll see you next time.'\n" +
    "One:Â 'Sure. Bye.'"

const regexp1 = /'/gi
console.log(str.replace(regexp, '\"'))

// Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.

const regexp2 = /'/gi
console.log(str.replace(regexp, '\"'))


//* Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить.
// При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
// a.  Имя содержит только буквы.
// b.  Телефон имеет вид +7(000)000-0000.
// c.  E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
// d.  Текст произвольный.
// e.  Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой
//     и сообщить пользователю об ошибке.
