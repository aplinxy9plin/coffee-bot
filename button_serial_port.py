import RPi.GPIO as GPIO
import requests

url = "http://localhost:1337/"
payload = "YES"

# led = 4

key = 3

GPIO.cleanup()

# GPIO.setmode(GPIO.BCM)

# GPIO.setup(LED, GPIO.OUT)

# GPIO.output(LED, GPIO.LOW)

GPIO.setup(KEY, GPIO.IN)

print("IT WORDS!")

while True:
	if GPIO.input(KEY) == False:
		response = requests.request("GET", url, data=payload)
		
# ts_alvlvl

# print(response.text)