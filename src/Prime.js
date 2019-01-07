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

class Prime extends Component {
  checker = () => {
    if (this.props.checkedNumbersFromParent.length < 1) {
      return (
        <div></div>
      )
    } else {
      let dblZeroNumbers = ["002", "003", "005", "007", "009"];
      let singleZeroNumbers = ["011", "013", "017", "019", "023", "029", "031", "037", "041", "043", "047", "053", "059", "061", "067", "071", "073", "079", "083", "089", "097"];
      let primes = (this.props.data.primeNumbers)
      let nums = this.props.checkedNumbersFromParent;
      let recentCheckedNumber = (nums[0].text);
      let recentCheckedRegExp = new RegExp(recentCheckedNumber);
      for (var x in dblZeroNumbers) {
        if (dblZeroNumbers[x].search(recentCheckedRegExp) >= 0){
          return (
            <div>
              <div>{parseInt(dblZeroNumbers[x])}</div>
            </div>
          )
        }
      }
      for (var y in singleZeroNumbers) {
        if (singleZeroNumbers[y].search(recentCheckedRegExp) >= 0){
          return (
            <div>
              <div>{parseInt(singleZeroNumbers[y])}</div>
            </div>
          )
        }
      }
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
  }

  render() {
    const {data: {loading, primeNumbers}} = this.props;
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
  graphql(PrimeNumbersQuery))(Prime);
