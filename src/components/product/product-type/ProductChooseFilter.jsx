import React from "react";
import YLButton from "components/custom-field/YLButton";
import {Field, Form, Formik } from "formik";
import data from "../../../assets/dumy-data/data-product";
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
            <div className="row">
              <div className="cate-filter col-md-12 col-sm-6">
                <p>
                  <b>Loại mồi</b>
                </p>
                {category.map((value, index) => (
                  <div className="field-category " key={index}>
                    <Field name="checkbox" type="checkbox" value={value.name} />
                    <label for={value.id}>{value.name}</label>
                  </div>
                ))}
              </div>
              <div className="fish-filter col-md-12 col-sm-6">
                <p>
                  <b>Loại cá</b>
                </p>
                {fish.map((value, index) => (
                  <div className="field-category" key={index}>
                    <Field name="checkbox" type="checkbox" value={value.name} />
                    <label for={value.name}>{value.name}</label>
                  </div>
                ))}
              </div>
            </div>
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
