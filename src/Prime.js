import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from 'react-apollo';
import { graphql, compose } from 'react-apollo';

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

const UpdateCheckedNumber = gql`
  mutation($id: ID!) {
    updateCheckedNumber(id: $id)
  }
`;

class Prime extends Component {
  // updateCheckedNumber = async (checkedNumber) => {
  //   await this.props.updateCheckedNumber({
  //     variables: {
  //       id: checkedNumber.id
  //     },
  //     update: store => {
  //       const data = store.readQuery({ query: CheckedNumbersQuery });
  //       data.checkedNumbers = data.checkedNumbers.map(
  //         x =>
  //           x.id === checkedNumber.id
  //           ? {
  //               ...checkedNumber, matchingPrime: "200"
  //             }
  //           : x
  //       );
  //       store.writeQuery({ query: CheckedNumbersQuery, data });
  //     }
  //   })
  // }

  checker = () => {
    let primes = (this.props.data.primeNumbers)
    let nums = this.props.checkedNumbersFromParent;
    let recentCheckedObject = (nums[nums.length - 1]);
    let recentCheckedNumber = (nums[nums.length - 1].text);
    let recentCheckedRegExp = new RegExp(recentCheckedNumber);
    for (var i in primes) {
      if (primes[i].text.search(recentCheckedRegExp) >= 0) {
        return (
          <div>
            <div>{primes[i].text}</div>
          </div>
        )
      }
    }
  }

  render() {
    const {data: {loading, primeNumbers}} = this.props;
    this.checker();
    if (loading) {
      return null;
    }
    return (
      <div className="r1c2">
        {this.checker() || "Too Bad"}
      </div>
    );
  }
}

export default compose(
  graphql(UpdateCheckedNumber, {name: 'updateCheckedNumber'}),
  graphql(PrimeNumbersQuery)
)(Prime);
