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

  checker = () => {
    let primes = (this.props.data.primeNumbers)
    let nums = this.props.checkedNumbersFromParent;
    let recentCheckedRegExp = new RegExp(nums[nums.length - 1].text);

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
    return (
      <div className="r1c2" >
        {this.checker() || "Too Bad"}
      </div>
    );
  }
}

export default compose(
  graphql(UpdateMutuation, {name: 'updatePrimeNumber'}),
  graphql(PrimeNumbersQuery)
)(Prime);
