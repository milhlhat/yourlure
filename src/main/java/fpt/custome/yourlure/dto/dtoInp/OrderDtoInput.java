package fpt.custome.yourlure.dto.dtoInp;


import fpt.custome.yourlure.entity.CartItem;

import java.util.Date;
import java.util.List;

public class OrderDtoInput {

    public long id;
    public String name;
    private String address;
    private String phone;
    private String note;
    public String totalPrice;
    private Date orderDate;

    //Todo: cần check lại
    public List<CartItem> cartItems;
}
