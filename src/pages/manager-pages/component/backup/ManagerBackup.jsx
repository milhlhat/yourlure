import React, { useEffect, useState } from "react";
import {
  deleteBackup,
  getAllBackup,
  requestBackup,
  restoreBackupVersion,
} from "../../../../api/manager-backup-api";
import YLButton from "../../../../components/custom-field/YLButton";
import ConfirmPopupV2 from "../../../../components/confirm-popup/ConfirmPopupV2";
import Trash from "../../../../assets/icon/trash.svg";
import "./scss/manager-backup.scss";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";

ManagerBackup.propTypes = {};

function ManagerBackup(props) {
  const [backups, setBackups] = useState({
    list: [],
    isLoading: true,
    isSuccess: false,
  });
  const [isCreate, setIsCreate] = useState(false);
  const VIEW_STEP = 12;
  const [numberOfView, setNumberOfView] = useState(VIEW_STEP);
  const handleLoadMore = () => {
    if (backups.list?.length > numberOfView) {
      setNumberOfView((prevState) => prevState + VIEW_STEP);
    }
  };
  const createBackup = async () => {
    try {
      setIsCreate(true);
      await requestBackup();
      await fetchAllBackup();

      setIsCreate(false);

      toast.success("Tạo bản sao lưu thành công");
    } catch (e) {
      setIsCreate(false);

      toast.error("Tạo bản sao lưu thất bại");
    }
  };
  const fetchDeleteBackup = async (fileName) => {
    try {
      const res = await deleteBackup(fileName);
      await fetchAllBackup();
      toast.success(res);
    } catch (e) {
      toast.error(e.response.data);
    }
  };
  const restoreBackup = async (fileName) => {
    try {
      const res = await restoreBackupVersion(fileName);
      toast.success(res);
    } catch (e) {
      toast.error(e.response.data);
    }
  };
  const fetchAllBackup = async () => {
    try {
      const response = await getAllBackup();
      setBackups({ list: response, isLoading: false, isSuccess: true });
    } catch (e) {
      setBackups({ list: [], isLoading: false, isSuccess: false });
    }
  };
  useEffect(() => {
    fetchAllBackup();
  }, []);
  return (
    <div className={"bg-box"}>
      <div className={"float-end mb-3 mt-2"}>
        <YLButton
          variant={"primary"}
          className={"ms-auto"}
          onClick={createBackup}
          disabled={isCreate}
        >
          {isCreate ? (
            <CircularProgress size={20} className="circle-progress" />
          ) : (
            "Tạo bản sao lưu"
          )}
        </YLButton>
      </div>

      <table className={"table table-responsive"}>
        <thead>
          <tr className={"primary-color"}>
            <th>#</th>
            <th>Bản sao lưu</th>
            <th className={"action-column"} />
            <th className={"action-column"} />
          </tr>
        </thead>
        <tbody>
          {backups.list?.slice(0, numberOfView).map((item, i) => (
            <tr className={" "}>
              <td className={"align-middle"}>{i + 1}</td>
              <td>{item}</td>
              <td
                className={"pointer align-middle"}
                onClick={(e) => e.stopPropagation()}
              >
                <ConfirmPopupV2
                  onConfirm={() => restoreBackup(item)}
                  title={"Khôi phục"}
                  content={
                    "Tất cả liệu của website sẽ chuyển về thời gian tạo bản khôi phục"
                  }
                >
                  <i className="fad fa-cloud-download-alt text-warning" />
                </ConfirmPopupV2>
              </td>
              <td
                className={"pointer align-middle"}
                onClick={(e) => e.stopPropagation()}
              >
                <ConfirmPopupV2
                  onConfirm={() => fetchDeleteBackup(item)}
                  title={"Xoá sản phẩm"}
                  content={"Chắc chắn xoá: " + item}
                >
                  <img src={Trash} />
                </ConfirmPopupV2>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={"d-flex justify-content-center"}>
        {backups.list?.length > numberOfView && (
          <YLButton
            variant={"outline-primary"}
            type={"button"}
            onClick={() => handleLoadMore()}
          >
            <i className="fad fa-angle-double-down" /> &nbsp; Tải thêm
          </YLButton>
        )}
      </div>
    </div>
  );
}

export default ManagerBackup;
