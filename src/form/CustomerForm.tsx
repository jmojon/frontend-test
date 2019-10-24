import React from 'react';

import  './CustomerForm.css';
import AutoComplete from './AutoComplete';

import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


interface ICustomerFormProps {
  handleSubmit: IFormSubmit
}

interface IFormSubmit {
  (form: ICustomerFormState): boolean;
}

export interface ICustomerFormState {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  device: string;
  formErrors: string[];
}

export class CustomerForm extends React.Component<ICustomerFormProps, ICustomerFormState> {
  private auto: React.RefObject<AutoComplete>;

  constructor(props: ICustomerFormProps) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      age: 18,
      device: "",
      formErrors: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.handleAutoComplete = this.handleAutoComplete.bind(this);
    this.auto = React.createRef();
  }

  public editOld(customer: ICustomerFormState) {
      this.setState(customer);
      if (this.auto.current){
        this.auto.current.editOld(customer.device);
      }
  }

  private handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    switch (e.currentTarget.type) {
      case "number":
        if (parseInt(e.currentTarget.value)) {
          this.setState({ age: parseInt(e.currentTarget.value) });
        }
        break;
      case "email":
        if (!e.currentTarget.value.match(/[#!]/)) { // naive mail check, use external library
          this.setState({ email: e.currentTarget.value });
        }
        break;
      default:
        this.setState({
          ...this.state,
          [e.currentTarget.name]: e.currentTarget.value
        });
    }
  }

  public handleAutoComplete(device: string) {
    this.setState({ device: device });
  }

  public validateInput(event: React.FormEvent<HTMLFormElement> |React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    let errors = [];
    if (this.state.firstName.length < 2 || this.state.firstName.length > 20) {
      errors.push("First name must be between 2 and 20 characters.");
    }
    if (this.state.lastName.length < 2 || this.state.lastName.length > 20) {
      errors.push("Last name must be between 2 and 20 characters.");
    }
    if (this.state.email.length < 5 || !this.state.email.match(/[a-zA-Z_.-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z]+/)) { // again with the naivety
      errors.push("Email doesn't seem correct.");
    }
    if (!parseInt(this.state.age.toString())) { // bit over the top but better safe than sorry with input
      errors.push("Age must be over 18, and a number.")
    }

    if (!this.state.device) {
      errors.push("You must select a device from the list");
    }

    this.setState({ formErrors: errors });
    if (!errors.length && this.props.handleSubmit(this.state)) {
      this.resetForm();
      if (this.auto.current) {
        this.auto.current.reset();
      }
    }
    event.preventDefault();
  }

 
  private resetForm() {
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      age: 18,
      device: "",
      formErrors: []
    });
  }

  public render() {
    return (
      <>
        <Container>
          <div>
          <Row>
            {this.state.formErrors.map((msg, idx) => (
              <Alert key={idx} variant="danger" >{msg}</Alert>
            ))}
          </Row>
          <Form onSubmit={this.validateInput}>
            <Form.Row>
              <Col xs={6}>
                <Form.Group controlId="firstName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control  name="firstName" value={this.state.firstName} required 
                  onChange={this.handleChange} type="text" placeholder="First name" />
                  <Form.Text className="text-muted">
                    First name of the customer.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="LastName">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control name="lastName" value={this.state.lastName} onChange={this.handleChange} type="text" placeholder="Last name" />
                  <Form.Text className="text-muted">
                    Last name of the customer.
                  </Form.Text>
                </Form.Group>

              </Col>
            </Form.Row>

            <Form.Row>
              <Col xs={12}>
                <Form.Group controlId="Email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control name="email" value={this.state.email} onChange={this.handleChange} type="email" placeholder="Email" />
                  <Form.Text className="text-muted">
                    Email of the customer.
                  </Form.Text>
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col xs={6}>
                <Form.Group controlId="Age">
                  <Form.Label>Age</Form.Label>
                  <Form.Control name="age" defaultValue={this.state.age} onChange={this.handleChange} type="number" placeholder="0" />
                  <Form.Text className="text-muted">
                    Age of the customer.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <AutoComplete ref={this.auto} callBack={this.handleAutoComplete} />
              </Col>
            </Form.Row>

            <Form.Row>
              <Col xs={6}>
                <Button variant="primary" onClick={this.validateInput}>Submit</Button>
              </Col>
            </Form.Row>
          </Form>
          </div>
        </Container>
      </>
    );
  }
}

export default CustomerForm;