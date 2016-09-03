package sg.edu.nus.cs2020;

import java.io.File;
import java.util.Scanner;

public class TextGenerator {
	/**
	 * The main function takes reads in the file as input, and keeps generating the next character
	 * The initial value of the kgram is the first 'order' characters of the string
	 * @param args the order, the number of characters to generate, and the file name 
	 */
	public static void main(String[] args) {
		try {
			//code to read file
			Scanner scanner = new Scanner(new File(args[2]));
			String text = scanner.useDelimiter("\\A").next();
			scanner.close();
			int order = Integer.parseInt(args[0]);
			int n = Integer.parseInt(args[1]);
			MarkovModel model = new MarkovModel(text, order);
			//count keeps track of whether we have reached the end of the file 
			int count = 0;
			//stores initial kgram value
			String first = text.substring(count, order + count);
			System.out.print(first);
			String kgram = first;
			// we have already printed 'order' characters
			n = n - order;
			while(n > 0) {
				char next = model.nextCharacter(kgram);
				//create new kgram
				kgram = kgram.substring(1)+next;
				//print next character
				if(next != model.getNoCharacterValue()){
					System.out.print(next);
				}
				count++;
				//n case we are at end of file or we reach a kgram for which there is no possible next character
				if(count + order == text.length() || next == model.getNoCharacterValue()) {
					count = 0;
					// we print order items, but due to n -- at end of loop, we only decrement by order - 1
					n = n - order + 1;
					System.out.print(first);
					// re initialize kgram
					kgram = first;
				}
				n--;
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			System.out.println(e);
		}
	}
}
