package sg.edu.nus.cs2020;
import java.util.HashMap;
import java.util.Random;

public class MarkovModel {
	// value to be returned when no next character is possible
	private final char NOCHARACTER = (char)(255);
	private int m_order;
	private String m_text;
	private HashMap<String, int[]> charfreqTable;
	/**
	 * MarkovModel constructor takes in the values of text and order and initializes instance variables
	 * It also creates a hashmap of kgrams
	 * @param text Stores the input text file as a string
	 * @param order Stores the size of the kgram
	 */
	public MarkovModel(String text, int order) {
		m_text = text;
		m_order = order;
		charfreqTable = new HashMap<String, int[]>();
	}
	/**
	 * Getter
	 * @return the order of the kgram
	 */
	public int order() {
		return m_order;
	}
	/**
	 * Getter
	 * @return the default character value chosen for cases where no next character is possible
	 */
	public char getNoCharacterValue() {
		return NOCHARACTER;
	}
	
	/**
	 * getFrequency calculates the frequency of the kgram in the string
	 * It does so by iterating through the string and counting the number of occurrences of the kgram. The frequency is stored
	 * in the 127th index of an integer array of size 128, which serves as the value corresponding to the kgram as key in the hashmap
	 * @param kgram takes in the kgram which is a string
	 * @return the frequency of the kgram in the input text
	 */
	public int getFrequency(String kgram) {
		//creating array that will be stored in hash table
		//array is of size 128 to have one slot for each ASCII character. The value in the array corresponds
		// to the frequency of that character appearing after the kgram
		int[] arr = new int[128];
		//ensuring that the length of kgram and the order match
		if(kgram.length()!=m_order) {
			throw new IllegalArgumentException("K gram must have same length as order");
		} else if(!charfreqTable.containsKey(kgram)) {
			//value has not been computed
			charfreqTable.put(kgram, arr);
			for(int i = 0; i < m_text.length() - m_order; i++) {
				String s = m_text.substring(i, i + m_order);
				if(s.equals(kgram)) {
					int charValue = (int)m_text.charAt(i + m_order);
					if(charValue < 0 || charValue > 127) {
						throw new IllegalArgumentException("This input text contains characters that do not fall under the 127 ASCII characters");
					}
					// we increment the frequency of the following character as well
					arr[charValue]++;
					arr[127]++;
				}
			}
			return arr[127];
		} else {
			//value has already been computed
			return charfreqTable.get(kgram)[127];
		}
	}
	/**
	 * getFrequency looks up the frequency of c(number of times it appears after kgram) in the hashtable for the kgram
	 * @param kgram the kgram(String)
	 * @param c the character whose frequency is to be calculated
	 * @return the number of times character c appears immediately after kgram
	 */
	public int getFrequency(String kgram, char c) {
		//this line is to ensure that the kgram's corresponding array has been initialized
		// in case the frequency has already been computed, this operation is not expensive
		int freq = getFrequency(kgram);
		// returns the corresponding value in the array
		return charfreqTable.get(kgram)[(int)c];
	}
	/**
	 * nextCharacter generates the character to follow the kgram
	 * It does so by generating a random number, and then iterating through the kgram's corresponding array
	 * When the cumulative probability exceeds the random number, we return that character
	 * @param kgram the kgram(String)
	 * @return the character that will follow the kgram in the generated text
	 */
	public char nextCharacter(String kgram) {
		int frequency = getFrequency(kgram);
		double random = Math.random();
		//count stores the cumulative character frequency count
		double count = 0;
		int charIndex = 0;
		for(int i = 0; i< 127; i++) {
			//count/frequency is the probability that character corresponding to ASCII value i will appear after kgram
			int charfreq = getFrequency(kgram, (char)i);
			if(charfreq!=0) {
				// increase count
				count = count + charfreq;
				// charIndex stores the last character with non zero frequency
				charIndex = i;
			}
			if(count/frequency > random ) {
				return (char)charIndex;
			}
		}
		// in case there is no possible next Character
		return NOCHARACTER;
	}
	/**
	 * setRandomSeed is used for testing and setting seed of Random class object
	 * @param s long value of seed
	 */
	public void setRandomSeed(long s) {
		Random random = new Random();
		random.setSeed(s);
	}
	/**
	 * The main function is for testing purposes
	 * @param args The arguments to be passed into the program
	 */
	public static void main(String[] args) {
		//sample test
		MarkovModel model = new MarkovModel("gagggagaggcgagaaa", 2);
		System.out.println(model.nextCharacter("ga"));
	}
}
