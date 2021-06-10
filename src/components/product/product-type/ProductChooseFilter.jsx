import React from "react";
import YLButton from "components/custom-field/YLButton";
import { FastField, Field, Form, Formik } from "formik";
import data from "../../../assets/dumy-data/data-product";
import YLCheckBoxField from 'components/custom-field/YLCheckBoxField.jsx';
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
          {({ values, setFieldValue }) => {
            console.log(values);
            return (
              <Form>
                <div className="row">
                  <div className="cate-filter col-md-12 col-sm-5 col-5">
                    <p>
                      <b>Loại mồi</b>
                    </p>
                    <div className="field-category ">
                      <Field name="checkbox" type="checkbox" value="all-cate" />
                      <label for="all-cate" className="ms-1">
                        Tất cả
                      </label>
                    </div>
                    {category.map((cate, index) => (
                      <div className="field-category " key={index}>
                        {/* <Field
                          name="checkboxx"
                          type="checkbox"
                          value={value.id}
                        />
                        <label className="ms-1" htmlFor={value.id}>
                          {value.name}
                        </label> */}
                        <FastField 
                        name="filter"
                        component={YLCheckBoxField}
                        checked={false}
                        
                        />
                      </div>
                    ))}
                  </div>
                  <div className="fish-filter col-md-12 col-sm-5 col-5">
                    <p>
                      <b>Loại cá</b>
                    </p>
                    {fish.map((value, index) => (
                      <div className="field-category" key={index}>
                        <Field
                          name="checkbox"
                          type="checkbox"
                          value={value.name}
                        />
                        <label className="ms-1" for={value.name}>
                          {value.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="button-submit m-2">
                  <YLButton type="submit" variant="primary" value="Tìm kiếm" />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default ProductChooseFilter;
