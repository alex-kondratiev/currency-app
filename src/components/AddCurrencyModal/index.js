import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import './index.scss';

export default class AddCurrencyModal extends React.Component {
  static propTypes = {
    isModalOpen: PropTypes.Boolean,
    currenciesToAdd: PropTypes.Array,
    toggleModal: PropTypes.func,
    addCurrency: PropTypes.func,
    fetchRates: PropTypes.func,
  };

  static defaultProps = {
    isModalOpen: false,
    currenciesToAdd: [],
    toggleModal: () => {},
    addCurrency: () => {},
    fetchRates: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {selectedCurrency: null};
  }

  openModal = () => {
    this.props.toggleModal(true);
  };

  closeModal = () => {
    this.props.toggleModal(false);
  };

  addCurrency = async () => {
    const { selectedCurrency } = this.state;
    await this.props.addCurrency(selectedCurrency);
    this.props.fetchRates();
    this.setState({ selectedCurrency: null });
    this.closeModal();
  };

  selectCurrency = (event, value) => {
    this.setState({ selectedCurrency: value });
  };

  render() {
    const { isModalOpen, currenciesToAdd } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.closeModal}
      />,
      <FlatButton
        label="Add"
        primary={true}
        keyboardFocused={true}
        onClick={this.addCurrency}
        disabled={!this.state.selectedCurrency}
      />,
    ];
    return (
      <div class="add-currency-block">
        <RaisedButton
          label="Add Currency"
          onClick={this.openModal}
          disabled={!currenciesToAdd.length}
        />
        <Dialog
          title="Add currency"
          actions={actions}
          modal={false}
          open={isModalOpen}
          onRequestClose={this.closeModal}
        >
          <RadioButtonGroup
            name="currenciesToAdd"
            onChange={this.selectCurrency}
            defaultSelected={this.state.selectedCurrency}
          >
            {currenciesToAdd.map(item => {
              return (
                <RadioButton
                  value={item}
                  label={item}
                />
              )
            })}
          </RadioButtonGroup>
        </Dialog>
      </div>
    )
  }
}
