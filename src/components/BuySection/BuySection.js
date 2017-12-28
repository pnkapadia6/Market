import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import _noop from 'lodash/noop';

import { buyKitten } from '../../actions';

import './buySection.scss';

class BuySection extends React.PureComponent {
  onBuy = kittenId => () => {
    this.props.buyKitten(kittenId);
  }

  renderFooter = kitten => (
    <div className="kitten-footer">
      <div className="kitten-price">{`Rs. ${kitten.price}`}</div>
      <div className="kitten-age">{`${kitten.age} months`}</div>
      <div className="kitten-buy" onClick={this.onBuy(kitten.id)}>Buy</div>
    </div>
  )

  renderBuyBlock = kitten => (
    <div key={kitten.id} className="kitten-wrapper">
      <div className="kitten-image-wrapper">
        <img src={kitten.imageUrl} className="kitten-image" alt="kitten" />
      </div>
      {this.renderFooter(kitten)}
    </div>
  )

  renderEmptyPlaceholder = () => {
    return (
      <div className="kitten-placeholder">
        All of our kittens have found their homes! Come back later!
      </div>
    );
  }

  render() {
    const kittensToSell = _filter(this.props.kittens, { isSold: false });

    return (
      <div className="kitten-container">
        {_map(kittensToSell, this.renderBuyBlock)}
        {!kittensToSell.length && this.renderEmptyPlaceholder()}
      </div>
    )
  }
}

BuySection.propTypes = {
  kittens: PropTypes.array,
  buyKitten: PropTypes.func,
};

BuySection.defaultProps = {
  kittens: [],
  buyKitten: _noop,
};

export default connect(
  state => ({ kittens: state.market.kittens }),
  dispatch => bindActionCreators({ buyKitten }, dispatch)
)(BuySection);
