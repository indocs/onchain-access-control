# onchain-access-control

A verifiable on-chain permission framework that enforces roles across contracts, reducing unauthorized actions and simplifying governance automation.

## Outline
- Project goals and architecture
- How to use: contracts, deployments, and integrations
- Testing and verification strategy
- Development workflow with Hardhat
- Security considerations and monitoring

## Quickstart
1. Install dependencies
2. Copy .env.example to .env and configure RPC URL and keys
3. Compile and test
4. Deploy locally or to a testnet
5. Inspect emitted events and verify on-chain state

## Deployment (Hardhat)
- Start local node: npx hardhat node
- Deploy: npm run deploy
- Verify: npx hardhat verify --network localhost <contract-address>

## Design notes
- Central AccessControl manages roles with Admin roles for each role.
- Contracts can extend or depend on AccessControl for consistent permission checks.
- All role transitions emit events for auditable governance automation.
