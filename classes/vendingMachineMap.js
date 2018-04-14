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