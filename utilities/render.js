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