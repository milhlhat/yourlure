package fpt.custome.yourlure.dto.dtoOut;

import fpt.custome.yourlure.entity.CartItem;
import fpt.custome.yourlure.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartDtoOut {

    private Long cartID;
    private Collection<CartItem> cartItemCollection;
    private User user;

}