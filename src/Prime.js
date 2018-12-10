import React, { Component } from 'react';
import gql from "graphql-tag";
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
  }
}
`;

const UpdateCheckedNumber = gql`
  mutation($id: ID!) {
    updateCheckedNumber(id: $id)
  }
`;

class Prime extends Component {

  checker = () => {
    let primes = (this.props.data.primeNumbers)
    let nums = this.props.checkedNumbersFromParent;
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
      <div className="r1c2">Did You Get Prime-ish?
        {this.checker() || "Too Bad"}
      </div>
    );
  }
}

export default compose(
  graphql(UpdateCheckedNumber, {name: 'updateCheckedNumber'}),
  graphql(PrimeNumbersQuery)
)(Prime);
