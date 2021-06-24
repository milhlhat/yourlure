package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.OrderDtoInput;
import fpt.custome.yourlure.entity.Order;
import fpt.custome.yourlure.entity.Payment;
import fpt.custome.yourlure.entity.User;
import fpt.custome.yourlure.repositories.PaymentRepos;
import fpt.custome.yourlure.repositories.UserRepos;
import fpt.custome.yourlure.security.JwtTokenProvider;
import fpt.custome.yourlure.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private UserRepos userRepos;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PaymentRepos paymentRepos;

    @Override
    public Boolean processOrder(HttpServletRequest rq, OrderDtoInput orderDto) {
        User user = userRepos.findByPhone(jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(rq)));
        Optional<Payment> payment = paymentRepos.findById(orderDto.getPaymentId());

        Order order = Order.builder()
                .orderDate(new Date())
                .address(orderDto.getAddress())
                .name(user.getUsername())
                .note(orderDto.getNote())
                .payment(payment.orElse(null))
                .discountVoucher(orderDto.getDiscountCode())
                .phone(orderDto.getPhone())
                .build();
        return false;

    }
}
