import React, { Component } from 'react';
import { withRouter,Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchAllCategories} from '../store/category';


class displayCategories extends Component {

  componentDidMount() {
    this.props.thunkAllCategories();
  }

  
  render() {
    const categories = this.props.categories;

  return (
      
   
     <div>
          {/* <h5>In display categories component</h5> */}
          <div>
       <table className="table table-sm w-75 p-3"  >
            <thead className="thead-light">
              <tr>
                <th scope="col">#Id</th>
                <th scope="col">category Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.length && categories.map(category => ( 
                <tr  className="border border-light" key={ category.id }>
                  <th scope="row">{ category.id }</th>
                  <td>{ category.name }</td>
                  <td><Link to={`/editCategories/${category.id}`} className="textColor">Edit</Link></td>
                </tr>
                
                ))
              } 
             
            </tbody>
          </table>  
      </div>  
   </div>
    )
  }
}

const mapStateToProps = (state) => {
    console.log(state)
  return {
      categories: state.category 
  }
}

const mapDispatchToProps= (dispatch) => {
  return {
    thunkAllCategories: () => dispatch(fetchAllCategories()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(displayCategories));




