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