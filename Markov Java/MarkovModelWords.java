package sg.edu.nus.cs2020;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class MarkovModelWords {
	// value to be returned when no next character is possible
	private final String NOWORD = "NOWORD";
	private String m_text;
	private HashMap<String, HashMap<String, Integer>> wordMap;
	/**
	 * MarkovModel constructor takes in the values of text and order and initializes instance variables
	 * It also creates a hashmap (called wordMap) of hashmaps, where each hashmap in wordMap is 
	 * for a particular kgram, and stores the
	 * words following the kgram with their frequencies
	 * @param text Stores the input text file as a string
	 * @param order Stores the size of the kgram
	 */
	public MarkovModelWords(String text) {
		m_text = text;
		wordMap = new HashMap<String, HashMap<String, Integer>>();
	}

	/**
	 * Getter
	 * @return the default String value chosen for cases where no next word is possible
	 */
	public String getNoWord() {
		return NOWORD;
	}

	/**
	 * getFrequency calculates the frequency of the kgram in the string
	 * It does so by iterating through the string and counting the number of occurrences of the kgram. The frequency is stored
	 * as a value in the corresponding hashmap, with key being "KGRAMFREQ"
	 * @param kgram takes in the kgram which is a string
	 * @return the frequency of the kgram in the input text
	 */
	public int getFrequency(String kgram) {
		//creating a hashmap that will be stored in wordMap
		// keys are the various words following the kgram , values are
		// the frequency of that particular word appearing after the kgram
		HashMap<String, Integer> kgramMap = new HashMap<String, Integer>();
		int kgramFreq = 0;
		//ensuring that the length of kgram and the order match
		if(!wordMap.containsKey(kgram)) {
			//value has not been computed
			wordMap.put(kgram, kgramMap);
			int m_order = kgram.length();
			for(int i = 0; i < m_text.length() - m_order; i++) {
				String s = m_text.substring(i, i + m_order);
				if(s.equals(kgram)) {
					// we increment the frequency
					kgramFreq++;
					//insert/ update hashtable
					String nextWord = "";
					//assuming no word with size > 40
					for(int j = i + m_order; j < i + m_order + 40 && j < m_text.length(); j++) {
						char ch = m_text.charAt(j);
						if(ch == ' ') {
							nextWord = m_text.substring(i + m_order, j + 1);
							break;
						}
					}
					if(kgramMap.get(nextWord) == null) {
						kgramMap.put(nextWord, 1);
					} else {
						kgramMap.put(nextWord, kgramMap.get(nextWord) + 1);
					}
				}
			}
			kgramMap.put("KGRAMFREQ", kgramFreq);
			return kgramFreq;
		} else {
			//value has already been computed
			return wordMap.get(kgram).get("KGRAMFREQ");
		}
	}
	/**
	 * getFrequency looks up the frequency of a word (number of times it appears after kgram) in the hashtable for the kgram
	 * @param kgram the kgram(String)
	 * @param word: the word whose frequency is to be calculated
	 * @return the number of times word appears immediately after kgram
	 */
	public int getFrequency(String kgram, String word) {
		//ensure hashmap corresponding to kgram has been initialised
		if(!wordMap.containsKey(kgram)) {
			int freq = getFrequency(kgram);
		}
		// returns the corresponding value in the hashmap
		 if(word.equals("KGRAMFREQ")) {
			 return 0;
		 } else if(wordMap.get(kgram).containsKey(word)) {
			 return wordMap.get(kgram).get(word);
		 } else {
			 return 0;
		 }
	}
	/**
	 * nextWord generates the word to follow the kgram
	 * It does so by generating a random number, and then iterating through the kgram's corresponding hashSet
	 * When the cumulative probability exceeds the random number, we return that word
	 * @param kgram the kgram(String)
	 * @return the word that will follow the kgram in the generated text
	 */
	public String nextWord(String kgram) {
		int frequency = getFrequency(kgram);
		double random = Math.random();
		//count stores the cumulative character frequency count
		double count = 0;
		String lastWord = "";
		HashMap<String, Integer> kgramMap = wordMap.get(kgram);
		for(String word : kgramMap.keySet()) {
			int wordFreq = getFrequency(kgram, word);
			if(wordFreq!=0) {
				// increase count
				count = count + wordFreq;
				// lastWord stores the last word with non zero frequency
				lastWord = word;
			}
			//count/frequency is the probability that 'word' will appear after kgram
			if(count/frequency > random ) {
				return lastWord;
			}
		}
		// in case there is no possible next word
		return NOWORD;
	}
	/**
	 * setRandomSeed is used for testing and setting seed of Random class object
	 * @param s long value of seed
	 */
	public void setRandomSeed(long s) {
		Random random = new Random();
		random.setSeed(s);
	}
}
