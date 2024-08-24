// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Crowdfunding is ReentrancyGuard {
    uint256 private campaignId = 1;

    // campaign structure
    struct Campaign {
        uint256 campaignId; // (uint256) campaign id
        string title; // (string): The name of the campaign.
        string description; // (string): A brief description of the campaign.
        address payable benefactor; // (address): The address of the person or organization that will receive the funds.
        uint256 goal; // (uint): The fundraising goal (in wei).
        uint256 deadline; // (uint): The Unix timestamp when the campaign ends.
        uint256 amountRaised; // (uint): The total amount of funds raised so far.
        bool ended;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(address => uint256)) public donations;

    // events
    event CampaignCreated(
        address indexed user,
        uint256 goal,
        uint256 duration,
        address benefactor,
        string description,
        string title,
        uint256 campaignId
    );
    event DonatedReceived(
        address indexed user,
        uint256 campaignId,
        uint256 amount
    );
    event CampaignEnded(
        address indexed user,
        address benefactor,
        uint256 amountRaised
    );

    // modifiers
    modifier campaignExists(uint256 _campaignId) {
        require(
            _campaignId > 0 && _campaignId < campaignId,
            "Campaign doesn't exists"
        );
        _;
    }

    modifier campaignEnded(uint256 _campaignId) {
        require(!campaigns[_campaignId].ended, "Campaign has already ended");
        _;
    }

    // functions
    // createCampaign
    function createCampaign(
        string memory _title,
        string memory _description,
        address payable _benefactor,
        uint256 _goal,
        uint256 _duration
    ) external payable {
        require(_goal > 0, "Campaign goal should be greater than zero");

        uint256 deadline = block.timestamp + _duration;

        Campaign memory newCampaign = Campaign(
            campaignId,
            _title,
            _description,
            _benefactor,
            _goal,
            deadline,
            0,
            false
        );

        campaigns[campaignId] = newCampaign;

        emit CampaignCreated(
            msg.sender,
            _goal,
            _duration,
            _benefactor,
            _description,
            _title,
            campaignId
        );
        ++campaignId;
    }

    // donateToCampaign
    function donateToCampaign(
        uint256 _campaignId,
        uint256 _amount
    ) external payable campaignExists(_campaignId) campaignEnded(_campaignId) {
        require(_amount > 0, "Amount to donate must be greater than zero");

        if (block.timestamp > campaigns[_campaignId].deadline) {
            _endCampaign(_campaignId);
            revert("Campaign already ended");
        } else {
            campaigns[_campaignId].amountRaised += _amount;
            donations[_campaignId][msg.sender] += _amount;

            emit DonatedReceived(msg.sender, _campaignId, _amount);
        }
    }

    // Public function to allow anyone to end a campaign after its deadline
    function endCampaign(
        uint256 _campaignId
    ) public campaignExists(_campaignId) campaignEnded(_campaignId) {
        require(
            block.timestamp > campaigns[_campaignId].deadline,
            "Campaign deadline not yet exceeded"
        );
        _endCampaign(_campaignId);
    }

    // internal endCampaign
    function _endCampaign(
        uint256 _campaignId
    ) internal campaignExists(_campaignId) nonReentrant {
        Campaign storage campaign = campaigns[_campaignId];

        // Check if the campaign deadline has been exceeded
        require(
            block.timestamp > campaign.deadline,
            "Campaign deadline not yet exceeded"
        );

        // Mark the campaign as ended
        campaign.ended = true;

        // Transfer the funds to the benefactor
        (bool success, ) = campaign.benefactor.call{
            value: campaign.amountRaised
        }("");
        require(success, "Failed to send Ether");

        // Emit the CampaignEnded event
        emit CampaignEnded(
            msg.sender,
            campaign.benefactor,
            campaign.amountRaised
        );
    }
}
