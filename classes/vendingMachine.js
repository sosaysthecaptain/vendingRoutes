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