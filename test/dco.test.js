const CurrencyToken = artifacts.require('./CurrencyToken.sol')

require('chai').use(require('chai-as-promised')).should()
contract('CurrencyToken', (account) => {
    let contract

    before(async() => {
        contract = await CurrencyToken.deployed()
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
            assert.equal(name, 'DatCoin')
        })

        it('has a symbol', async () => {
            const name = await contract.symbol()
            assert.equal(name, 'DCO')
        })
    })
})