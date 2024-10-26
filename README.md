I came back from ETHGlobal San Fran where I heard the word - Account Abstraction. Someone told that I can initate a blockchain transaction without a wallet using Account Abstraction!

More of my understanding is summarized in this X thread:
https://x.com/kashyab_19/status/1849533478263521413

<<Instructions>>

Spin up a local blockchain node with the command: 
    npx hardhat node - this will give you 10 dummy accounts that are temporary - not ideal for production

This is a one-time step but you have to do this everytime you restart the local blockchain:
    npx hardhat run scripts/deploy.js - copy the address(es) and paste it in execute.js