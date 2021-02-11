pragma solidity ^0.5.1;

contract Vote {
    uint256[3] items;
    string[] public members;
    mapping (address => string) memberNames;

    constructor() public {
        // setting up the items with their values
        for (uint256 i = 0; i < 3; i++) items[i] = 0;
    }

    function vote(uint256 x) public returns (uint256) {
        if (x < 3 && x >= 0) {
            items[x]++;
            return 1;
        }
        return 0;
    }

    function getItem(uint256 x) public view returns (uint256) {
        return items[x];
    }

    function getMemberName(address addr) public view returns (string memory) {
        return memberNames[addr];
    }

    function addMember(address addr, string memory name) public {
        checkPermission();
        require(name != "", "Name must not be empty");
        if (members[addr] != "") {
            members.push(addr);
            memberNames[addr] = name;
        }
    }

    function checkPermission() private {
        require (members[msg.sender] != "", "User is not a member");
    }
}
