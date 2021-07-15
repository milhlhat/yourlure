package fpt.custome.yourlure.dto.dtoInp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderUserDtoInput {

    @NotNull
    private String address;
    @NotNull
    @Size(min = 10, max = 10, message = "phone number just contains 10 characters")
    @NotBlank(message = "phone can not contains black character!")
    private String phone;
    @NotNull
    private String receiverName; //this is receiver name
    private String note;
    private Long paymentId;

    public String discountCode;
    public List<Long> cartItemIds;
}
