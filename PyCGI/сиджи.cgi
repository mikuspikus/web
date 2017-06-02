#!C:\Program Files\Anaconda3\python.exe
# -*- coding: UTF-8 -*-
#v 1.0
import cgi
import random

form = cgi.FieldStorage()
game_state = form.getfirst("game_state", "none")

def transfer_to_int(string_to_number):
	"""
	More or less safe transfer smth to integer
	"""
	try:
		return int(string_to_number)
	except ValueError:
		return 0

def encryption(secret_key, number):
	return secret_key ^ number

def decryption(secret_key, encrypted_number):
	return secret_key ^ encrypted_number
	
def write_Low_or_High(user_guess, number):
	"""
	Say results of comparison user guess with number
	"""
	if user_guess == number: #stop game because of winning
		print("""
		<input type = "hidden" name = "game_state" value = "game_start">
		<p style = \"background-color:green\">А ты фартовый!</p>
	</form>""")
	else:
		print("""
		<p style = \"background-color:red\">Неправильно!</p>
	""")
		if user_guess > number:
			print("""
		<p>Последнее число было больше задуманного.</p>
	</form>
			""")
		else:#user_guess < number
			print("""
		<p>Последнее число было меньше задуманного.</p>
	</form>
			""")
print("Content-type: text/html;charset=windows-1251\r\n")
print("""	
<!DOCTYPE html>
<html>
	<head>
		<meta charset = \"utf-8\"/>
		<title>Угадай число!</title>
		<link href = "page_style.css" rel = "stylesheet">
	</head>
	<body>
		<h1>Угадай число!</h1>
		<p>Только сегодня и только для Вас! Угадайте число от 1 до 100 за 7 ходов. Давай, позолоти себе ручку!</p>
		<form action = "govno.cgi" method = "post">""")

if game_state == "game_start": #if it's first guess
	attempts = 7
	secret_key = random.randint(1, 100)
	rand = random.randint(1, 100)
	random_number = encryption(secret_key, rand)
	user_guess = transfer_to_int(form.getfirst("guessField", ""))
	guesses = str(user_guess)
	print("""
		<input type = "hidden" name = "game_state" value = "game_in_progress">
		<input type = "hidden" name = "attempts" value = \"""" + str(attempts) + """\">
		<input type = "hidden" name = "random_number" value = \"""" + str(random_number) + """\">
		<input type = "hidden" name = "secret_key" value = \"""" + str(secret_key) + """\">
		<input type = "hidden" name = "guesses" value = \"""" + guesses + """\"> 
		<label for = "guessField">Число: </label>
		<input type = "text" name = "guessField">
		<input type = "submit" value = "Проверка">
		<p>Предыдущие попытки: """ + guesses + """</p>
	""")
	write_Low_or_High(user_guess, rand)
else:
	attempts = int(form.getfirst("attempts", "none")) - 1
	secret_key = int(form.getfirst("secret_key", "none"))
	random_number = int(form.getfirst("random_number", "none"))
	user_guess = transfer_to_int(form.getfirst("guessField", "0"))
	guesses = form.getfirst("guesses", "") + ' ' + str(user_guess)
	decrypted_number = decryption(secret_key, random_number)
	print("""
		<input type = "hidden" name = "attempts" value = \" """ + str(attempts) + """\">
		<input type = "hidden" name = "random_number" value = \"""" + str(random_number) + """\">
		<input type = "hidden" name = "secret_key" value = \"""" + str(secret_key) + """\">	
		<label for = "guessField">Число: </label>
		<input type = "text" name = "guessField">
		<input type = "submit" value = "Проверка">
		<p>Предыдущие попытки: """ + guesses + """</p>
		""")
	if attempts <= 1: #stop game because of loosing
		guesses = ''
		print("""
		<input type = "hidden" name = "game_state" value = "game_start">
		<input type = "hidden" name = "guesses" value = \"\">
		<p>You get nothing! You lose! Good day, sir!</p>
	</form>""")
	else:
		print("""
		<input type = "hidden" name = "guesses" value = \"""" + guesses + """\">
		""")
		write_Low_or_High(user_guess, decrypted_number)
print("""
	</body>
</html>""")