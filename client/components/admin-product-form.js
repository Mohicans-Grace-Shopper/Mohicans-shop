import React from 'react';

const ProductForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div id="input">
        <label htmlFor="name">Product Name: </label>
        <input
          placeholder="This field is required!"
          type="text"
          value={props.name}
          name="name"
          onChange={props.handleChange}
          required
        />
      </div>
      <div id="input">
        <label htmlFor="price">Price: </label>
        <input
          placeholder="This field is required!"
          type="text"
          value={props.price}
          name="price"
          onChange={props.handleChange}
          required
        />
      </div>
      <div id="input">
        <label htmlFor="quantity">Quantity: </label>
        <input
          type="text"
          value={props.quantity}
          name="quantity"
          onChange={props.handleChange}
        />
      </div>
      <div id="input">
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          value={props.description}
          name="description"
          onChange={props.handleChange}
        />
      </div>
      <div id="input">
        <label htmlFor="imageUrl">Image URL: </label>
        <input
          type="text"
          value={props.imageUrl}
          name="imageUrl"
          onChange={props.handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
