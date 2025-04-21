// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import './AccessControl.sol';

/// @title StatefulContract - example contract using AccessControl for permissions
/// @notice Demonstrates state transitions guarded by roles and emits events.
contract StatefulContract {
    using AccessControl for AccessControl;

    AccessControl private _ac;

    uint256 private _value;
    bytes32 public constant STATE_UPDATE_ROLE = keccak256('STATE_UPDATE_ROLE');

    event ValueUpdated(uint256 newValue, address indexed updatedBy);

    constructor(address accessControl) {
        _ac = AccessControl(accessControl);
        // grant the deployer default admin as part of the global AccessControl setup
    }

    function setValue(uint256 newValue) external {
        require(_ac.hasRole(STATE_UPDATE_ROLE, msg.sender), 'StatefulContract: missing required role');
        _value = newValue;
        emit ValueUpdated(newValue, msg.sender);
    }

    function readValue() external view returns (uint256) {
        return _value;
    }
}
