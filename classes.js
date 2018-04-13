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

    generateRandomPhenotype() {
        /*
        Randomly assigns vendingMachines in passed map between two routes, sets routes up to begin and end at startPoint. Called on instantiation of a new routePhenotype.
        */

        // create shuffledMapArray from map
        let shuffledMapArray = shuffle(currentMap.vendingMachines);

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

        // instantiate population
        for (var i = 0; i < this.totalMembers; i++) {
            let newPhenotype = new routePhenotype(currentMap);
            this.members.push(newPhenotype);
        }
    }


}

