import React, { Component } from 'react';
import gql from "graphql-tag";
import { graphql, compose } from 'react-apollo';

const PrimeNumbersQuery = gql`
{
  primeNumbers {
    id
    text
    match
  }
}
`;

const UpdateMutuation = gql`
  mutation($id: ID!, $match: Boolean!) {
    updatePrimeNumber(id: $id, match: $match)
  }
`;

class Prime extends Component {
  checker = (primes) => {
    let nums = this.props.checkedNumbersFromParent;
    let recentChecked = (nums[nums.length - 1].text);
    let recentCheckedRegExp = new RegExp(recentChecked);
    for (var i in primes) {
      let count = 0;
      if (primes[i].text.search(recentCheckedRegExp) >= 0 && count < 1) {
        this.updatePrimeNumber(primes[i]);
        count = count + 1;
        break;
      }
    }
    return primes;
  }

  updatePrimeNumber = async (primeNumber) => {
    await this.props.updatePrimeNumber({
      variables: {
        id: primeNumber.id,
        match: primeNumber.match
      },
      update: store => {
        const data = store.readQuery({ query: PrimeNumbersQuery });
        data.primeNumbers = data.primeNumbers.map(
          x =>
            x.id === primeNumber.id
            ? {
                ...primeNumber, match: true
              }
            : x
        );
        store.writeQuery({ query: PrimeNumbersQuery, data });
      }
    });
  };

  render() {
    const {data: {loading, primeNumbers}} = this.props;
    this.checker(primeNumbers)
    return (
      <div>

      </div>
    );
  }
}

export default compose(
  graphql(UpdateMutuation, {name: 'updatePrimeNumber'}),
  graphql(PrimeNumbersQuery)
)(Prime);
