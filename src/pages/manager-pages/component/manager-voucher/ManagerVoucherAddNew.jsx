import { yupResolver } from "@hookform/resolvers/yup";
import ManagerVoucherAPI from "api/manager-voucher";
import YLButton from "components/custom-field/YLButton";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import "./scss/manager-add-new-voucher.scss";
import YlInputFormHook from "../../../../components/custom-field/YLInputFormHook";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";

function ManagerVoucherAddNew() {
  const history = useHistory();
  const schema = yup.object().shape(VOUCHER_VALIDATE_SCHEMA);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: { type: TYPE_OPTION[2] },
  });
  const {
    formState: { isSubmitting },
    handleSubmit,
    watch,
  } = methods;
  const watchForm = watch();
  console.log(watchForm);
  const onsubmit = async (data) => {
    console.log(data);
    try {
      await ManagerVoucherAPI.add(data);
      toast.success("Thêm mã giảm giá thành công");
      history.push("/manager/voucher");
    } catch (error) {
      toast.error("Thêm mã giảm giá thất bại");
      console.log("fail to fetch add voucher");
    }
  };

  return (
    <div>
      <h3>Tạo mã giảm giá mới</h3>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className=" add-new-form row">
          <div
            className="info bg-box bg-shadow col-12  mb-md-5 mb-2 pb-2 pb-md-5 mt-md-3"
            id="product-info"
          >
            <div className="px-3 pt-3">
              <h5>Thông tin mã giảm giá</h5>
            </div>
            <hr />
            <div className="px-3">
              <FormTableVoucher methods={methods} watchForm={watchForm} />
            </div>
          </div>

          <div className="col-12 bg-white bg-shadow submit-button-form">
            <YLButton variant="danger" to="/manager/voucher" value="Hủy" />
            <YLButton variant="primary" type="submit">
              {isSubmitting ? (
                <CircularProgress size={20} className="circle-progress" />
              ) : (
                "Xong"
              )}
            </YLButton>
          </div>
        </div>
      </form>
    </div>
  );
}

export const TYPE_OPTION = ["Phần trăm", "Giá trị", "Free Ship"];
export const VOUCHER_VALIDATE_SCHEMA = {
  name: yup.string().required("Tên mã giảm giá không được để trống"),
  start_date: yup
    .date()
    .typeError("Ngày bắt đầu không được để trống")
    .max(yup.ref("end_date"), "Ngày bắt đầu phải trước ngày kết thúc"),
  end_date: yup
    .date()
    .typeError("Ngày kết thúc không được để trống")
    .min(yup.ref("start_date"), "Ngày kết thúc phải sau ngày bắt đầu"),
  discountValue: yup
    .mixed()
    .when("type", {
      is: (type) => type === TYPE_OPTION[0],
      then: yup
        .number()
        .typeError("Giá trị phần trăm phải là số")
        .min(0, "Giá trị phần trăm phải lớn hơn 0")
        .max(1, "Giá trị  phần trăm không được lớn hơn 1"),
    })
    .when("type", {
      is: (type) => type === TYPE_OPTION[1],
      then: yup
        .number()
        .typeError("Giá trị phải là số")
        .min(0, "Giá trị lớn hơn 0"),
    })
    .when("type", {
      is: (type) => type === TYPE_OPTION[2],
      then: yup.mixed().nullable(),
    }),
  maxValue: yup
    .mixed()
    .when("type", {
      is: (type) => type === TYPE_OPTION[0],
      then: yup
        .number()
        .typeError("Số tiền phải là số")
        .moreThan(
          yup.ref("discountValue"),
          "Số tiền giảm tối đa phải lớn hơn giá trị"
        ),
    })
    .test(
      "maxWhenFreeShipping",
      "Số tiền giảm tối đa phải lớn hơn giá trị",
      (value, context) => {
        if (value || value === 0) {
          return Number(value) > Number(context.parent.discountValue);
        } else return true;
      }
    ),
};

export const FormTableVoucher = ({ methods, watchForm }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <YlInputFormHook
              name={"name"}
              isRequired={true}
              label={"Tên mã giảm giá"}
              placeholder={"Tên mã giảm giá"}
              methods={methods}
            />
          </td>
          <td>
            <YlInputFormHook
              name={"start_date"}
              label={"Ngày bắt đầu"}
              type={"date"}
              methods={methods}
              isRequired
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="type" className="form-label">
              Cách giảm giá
              <span className="error-message"> (*)</span>
            </label>
            <select
              type="text"
              className="form-select"
              {...methods.register("type")}
            >
              {TYPE_OPTION.map((item, i) => (
                <option value={item} key={i}>
                  {item}
                </option>
              ))}
            </select>
          </td>
          <td>
            <YlInputFormHook
              name={"end_date"}
              label={"Ngày kết thúc"}
              type={"date"}
              methods={methods}
              isRequired
            />
          </td>
        </tr>
        <tr>
          <td>
            <YlInputFormHook
              name={"discountValue"}
              label={"Giá trị"}
              placeholder="0.5..."
              methods={methods}
              type={"number"}
              step={"any"}
              isRequired={watchForm.type && watchForm.type !== TYPE_OPTION[2]}
              disabled={watchForm.type === TYPE_OPTION[2]}
            />
          </td>
          <td>
            <YlInputFormHook
              name={"minSpentAmount"}
              label={"Số tiền thanh toán tối thiểu"}
              placeholder="Số tiền thanh toán tối thiểu"
              methods={methods}
              type={"number"}
            />
          </td>
        </tr>
        <tr>
          <td>
            <YlInputFormHook
              name={"maxValue"}
              label={"Số tiền giảm tối đa"}
              placeholder="Số tiền giảm tối đa"
              methods={methods}
              type={"number"}
              step={"any"}
              isRequired={watchForm.type === TYPE_OPTION[0]}
              disabled={
                watchForm.type === TYPE_OPTION[1] ||
                watchForm.type === TYPE_OPTION[2]
              }
            />
          </td>
          <td>
            <YlInputFormHook
              name={"minCheckoutItemsQuantity"}
              label={"Số lượng tối thiểu"}
              placeholder="Số lượng tối thiểu"
              methods={methods}
              type={"number"}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};
export default ManagerVoucherAddNew;
