const Color = artifacts.require('./Color.sol')
const TicketStore = artifacts.require('./TicketStore.sol')

require('chai').use(require('chai-as-promised')).should()
contract('Color', (account) => {
    let contract

    before(async() => {
        contract = await Color.deployed()
    })

    describe('deployment', async ()=> {
        it('deploys succesfully', async ()=> {
            const address = contract.address
            assert.notEqual(address, '')
            assert.notEqual(address, 0x0)
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async () => {
            const name = await contract.name()
            assert.equal(name, 'Color')
        })

        it('has a symbol', async () => {
            const name = await contract.symbol()
            assert.equal(name, 'COLOR')
        })
    })

    describe('minting', async () => {
        it('creates a new token', async () => {
            // const result = await contract.mint('#EC058E')
            // const totalSupply = await contract.totalSupply()
            //
            // assert.equal(totalSupply, 1)
            // const event = result.logs[0].args
            // assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
            // assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
            // assert.equal(event.to, account[0], 'to is correct')
            //
            // await contract.mint('#EC058E').should.be.rejected;
        })
    })

    describe('indexing', async () => {
        it('lists colors', async () => {
            // await contract.mint('#5386E4')
            // await contract.mint('#FFFFFF')
            // await contract.mint('#000000')
            // const totalSupply = await contract.totalSupply()
            //
            // let color
            // let result = []
            //
            // for (var i = 1; i <= totalSupply; i++) {
            //     color = await contract.colors(i-1)
            //     result.push(color)
            // }
            //
            // let expected = ['#EC058E', '#5386E4', '#FFFFFF', '#000000']
            // // assert.equal(result.join(','), expected.join(','))
        })
    })

    describe('transfering', async () => {
        it('transfering wei', async () => {
            it("should transfer 1500 wei to a function and end balance=1500", function(){
                var ticketStore;
                return TicketStore.deployed().then(function(instance){
                    ticketStore = instance;
                    ticketStore.receiveEthers({value:1500, from:accounts[0]});
                    return ticketStore.getBalanceMoney.call();
                }).then(function(result){
                    assert.equal(1500, result.toNumber(), "Balance equals 2500");
                });
            });

        })
    })
})