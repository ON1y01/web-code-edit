#15
print('Задание 15.Треугольник Паскаля. Вывести на экран треугольник Паскаля из n строк. Придумать структуру данных для хранения треугольника Паскаля (например, стандартная матрица, что, однако, не экономно). Реализовать показ треугольника по данным из этой структуры.')
import math
def get_pascal_triangle(rows):
    def combination(n, r):
        return int((math.factorial(n)) / ((math.factorial(r)) * math.factorial(n - r)))


    res = []
    for count in range(rows):
        row = []
        for element in range(count + 1): 
            row.append(combination(count, element))
        res.append(row)
    return res

res = get_pascal_triangle(10)
print(*res, sep='\n')
