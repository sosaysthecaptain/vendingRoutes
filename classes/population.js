class population {
    constructor(totalMembers) {
        this.totalMembers = totalMembers;
        this.members = [];
        this.currentBestPhenotype;
        this.bestPhenotypeToDate;
        this.generation = 0;

        this.runningBestDistance = Infinity;

        this.testArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        // instantiate population
        for (var i = 0; i < this.totalMembers; i++) {
            let newPhenotype = new routePhenotype(currentMap);
            this.members.push(newPhenotype);
        }

        // arbitrarily set initial value for currentBestPhenotype and bestPhenotypeToDate
        this.bestPhenotypeToDate = new routePhenotype(currentMap);          // COULD THIS BE THE PROBLEM?
        this.bestPhenotypeToDate.generateRandomPhenotype();
        this.currentBestPhenotype = this.members[0];
    }

    
    newGenerationRandom() {
        /*
        Used for brute force method for testing. 
        */

        // iterate over entire population
        for(var i = 0; i < this.totalMembers; i++) {
            
            this.members[i].generateRandomPhenotype();

            // // shuffle the map
            // let shuffledMapArray = shuffle(this.members[i].currentMap.vendingMachines);

            // // reset routes
            // this.members[i].driverA = [];
            // this.members[i].driverB = [];

            // // split shuffledMapArray between the two routes
            // let stopsPerRoute = this.members[i].currentMap.numberOfVendingMachines / 2;
            // for (var j = 0; j < stopsPerRoute; j++) {
            //     this.members[j].driverA.push(shuffledMapArray.pop());
            //     this.members[j].driverB.push(shuffledMapArray.pop());
            // }
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

        // with routeLengthSum in hand, iterate through a second time and set normalizedFitness
        for (var i = 0; i < this.totalMembers; i++) {
            this.members[i].normalizedFitness = floor((this.members[i].fitness / routeLengthSum) * 1000000);
        }

        // if this is better than the running best, reset that
        if (this.members[0].totalDistance < this.runningBestDistance) {
            
            this.runningBestDistance = this.members[0].totalDistance;
            //this.bestPhenotypeToDate = this.members.slice(0, 1);        // maybe use route method to copy?

            // Kludge, because copying directly wasn't working
            this.bestPhenotypeToDate = new routePhenotype(currentMap);
            this.bestPhenotypeToDate.driverA = this.members[0].driverA;
            this.bestPhenotypeToDate.driverB = this.members[0].driverB;
            this.bestPhenotypeToDate.getTotalDistance();
            this.bestPhenotypeToDate.calcFitness();

            console.log('gen ' + this.generation + ', best distance: ' + floor(this.bestPhenotypeToDate.totalDistance));
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

        //console.log('DEBUG: parentBucketA.length: ' + parentBucketA.length);

        parentArrayA = parentBucketA.slice(0, 500);
        parentArrayB = parentBucketB.slice(0, 500);

        //console.log('DEBUG: parentArrayA.length: ' + parentArrayA.length);

        // PROVISIONAL: set next generation as parentArrayA
        this.members = parentArrayA.slice();

        //console.log(this.members);

        // Increment generation
        this.generation += 1;

        // Assess fitness, because why not do it here?
        this.assessFitness();

        // DEBUG: report
        console.log('Created generation ' + this.generation + '. Best = ' + floor(this.bestPhenotypeToDate.totalDistance));
    }

    mutate(mutationRate) {
        /*
        Performs single swap according to probability of the mutation rate, which is a value between 0 and 1.
        */

        if (random(1) < mutationRate) {
            let length = this.members.length;
            let pointA = floor(random(length));
            let pointB = floor(random(length));

            let temp = this.members[pointA];
            this.members[pointA] = this.members[pointB];
            this.members[pointB] = temp;
        }

        

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