import { AbilityContext } from "authorization/can";
import CartAPI from "api/user-cart-api";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCartGuest } from "store/cart/cart-guest";
import { convertToVND } from "utils/format-string";
import YLButton from "../../custom-field/YLButton";
import { toast } from "react-toastify";
import { createImageUrlByLinkOrFile } from "utils/manager-product";
import { CircularProgress } from "@material-ui/core";

function ProductAction(props) {
  const { product, setBigImgLink, productCustomize } = props;
  const ability = useContext(AbilityContext);
  const isLoggedIn = ability.can("login", "website");
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState();
  const [customize, setcustomize] = useState();
  const [variantName, setVariantName] = useState();
  const [variantImg, setVariantImg] = useState();
  const [price, setPrice] = useState();

  const [takeOut, setTakeOut] = useState(
    product?.variantCollection[0]?.quantity>50?50:product?.variantCollection[0]?.quantity
  );
  // let takeOut = 0;
  const { register, getValues, setValue } = useForm();
  const history = useHistory();
  const decrement = () => {
    if (takeOut === 0) {
      setQuantity(1);
      toast.error("Sản phẩm đang hết hàng");
    } else {
      Number(quantity) <= 1
        ? setQuantity(1)
        : setQuantity(Number(quantity) - 1);
    }
  };
  const increment = () => {
    if (takeOut === 0) {
      setQuantity(1);
      toast.error("Sản phẩm đang hết hàng");
    } else {
      Number(quantity) >= takeOut
        ? setQuantity(takeOut)
        : setQuantity(Number(quantity) + 1);
    }
    // setQuantity(Number(quantity) + 1);
    // alert(Number(quantity) >= Number(takeOut))
  };
  // function handleChooseColor(index) {
  //   setColor(index);
  // }
  function handleChangePrice(value) {
    setPrice(value ? value : product.defaultPrice);
  }
  const dispatch = useDispatch();

  const handlePayNow = async () => {
    let data = {
      customModelId: customize ? customize.customizeId : null,
      productId: product.productId,
      productName: product.productName,
      quantity: quantity,
      variantId: color,
      price: price,
      variantName: variantName,
      weight: getValues("weight"),
      variantImg: variantImg,
      thumbnailUrl: customize ? customize.thumbnailUrl : null,
    };
    if (
      (product.maxWeight && data.weight > product.maxWeight) ||
      (product.minWeight && data.weight < product.minWeight)
    ) {
      toast.warning("Độ nặng không phù hợp, vui lòng chỉnh lại độ nặng");
      setValue("weight", product.defaultWeight);
    } else {
      //sent to payment
      history.push({ pathname: "/cart/payment", cart: [data] });
    }
  };
  const [addCart, setAddCart] = useState(false);
  const handleAddToCart = async () => {
    setAddCart(true);
    let data = {
      customModelId: customize ? customize.customizeId : null,
      // productId: product.productId,
      quantity: quantity,
      variantId: color,
      // price: price,
      // variantName: variantName,
      weight: Number(getValues("weight")),
      // variantImg: variantImg,
    };

    if (
      (product.maxWeight && data.weight > product.maxWeight) ||
      (product.minWeight && data.weight < product.minWeight)
    ) {
      toast.warning(
        `Vui lòng chọn độ nặng trong khoảng ${Number(
          product.minWeight
        )} - ${Number(product.maxWeight)}`
      );
      setValue("weight", product.defaultWeight);
      setAddCart(false);
    } else {
      if (isLoggedIn) {
        //add customize product to cart
        if (data.customModelId) {
          try {
            const response = await CartAPI.addCustomize(data);

            if (response.error) {
              throw new Error(response.error);
            } else {
              toast.success(`Đã thêm${data.quantity} sản phẩm vào giỏ hàng.`);
            }
          } catch (error) {
            toast.error(error.response.data);
            console.log("fail to fetch add category");
          }
        }
        //add variant to cart
        else {
          try {
            const response = await CartAPI.addVariant(data);

            if (response.error) {
              throw new Error(response.error);
            } else {
              toast.success(`Đã thêm${data.quantity} sản phẩm vào giỏ hàng.`);
            }
          } catch (error) {
            toast.error(error.response.data);
            console.log("fail to fetch add category");
          }
        }
      } else {
        data = { ...data, productName: product.productName };
        const action = setCartGuest(data);
        dispatch(action);
        toast.success(`Đã thêm${data.quantity} sản phẩm vào giỏ hàng.`);
      }
      setQuantity(1);
      setAddCart(false);
    }
  };

  useEffect(() => {
    setColor(
      product?.variantCollection[0]
        ? product.variantCollection[0].variantId
        : ""
    );
    setValue("weight", product?.defaultWeight);
    setColor(product?.variantCollection[0]?.variantId);
    setVariantImg(product?.variantCollection[0]?.imageUrl);
    setVariantName(product?.variantCollection[0]?.variantName);
    if (product) {
      handleChangePrice(
        product?.variantCollection[0]?.newPrice
          ? product?.variantCollection[0]?.newPrice
          : product?.defaultPrice
      );
    }
  }, [product]);
  return (
    <div className="bg-white bg-shadow product-action p-4">
      <h1 className="title">
        {product == null ? "name" : product.productName}
      </h1>
      <h2 className="price primary-color">
        {product == null ? "price" : convertToVND(price)}
      </h2>
      <div className="tab py-3">
        <div className="buy-tab">
          <span>MUA HÀNG</span>
        </div>
        <div className="detail-tab ">
          <a href="#more-description">CHI TIẾT</a>
        </div>
      </div>
      <div className="product-description">
        {product ? product.description : ""}
      </div>
      <hr />
      <div className="product-parameter  ">
        <h4>Thông số:</h4>
        <table className={"table-param"}>
          <tr>
            <th>Chiều dài:</th>
            <td className={"ps-3"}>{product ? product.length : ""} cm</td>
          </tr>{" "}
          <tr>
            <th>Trọng lượng(g): </th>
            <td className={"ps-3"}>
              {" "}
              {!product?.maxWeight || !product?.minWeight ? (
                product?.defaultWeight + "(g)"
              ) : (
                <input
                  id={"weight"}
                  {...register("weight")}
                  type="number"
                  defaultValue={product?.defaultWeight}
                  min={product ? product.minWeight : ""}
                  max={product ? product.maxWeight : ""}
                  className={"form-control input-weight"}
                />
              )}
            </td>
          </tr>{" "}
          <tr>
            <th>Lặn sâu:</th>
            <td className={"ps-3"}>{product ? product.deepDiving : ""}</td>
          </tr>
        </table>
      </div>
      <hr />
      <div className="product-choose-color">
        <div className={"d-flex align-items-center"}>
          <h4>Mã màu:</h4> <p className={"m-0 ms-2"}> {variantName}</p>
        </div>
        <div className="choose-color">
          {product?.variantCollection?.map((value, index) => (
            <div
              key={index}
              className={`box-choose `}
              onClick={() => {
                setColor(product?.variantCollection[index]?.variantId);
                setVariantImg(product?.variantCollection[index]?.imageUrl);
                setVariantName(product?.variantCollection[index]?.variantName);
                handleChangePrice(
                  product.variantCollection[index].newPrice
                    ? product.variantCollection[index].newPrice
                    : null
                );
                setBigImgLink(product?.variantCollection[index]?.imageUrl);
                setcustomize(null);
                setTakeOut(product.variantCollection[index].quantity>50?50:product.variantCollection[index].quantity);
              }}
            >
              <div
                className={`box-color m-1 ${value.variantId} ${
                  product.variantCollection[index].variantId == color
                    ? "clicked-color"
                    : ""
                }`}
              >
                <img
                  src={createImageUrlByLinkOrFile(
                    product.variantCollection[index].imageUrl
                      ? product.variantCollection[index].imageUrl
                      : product.imageCollection[0].linkImage
                  )}
                />
              </div>
              {/* <span className="d-none">
                {product.variantCollection[index].variantId == color
                  ? (setTakeOut(product.variantCollection[index].quantity))
                  : ""}
              </span> */}
            </div>
          ))}
          {productCustomize?.list?.map((item, i) => (
            <div
              key={i}
              className={`box-choose `}
              onClick={() => {
                handleChangePrice(item.customPrice + product?.defaultPrice);
                setColor(null);
                setcustomize(item);
                setBigImgLink(item?.thumbnailUrl);
                setPrice(item.customPrice + product?.defaultPrice);
                setVariantName(item.name);
                setTakeOut(50);
              }}
            >
              {/* <span className="d-none">{(takeOut = 100)}</span> */}
              <div
                className={`box-color m-1 ${
                  item.customizeId === customize?.customizeId
                    ? "clicked-color"
                    : ""
                }`}
              >
                <img
                  src={createImageUrlByLinkOrFile(item?.thumbnailUrl)}
                  alt="ảnh sản phẩm"
                />
              </div>
            </div>
          ))}
        </div>
        <span>
          {!customize ? (
            product?.visibleInStorefront !== false ? (
              takeOut <= 0 ? (
                <span className="text-danger bold">Hết hàng</span>
              ) : (
                "còn " + takeOut + " sản phẩm"
              )
            ) : (
              <span className="text-danger bold">Ngừng kinh doanh</span>
            )
          ) : (
            "Sản phẩm tùy biến của bạn"
          )}
        </span>
      </div>
      {product?.visibleInStorefront && (
        <div className="product-quantity mt-4 row">
          <h5>Số lượng:</h5>
          <div className="product-details-quantity d-flex">
            <button className="quantity-input" onClick={decrement}>
              <i className="fal fa-minus" />
            </button>
            <input
              {...register("quantity")}
              type="number"
              className="input-quickview"
              value={quantity}
              required
            />
            <button className="quantity-input" onClick={increment}>
              <i className="fal fa-plus" />
            </button>
          </div>
        </div>
      )}

      <div className="product-buy mt-5">
        <div onClick={() => handlePayNow()}>
          <YLButton
            variant="light"
            type="button"
            disabled={takeOut <= 0 || !product?.visibleInStorefront || addCart}
          >
            Mua ngay
          </YLButton>
        </div>
        <div onClick={() => handleAddToCart()}>
          <YLButton
            variant="primary"
            type="button"
            disabled={takeOut <= 0 || !product?.visibleInStorefront || addCart}
          >
            Thêm vào giỏ hàng{" "}
            {addCart && (
              <CircularProgress size={15} className="circle-progress" />
            )}
          </YLButton>
        </div>
      </div>
    </div>
  );
}

export default ProductAction;
