import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;

import java.io.FileReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Scanner;
import java.util.Set;

public class App {

    private static Scanner scan = new Scanner(System.in);
    private static String[][] map;
    private static String[] cityNames;
    private static int firstCityChoose = -1;
    private static int secondCityChoose = -1;
    private static long startTime;
    private static long endTime;
    private static int lowestKM = 99999;

    private static boolean foundNextCity = false;

    public static void main(String[] args) {
        getDataAndFillTheMap();
        greetingFunc();
        calculatorFunc();


    }


    private static void calculatorFunc(){
        Set<Integer> pastCities = new HashSet<>();
        int totalKm = 0;
        int lowestCityKm = 0;
        lowestKM = 99999;

        int currentCity = firstCityChoose;


        pastCities.add(currentCity);

        while(currentCity != secondCityChoose){
            foundNextCity = false;
            System.out.println(map[currentCity][0]);
            for (int i = 1; i < map[1].length; i++){
                if (Integer.parseInt(map[currentCity][i]) < lowestKM && Integer.parseInt(map[currentCity][i]) != 99999 && Integer.parseInt(map[currentCity][i]) != 0){

                    if (!pastCities.contains(i)){
                        lowestKM = Integer.parseInt(map[currentCity][i]);
                        lowestCityKm = i;
                        foundNextCity = true;
                    }
                }
            }

            if (!foundNextCity) {
                System.out.println("No available path to the destination.");
                break;
            }

            currentCity = lowestCityKm;
            pastCities.add(currentCity);

            System.out.println(lowestKM);
            totalKm += lowestKM;
            lowestKM = 99999;
        }
        if (!foundNextCity){

        }else{
            endTime = System.nanoTime();
            System.out.println("Total of the shortest path to "+ cityNames[firstCityChoose - 1] + " from " + cityNames[secondCityChoose - 1] + " is: " + totalKm);
            System.out.println(String.format("Total time passed (in nanosecond): %s",endTime-startTime));
        }
    }


    private static void greetingFunc(){
        // Print the city names
        int i = 1;
        for (String word : cityNames) {
            System.out.println(i + " " + word);
            i++;
        }

        while (firstCityChoose <= 0 || firstCityChoose > cityNames.length){
            System.out.print("Please choose your start city (by the id!): ");
            firstCityChoose = scan.nextInt();
        }

        while (secondCityChoose <= 0 || secondCityChoose > cityNames.length || secondCityChoose == firstCityChoose){
            System.out.print("Please choose your end city (by the id!): ");
            secondCityChoose = scan.nextInt();
        }

        System.out.println("Thank you. I'm starting to calculate fastest way according to DFS algorithm.");
        startTime = System.nanoTime();
    }



    // Getting Data And Fill The 2 Dimensional Array
    private static void getDataAndFillTheMap(){
        String csvFile = "src/main/resources/citiesFile.csv";

        try (CSVReader csvReader = new CSVReader(new FileReader(csvFile))) {
            List<String[]> allData = csvReader.readAll();
            int numRows = allData.size();
            int numCols = allData.get(0).length;

            // Initialize 2D array
            map = new String[numRows][numCols];
            cityNames = new String[numCols];

            // Fill 2D array
            for (int i = 0; i < numRows; i++) {
                map[i] = allData.get(i);
            }

            // Fill city names
            for (int i = 0; i < numCols; i++){
                cityNames[i] = map[0][i];
            }

            /*
            // Print data
            for (String[] row : map) {
                for (String value : row) {
                    System.out.print(value + " ");
                }
                System.out.println();
            }
            */

        } catch (IOException e) {
            e.printStackTrace();
        } catch (CsvException e) {
            throw new RuntimeException(e);
        }
    }
}

