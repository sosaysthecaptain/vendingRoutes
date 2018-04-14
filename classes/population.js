class population {
    constructor(totalMembers) {
        this.totalMembers = totalMembers;
        this.members = [];
        this.currentBestPhenotype;
        this.bestPhenotypeToDate;
        this.generation = 0;

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