import React, { useEffect, useState } from "react";
import "assets/scss/scss-pages/campaign.scss";
import * as Yup from "yup";
import { FastField, Form, Formik } from "formik";
import InputField from "components/custom-field/YLInput";
import YLButton from "components/custom-field/YLButton";
import banner from "assets/images/urban-fishing-in-boston-social.jpg";
import activity from "assets/images/g1.jpg";
import CampaignAPI from "api/campaign-api";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { createImageUrlByLinkOrFile } from "utils/manager-product";

function Campaign(props) {
  const { campaignId } = props;

  const [id, setId] = useState(campaignId ? campaignId : 1);
  const [isEnd, setIsEnd] = useState(false);
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

  //submit register
  const campaignRegister = () => {};

  const [campaignList, setCampaignList] = useState({
    list: [],
    isLoading: true,
    isSuccess: false,
  });

  const fetchCampaignList = async () => {
    try {
      const response = await CampaignAPI.getAll();
      if (response.error) {
        setCampaignList({ ...campaignList, failFetch: true });
        throw new Error(response.error);
      } else {
        await setCampaignList({
          list: response,
          isLoading: false,
          isSuccess: true,
        });
      }
    } catch (error) {
      console.log("fail to fetch customer list");
    }
  };
  const [campaign, setCampaign] = useState(null);
  const fetchCampaign = async (id) => {
    try {
      const response = await CampaignAPI.getById(id);
      if (response.error) {
        throw new Error(response.error);
      } else {
        await setCampaign(response);
      }
    } catch (error) {
      console.log("fail to fetch customer list");
    }
  };
  const timeCountDown = (endDate) => {
    let days = document.querySelector("#day");
    let hour = document.querySelector("#hour");
    let min = document.querySelector("#min");
    let second = document.querySelector("#second");
    days.innerText = Math.floor((endDate - new Date()) / 86400000) + 1;
    countTime();

    function countTime() {
      let today = new Date();
      let ms = (endDate - today) % 86400000;

      let h = Math.floor(ms / 3600000);
      h = h < 10 ? "0" + h : h;

      let m = Math.floor((ms % 3600000) / 60000);
      m = m < 10 ? "0" + m : m;

      let s = Math.floor(((ms % 3600000) % 60000) / 1000);
      s = s < 10 ? "0" + s : s;

      hour.innerText = h;
      min.innerText = m;
      second.innerText = s;
    }

    setInterval(countTime, 1000);
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1500 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1500, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  function handleClickChangeCampaign(id) {
    setId(id);
  }
  function pipeDate(date) {
    let d = new Date(date);
    return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCampaignList();
    fetchCampaign(id);
    setIsEnd(
      campaign ? (campaign.startDate - new Date() > 0 ? false : true) : true
    );
    if (!isEnd) {
      timeCountDown(
        campaign
          ? new Date(campaign.startDate)
          : new Date("2021-06-26T07:51:26.000+00:00")
      );
    }
    console.log(campaignList);
  }, [id]);
  return (
    <div className="container campaign">
      <div className="banner">
        <img
          className="img-banner"
          src={createImageUrlByLinkOrFile(campaign?.imageCollection[0]?.linkImage)}
          alt=""
        />
        <div className={`countdown ${isEnd ? "d-none" : ""}`}>
          <div id="day"></div>
          <div className="fs-6 me-2">ngày</div>
          <div id="hour"></div>
          <div className="fs-6 me-2">giờ</div>
          <div id="min"></div>
          <div className="fs-6 me-2">phút</div>
          <div id="second"></div>
        </div>
        <div className={`countdown ${isEnd ? "" : "d-none"}`}>Đã kết thúc.</div>
      </div>
      <div className="campaign-main row mt-5">
        <div className="campain-information col-12 col-md-6">
          <h1>Thông tin sự kiện</h1>
          <div className="information">
            <span>{campaign ? campaign.description : "null"}</span>
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
          {campaign &&
            campaign.imageCollection &&
            campaign.imageCollection.map((camp, index) => (
              <img src={createImageUrlByLinkOrFile(camp.linkImage)} alt="" key={index} />
            ))}
        </div>
      </div>
      <div className="campaign-orther-list my-md-5 my-2">
        <h3>Các sự kiện Khác</h3>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          keyBoardControl={true}
          customTransition="all 1s"
          transitionDuration={500}
        >
          {campaignList.list.map((list, i) => (
            <div
              className="campaign-list-card bg-white m-1"
              key={i}
              onClick={() => handleClickChangeCampaign(list.campaignID)}
            >
              <div className="campaign-img">
                <img
                  src={createImageUrlByLinkOrFile(list?.imageCollection
                      ? list?.imageCollection[0]?.linkImage
                      : "")
                  }
                  alt="Hình ảnh về sự kiện"
                />
              </div>
              <div className="dateEnd">
                Đã kết thúc vào:{pipeDate(list.startDate)}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Campaign;
