const vendingMachineStats = require("../src/vending-machine");
const fs = require("fs");

describe("vendingMachine", () => {
  let vendingMachine;

  beforeEach(() => {
    vendingMachine = {};
    vendingMachine.data = JSON.parse(
      fs.readFileSync("./vendingMachineData.json").toString()
    );
  });

  describe("printInventory()", () => {
    beforeEach(() => {
      vendingMachine.subject = new vendingMachineStats(
        vendingMachine.data.products,
        vendingMachine.data.initialCoins
      );
      vendingMachine.productsData = vendingMachine.subject.products;
    });
    describe("when the user uses vendingMachine", () => {
      it("should return all the vendingMachine items", () => {
        expect(vendingMachine.subject.printInventory()).toEqual(
          vendingMachine.productsData
        );
      });
    });
  });
});
