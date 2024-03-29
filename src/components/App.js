import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Color from '../abis/Color.json'
import TicketStore from '../abis/TicketStore.json'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = Color.networks[networkId]
    if(networkData) {
      const abi = Color.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
      const totalSupply = await contract.methods.totalSupply().call()
      this.setState({ totalSupply })
      const ticketPrice = await contract.methods.getTicketPrice().call()
      this.setState({ ticketPrice: ticketPrice*(10**18)})
      console.log(this.state.ticketPrice + ": price")
      const totalTicketNow =  await contract.methods.getTicketTotal().call()
      console.log(totalTicketNow)
      // Load Colors
      for (var i = 1; i <= totalSupply; i++) {
        const color = await contract.methods.idTicket(i-1).call()
        this.setState({
          colors: [...this.state.colors, parseInt(color._hex)]
        })
        console.log( "A" + color);
        console.log(typeof(color));
        console.log(JSON.stringify(color));
      }

      console.log(this.state.colors);
      // Load colors by owner
      const myAccount = this.state.account;

      const colorName = [];

      const balanceOfOwner = await contract.methods.balanceOf(this.state.account).call();

      console.log("Account owns "+balanceOfOwner+" tickets");

      for (i=0; i< balanceOfOwner; i++) {
        const ticketId = await contract.methods.tokenOfOwnerByIndex(myAccount,i).call();
        const name = await contract.methods.idTicket(ticketId-1).call();
        colorName.push(parseInt(name._hex));
      }

      console.log("ABC"+colorName)
      this.setState({
        ownedColor: colorName
      })

    } else {
      window.alert('Smart contract not deployed to detected network.')
    }

    const networkDataStore = TicketStore.networks[networkId]
    if(networkDataStore) {
      const abiStore = TicketStore.abi
      const addressStore = networkDataStore.address
      const contractShop = new web3.eth.Contract(abiStore, addressStore)
      this.setState({ contractShop })
      const balance = await contractShop.methods.getBalanceMoney.call();
      this.setState({ balance: balance })
      console.log(balance)
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  mint = (color) => {
    this.state.contractShop.methods.buyTicket().send({value:this.state.ticketPrice, from: this.state.account })
        .once('receipt', (receipt) => {
          this.setState({
            colors: [...this.state.colors, color]
          })
        })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      contractShop: null,
      totalSupply: 0,
      colors: [],
      ownedColor: [],
      totalTicketNow: 0,
      balance: 0,
      ticketPrice: 0
    }
  }

  render() {
    return (
        <div>
          <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a
                className="navbar-brand col-sm-3 col-md-2 mr-0"
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
            >
              Ticket Seller
            </a>
            <ul className="navbar-nav px-3">
              <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                <small className="text-white"><span id="account">{this.state.account}</span></small>
              </li>
            </ul>
          </nav>
          <div className="container-fluid mt-5">
            <div className="row">
              <main role="main" className="mainClass col-lg-12 d-flex text-center">
                <div className="content mr-auto ml-auto">
                  <h1>Click to buy</h1>
                  <form onSubmit={(event) => {
                    event.preventDefault()
                    this.mint()
                  }}>
                    <input
                        type='submit'
                        className='btn btn-block btn-primary'
                        value='Buy Ticket'
                    />
                  </form>
                </div>
              </main>
            </div>
            <hr/>
            <div className="row text-center">
              { this.state.colors.map((color, key) => {
                return(
                    <div key={key} className="col-md-12 mb-12">
                      <p>Ticket {color} selled! </p><br/>
                    </div>

                )
              })}

            </div>
            <p>You own: </p>
            <div className="row text-center">
                { this.state.ownedColor.map((color, key) => {
                  return(
                      <div key={key} className="col-md-3 mb-3">
                        <div className="ticket ticket-1">
                          <div class="date">
                            <span class="day">31</span>
                            <span class="month-and-time">OCT<br/><span class="small">8PM</span></span>
                          </div>

                          <div class="artist">
                            <span class="name">PETER TOSH</span>
                            <br/>
                            <span class="live small">LIVE</span>
                          </div>

                          <div className="location">
                            <span>KINGSTON TOWN</span>
                            <br/>
                            <span className="small"><span>NANCY'S PUB</span></span>
                          </div>

                          <div className="rip">
                          </div>

                          <div className="cta">
                            <span>Ticket <br/> no.</span>
                            <br/>
                            <br/>
                            <h1>{color}</h1>
                          </div>
                        </div>
                      </div>
                  )
                })}

            </div>
          </div>
        </div>
    );
  }


}

export default App;
