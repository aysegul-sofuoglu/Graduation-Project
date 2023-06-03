import React, { Component } from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem, Badge} from "reactstrap";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as productActions from "../../redux/actions/productActions";

class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }

  selectCategory = (category) => {
    this.props.actions.changeCategory(category);
    this.props.actions.getProducts(category.id)
  };

  render() {
    return (
      <div>
        <h3><Badge color="warning">KATEGORİLER</Badge></h3>
        <ListGroup>
          {this.props.categories.map((category) => (
            <ListGroupItem
            className={category.id === this.props.currentCategory.id ? "active-category" : ""}
              onClick={() => this.selectCategory(category)}
              key={category.id}
            >
              {category.category}
            </ListGroupItem>
          ))}
        </ListGroup>

        <style>
        {`
        .active-category {
          background-color: #ffc107;
        }
      `}
      </style>
 
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      changeCategory: bindActionCreators(
        categoryActions.changeCategory,
        dispatch
      ),
      getProducts: bindActionCreators(
        productActions.getProducts,
        dispatch
      )
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
