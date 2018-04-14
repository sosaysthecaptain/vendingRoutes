var currentMap; //= new vendingMachineMap();
var vendingMachineTest; //= new vendingMachine(1, 'test', 5, 5);
var currentPopulation;
var populationSize = 500;     // set pop size here
var depot;

var newPhenotype;

// var cities = [];
// var totalCities = 15;

// var popSize = 500;
// var population = [];
// var fitness = [];

// var recordDistance = Infinity;
// var bestEver;
// var currentBest;

// var statusP;

function setup() {
  createCanvas(600, 600);
  
  currentMap = new vendingMachineMap();
  currentMap.populateRandomly(10);
  depot = new vendingMachine(-1, 'depot', 25, 25);      // depot is hardcoded here

  // create population
  currentPopulation = new population(populationSize);
  
  // create a test phenotype
  //newPhenotype = new routePhenotype(currentMap);



  // draw, once
  // background(0);
  // renderRoute(newPhenotype, false);
  currentPopulation.newGenerationRandom();
  currentPopulation.assessFitness();
  renderRoute(currentPopulation.currentBestPhenotype, currentPopulation.bestPhenotypeToDate);
}

function draw() {

  // Draw current best and running best
  //renderRoute(currentPopulation.currentBestPhenotype, currentPopulation.bestPhenotypeToDate);

  // Brute force
  //currentPopulation.newGenerationRandom();
  //currentPopulation.assessFitness();
  //console.log('generation ' + currentPopulation.generation);
  //console.log('fitness score: ' + currentPopulation.bestPhenotypeToDate.fitness);
  //console.log(currentPopulation.bestPhenotypeToDate.totalDistance);

  // console.log('generation: ' + currentPopulation.generation);
  // console.log('current best totalDistance: ' + currentPopulation.bestPhenotypeToDate.totalDistance);
  
  // Assess fitness, select next generation
  // currentPopulation.assessFitness();
  // currentPopulation.selectNextGeneration();



}

function renderRoute(currentPhenotype, bestPhenotype) {
  /*
  Renders both routes of given phenotype. If best is true, draws it much heavier and in color
  */

  let currentRouteA = currentPhenotype.getRoute('A');
  let currentRouteB = currentPhenotype.getRoute('B');
  let bestRouteA = bestPhenotype.getRoute('A');
  let bestRouteB = bestPhenotype.getRoute('B');

  background(0);

  // draw current, route A
  strokeWeight(2);
  stroke(0, 50, 100);
  noFill();

  beginShape();
  for (var i = 0; i < currentRouteA.length; i++) {
    var point = currentRouteA[i];
    vertex(point.globalX, point.globalY);
    ellipse(point.globalX, point.globalY, 6, 6);
  }
  endShape();

  // draw current, routeB
  strokeWeight(2);
  stroke(0, 100, 50);
  beginShape();
  for (var i = 0; i < currentRouteB.length; i++) {
    var point = currentRouteB[i];
    vertex(point.globalX, point.globalY);
    ellipse(point.globalX, point.globalY, 6, 6);
  }
  endShape();


  // draw best, routeA
  strokeWeight(4); 
  stroke(0, 0, 255);

  beginShape();
  for (var i = 0; i < bestRouteA.length; i++) {
    var point = bestRouteA[i];
    vertex(point.globalX, point.globalY);
    ellipse(point.globalX, point.globalY, 6, 6);
  }
  endShape();

  // draw best, routeB
  strokeWeight(4); 
  stroke(0, 255, 0);

  beginShape();
  for (var i = 0; i < bestRouteB.length; i++) {
    var point = bestRouteB[i];
    vertex(point.globalX, point.globalY);
    ellipse(point.globalX, point.globalY, 6, 6);
  }
  endShape();

  // draw depot in red
  beginShape()
  stroke(255, 0, 0);
  ellipse(depot.globalX, depot.globalY, 6, 6);
  endShape()
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