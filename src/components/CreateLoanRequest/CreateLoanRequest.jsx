// External libraries
import React, { Component } from "react";
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock, InputGroup } from "react-bootstrap";
import Dharma from "@dharmaprotocol/dharma.js";

// Components
import Loading from "../Loading/Loading";
import TimeUnitSelect from "./TimeUnitSelect/TimeUnitSelect";
import TokenSelect from "./TokenSelect/TokenSelect";

// Services
import Api from "../../services/api";

// Styling
import "./CreateLoanRequest.css";
import Title from "../Title/Title";
import Error from "../Error/Error";

class CreateLoanRequest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            principal: 0,
            principalTokenSymbol: "WETH",
            collateral: 0,
            relayerFee: 0,
            relayer: null,
            collateralTokenSymbol: "REP",
            interestRate: 0,
            termLength: 0,
            termUnit: "weeks",
            expirationLength: 0,
            expirationUnit: "days",
            disabled: false,
            error: null,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.createLoanRequest = this.createLoanRequest.bind(this);
    }

    async componentDidMount() {
        const api = new Api();

        const relayer = await api.get("relayerAddress");

        this.setState({ relayer });
    }

    async getRelayerFee(newPrincipalAmount) {
        const api = new Api();

        return new Promise((resolve) => {
            api.get("relayerFee", { principalAmount: newPrincipalAmount }).then((response) => {
                resolve(response.fee);
            });
        });
    }

    async createLoanRequest(event) {
        event.preventDefault();

        const api = new Api();

        try {
            const debtorAddress = await this.getDebtorAddress();
            const loanRequest = await this.generateLoanRequest(debtorAddress);

            await loanRequest.allowCollateralTransfer(debtorAddress);

            const id = await api.create("loanRequests", loanRequest.toJSON());

            this.props.onCompletion(id);
        } catch (e) {
            console.error(e);
            this.setState({ error: e.message });
        }
    }

    async getDebtorAddress() {
        const { dharma } = this.props;

        const debtorAccounts = await dharma.blockchain.getAccounts();
        return debtorAccounts[0];
    }

    async generateLoanRequest(debtorAddress) {
        const { dharma } = this.props;

        const { LoanRequest } = Dharma.Types;

        const {
            principal,
            principalTokenSymbol,
            collateralTokenSymbol,
            relayerFee,
            collateral,
            termUnit,
            expirationUnit,
            expirationLength,
            interestRate,
            termLength,
            relayer,
        } = this.state;

        return LoanRequest.create(dharma, {
            principalAmount: principal,
            principalToken: principalTokenSymbol,
            collateralAmount: collateral,
            collateralToken: collateralTokenSymbol,
            interestRate,
            relayerFee,
            relayer,
            termDuration: termLength,
            termUnit,
            debtorAddress,
            expiresInDuration: expirationLength,
            expiresInUnit: expirationUnit,
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (name === "principal") {
            // When the principal changes, the form becomes disabled until the
            // relayer fee has been updated.
            this.setState({ disabled: true });

            this.getRelayerFee(value).then((relayerFee) => {
                this.setState({
                    relayerFee,
                    disabled: false,
                });
            });
        }

        this.setState({
            [name]: value,
        });
    }

    render() {
        const { tokens } = this.props;

        if (tokens.length === 0) {
            return <Loading />;
        }

        const {
            principal,
            principalTokenSymbol,
            collateral,
            relayerFee,
            collateralTokenSymbol,
            termUnit,
            termLength,
            interestRate,
            expirationUnit,
            expirationLength,
            disabled,
            error,
        } = this.state;

        const labelWidth = 3;
        const dropdownWidth = 4;
        const inputWidth = 5;

        return (
            <div className="CreateLoanRequest">
                <Title>Create a Loan Request</Title>

                {
                    error && <Error title="Unable to create loan request">{error}</Error>
                }

                <Col md={7}>
                    <Form horizontal disabled={disabled} onSubmit={this.createLoanRequest}>
                        <FormGroup controlId="principal">
                            <Col componentClass={ControlLabel} sm={labelWidth}>
                                Principal
                            </Col>
                            <Col sm={inputWidth}>
                                <FormControl
                                    onChange={this.handleInputChange}
                                    type="number"
                                    placeholder="Principal"
                                    name="principal"
                                    value={principal}
                                />
                            </Col>
                            <Col sm={dropdownWidth}>
                                <TokenSelect
                                    name="principalTokenSymbol"
                                    onChange={this.handleInputChange}
                                    defaultValue={principalTokenSymbol}
                                    tokens={tokens}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="collateral">
                            <Col componentClass={ControlLabel} sm={labelWidth}>
                                Collateral
                            </Col>
                            <Col sm={inputWidth}>
                                <FormControl
                                    onChange={this.handleInputChange}
                                    type="number"
                                    name="collateral"
                                    placeholder="Collateral"
                                    value={collateral}
                                />
                            </Col>
                            <Col sm={dropdownWidth}>
                                <TokenSelect
                                    onChange={this.handleInputChange}
                                    name="collateralTokenSymbol"
                                    defaultValue={collateralTokenSymbol}
                                    tokens={tokens}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="term">
                            <Col componentClass={ControlLabel} sm={labelWidth}>
                                Term Length
                            </Col>
                            <Col sm={inputWidth}>
                                <FormControl
                                    onChange={this.handleInputChange}
                                    type="number"
                                    placeholder="Term Length"
                                    name="termLength"
                                    value={termLength}
                                />
                            </Col>
                            <Col sm={dropdownWidth}>
                                <TimeUnitSelect
                                    onChange={this.handleInputChange}
                                    name="termUnit"
                                    defaultValue={termUnit}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="interest">
                            <Col componentClass={ControlLabel} sm={labelWidth}>
                                Interest Rate
                            </Col>
                            <Col sm={inputWidth}>
                                <InputGroup>
                                    <FormControl
                                        onChange={this.handleInputChange}
                                        type="number"
                                        placeholder="Interest Rate"
                                        name="interestRate"
                                        value={interestRate}
                                    />
                                    <InputGroup.Addon>%</InputGroup.Addon>
                                </InputGroup>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="expiration">
                            <Col componentClass={ControlLabel} sm={labelWidth}>
                                Expiration
                            </Col>
                            <Col sm={inputWidth}>
                                <FormControl
                                    onChange={this.handleInputChange}
                                    type="number"
                                    placeholder="Expiration"
                                    name="expirationLength"
                                    value={expirationLength}
                                />
                            </Col>
                            <Col sm={dropdownWidth}>
                                <TimeUnitSelect
                                    onChange={this.handleInputChange}
                                    name="expirationUnit"
                                    defaultValue={expirationUnit}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="expiration">
                            <Col componentClass={ControlLabel} sm={labelWidth}>
                                Relayer fee
                            </Col>
                            <Col sm={inputWidth}>
                                <InputGroup>
                                    <FormControl
                                        type="number"
                                        placeholder="Relayer fee"
                                        name="relayerFee"
                                        value={relayerFee}
                                        readOnly
                                    />
                                    <InputGroup.Addon>{principalTokenSymbol}</InputGroup.Addon>
                            </InputGroup>
                            <HelpBlock>Relayer fee is deducted from principal amount.</HelpBlock>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={labelWidth} sm={10}>
                                <Button type="submit" bsStyle="primary" disabled={disabled}>
                                    Create
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>
            </div>
        );
    }
}

export default CreateLoanRequest;
