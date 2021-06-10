import React from "react";
import "assets/scss/scss-pages/campaign.scss";
import * as Yup from "yup";
import { FastField, Form, Formik } from "formik";
import InputField from "components/custom-field/YLInput";
import YLButton from "components/custom-field/YLButton";

function Campaign(props) {
  //constructor value for formik field
  const initialValues = {
    phone: "",
    fullname: "",
  };
  //check validate for formik field
  const validationSchema = Yup.object().shape({
    phone: Yup.string().required("This field is required."),
    fullname: Yup.string().required("This field is required."),
  });
  const campaignRegister = () => {};
  return (
    <div className="container campaign">
      <div className="banner">
        <img
          className="img-banner"
          src="https://cdn11.bigcommerce.com/s-55834/images/stencil/original/carousel/31/fishing-tackle-shop38932.jpg"
          alt=""
        />
        <div className="countdown">
          <div className="row">
            <div className="col-3">30</div>
            <div className="col-1">:</div>
            <div className="col-3">15</div>
            <div className="col-1">:</div>
            <div className="col-3">20</div>
          </div>
        </div>
      </div>
      <div className="campaign-main row mt-5">
        <div className="campain-information col-12 col-md-6">
          <h1>Thông tin sự kiện</h1>
          <div className="information">
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              maiores aperiam, similique quam repudiandae iure, earum cumque
              ipsa recusandae hic numquam cum unde, qui ipsam eligendi
              voluptates nihil velit libero.
            </span>
          </div>
        </div>
        <div className="campaign-register col-12 col-md-6">
          <h2>Đăng ký tham gia sự kiện</h2>
          <div className="campaign-register-form">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                campaignRegister(values);
              }}
            >
              {(formikProps) => {
                const { values, errors, touched } = formikProps;
                // console.log({ values, errors, touched });
                return (
                  <Form>
                    <FastField
                      name="phone"
                      component={InputField}
                      label="Số điện thoại"
                      placeholder="Nhập số điện thoại"
                    ></FastField>
                    <FastField
                      name="fullname"
                      type="fullname"
                      component={InputField}
                      label="Họ tên"
                      placeholder="Nhập họ tên"
                    ></FastField>
                    <div className="mt-2">
                      <YLButton
                        type="submit"
                        variant="primary"
                        value="Đăng ký"
                        width={100}
                      ></YLButton>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
      <div className="campaign-list-img mt-5">
        <h1>Hình ảnh nổi bật</h1>
        <div className="list-img">
          <img
            src="https://images.unsplash.com/photo-1591280063444-d3c514eb6e13?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIzMzMyMjA5&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=300"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1591280063444-d3c514eb6e13?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIzMzMyMjA5&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=300"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1591280063444-d3c514eb6e13?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIzMzMyMjA5&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=300"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1591280063444-d3c514eb6e13?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIzMzMyMjA5&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=300"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1591280063444-d3c514eb6e13?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIzMzMyMjA5&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=300"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1591280063444-d3c514eb6e13?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIzMzMyMjA5&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=300"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1591280063444-d3c514eb6e13?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIzMzMyMjA5&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=300"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1591280063444-d3c514eb6e13?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIzMzMyMjA5&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=300"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1591280063444-d3c514eb6e13?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIzMzMyMjA5&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=300"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Campaign;
