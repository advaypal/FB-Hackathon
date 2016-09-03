package sg.edu.nus.cs2020;

import java.io.File;
import java.util.Scanner;

public class TextGeneratorWords {
	/**
	 * The main function takes reads in the file as input, and keeps generating the next word
	 * The initial value of the kgram is the first 'order' characters of the string
	 * @param args the order, the number of characters to generate, and the file name 
	 */
	public static void main(String[] args) {
		try {
			//code to read file
			Scanner scanner = new Scanner(new File(args[2]));
			String text = scanner.useDelimiter("\\A").next();
			scanner.close();
			//initial kgram size
			int order = Integer.parseInt(args[0]);
			int n = Integer.parseInt(args[1]);
			MarkovModelWords model = new MarkovModelWords(text);
			//count keeps track of whether we have reached the end of the file 
			int count = 0;
			//stores initial kgram value
			String first = text.substring(count, order + count);
			System.out.print(first);
			String kgram = first;
			// we have already printed 'order' characters
			n = n - order;
			while(n > 0) {
				String word = model.nextWord(kgram);
				//create new kgram
				kgram = word;
				// order value changes depending on word size
				order = kgram.length();
				//print next word
				if(!word.equals(model.getNoWord())) {
					System.out.print(word);
				}
				count++;
				//n case we are at end of file or we reach a kgram for which there is no possible next word
				if(count + order == text.length() || word.equals(model.getNoWord())) {
					count = 0;
					// we print order items, but due to decrement at end of loop, we only decrement by order - word.length()
					n = n - first.length() + word.length();
					System.out.print(first);
					// re initialize kgram
					kgram = first;
				}
				n -= word.length();
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			System.out.println(e);
		}
	}
}