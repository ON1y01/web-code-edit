#16
print ( 'Задание 16 Найти сумму натуральных чисел от a до b, где a и b вводит пользователь. В случае некорректных a и b (например, a>b) вывести сообщение Сумма не существует')
a = int (input ("Введите число a:"))
b = int (input ("Введите число b:"))
if a<b:
	s=0
	while b>=a:
		s=s+b
		b-=1
	print ('Сумма чисел от a до b, включая эти числа:',s)
else:
	print ('Сумма не существует')
