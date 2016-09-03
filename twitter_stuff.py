from auth import *
from get_tweets import *
from markov_model import *

TWEET_LENGTH = 140
NUMBER_OF_TWEETS = 5

def getImage(user_screen_name):
	return api.get_user(user_screen_name).profile_image_url


def getText(user_screen_name):
	all_tweets = get_all_tweets(user_screen_name)

	user_tweet_string = ' '.join([check(tweet) for tweet in all_tweets])
	text_generator = TextGenerator(user_tweet_string)
	tweet_list = {}
	for i in range(NUMBER_OF_TWEETS):
		flag = False
		tweet = text_generator.generate_text(TWEET_LENGTH, "You")
		for j in range(len(tweet) - 1, -1, -1):
			if tweet[j] == '.' or tweet[j] == '?' or tweet[j] == '!':
				tweet_list[i] = tweet[ : j + 1]
				flag = True
				break
		if not flag:
			tweet_list[i] = tweet
	return tweet_list

def check(tweet):
	if tweet.text and not hasattr(tweet, 'retweeted_status'):
		if tweet.text[-1] == '.' or tweet.text[-1] == '?' or tweet.text[-1] == '!':
			return tweet.text
		else:
			return tweet.text + '.'
	else:
		return ''

if __name__ == '__main__':
	print getImage("realDonaldTrump")
