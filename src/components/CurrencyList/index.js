import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import UpdateIcon from 'material-ui/svg-icons/action/cached';
import sortBy from 'lodash/sortBy';
import { BASE_CURRENCY } from '~/consts';
import './index.scss';

const style = {
  tableRowColumn: {
    padding: '5px',
  },
  columnDate: {
    whiteSpace: 'wrap',
  },
  iconButton: {
    padding: 0,
    width: 24,
    height: 24,
  },
};

export default class CurrencyList extends React.Component {
  static propTypes = {
    rates: PropTypes.array,
    removeCurrency: PropTypes.func,
    fetchRates: PropTypes.func,
    updateRate: PropTypes.func,
  };

  static defaultProps = {
    rates: [],
    removeCurrency: () => {},
    fetchRates: () => {},
    updateRate: () => {},
  };

  async removeCurrency(currency) {
    await this.props.removeCurrency(currency);
    this.props.fetchRates();
  };

  updateCurrency(currency) {
    this.props.updateRate(currency);
  }

  renderTableRow() {
    const { rates } = this.props;
    return sortBy(rates, ['key']).map(rate => (
      <TableRow>
          <TableRowColumn style={style.tableRowColumn}>{rate.key}</TableRowColumn>
          <TableRowColumn style={style.tableRowColumn}>{rate.value}</TableRowColumn>
          <TableRowColumn style={{...style.tableRowColumn, ...style.columnDate}}>
            {new Date(rate.timestamp * 1000).toLocaleString()}
          </TableRowColumn>
          <TableRowColumn style={style.tableRowColumn}>
            <IconButton
              onClick={() => this.updateCurrency(rate.key)}
              style={style.iconButton}
            >
              <UpdateIcon />
            </IconButton>
            {
              !rate.default && (
                <IconButton
                  onClick={() => this.removeCurrency(rate.key)}
                  style={style.iconButton}
                >
                  <DeleteIcon />
                </IconButton>
              )
            }

          </TableRowColumn>
      </TableRow>
    ));
  }

  render() {
    return (
      <div className="currency-list">
        <Table selectable={false}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn style={style.tableRowColumn}>Currency</TableHeaderColumn>
              <TableHeaderColumn style={style.tableRowColumn}>Rate ({BASE_CURRENCY})</TableHeaderColumn>
              <TableHeaderColumn style={{...style.tableRowColumn, ...style.columnDate}}>
                Date
              </TableHeaderColumn>
              <TableHeaderColumn style={style.tableRowColumn}>Action</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {this.renderTableRow()}
          </TableBody>
        </Table>
      </div>

    )
  }
}
