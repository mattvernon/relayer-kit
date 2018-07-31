// External libraries
import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

// Styling
import "./Investments.css";

const columns = [
    {
        dataField: "principalAmount",
        text: "Principal",
    },
    {
        dataField: "interestRate",
        text: "Interest Rate",
    },
    {
        dataField: "termDuration",
        text: "Term Length",
    },
    {
        dataField: "collateralAmount",
        text: "Collateral",
    },
    {
        dataField: "totalRepayment",
        text: "Total Repayment",
    },
    {
        dataField: "totalExpectedRepayment",
        text: "Total Expected Repayment",
    },
    {
        dataField: "filledAt",
        text: "Date Filled",
    },
];

const investmentData = [
    {
        "principalAmount": "200 REP",
        "collateralAmount": "30 WETH",
        "totalRepayment": "5 REP",
        "totalExpectedRepayment": "33 REP",
        "expirationTimestampInSec": "1532133272",
        "debtor": "0xd2f45e02ab7b190ac9a87b743eab4c8f2ed0e491",
        "debtorFee": "0",
        "creditor": "0x0000000000000000000000000000000000000000",
        "creditorFee": "0",
        "relayer": "0x0000000000000000000000000000000000000000",
        "relayerFee": "0",
        "underwriter": "0x0000000000000000000000000000000000000000",
        "underwriterFee": "0",
        "underwriterRiskRating": "0",
        "salt": "80491936386578551969",
        "debtorSignature": {
            "v": 27,
            "r": "0x1ed5391c99dd1b7eebe3f4ca4f00e36a814686e9812a49cb479d966253bccbc6",
            "s": "0x7b65b14e62cc51632dfcc2ebb0bd6695c4ab6ba90b9ba4a95174ba3b3c2232fb"
        },
        "creditorSignature": {
            "r": "",
            "s": "",
            "v": 0
        },
        "underwriterSignature": {
            "r": "",
            "s": "",
            "v": 0
        },
        "id": 1
    },
];

class Investments extends React.Component {
    render() {
        return (
            <BootstrapTable
                keyField="id"
                columns={columns}
                data={investmentData}
            />
        );
    }
}

export default Investments;