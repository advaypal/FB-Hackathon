from auth import *
from get_tweets import *
from markov_model import *

def getImage(user_screen_name):
	return api.get_user(user_screen_name).profile_image_url

def getText(user_screen_name):
	all_tweets = get_all_tweets(user_screen_name)
	#print all_tweets[0]
	user_tweet_string = ' '.join([tweet.text if tweet.text else "" for tweet in all_tweets])
	text_generator = TextGenerator(user_tweet_string)
	return text_generator.generate_text();
	#return generated tweets and store for later??

if __name__ == '__main__':
	print getImage("realDonaldTrump")


	