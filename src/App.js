import React, { Component } from 'react';
import gql from "graphql-tag";
import { graphql, compose } from 'react-apollo';
import logo from './logo.svg';
import './App.css';
import Form from './Form';
import Prime from './Prime';

const PrimeNumbersQuery = gql`
{
  primeNumbers {
    id
    text
  }
}
`;

const CheckedNumbersQuery =  gql`
{
  checkedNumbers {
    id
    text
  }
}
`;

const CreateCheckedNumberMutation = gql`
  mutation($text: String!) {
    createCheckedNumber(text: $text) {
      id
      text
    }
  }
`;

class App extends Component {

  createCheckedNumber = async text => {
    await this.props.createCheckedNumber({
      variables: {
        text
      },
      update: (store, { data: {createCheckedNumber } }) => {
        const data = store.readQuery({ query: CheckedNumbersQuery });
        data.checkedNumbers.push(createCheckedNumber);
        store.writeQuery({ query: CheckedNumbersQuery, data });
      }
    });
  };

  render() {
    const {data: {loading, checkedNumbers}} = this.props;

    if (loading) {
      return null;
    }

    return (
      <div>
        <Form submit={this.createCheckedNumber}/>
        <div> {checkedNumbers.map(checkedNumber => (
          <div key={`${checkedNumber.id}`}>{checkedNumber.text}</div>))}
          <Prime checkedNumbersFromParent={checkedNumbers}/>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(CreateCheckedNumberMutation, {name: 'createCheckedNumber'}),
  graphql(PrimeNumbersQuery),
  graphql(CheckedNumbersQuery)
)(App);
