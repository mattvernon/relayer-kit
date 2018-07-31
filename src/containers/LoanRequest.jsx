// External libraries
import React, { Component } from "react";

// Components
import LoanRequest from "../components/LoanRequest/LoanRequest";

// Contexts
import DharmaConsumer from "../contexts/Dharma/DharmaConsumer";

class LoanRequestContainer extends Component {
    constructor(props) {
        super(props);

        this.onFillComplete = this.onFillComplete.bind(this);
    }

    onFillComplete() {
        this.props.history.push(`/investments`);
    }

    render() {
        const {id} = this.props.match.params;

        return (
            <DharmaConsumer>
                { (dharmaProps) => {
                    return (
                        <LoanRequest
                            id={ id }
                            dharma={ dharmaProps.dharma }
                            onFillComplete={ () => {
                                dharmaProps.refreshTokens();
                                this.onFillComplete();
                            } }
                        />
                    )
                } }
            </DharmaConsumer>
        );
    }
}

export default LoanRequestContainer;
