import React from 'react'

import { connect } from 'react-redux'


export const SingleProduct = props => {
    const { name, description, imgUrl } = props.product

    return (
        <div>
            <h3>Welcome, {email}</h3>
            <div>
                <div>
                    <p>Name: {product.title}</p>
                    <p>Deadline: {project.deadline} </p>
                    <p>Description: {project.description} </p>
                    <p>
                        Completed Status:
              {project.completed ? <span>True</span> : <span>False</span>}
                    </p>
                </div>
            </div>

            )
        }


const mapState = state => {
    return {
                product: state.products.product
}
}
 
export default connect(mapState)(SingleProduct)