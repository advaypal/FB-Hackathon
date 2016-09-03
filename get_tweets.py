import json
from auth import *

#
def get_all_tweets(screen_name):
	#initialize a list to hold all the tweepy Tweets
	alltweets = []

	#make initial request for most recent tweets (200 is the maximum allowed count)
	new_tweets = api.user_timeline(screen_name = screen_name, count = 200)

	#save most recent tweets
	alltweets.extend(new_tweets)

	#save the id of the oldest tweet less one
	oldest = alltweets[-1].id - 1

	#keep grabbing tweets until there are no tweets left to grab
	#while len(new_tweets) > 0:
	for i in range(1):
		#all subsiquent requests use the max_id param to prevent duplicates
		new_tweets = api.user_timeline(screen_name = screen_name, count = 200, max_id = oldest)
		#save most recent tweets
		alltweets.extend(new_tweets)
		#update the id of the oldest tweet less one
		oldest = alltweets[-1].id - 1

	# file = open('tweet.json', 'wb')
	# print "Writing tweet objects to JSON please wait..."
	# for status in alltweets:
	#     json.dump(status._json,file,sort_keys = True,indent = 4)

	# #close the file
	# print "Done"
	# file.close()
	return alltweets

if __name__ == '__main__':
    #pass in the username of the account you want to download
    get_all_tweets("realDonaldTrump")

def supply_name(screen_name):
	get_all_tweets(screen_name)
