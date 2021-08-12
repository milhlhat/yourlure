import React, { useEffect, useState } from "react";
import "assets/scss/scss-pages/campaign.scss";
import * as Yup from "yup";
import YLButton from "components/custom-field/YLButton";

import {
  getAllCampaignByGuest,
  getCampaignGuestById,
  getNewestCampaignGuest,
  registerCampaignGuest,
} from "api/campaign-api";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { createImageUrlByLinkOrFile } from "utils/manager-product";
import { formatDate } from "../../utils/format-string";
import Loading from "../../components/Loading";
import ErrorLoad from "../../components/error-notify/ErrorLoad";
import { toast } from "react-toastify";
import YlInputFormHook from "../../components/custom-field/YLInputFormHook";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Helmet } from "react-helmet";
import { safeContent } from "../../utils/common";

function Campaign() {
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Vui lòng nhập số điện thoại.")
      .matches(
        /((\+84|84|0)[35789][0-9]{8})\b/,
        "Vui lòng nhập đúng số điện thoại"
      ),
    username: Yup.string()
      .required("Vui lòng nhập họ tên")
      .typeError("Vui lòng nhập họ tên"),
  });

  const methods = useForm({ resolver: yupResolver(validationSchema) });
  const { handleSubmit } = methods;
  //submit register
  const campaignRegister = async (data) => {
    try {
      data.campaignId = campaign.data.campaignId;
      await registerCampaignGuest(data);
      console.log(data);
      toast.success(
        "Đăng ký sự kiện thành công, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất"
      );
    } catch (e) {
      if (e.response?.data) toast.error(e.response?.data);
      else toast.error("Hệ thống gặp lỗi lạ");
    }
  };

  const [campaignList, setCampaignList] = useState({
    list: [],
    isLoading: true,
    isSuccess: false,
  });

  const fetchCampaignList = async () => {
    try {
      const response = await getAllCampaignByGuest();
      if (response.error) {
        setCampaignList({ ...campaignList, failFetch: true });
        throw new Error(response.error);
      } else {
        setCampaignList({
          list: response,
          isLoading: false,
          isSuccess: true,
        });
      }
    } catch (error) {
      console.log("fail to fetch customer list");
    }
  };
  const [campaign, setCampaign] = useState({
    data: null,
    isLoading: true,
    isSuccess: false,
  });
  const [isAvailable, setIsAvailable] = useState(true);
  const fetchNewestCampaign = async () => {
    try {
      const response = await getNewestCampaignGuest();

      setCampaign({
        data: response,
        isLoading: false,
        isSuccess: true,
      });
      setIsAvailable(new Date(response.endDate) - new Date() > 0);
    } catch (error) {
      setCampaign({ data: null, isLoading: false, isSuccess: false });
    }
  };

  const fetchCampaignGuestById = async (id) => {
    setCampaign({ data: null, isLoading: true, isSuccess: false });
    try {
      const response = await getCampaignGuestById(id);

      setCampaign({
        data: response,
        isLoading: false,
        isSuccess: true,
      });
      setIsAvailable(new Date(response.endDate) - new Date() > 0);
    } catch (error) {
      setCampaign({ data: null, isLoading: false, isSuccess: false });
      toast.error("Hệ thống gặp lỗi lạ");
    }
  };
  const handleClickChangeCampaign = async (id) => {
    await fetchCampaignGuestById(id);
    window.scrollTo(0, 0);
  };
  const [countdown, setCountdown] = useState();

  const responsiveBanner = {
    all: {
      breakpoint: { max: 4640, min: 0 },
      items: 1,
    },
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
      items: 1,
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCampaignList();
    fetchNewestCampaign();
  }, []);
  const timeCountDown = () => {
    const endDate = new Date(campaign?.data?.endDate);
    let countDownInterval;
    const countTime = () => {
      const today = new Date();
      let ms = (endDate - today) % 86400000;
      if (ms < 1) clearInterval(countDownInterval);
      const d = Math.floor((endDate - today) / 86400000);
      let h = Math.floor(ms / 3600000);

      let m = Math.floor((ms % 3600000) / 60000);

      let s = Math.floor(((ms % 3600000) % 60000) / 1000);

      setCountdown(
        `Kết thúc sau ${d.toString().padStart(2, "0")} : ${h
          .toString()
          .padStart(2, "0")} : ${m.toString().padStart(2, "0")} : ${s
          .toString()
          .padStart(2, "0")} `
      );
    };
    if (endDate - new Date() > 0) {
      countDownInterval = setInterval(() => countTime(), 1000);
    } else setCountdown("Sự kiện đã kết thúc");

    return countDownInterval;
  };
  useEffect(() => {
    const countInterval = timeCountDown();
    return () => clearInterval(countInterval);
  }, [campaign]);

  if (campaign.isLoading) {
    return <Loading hasLayout />;
  } else if (!campaign.isSuccess) {
    return <ErrorLoad hasLayout />;
  } else
    return (
      <div className="container campaign">
        <Helmet>
          <title>{`${campaign?.data?.banner} - Sự kiện | Yourlure`}</title>{" "}
          <meta name="title" content={campaign?.data?.banner || "Sự kiện"} />
          <meta name="description" content={campaign?.data?.banner} />
        </Helmet>
        <div className="campaign-banner d-block ">
          <Carousel
            responsive={responsiveBanner}
            // removeArrowOnDeviceType={["all"]}
            autoPlay
            infinite
            keyBoardControl={true}
            pauseOnHover={true}
            customTransition="all 1s"
            transitionDuration={1000}
          >
            {campaign?.data?.imageCollection?.length > 0 &&
              campaign?.data?.imageCollection.map((item, i) => (
                <div key={"img-banner" + i} className={"banner-container"}>
                  <img
                    className={"img-banner"}
                    src={createImageUrlByLinkOrFile(item.linkImage)}
                  />
                </div>
              ))}
          </Carousel>
        </div>
        <div className={"bg-box mt-4 text-center"}>
          <h2 className={"countdown"}>{countdown}</h2>
        </div>
        <div className="campaign-main  mt-3 bg-box ">
          <article>
            <h1 className={"text-center mt-3 pt-4 "}>
              {campaign?.data?.banner}
            </h1>
            <p className={"text-center w-75 mx-auto mb-5 text-color  "}>
              {campaign?.data?.description}
            </p>
          </article>
          <div className={"py-4"}>
            <div className={`pe-md-3`}>
              <h3 className={"pb-3 text-center"}>Thông tin sự kiện</h3>
              <p
                className={"campaign-content text-color"}
                dangerouslySetInnerHTML={safeContent(campaign?.data?.content)}
              />
            </div>
            <div>
              {isAvailable && (
                <div>
                  <h2 className={"pb-3 text-center"}>
                    Đăng ký tham gia sự kiện
                  </h2>
                  <form
                    onSubmit={handleSubmit(campaignRegister)}
                    className="campaign-register-form"
                  >
                    <YlInputFormHook
                      name={"phone"}
                      isRequired
                      placeholder={"Nhập số điện thoại"}
                      label={"Số điện thoại"}
                      methods={methods}
                    />
                    <br />
                    <YlInputFormHook
                      name={"username"}
                      isRequired
                      placeholder={"Họ tên"}
                      label={"Nhập họ tên"}
                      methods={methods}
                    />
                    <br />
                    <div className="d-flex justify-content-center">
                      <YLButton
                        type={"submit"}
                        variant={"primary"}
                        value={"Đăng ký"}
                      />
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="campaign-orther-list my-md-5 my-2 bg-box">
          <h3 className={"mb-3 ms-3"}>Các sự kiện khác</h3>
          <Carousel
            swipeable={false}
            draggable={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            keyBoardControl={true}
            customTransition="all 1s"
            transitionDuration={500}
          >
            {campaignList.list.map((campaign, i) => (
              <div
                className="campaign-list-card bg-white pointer"
                key={i}
                onClick={() => handleClickChangeCampaign(campaign.campaignId)}
              >
                <img
                  className="campaign-img rounded-3"
                  src={createImageUrlByLinkOrFile(
                    campaign?.imageCollection
                      ? campaign?.imageCollection[0]?.linkImage
                      : ""
                  )}
                  alt="Hình ảnh về sự kiện"
                />

                <div className="dateEnd">
                  Kết thúc: {formatDate(campaign.endDate)}
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    );
}

export default Campaign;
