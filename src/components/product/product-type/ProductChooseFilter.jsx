import React from "react";
import PropTypes from "prop-types";
import YLButton from "components/custom-field/YLButton";
import { FastField, Field, Form, Formik } from "formik";
import data from "./data-product";
ProductChooseFilter.propTypes = {};

function ProductChooseFilter(props) {
  const handleSubmit = async (values) => {
    console.log(values);
  };

  const initialValues = {
    checkmox: [],
  };
  const category = data.category();
  return (
    <div className="product-choose-filter">
      <div className="head-text">Danh mục</div>
      <div className="form-filter">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          <Form>
            {category.map((value, index) => (
              <div className="field-category">
                <Field name={value.name} type="checkbox" id={value.id} value={value.name} />
                <label for={value.id}>{value.name}</label>
              </div>
            ))}

            <button type="submit">submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default ProductChooseFilter;
