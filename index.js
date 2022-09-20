const buff = require("buffer");  // импорт модуля Buffer
const stream = require("stream");  // импорт модуля Stream
const fs = require("fs");  //  импорт модуля fs

//Buffer.IsEncoding(string enc)   ---  метод, который возвращает true,
                                    // если кодировка сущетвует, иначе - false

console.log(Buffer.isEncoding("utf-8"));  //  true
console.log(Buffer.isEncoding("utf---"));  //  false

//buff.entries()  ---  получаем пару [индекс - код символа]


const buf = Buffer.from('buffer');

for(const b of buf.entries())
{
    console.log(b);
}

//buf.includes(str)   ---   возвращает true, если наша переменная содержит в себе строку, иначе - false

const str = Buffer.from("Hello, world!");

console.log(str.includes("Hello")); // true
console.log(str.includes("dog"));  //  false

//buf.lastIndexOf(str)   ---   вернет последний индекс найденого символа или подстроки

console.log(str.lastIndexOf("!"));  //  12
console.log(str.lastIndexOf("l"));  //  10
console.log(str.lastIndexOf("Hello"));  //  0

//buf.slice()  ---   создаме новый buffer, который ссылается на участок памяти старого buffer и соответсенно может его менять 

const copy = str.slice();

copy[0]++;  // меняем первый символ строки

console.log(copy.toString());  //  Iello, world!
console.log(str.toString());  //  Iello, world!


///   stream

const path = "doc.txt";
const stram = fs.createReadStream(path);  //  read
const writeStream = fs.createWriteStream("DocWrite.txt");

stram.on("data",(chunk)=>
{
    console.log(chunk.toString());
    writeStream.write(chunk);
})

//cork()

writeStream.cork();

writeStream.write("Dog"); //  вывод будет прежний потому что cork хранит его в буфере

//uncork()

writeStream.uncork();  //  очищаем данных хранящиеся в буфере после cork


//getMaxListeners()

console.log(stram.getMaxListeners());  //  слушатели событий

//off()

stram.off()  //  == remove Listeners 

//end()

writeStream.end("End");  //  заканчивается файл на End, больше запись невозможна



// СommonJS плюсы: 

// Лаконичный синтаксис
// Модули загружаются синхронно
// В большинстве случаев используется на сервере


// Смысл создания модулей в ES 6 было создание формата, который был такой же лаконичный как CommonJS и не были такими динамичными.
//  Это дало возможность на этапе компиляции получать ошибки, когда вы пытаетесь импортировать что-то, что не было експортировано.
//   Также тут поддерживается асинхронная загрузка.