// const { default: axios } = require("axios");

console.log('start');

var reader = new FileReader();

var fileList = {
    0:{ id:0, title:"file1", link:'./files/1.py', data: "#1\n" +
    "print('Задание 1. Даны три ненулевых числа. Найдите все возможные результаты деления суммы двух из них на оставшееся третье число.')\n" +
    "a=float(input('Введите ненулевое число 1: '))\n" +
    "b=float(input('Введите ненулевое число 2: '))\n" +
    "c=float(input('Введите ненулевое число 3: '))\n" +
    "if ((a!=0 and b!=0 and c!=0)):\n" +
    "a1 = (a + b) / c\n" +
    "b1 = (a + c) / b\n" +
    "c1 = (b + c) / a\n" +
    "print('Ответ: всевозможные результаты деления: ')\n" + 
    "print(a1)\n" +
    "print(b1)\n" +
    "print(c1)\n" +
    "else:\n" +
    "print ('Числа должны быть не равны нулю')\n" +
    "input ('')"},
    1:{ id:1, title:"file2", link:'./files/2.py', data: "#2\n" +
    "print('Задание 2. Данo натуральное число. Найдите остатки от деления этого числа на 3 и на 5.')\n" +
    "a = float (input ('Введите натуральное число: '))\n" +
    "while (a<0 or a%1 !=0):\n" +
    "print ('Вы ввели ненатуральное число')\n" +
    "a = float (input ('Введите НАТУРАЛЬНОЕ число: '))\n" +
    "if (a>0 and a!=0 and a%1==0):\n" +
    "b = a%3\n" +
    "c = a%5\n" +
    "print ('Ответ: остатки от деления числа', a, 'на 3 и на 5 равны:')\n" +
    "print (b)\n" +
    "print (c)\n" +
    "input ('')"},
    2:{ id:2, title:"file3", link:'./files/3.py', data:"#3\n" +
    "print ('Задание 3. Дано трехзначное число. Найдите сумму его цифр.')\n" +
    "a = float (input ('Введите трёхзначное число: '))\n" +
    "while (-100<a<100 or a>999 or a<-999):\n" +
    "print ('Вы ввели не трёхзначное число!')\n" +
    "a = float (input ('Введите ТРЁХЗНАЧНОЕ число: '))\n" +
    "if (a>99 and a<1000):\n" +
    "b = a % 10\n" +
    "b1 = (a % 100) // 10\n" +
    "b2 = (a % 1000) // 100\n" +
    "summ = b + b1 + b2\n" +            
    "print(summ)\n" +
    "elif (a<-99 and a>-1000):\n" +
    "c = abs (a% -10)\n" +
    "c1 = (a% -100) // -10\n" +
    "c2 = (a% -1000) // -100\n" +
    "summ = c + c1 + c2\n" +
    "print('Ответ: суммa цифр числа', a, 'равнa:')\n" +
    "print(summ)\n" +
    "input ('')\n"},
    3:{ id:3, title:"file4", link:'./files/4.py', data:"#4\n" +
    "print ('Задание 4. Дано трехзначное числo. Поменяйте среднюю цифру на ноль.')\n" +
    "a = float (input ('Введите трёхзначное число: '))\n" +
    "while (-100<a<100 or a>999 or a<-999):\n" +
    "print ('Вы ввели не трёхзначное число')\n" +
    "a = float (input ('Введите ТРЁХЗНАЧНОЕ число: '))\n" +
    "if (a>99 and a<1000):\n" +
    "b = a % 10\n" +
    "b1 = (( a % 1000) // 100) * 100\n" +
    "res = b + b1\n" +
    "print ('Ответ:')\n" +                  
    "print (res)\n" +
    "elif (a<-99 and a>-1000):\n" +
    "c = abs (a % -10)\n" +
    "c1 = (( a % -1000) // -100) * 100\n" +
    "res = c + c1\n" +
    "print ('Ответ:')\n" +                 
    "print (res)\n" +
    "input ('')"},
    4:{ id:4, title:"file5", link:'./files/5.py', data: "#10\n" +
    "print ('Задание 10. Дано число в двоичной системе. Определите это число в десятичной системе. Составьте программу, которая получает два целых числа, записанных в двоичной системе, складывает их и результат показывает также в двоичной системе.')\n" +
    "x = input ('Введите число в двоичном формате: ')\n" +
    "y = input ('Введите число в двоичном формате: ')\n" +
    "a1 = int(x,2)\n" +
    "b1 = int(y,2)\n" +
    "c1 = (a1+b1)\n" +
    "n = bin (c1)\n" +
    "print ('Ответ: сумма двоичных чисел равна:', n)\n" +
    "input ('')"},
}
for (i in fileList){
    document.getElementById('menuCont').innerHTML+=`<div id="menuFile" class="menu-wrapper"><span><i class="fa fa-file" aria-hidden="true"></i></span><p class="menu-title">` + fileList[i].title + `</p>` + `</div>`;
}

CKEDITOR.replace('text-content',{
    width:'100%',
    height:'500px',   
});

var test = document.getElementsByClassName('menu-wrapper');
for(k=0; k<test.length; k++){
    var fileData = [];
    test[k].addEventListener("click", function(){ 
        var fileX = fileList[k].data;
        for (var j = 0; j < fileX.length; j++){
            if (fileX[j] == "\n"){
                fileData += '<br>';
            }
            else{
                fileData+=fileX[j];
            }
        }
        CKEDITOR.instances['TextContent'].setData(fileData);
    });
}