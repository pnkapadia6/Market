/**
 * Created by pnkapadia6 on 27/12/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

import { sellKitten } from '../../actions';

import './sellSection.scss';

class SellSection extends React.PureComponent {
  state = { openSeller: false };

  onClickSell = () => {
    if (!this.state.openSeller) {
      return this.setState({ openSeller: true });
    }
    this.props.sellKitten(this.state);
    this.onClickCancel();
  }

  onClickCancel = () => this.setState({ openSeller: false })

  onImageUpload = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imageUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  onChangePrice = e => this.setState({ price: e.target.value })

  onChangeAge = e => this.setState({ age: e.target.value })

  canSellKitten = () => {
    const { state } = this;
    return state.price && state.age && state.imageUrl;
  }

  renderForm() {
    return this.state.openSeller && (
      <div className="sell-section-body">
        <div className="sell-section-body-title">Tell us more about your Kitten!</div>
        <div className="sell-sub-section">
          <span className="sell-section-label">Image</span>
          <input className="sell-kitten-input" type="file" accept="image/*" onChange={this.onImageUpload} />
        </div>
        <div className="sell-sub-section">
          <span className="sell-section-label">Price (in Rs)</span>
          <input className="sell-kitten-input" type="number" min={1} onChange={this.onChangePrice} />
        </div>
        <div className="sell-sub-section">
          <span className="sell-section-label">Age (in months)</span>
          <input className="sell-kitten-input" type="number" min={1} onChange={this.onChangeAge} />
        </div>
      </div>
    )
  }

  renderFooter() {
    const { openSeller } = this.state;
    const enableSellButton = openSeller ? this.canSellKitten() : true;

    return (
      <div className="sell-section-footer">
        {openSeller && <button className="sell-cancel-button" onClick={this.onClickCancel}>Cancel</button>}
        <button className="sell-button" disabled={!enableSellButton} onClick={this.onClickSell}>Sell</button>
      </div>
    )
  }

  render() {
    const wrapperClass = classnames('sell-section', { 'sell-section--expanded': this.state.openSeller });
    return (
      <div className={wrapperClass}>
        {this.renderForm()}
        {this.renderFooter()}
      </div>
    )
  }
}

SellSection.propTypes = {
  sellKitten: PropTypes.func,
};

export default connect(
  null,
  dispatch => bindActionCreators({ sellKitten }, dispatch)
)(SellSection);
