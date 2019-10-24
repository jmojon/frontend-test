import React from 'react';
import Form from 'react-bootstrap/Form';
import './AutoComplete.css';
import Col from 'react-bootstrap/Col';


interface ICallbackFunction {
    (device: string): void;
}
interface IAutoProps {
    callBack: ICallbackFunction;
};

interface IAutoState {
    input: string;
    autoList: IAPIResponse[];
    open: boolean;
    clean: boolean;
}

interface IAPIResponse {
    DeviceName: string;
    fake: boolean;
}

export class AutoComplete extends React.Component<IAutoProps, IAutoState> {
    private apiToken = '7695da81e92e802484ad3bdfb031ecbfcd5234ded2d7ad6e';

    constructor(props: IAutoProps) {
        super(props);
        this.state = {
            input: '',
            autoList: [],
            open: false,
            clean: false
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    // If the api is as static as it would seem, ie it's unlikely that a new model is released during 
    // a user session would it make more sense to pre-fetch the data from a call in the constructor rather than 
    // at every user input. But, I don't know if it is, and it kind of defeats the purpose of having a test with an
    // autocomplete that only filters local data
    public async handleInput(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
        const input = event.currentTarget.value;
        this.setState({ input: input });
        this.props.callBack("");
        this.setState({clean: false})

        if (event.currentTarget.value.length >= 3) {
            const res = await fetch('https://fonoapi.freshpixl.com/v1/getlatest?limit=20&token=' + this.apiToken);
            if (res.ok) {
                const data: IAPIResponse[] = await res.json();
                let filtered = data.filter(row =>
                    (row.DeviceName.toLowerCase().indexOf(input.toLowerCase()) < 0) ? false : true
                );
                if (filtered.length < 1) {
                    filtered = [{ DeviceName: 'Sorry, no matches', fake: true }];
                }
                this.setState({ autoList: filtered, open: true });
            } else {
                this.setState({ autoList: [{ DeviceName: "Problems with the API", fake: true }], open: true });
            }
        } else {
            this.setState({ open: false });
        }
    }

    public reset() {
        this.setState({input: "", clean: false, autoList: [], open: false});
    }

    public editOld(device: string) {
        this.setState({
            input: device,
            autoList: [],
            open: false,
            clean: true
        });
    }

    // TODO: select with keyboard, arrays and enter
    handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {

    }

    handleClick(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
        this.setState({ input: event.currentTarget.innerText, open: false, clean: true });
        this.props.callBack(event.currentTarget.innerText);
    }

    renderSuggestions() {
        return (
            <Col xs={6}>
            <ul className="suggestions">
                {this.state.autoList.map((row, index) => {
                    return (
                        <li key={row.DeviceName} onClick={this.handleClick}>
                            {row.DeviceName}
                        </li>
                    )
                })}
            </ul>
            </Col>
        );
    }

    
    render() {
        const suggestions = (this.state.open) ? this.renderSuggestions() : '';
        return (
            <>
                <Form.Group controlId="Model">
                    <Form.Label>Phone model</Form.Label>
                    <Form.Control 
                        onKeyDown={this.handleKeyDown} name="model" autoComplete="off"
                        value={this.state.input} onChange={this.handleInput} type="text"
                    />
                    <Form.Text className="text-muted">
                        Phone model.
                  </Form.Text>
                </Form.Group>
                {suggestions}
            </>
        );
    }
}
export default AutoComplete;

