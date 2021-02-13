pragma solidity ^0.5.1;

contract Vote {
    mapping (address => uint256) votes;
    address[] public members;
    mapping (address => bytes32) memberNames;

    constructor(bytes32 name) public {
        members.push(msg.sender);
        memberNames[msg.sender] = name;
    }

    function vote(address addr) public returns (uint256) {
        checkPermission();
        votes[addr] += 1;
        return votes[addr];
    }

    function getMembers() public view returns (address[] memory) {
        return members;
    }

    function getVoteCount(address addr) public view returns (uint256) {
        return votes[addr];
    }

    function getMemberName(address addr) public view returns (bytes32) {
        return memberNames[addr];
    }

    function addMember(address addr, bytes32 name) public {
        checkPermission();
        require(name != 0, "Name must not be empty");
        if (memberNames[addr] == 0) {
            members.push(addr);
            memberNames[addr] = name;
        }
    }

    function checkPermission() private {
        require (memberNames[msg.sender] != 0, "User is not a member");
    }
}
