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
    matchingPrime
  }
}
`;

const CreateCheckedNumberMutation = gql`
  mutation($text: String!) {
    createCheckedNumber(text: $text) {
      id
      text
      matchingPrime
    }
  }
`;

class App extends Component {

  createCheckedNumber = async text => {
    await this.props.createCheckedNumber({
      variables: {
        text
      },
      update: (store, { data: {createCheckedNumber} }) => {
        const data = store.readQuery({ query: CheckedNumbersQuery });
        data.checkedNumbers.unshift(createCheckedNumber);
        store.writeQuery({ query: CheckedNumbersQuery, data });
      }
    });
  };

  render() {
    const {data: {loading, checkedNumbers}} = this.props;
    console.log(checkedNumbers);
    if (loading) {
      return null;
    }

    return (
      <div className="wrapper">
        <h1 className="title">Prime/ish</h1>
        <p>Ever wonder if a specific 3-digit number made up one of the first 10,000 prime numbers? Well, now you can get your answer! Prime-ish will tell which prime number your entry belongs to. Type in your number, hit Enter, and get your answer!</p>
        <Form submit={this.createCheckedNumber}/>
        <div className="output">
          <h4>Checked Numbers</h4>
          {checkedNumbers.map(checkedNumber => (
            <div className="r1c1" key={`${checkedNumber.id}`}>{checkedNumber.text}</div>))}
          <h4 className="prime-list">Prime/ish Result</h4>
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
