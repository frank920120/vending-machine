const vendingMachineStats = require("../src/vending-machine");
const fs = require("fs");

describe("vendingMachine", () => {
  let vendingMachine;

  beforeEach(() => {
    vendingMachine = {};
    vendingMachine.data = JSON.parse(
      fs.readFileSync("./vendingMachineData.json").toString()
    );
    vendingMachine.subject = new vendingMachineStats(
      vendingMachine.data.products,
      vendingMachine.data.initialCoins
    );
    vendingMachine.productsData = vendingMachine.subject.products;
    vendingMachine.coinsData = vendingMachine.subject.initialCoins;
  });

  describe("printInventory()", () => {
    //01
    describe("when the user uses vendingMachine", () => {
      it("should return all the vendingMachine items", () => {
        expect(vendingMachine.subject.printInventory()).toEqual(
          vendingMachine.productsData
        );
      });
    });
  });
  //02
  describe("refillInventory()", () => {
    describe("when the inventory is refilled", () => {
      it("should return all the products with maxiumn quantity", () => {
        expect(vendingMachine.subject.refillInventory()).toEqual([
          { id: 1, name: "LV", cost: 2, quantity: 15 },
          { id: 2, name: "Gucci", cost: 1, quantity: 15 },
          { id: 3, name: "Prada", cost: 2.25, quantity: 15 },
          { id: 4, name: "Chanel", cost: 4.75, quantity: 15 }
        ]);
      });
    });
  });
  //03
  describe("resupplyChange()", () => {
    describe("when the change is resupplied", () => {
      it("should return all the money with maxiumn quantity", () => {
        expect(vendingMachine.subject.resupplyChange()).toEqual([
          { name: "quarter", price: 0.25, quantity: 100 },
          { name: "dime", price: 0.1, quantity: 100 },
          { name: "nickel", price: 0.5, quantity: 100 },
          { name: "loonie", price: 1, quantity: 100 },
          { name: "toonie", price: 2, quantity: 100 },
          { name: "fiveDollars", price: 5, quantity: 100 }
        ]);
      });
    });
  });

  describe("DispenseInventory(payment,item)", () => {
    //04
    describe("when user choose the item that is out of stock", () => {
      it("should throw an error", () => {
        expect(() =>
          vendingMachine.subject.DispenseInventory(5, "Chanel")
        ).toThrow("out of stock");
      });
    });
    //05
    describe("when user insert the money that is less than the item price", () => {
      it("should throw an error", () => {
        expect(() =>
          vendingMachine.subject.DispenseInventory(1, "Prada")
        ).toThrow("insufficient payment");
      });
    });
    //06
    describe("when user insert the money that is greater than 5dollars", () => {
      it("should throw an error", () => {
        expect(() =>
          vendingMachine.subject.DispenseInventory(10, "Gucci")
        ).toThrow("only accepts the payment that is less equal than 5 dollars");
      });
    });
    //07
    describe("when user insert the correct payment", () => {
      it("should return the item with new quantity", () => {
        expect(vendingMachine.subject.DispenseInventory(2, "Gucci")).toEqual([
          { id: 1, name: "LV", cost: 2, quantity: 14 },
          { id: 2, name: "Gucci", cost: 1, quantity: 10 },
          { id: 3, name: "Prada", cost: 2.25, quantity: 15 },
          { id: 4, name: "Chanel", cost: 4.75, quantity: 0 }
        ]);
      });
    });
  });
  describe("returnChanges(payment,item)", () => {
    describe("when user finishes the payment", () => {
      it("should return the total change", () => {
        expect(vendingMachine.subject.returnChanges(5, "Prada")).toEqual(2.75);
      });
    });
  });
});
