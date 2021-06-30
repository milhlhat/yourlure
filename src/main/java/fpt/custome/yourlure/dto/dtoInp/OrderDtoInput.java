package fpt.custome.yourlure.dto.dtoInp;


import fpt.custome.yourlure.entity.CartItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDtoInput {

    private String receiverName;
    private String address;
    private String phone;
    private String note;
    private Date orderDate;
    private Long paymentId;

    public String discountCode;
    public List<CartItem> cartItems;
}
