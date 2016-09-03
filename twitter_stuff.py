from auth import *
from get_tweets import *
from markov_model import *

TWEET_LENGTH = 140
NUMBER_OF_TWEETS = 5

def getImage(user_screen_name):
	return api.get_user(user_screen_name).profile_image_url


def getText(user_screen_name):
	all_tweets = get_all_tweets(user_screen_name)
	user_tweet_string = ' '.join([tweet.text if tweet.text and not hasattr(tweet, 'retweeted_status') else "" for tweet in all_tweets])
	text_generator = TextGenerator(user_tweet_string)
	tweet_list = []
	for i in range(NUMBER_OF_TWEETS):
		tweet_list.append(text_generator.generate_text(TWEET_LENGTH))
	return tweet_list

if __name__ == '__main__':
	print getImage("realDonaldTrump")
