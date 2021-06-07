# defi-nft-ticket-solidity
App for selling ticket by blockchain, my app imclude 2 main Contract: 
- Color.sol (Event ticket implementing ERC721 - known as NFT token)
- TicketStore.sol (Store selling color ticket)

Code using Truffle and Ganache, Metamask for building local environment.

Work flow:
1. User input ID of ticket and click button.
2. Send money to contract (stucking here).
3. Store will check if ID  exist or not, then mint to address of user.
