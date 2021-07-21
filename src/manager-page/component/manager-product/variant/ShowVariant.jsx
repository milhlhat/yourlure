import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import YLButton from "../../../../components/custom-field/YLButton";
import { createImageUrlByLinkOrFile } from "../../../../utils/manager-product";
import DEFINELINK from "../../../../routes/define-link";
import { deleteVariant } from "../../../../api/manager-variant-api";
import { getProductByID } from "../../../../api/manager-product-api";
import ConfirmPopupV2 from "../../../../components/confirm-popup/ConfirmPopupV2";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function ShowVariant(props) {
  const { productId } = props;
  const location = useLocation();
  const currentLocation = location.pathname + location.search + location.hash;
  const editVariantPath = `${
    DEFINELINK.manager + DEFINELINK.product + DEFINELINK.managerVariantEdit
  }?productId=${productId}&variantId=`;
  const addVariantPath =
    DEFINELINK.manager +
    DEFINELINK.product +
    "/add-variant-by-product-id/" +
    productId;
  const methods = useForm();
  const { control } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variantCollection",
  });
  const handleDeleteVariant = async (variantId) => {
    try {
      await deleteVariant(productId, variantId);
      await fetchVariantByProductId(productId);
      toast.success("Xoá thành công");
    } catch (error) {
      const stt = error.response.status;
      if (stt === 422) {
        toast.warning(error.response.data);
      } else toast.error("Xoá thất bại");
    }
  };

  const fetchVariantByProductId = async (id) => {
    remove();
    const productRes = await getProductByID(id);
    append(productRes.variantCollection);
  };
  useEffect(() => {
    fetchVariantByProductId(productId);

    return async () => {
      await fetchVariantByProductId(productId);
    };
  }, [productId]);

  return (
    <div className="product-info bg-white bg-shadow col-12 col-md-8 mb-md-5 mb-2 pb-5">
      <div className="ps-3 pe-2 pt-3 d-flex justify-content-between align-content-center">
        <h5>
          Biến thể <span className="error-message"> (*)</span>
        </h5>
        <YLButton
          variant={"link"}
          to={{
            pathname: addVariantPath,
            state: { parentPath: currentLocation, productId: productId },
          }}
        >
          <h6>
            <i className="fas fa-tasks-alt" /> Thêm biến thể
          </h6>
        </YLButton>
      </div>

      {/*</div>*/}
      <hr />
      <table className={"table-variant"}>
        <thead>
          <tr>
            <td>Ảnh</td>
            <td>Tên biến thể</td>
            <td>Giá</td>
            <td>Số lượng</td>
            <td>Sửa</td>
            <td>Xoá</td>
          </tr>
        </thead>
        <tbody>
          {fields?.map(
            (
              { id, quantity, variantName, newPrice, imageUrl, variantId },
              index
            ) => (
              <tr key={id}>
                <td>
                  <img
                    src={createImageUrlByLinkOrFile(imageUrl)}
                    key={index}
                    alt={"Mồi"}
                    className={"mb-2"}
                  />
                </td>

                <td>{variantName}</td>
                <td>{newPrice}</td>
                <td>{quantity}</td>
                <td>
                  <Link
                    to={{
                      pathname: editVariantPath + variantId,
                      state: {
                        parentPath: currentLocation,
                        productId: productId,
                        variantId: variantId,
                      },
                    }}
                  >
                    <i className="fad fa-pencil-alt text-success pointer" />
                  </Link>
                </td>
                <td>
                  <ConfirmPopupV2
                    onConfirm={() => handleDeleteVariant(variantId)}
                    title={"Xoá biến thể"}
                    content={`Chắc chắn xoá: ${variantName}?`}
                  >
                    <i className="fal fa-trash-alt pointer text-danger" />
                  </ConfirmPopupV2>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ShowVariant;
