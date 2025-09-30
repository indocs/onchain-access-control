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

## Usage (Hardhat-focused)

Hardhat workflow for development and verification:
- Install and set up
  - Install dependencies: npm install
  - Prepare environment: cp .env.example .env and set RPC_URL, PRIVATE_KEY, and any other needed keys
- Compile
  - npx hardhat compile
- Test
  - npx hardhat test
  - Optional: run with verbose logging or specific test files
- Deploy
  - Local development: npx hardhat node (to run a local node)
  - Deploy to local or testnet: npm run deploy
    - If you use a dedicated script, ensure it connects via the configured network in hardhat.config.js
  - Verify on Etherscan-compatible networks: npx hardhat verify --network <network-name> <contract-address> [constructor-args…]
- Verify and interact
  - Inspect events via hardhat console or via deployed contract events
  - Interact with scripts or tests to validate AccessControl behavior

Notes:
- If you don’t have an npm script for deploy, you can run a deployment script directly with Hardhat, e.g. npx hardhat run --network localhost scripts/deploy.js
- Ensure the deployment script uses the same Network and chainId as your target (local vs testnet)

## Deployment (Hardhat)
- Start local node: npx hardhat node
- Deploy: npm run deploy
- Verify: npx hardhat verify --network localhost <contract-address>

## Design notes
- Central AccessControl manages roles with Admin roles for each role.
- Contracts can extend or depend on AccessControl for consistent permission checks.
- All role transitions emit events for auditable governance automation.

### Design Notes (Security and Gas)
- Role isolation and admin boundaries
  - Each role has a dedicated admin role to guard role assignments and revocations.
  - Only accounts with the admin role can grant or revoke the corresponding role.
- Least privilege principle
  - Grant only the minimal necessary permissions required for a given contract or function.
  - Avoid broad, multi-role grants unless necessary for governance processes.
- Auditability and traceability
  - All role changes emit events (e.g., RoleGranted, RoleRevoked) for on-chain governance and off-chain auditing.
  - Events should include operator, target address, role, and timestamp context when possible.
- Upgrade and compatibility considerations
  - If using upgradeable patterns, ensure AccessControl logic remains consistent across upgrades and that admin keys are protected.
- Reentrancy and state integrity
  - Guard critical state-changing calls with appropriate reentrancy protections when interacting with external