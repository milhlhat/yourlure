package fpt.custome.yourlure.dto.dtoOut;

import fpt.custome.yourlure.entity.Payment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDtoOut {

    private Long orderID;
    private Date orderDate;
    private String address;
    private String phone;
    private String name;
    private String note;
    private Payment payment;
}
