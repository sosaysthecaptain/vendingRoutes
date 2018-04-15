var currentMap; //= new vendingMachineMap();
var vendingMachineTest; //= new vendingMachine(1, 'test', 5, 5);
var currentPopulation;
var populationSize = 500;     // set pop size here
var depot;
var mutationRate = 1;       // set mutation rate here

var reigningBest;

var newPhenotype;

/*
For brute force implementation:
  Setup
    - instantiate and populate currentMap
    - instantiate currentPopulation
    - optionally, run loop or perform single step

  Loop, which may or may not be in draw()
    - renderRoute(currentPopulation.currentBestPhenotype, currentPopulation.bestPhenotypeToDate)
      - this draws the current best
    - currentPopulation.newGenerationRandom()
      - works. Uses local method in routePhenotype. Completes totalDistance and fitness calculations
    - currentPopulation.assessFitness()
      - sums total route length for each phenotype
      - calculates normalized fitness
      - sorts population with best first
      - 

    * IDEA: a weighted random function, picking an index of the sorted list, with preference toward the beginning. Better, with preference based on weighting variable, which is normalizedFitness
*/

function setup() {
  createCanvas(600, 600);
  
  currentMap = new vendingMachineMap();
  currentMap.populateRandomly(16);
  depot = new vendingMachine(-1, 'depot', 25, 25);      // depot is hardcoded here

  // create population
  currentPopulation = new population(populationSize);
  currentPopulation.runningBestRouteA = currentPopulation.members[0].getRoute('A');
  currentPopulation.runningBestRouteB = currentPopulation.members[0].getRoute('B');

  //renderRoute(currentPopulation.currentBestPhenotype, reigningBest);
}

function draw() {
    renderRoute(currentPopulation.currentBestPhenotype, reigningBest);
    currentPopulation.newGenerationRandom();
    currentPopulation.assessFitness();
    //currentPopulation.selectNextGeneration();

    //currentPopulation.assessFitness();

}



// function renderRoute(phenotype, best) {
//   /*
//   Renders both routes of given phenotype. If best is true, draws it much heavier and in color
//   */

//   let routeA = phenotype.getRoute('A');
//   let routeB = phenotype.getRoute('B');

//   background(0);

//   if (best) {
//     strokeWeight(6);
//   } else if (!best) {
//     strokeWeight(1);
//   }
//   noFill();

//   // draw routeA
//   if (best) {
//     strokeWeight(6);
//     stroke(0, 0, 255);
//   } else if (!best) {
//     strokeWeight(1);
//     stroke(0,255,0);
//   }
//   beginShape();
//   for (var i = 0; i < routeA.length; i++) {
//     var point = routeA[i];
//     vertex(point.globalX, point.globalY);
//     ellipse(point.globalX, point.globalY, 6, 6);
//   }
//   endShape();

//   // draw routeB
//   if (best) {
//     strokeWeight(6);
//     stroke(0, 255, 0);
//   } else if (!best) {
//     strokeWeight(2);
//     stroke(135,206,250);
//   }
//   beginShape();
//   for (var i = 0; i < routeB.length; i++) {
//     var point = routeB[i];
//     vertex(point.globalX, point.globalY);
//     ellipse(point.globalX, point.globalY, 6, 6);
//   }
//   endShape();

//   // draw depot in red
//   beginShape()
//   stroke(255, 0, 0);
//   ellipse(depot.globalX, depot.globalY, 6, 6);
//   endShape()

// }

// function setup() {
//   createCanvas(800, 800);
//   var order = [];
  
//   // create the cities, randomly
//   for (var i = 0; i < totalCities; i++) {
//     var v = createVector(random(width), random(height / 2));
//     cities[i] = v;
//     order[i] = i;
//   }

//   for (var i = 0; i < popSize; i++) {
//     population[i] = shuffle(order);
//   }
//   statusP = createP('').style('font-size', '32pt');
// }

// function draw() {
//   background(0);

//   // GA
//   calculateFitness();
//   normalizeFitness();
//   nextGeneration();

//   stroke(255);
//   strokeWeight(4);
//   noFill();
//   beginShape();
//   for (var i = 0; i < bestEver.length; i++) {
//     var n = bestEver[i];
//     vertex(cities[n].x, cities[n].y);
//     ellipse(cities[n].x, cities[n].y, 16, 16);
//   }
//   endShape();

//   translate(0, height / 2);
//   stroke(255);
//   strokeWeight(4);
//   noFill();
//   beginShape();
//   for (var i = 0; i < currentBest.length; i++) {
//     var n = currentBest[i];
//     vertex(cities[n].x, cities[n].y);
//     ellipse(cities[n].x, cities[n].y, 16, 16);
//   }
//   endShape();
// }

// function shuffle(a, num) {
//   for (var i = 0; i < num; i++) {
//     var indexA = floor(random(a.length));
//     var indexB = floor(random(a.length));
//     swap(a, indexA, indexB);
//   }
// }


// function swap(a, i, j) {
//   var temp = a[i];
//   a[i] = a[j];
//   a[j] = temp;
// }


// function calcDistance(points, order) {
//   var sum = 0;
//   for (var i = 0; i < order.length - 1; i++) {
//     var cityAIndex = order[i];
//     var cityA = points[cityAIndex];
//     var cityBIndex = order[i + 1];
//     var cityB = points[cityBIndex];
//     var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
//     sum += d;
//   }
//   return sum;
// }