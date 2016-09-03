import random
K = 2


class MarkovModel(object):
    """docstring for MarkovModel."""
    def __init__(self, text):
        super(MarkovModel, self).__init__()
        self._FREQ_IDX = 0
        self._NEXT_WORD_MAP_IDX = 1
        self._model = self.generate_model(text)

    def generate_model(self, text):
        word_dict = {}

        num_words = len(text)
        for idx in range(len(text)):
            if idx + K == num_words:
                break

            current_words = ' '.join(text[idx : idx + K])

            if current_words in word_dict:
                word_dict[current_words][self._FREQ_IDX] += 1
            else:
                word_dict[current_words] = [1, {}]

            next_word = text[idx + K]
            if next_word in word_dict[current_words][self._NEXT_WORD_MAP_IDX]:
                word_dict[current_words][self._NEXT_WORD_MAP_IDX][next_word] += 1
            else:
                word_dict[current_words][self._NEXT_WORD_MAP_IDX][next_word] = 1

        return word_dict

    def get_word_freq(self, word):
        if word in self._model:
            return self._model[word][self._FREQ_IDX]

        return 0

    def get_next_word_freq(self, word, next_word):
        if word in self._model:
            if next_word in self._model[word][self._NEXT_WORD_MAP_IDX]:
                return self._model[word][self._NEXT_WORD_MAP_IDX][next_word]

        return 0

    def get_next_word(self, word):
        freq = self.get_word_freq(word)
        random_num = random.random()
        count = 0.0
        if word not in self._model:
            return False

        for next_word in self._model[word][self._NEXT_WORD_MAP_IDX]:
            next_word_freq = self.get_next_word_freq(word, next_word)
            count += next_word_freq
            if count / freq > random_num:
                return next_word

        return False


class TextGenerator(object):
    """docstring for TextGenerator."""
    def __init__(self, text):
        super(TextGenerator, self).__init__()
        text = [word.replace('&amp;', '&') for word in text.split() if "https://" not in word]
        self._markov_model = MarkovModel(text)
        self._first_word = ' '.join(text[:K])

    def generate_text(self, max_char, start_word=None):
        current = start_word if start_word else self._first_word
        num_chars = len(current)
        tweet = current
        exceeded_max_char = False

        while not exceeded_max_char:
            next_word = self._markov_model.get_next_word(current)
            next_word = next_word if next_word else self._first_word
            current = ' '.join(current.split(' ')[1:] + [next_word])

            if num_chars + len(next_word) > max_char:
                exceeded_max_char = True
            else:
                tweet += " " + next_word
                num_chars += len(next_word)

        return tweet
