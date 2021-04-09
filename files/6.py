#6
print('Задание 6. В данном трехзначном числе переставьте цифры так, чтобы новое число оказалось наибольшим из возможных.')
a = float (input ('Введите трёхзначное число: '))

while (-100<a<100 or a>999 or a<-999):
    print ('Вы ввели не трёхзначное число')
    a = float (input ('Введите ТРЁХЗНАЧНОЕ число: '))
if (a<0):
    a = -a
if (a>99 and a<1000):
 b = ((a % 1000) // 100)
 b1 = ((a % 100) // 10)
 b2 = (a % 10) 

 if (b>b2 and b>b1):
     if (b1>b2):
         b = b * 100
         b1 = b1 * 10
         b2 = b2 
     elif (b2>b1 or b2==b1):
         b = b * 100
         b1 = b1
         b2 = b2 * 10
 elif(b1>b2 and b1>b):
     if (b2>b):
      b = b
      b1 = b1 * 100
      b2 = b2 * 10
     elif (b>b2 or b==b2):
      b = b
      b1 = b1 * 100
      b2 = b2 * 10
     
 elif(b2>b1 and b2>b):
     if (b1>b):   
      b = b
      b1 = b1 * 10
      b2 = b2 * 100
     elif (b>b1 or b1==b):
      b = b * 10
      b1 = b1
      b2 = b2 * 100
 else:
     b = b
     b1 = b1 * 10
     b2=  b2 * 100
 res = b + b1 + b2
 print ('Ответ:')                  
 print (res)
input ('')
