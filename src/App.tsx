import React  from 'react';
import './App.css';
import { CustomerForm, ICustomerFormState } from './form/CustomerForm';
import CustomerGraph from './graph/CustomerGraph';
import CustomerTable from './table/CustomerTable';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


interface IAppState {
  customers: ICustomerRow[]
}

export interface ICustomerRow {
  fName: string;
  lName: string;
  email: string;
  age: number;
  device: string;
  id: string;
}

export class App extends React.Component<any, IAppState> {
  private form: React.RefObject<CustomerForm>;

  constructor(props: any) {
    super(props);
    this.state = { customers: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.form = React.createRef();
  }

  private handleSubmit(form: ICustomerFormState): boolean {
    if (!form.formErrors.length) {
      const customer:ICustomerRow = {
        fName: form.firstName,
        lName: form.lastName,
        email: form.email,
        age: form.age,
        device: form.device,
        id: Date.now().toString(16) + '-' + (Math.random() * 1000).toString()
      }
      this.setState({ customers: [...this.state.customers, customer] });
      return true;
    }
    return false;
  }

  deleteCustomer = (param: ICustomerRow) => (e: any) => {
    this.purge(param);
  }

  private purge(param: ICustomerRow) {
    const i = this.state.customers.findIndex((c: ICustomerRow) => c.id === param.id);
    if (i >= 0) {
      let customers = this.state.customers;
      customers.splice(i, 1);
      this.setState({ customers: customers });
    }
  }

  editCustomer = (param: ICustomerRow) => (e: any) => {
    if (this.form.current) {
      this.form.current.editOld(
        {
          firstName: param.fName,
          lastName: param.lName,
          email: param.email,
          age: param.age,
          device: param.device,
          formErrors: []
        }
      );
    }
    this.purge(param);    
  }


  public render(): any {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col className="App-cell" xs={6}>
              <CustomerForm ref={this.form} handleSubmit={this.handleSubmit} />
            </Col>
            <Col className="App-cell" xs={5}>
              <CustomerGraph data={this.state.customers} />
            </Col>
          </Row>
          <Row>
            <Col className="App-cell" xs={12}>
              <CustomerTable rows={this.state.customers} delete={this.deleteCustomer} edit={this.editCustomer} />
            </Col>
          </Row>
        </Container>
      </div>
    );

  }
}

export default App;
