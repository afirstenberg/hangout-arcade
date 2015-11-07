#!/usr/bin/python
#  Hangout gaming tool
#        main.py
#
#  by: Eslam Diaa
#       7 Nov 2015
#

from firebase import firebase

# --- Declaring default values --- #
xpos = 500
ypos = 500
rot = 0
xspeed = 0
yspeed = 0

firebase = firebase.FirebaseApplication('https://boiling-inferno-5911.firebaseio.com/', None)

# --- Getting values --- #
get = firebase.get('/experiment2', None)
print "The Firebase Data: %s" %get

# --- post values in app --- # 
# post = firebase.patch('/experiment2', {'player1': 'values'})

# --- post using dict --- #
# test = {'player1': {'x': 100, 'y': 200}, 'player3': 'this is new ', 'player4': {'x': 20, 'y': 20}}
# post = firebase.patch('/experiment2', test)

# if (0 < x < 500 and 0 < y < 500):
	# pass
	# it's still inside the box ..

# else:
	#It's out site !!