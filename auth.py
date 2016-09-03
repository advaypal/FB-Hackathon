import tweepy

# Consumer keys and access tokens, used for OAuth
consumer_key = 	'AW0Tf8XCGcPrXf58UkLFha2db'
consumer_secret = 'D8btJ5nz5LMNYJDFoh9oBvejNEmRtXufdlHmExNrIeQVmNIuQM'
access_key = '771975104855089153-vUUVrTz7IUP4wDXuEOUYvBa2hlwdHgf'
access_secret = 'FxedPH5jYOR5wrGdCgXFz7EZ9zfviVJofKfiKeZYbGnWL'

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_key, access_secret)
api = tweepy.API(auth)


