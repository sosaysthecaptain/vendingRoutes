class population {
    constructor(totalMembers) {
        this.totalMembers = totalMembers;
        this.members = [];
        this.currentBestPhenotype;
        //this.bestPhenotypeToDate;
        this.generation = 0;

        this.runningBestDistance = Infinity;
        this.runningBestRouteA = [];
        this.runningBestRouteB = [];

        this.testArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        // instantiate population
        for (var i = 0; i < this.totalMembers; i++) {
            let newPhenotype = new routePhenotype(currentMap);
            this.members.push(newPhenotype);
        }

        // arbitrarily set initial value for currentBestPhenotype and bestPhenotypeToDate
        //this.bestPhenotypeToDate = new routePhenotype(currentMap); 
        //this.bestPhenotypeToDate.generateRandomPhenotype();
        this.currentBestPhenotype = this.members[0];
    }

    
    newGenerationRandom() {
        /*
        Used for brute force method for testing. 
        */

        // iterate over entire population
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
        this.setReigningBest();

        // if (this.members[0].totalDistance < this.runningBestDistance) {
            
        //     this.runningBestDistance = this.members[0].totalDistance;
        //     //this.bestPhenotypeToDate = this.members.slice(0, 1);        // maybe use route method to copy?

        //     // Kludge, because copying directly wasn't working
        //     // this.bestPhenotypeToDate = new routePhenotype(currentMap);
        //     // this.bestPhenotypeToDate.driverA = this.members[0].driverA;
        //     // this.bestPhenotypeToDate.driverB = this.members[0].driverB;
        //     // this.bestPhenotypeToDate.getTotalDistance();
        //     // this.bestPhenotypeToDate.calcFitness();

        //     // console.log('gen ' + this.generation + ', best distance: ' + floor(this.bestPhenotypeToDate.totalDistance));
        // }

        //this.bestPhenotypeToDate.printRoutes();
        //console.log('gen ' + this.generation + ', reigningBest: ' + floor(reigningBest.totalDistance));
        //reigningBest.printRoutes();
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

        var parentBucketA = [];
        var parentBucketB = [];
        var parentArrayA = [];
        var parentArrayB = [];

        // // Put each old phenotype into the parent arrays a number of times determined by its normalizedFitness score.

        for (var i = 0; i < this.totalMembers; i++) {
            let currentMember = this.members[i];
            
            for (var j = 0; j < floor(this.members[i].normalizedFitness); j++) {
                parentBucketA.push(currentMember);
                parentBucketB.push(currentMember);
            }
        }

        // // shuffle parent buckets, then populate parent arrays with appropriate number of phenotypes
        parentBucketA = shuffle(parentBucketA);
        parentBucketB = shuffle(parentBucketB);
        parentArrayA = parentBucketA.slice(0, 500);
        parentArrayB = parentBucketB.slice(0, 500);

        // // PROVISIONAL: set next generation as parentArrayA
        this.members = parentArrayA.slice();

        // Crossover

        // Mutate. The mutate() function applies itself to every entry in members, according to the mutation rate
        //this.mutate(mutationRate);

        // // Increment generation
        this.generation += 1;

        // DEBUG: report
        //console.log('Created generation ' + this.generation + '. Best = ');
    }

    mutate(mutationRate) {
        /*
        Performs single swap according to probability of the mutation rate, which is a value between 0 and 1. Applied in turn to each item in this.members.
        */

        if (random(1) < mutationRate) {

            // apply to each of this.members
            for (var i = 0; i < this.totalMembers; i++) {
                // will mutation affect routeA or routeB?
                if (random(1) > 0.5) {
                    let length = this.members[i].driverA.length;
                    let pointA = floor(random(length));
                    let pointB = floor(random(length));

                    let temp = this.members[i].driverA[pointA];
                    this.members[i].driverA[pointA] = this.members[i].driverA[pointB];
                    this.members[i].driverA[pointB] = temp;
                } else {
                    let length = this.members[i].driverB.length;
                    let pointA = floor(random(length));
                    let pointB = floor(random(length));

                    let temp = this.members[i].driverA[pointA];
                    this.members[i].driverB[pointA] = this.members[i].driverB[pointB];
                    this.members[i].driverB[pointB] = temp;
                }
            }
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

    setReigningBest() {
        /*
        Checks to see if best of the generation is better than the best of all time, and resets reigningBest if so. Notifies user.
        */

        if (this.members[0].totalDistance < this.runningBestDistance) {
            // console.log('NEW RUNNING BEST');
            // console.log('Old: ' + this.runningBestDistance);
            // let routeADistArray = [];
            // for(var i = 0; i < this.runningBestRouteA.length; i++) {
            //     routeADistArray.push(this.runningBestRouteA[i].number)
            // }
            // console.log(routeADistArray);

            this.runningBestDistance = this.members[0].totalDistance;
            this.runningBestRouteA = this.members[0].getRoute('A');
            this.runningBestRouteB = this.members[0].getRoute('B');

            console.log('gen ' + this.generation + ', new best: ' + floor(this.runningBestDistance));
            // routeADistArray = [];
            // for(var i = 0; i < this.runningBestRouteA.length; i++) {
            //     routeADistArray.push(this.runningBestRouteA[i].number)
            // }
            // console.log(routeADistArray);
        }
    }


}