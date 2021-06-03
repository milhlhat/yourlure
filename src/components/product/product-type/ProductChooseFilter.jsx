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
    checkbox: [],
  };
  const category = data.category();
  const fish = data.fish();
  return (
    <div className="product-choose-filter">
      <div className="head-text">Danh mục</div>
      <div className="form-filter p-2 mt-2">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          <Form>
            <p>
              <b>Loại mồi</b>
            </p>
            {category.map((value, index) => (
              <div className="field-category">
                <Field
                  name="checkbox"
                  type="checkbox"
                  id={value.id}
                  value={value.name}
                />
                <label for={value.id}>{value.name}</label>
              </div>
            ))}
            <p>
              <b>Loại cá</b>
            </p>
            {fish.map((value, index) => (
              <div className="field-category">
                <Field
                  name="checkbox"
                  type="checkbox"
                  id={value.id}
                  value={value.name}
                />
                <label for={value.id}>{value.name}</label>
              </div>
            ))}

            <div className="button-submit m-2">
              <YLButton type="submit" varian="primary" value="Tìm kiếm" />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default ProductChooseFilter;
