// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title AccessControl - simple, extensible on-chain permission framework
/// @notice Manages roles with admin roles for each role. Emits events for auditability.
contract AccessControl {
    // role identifier
    struct RoleData {
        mapping(address => bool) members;
        bytes32 adminRole;
    }

    mapping(bytes32 => RoleData) private _roles;

    // Events
    event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender);
    event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender);
    event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole);

    bytes32 public constant DEFAULT_ADMIN_ROLE = 0x00;

    modifier onlyRole(bytes32 role) {
        require(hasRole(role, msg.sender), 'AccessControl: sender does not have role');
        _;
    }

    constructor() {
        // grant default admin to deployer if present isn't mandatory; user can call grant in deploy script
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function hasRole(bytes32 role, address account) public view returns (bool) {
        return _roles[role].members[account];
    }

    function getRoleAdmin(bytes32 role) public view returns (bytes32) {
        return _roles[role].adminRole;
    }

    function _setupRole(bytes32 role, address account) internal {
        _grantRole(role, account);
    }

    function _setRoleAdmin(bytes32 role, bytes32 adminRole) internal {
        bytes32 previous = getRoleAdmin(role);
        _roles[role].adminRole = adminRole;
        emit RoleAdminChanged(role, previous, adminRole);
    }

    function grantRole(bytes32 role, address account) public {
        require(hasRole(getRoleAdmin(role), msg.sender), 'AccessControl: sender must be admin to grant');
        _grantRole(role, account);
    }

    function revokeRole(bytes32 role, address account) public {
        require(hasRole(getRoleAdmin(role), msg.sender), 'AccessControl: sender must be admin to revoke');
        _revokeRole(role, account);
    }

    function renounceRole(bytes32 role) public {
        _revokeRole(role, msg.sender);
    }

    function _grantRole(bytes32 role, address account) internal {
        if (!hasRole(role, account)) {
            _roles[role].members[account] = true;
            emit RoleGranted(role, account, msg.sender);
        }
    }

    function _revokeRole(bytes32 role, address account) internal {
        if (hasRole(role, account)) {
            _roles[role].members[account] = false;
            emit RoleRevoked(role, account, msg.sender);
        }
    }
}
