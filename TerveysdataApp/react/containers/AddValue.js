import { connect } from 'react-redux';

import ACTIONS from '../actions/addValues';
import AddForm from '../components/AddForm';

const mapStateToProps = (state, ownProps) => ({
  label: ownProps.label,
  heading: ownProps.heading
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: (value) => {
    dispatch(ACTIONS[ownProps.action](value));
  }
});

const AddValue = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddForm);



export default AddValue;