class vendingMachine {
    constructor(number, name, globalX, globalY) {
        this.number = number;
        this.name = name;
        this.globalX = globalX;
        this.globalY = globalY;
        this.relX = 0;
        this.relY = 0;
      }

      getCoordinatePair() {
          console.log('(' + this.globalX + ', ' + this.globalY + ')');
      }
}

class routePhenotype {
    constructor(currentMap) {
        this.currentMap = currentMap;
        this.driverA = [];
        this.driverB = [];
        this.testArray = [1, 1, 1, 1, 2, 3];
        this.totalDistanceA = 0;
        this.totalDistanceB = 0;
        this.totalDistance = 0;
        this.fitness = 0;
        this.normalizedFitness = 0;

        this.generateRandomPhenotype();
    }

    printRoutes() {
        var routeA = [];
        var routeB = [];
        for (var i = 0; i < this.driverA.length; i++) {
            routeA.push(this.driverA[i].number);
            routeB.push(this.driverB[i].number);
        }
        console.log("driverA's route: " + routeA);
        console.log("driverB's route: " + routeB);
    }

    getListOfDistances() {
        /*
        Debug method. Returns array of distances from each stop to the next, routeA only.
        */
        var returnArray = [];
        for (var i = 0; i < this.driverA.length - 1; i++) {
            let vendingMachineAtIndex = this.driverA[i];
            let nextVendingMachine = this.driverA[i+1];

            let distance = dist(vendingMachineAtIndex.globalX, vendingMachineAtIndex.globalY, nextVendingMachine.globalX, nextVendingMachine.globalY);
            returnArray.push(distance);
        }
        return returnArray;
    }

    generateRandomPhenotype() {
        /*
        Randomly assigns vendingMachines in passed map between two routes, sets routes up to begin and end at startPoint. Called on instantiation of a new routePhenotype.
        */
       //console.log('DEBUG. best distance is: ' + currentMap.bestPhenotypeToDate.fitness);

        // create shuffledMapArray from map
        let localMapArray = currentMap.vendingMachines;                 // so as not to disturb original
        let shuffledMapArray = shuffle(localMapArray);

        // reset routes
        this.driverA = [];
        this.driverB = [];

        // split shuffledMapArray between the two routes
        let stopsPerRoute = this.currentMap.numberOfVendingMachines / 2;
        for (var i = 0; i < stopsPerRoute; i++) {
            this.driverA.push(shuffledMapArray.pop());
            this.driverB.push(shuffledMapArray.pop());
        }
        
    }

    getRoute(route) {
        /*
        Returns specified route, A or B, with depot appended to beginning and end
        */

        var routeAToReturn = [];
        routeAToReturn.push(depot);
        
        if (route == 'A') {
            for (var i = 0; i < this.driverA.length; i++) {
                routeAToReturn.push(this.driverA[i]);
            }
        } else if (route == 'B') {
            for (var i = 0; i < this.driverB.length; i++) {
                routeAToReturn.push(this.driverB[i]);
            }
        }
        
        routeAToReturn.push(depot);

        return routeAToReturn;
    }

    getTotalDistance() {
        /* 
        Calculates totalDistanceA, totalDistanceB, totalDistance.
        */
        
        // get routes
        let routeA = this.getRoute('A');
        let routeB = this.getRoute('B');

        // reset sum variables
        this.totalDistanceA = 0;
        this.totalDistanceB = 0;
        this.totalDistance = 0;
        
        // sum routeA
        for (var i = 0; i < routeA.length - 1; i++) {
            let vendingMachineAtIndex = routeA[i];
            let nextVendingMachine = routeA[i+1];

            let distance = dist(vendingMachineAtIndex.globalX, vendingMachineAtIndex.globalY, nextVendingMachine.globalX, nextVendingMachine.globalY);

            this.totalDistanceA += distance;
        }


        // sum routeB
        for (var i = 0; i < routeB.length - 1; i++) {
            let vendingMachineAtIndex = routeB[i];
            let nextVendingMachine = routeB[i+1];

            let distance = dist(vendingMachineAtIndex.globalX, vendingMachineAtIndex.globalY, nextVendingMachine.globalX, nextVendingMachine.globalY);

            //console.log('distance b:' + distance);

            this.totalDistanceB += distance;
        }

        // total sum
        this.totalDistance = this.totalDistanceA + this.totalDistanceB;

        // testing
        //console.log('totalDistance: ' + this.totalDistanceA);
    }

    calcFitness() {
        /*
        Calculates a fitness score. Criterion is minimization of overall distance.
        */
        this.fitness = (1 / this.totalDistance) * 100000;
    }
}

class vendingMachineMap {
    constructor() {
        this.width = 600;
        this.height = 600;
        
        this.vendingMachines = [];
        this.numberOfVendingMachines = 0;

        // location of depot is hardcoded as global variable at top of main.js
    }

    populateRandomly(numberOfVendingMachines) {
        /*
        Randomly populates the map. Used for testing.
        */
        this.numberOfVendingMachines = numberOfVendingMachines;
        
        // generate appropriate number of vending machines with random coordinates
        for (var i = 0; i < this.numberOfVendingMachines; i++) {
            let newX = floor(random(this.width));
            let newY = floor(random(this.height));
            let newVendingMachine = new vendingMachine(i, ('unnamed' + [i]), newX, newY);
            this.vendingMachines.push(newVendingMachine);
        }
    }

}

class population {
    constructor(totalMembers) {
        this.totalMembers = totalMembers;
        this.members = [];
        this.currentBestPhenotype;
        this.bestPhenotypeToDate;
        this.generation = 0;

        this.bestDistanceToDate = Infinity;            // experimental

        // instantiate population
        for (var i = 0; i < this.totalMembers; i++) {
            let newPhenotype = new routePhenotype(currentMap);
            this.members.push(newPhenotype);
        }

        // arbitrarily set initial value for currentBestPhenotype and bestPhenotypeToDate
        this.bestPhenotypeToDate = new routePhenotype(currentMap);          // COULD THIS BE THE PROBLEM?
        this.bestPhenotypeToDate.generateRandomPhenotype();
        this.currentBestPhenotype = this.members[0];
        this.assessFitness();
    }

    
    newGenerationRandom() {
        /*
        Used for brute force method for testing. 
        */

        for(var i = 0; i < this.totalMembers; i++) {
            this.members[i].generateRandomPhenotype();
        }
        this.generation += 1;
    }

    assessFitness() {
        /*
        Calculates basic and normalized fitness scores. Sorts members array by normalized fitness, an integer corresponding to the probability that a given phenotype will be selected for the next generation.
        */

        // Use local method to get total distance for each phenotype. Sum total for normalized route length. Run calcFitness.
        var routeLengthSum = 0;
        for (var i = 0; i < this.totalMembers; i++) {
            this.members[i].getTotalDistance();
            this.members[i].calcFitness();
            routeLengthSum += this.members[i].totalDistance;
        }

        // Sort this.members by fitness, best first, so we can pull out the best of the lot easily
        this.members.sort(function(a,b) {
            if (a.fitness < b.fitness) {
                return 1;
            } else {
                return -1;
            }
        });

        // If current best is better than best ever, reset it
        // if (this.members[0].totalDistance < this.bestPhenotypeToDate.totalDistance) {
        //     this.bestPhenotypeToDate = this.members[0];
        // }
        
        console.log('prospective new: ' + this.members[0].fitness + ', old: ' + this.bestPhenotypeToDate.fitness)       // REMOVE

        if (this.members[0].fitness > this.bestPhenotypeToDate.fitness) {
            //DEBUG
            console.log('RESETTING BEST EVER. OLD FITNESS: ' + this.bestPhenotypeToDate.fitness);
           
            this.bestPhenotypeToDate = this.members[0];
            this.bestDistanceToDate = this.members[0].totalDistance;        // EXPERIMENTAL
            
            //DEBUG
            console.log('RESETTING BEST EVER. NEW FITNESS: ' + this.bestPhenotypeToDate.fitness);
        }
        
        // With routeLengthSum in hand, iterate through a second time to set normalizedFitness
        for (var i = 0; i < this.totalMembers; i++) {
            this.members[i].normalizedFitness = floor((this.members[i].fitness / routeLengthSum) * 1000000);
        }
    }

    // getBestPhenotype() {
    //     /*
    //     Returns the fittest phenotype of the current generation. Assumes assessFitness() has been run.
    //     */
    //    return this.members[0];
    // }

    selectNextGeneration() {
        /*
        Selects a new population on the basis of fitness scores of the old population. Puts each phenotype into an array a certain number of times on the basis of its normalized fitness score, shuffles the array, and uses the first portion of it.
        */

        // CURRENTLY A GARBAGE FIRE


        var parentBucketA = [];
        var parentBucketB = [];
        var parentArrayA = [];
        var parentArrayB = [];

        // Put each old phenotype into the parent arrays a number of times determined by its normalizedFitness score.
        while ((parentBucketA.length < this.totalMembers) && (parentBucketB.length < this.totalMembers)) {
            for (var i = 0; i < this.totalMembers; i++) {
                let currentMember = this.members[i];
    
                for (var j = 0; j < this.members[i].normalizedFitness; j++) {
    
                    parentBucketA.push(currentMember);
                    parentBucketB.push(currentMember);
                }
            }
        }

        //console.log(parentBucketA[1].totalDistance);
        // var bucketLength = parentBucketA.length;
        // var testArray = [];
        // for(var i = 0; i < bucketLength; i++) {
        //     //testArray.push(floor(this.parentBucketA[i].totalDistance))
        //     console.log('hi');
        // }
        // console.log(testArray);

        // shuffle parent buckets, then populate parent arrays with appropriate number of phenotypes
        parentBucketA = shuffle(parentBucketA);
        parentBucketB = shuffle(parentBucketB);

        console.log('DEBUG: parentBucketA.length: ' + parentBucketA.length);

        parentArrayA = parentBucketA.slice(0, 500);
        parentArrayB = parentBucketB.slice(0, 500);

        console.log('DEBUG: parentArrayA.length: ' + parentArrayA.length);

        // PROVISIONAL: set next generation as parentArrayA
        this.members = parentArrayA;

        //console.log(this.members);

        // Increment generation
        this.generation += 1;

        // DEBUG: report
        console.log('Created generation ' + this.generation);
        console.log('parentArrayA.length: ' + parentArrayA.length);
        console.log('this.members.length: ' + this.members.length);
        //console.log('Current best distance: ' + this.currentBestPhenotype.totalDistance);
        //console.log('Current best fitness score: ' + this.currentBestPhenotype.fitness);
    }

    mutate(array, mutationRate) {
        /*
        Performs single swap according to probability of the mutation rate
        */

    }

    crossover(arrayA, arrayB) {
        /*
        Performs crossover between every member of the two passed arrays. Takes first half of arrayA[i], then the first remainder of arrayB not in arrayA.
        */

    }

    getTotalDistanceArray() {
        /*
        Debug method, returns array of totalDistances
        */
        var returnArray = [];
        for (var i = 0; i < this.totalMembers; i++) {
            returnArray.push(floor(this.members[i].totalDistance));
        }
        return returnArray;
    }

    getFitnessArray() {
        /*
        Debug method, returns array of totalDistances
        */
        var returnArray = [];
        for (var i = 0; i < this.totalMembers; i++) {
            returnArray.push(floor(this.members[i].fitness));
        }
        return returnArray;
    }


}

