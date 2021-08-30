import { yupResolver } from "@hookform/resolvers/yup";
import ManagerVoucherAPI from "api/manager-voucher";
import YLButton from "components/custom-field/YLButton";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import "./scss/manager-add-new-voucher.scss";
import {
  FormTableVoucher,
  VOUCHER_VALIDATE_SCHEMA,
} from "./ManagerVoucherAddNew";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import { addDays } from "utils/format-string";

function ManagerVoucherEdit(props) {
  const voucherId = props.match.params.id;
  const history = useHistory();

  const schema = yup.object().shape(VOUCHER_VALIDATE_SCHEMA);

  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const {
    formState: { isSubmitting },
    handleSubmit,
    watch,
    reset,
  } = methods;
  const watchForm = watch();
  const fetchVoucher = async () => {
    try {
      const response = await ManagerVoucherAPI.getById(voucherId);
      response.start_date = response?.start_date.substr(0, 10);
      response.end_date = response?.end_date.substr(0, 10);
      reset(response);
    } catch (error) {
      toast.error("Lấy thông tin mã giảm giá thất bại");
    }
  };
  useEffect(() => {
    fetchVoucher();
  }, [voucherId, reset]);

  const onSubmit = async (data) => {
    data.end_date= addDays(data.end_date,1);
    data.start_date= addDays(data.start_date,1);
    if (data.type == "Free Ship") data.discountValue = 0;
    try {
      await ManagerVoucherAPI.update(data, voucherId);
      toast.success("Sửa mã giảm giá thành công");
      history.push("/manager/voucher");
    } catch (error) {
      toast.error("Sửa mã giảm giá thất bại");
    }
  };

  return (
    <div>
      <h3>Sửa mã giảm giá</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="add-new-form row">
          <div className="bg-box bg-shadow col-12 my-3 pb-5">
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

export default ManagerVoucherEdit;
