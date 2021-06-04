const Color = artifacts.require("Color");
const TicketStore = artifacts.require("TicketStore");
const InitialTicketPrice = 1000; //100.00 XCUR initial price
const MaxTicketCount = 10;
var colorInstance;

module.exports = async function(deployer) {
    await deployer.deploy(Color, InitialTicketPrice, MaxTicketCount);
    colorInstance = await Color.deployed();
    await deployer.deploy(TicketStore, colorInstance.address);
};

