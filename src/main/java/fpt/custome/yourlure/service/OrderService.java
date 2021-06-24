package fpt.custome.yourlure.service;

import fpt.custome.yourlure.dto.dtoInp.OrderDtoInput;

import javax.servlet.http.HttpServletRequest;

public interface OrderService {

    Boolean processOrder(HttpServletRequest rq, OrderDtoInput orderDto);
}
