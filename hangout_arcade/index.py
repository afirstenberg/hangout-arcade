#!/usr/bin/python
#  Hangout gaming tool
#        main.py
#
#  by: Eslam Diaa
#       7 Nov 2015


from firebase import firebase

firebase = firebase.FirebaseApplication('https://boiling-inferno-5911.firebaseio.com/', None)

# --- Getting values --- #
# print "The Firebase Data: %s" %get
# print get[player1][x]
# --- post values in app --- # 
# post = firebase.patch('/experiment2', {'player1': 'values'})

# --- post using dict --- #
# test = {'player1': {'x': 100, 'y': 200}, 'player3': 'this is new ', 'player4': {'x': 20, 'y': 20}}
# post =
# post = firebase.patch('/experiment2', test)
while True:
	get = firebase.get('/spacegame/hangout2', None)
	for player in get.keys():
		if player == 'target':
			pass
		else:
			get[player]['xpos'] += get[player]['xspeed']
			get[player]['ypos'] += get[player]['yspeed']
			firebase.patch('/spacegame/hangout2', get)

		if get[player]['xpos'] > 400 or  get[player]['xpos'] < 0 or get[player]['ypos'] > 400 or get[player]['ypos'] < 0 :
			get[player]['xspeed'] *= -1
			get[player]['yspeed'] *= -1
			firebase.patch('/spacegame/hangout2', get)
		else:
			# it's still inside the box ..
			pass