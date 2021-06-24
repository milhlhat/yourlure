package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoOut.OrderDetailDtoOut;
import fpt.custome.yourlure.entity.Order;
import fpt.custome.yourlure.repositories.OrderRepos;
import fpt.custome.yourlure.service.OrderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepos orderRepos;

    @Autowired
    ModelMapper mapper;

    @Override
    public List<OrderDetailDtoOut> getAll(Pageable pageable) {
        List<OrderDetailDtoOut> results = new ArrayList<>();
        try {
            Page<Order> list = orderRepos.findAll(pageable);
            orderRepos.findAll(pageable);
            for (Order item : list) {
                OrderDetailDtoOut dtoOut = mapper.map(item, OrderDetailDtoOut.class);
                results.add(dtoOut);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return results;
    }

    @Override
    public Optional<OrderDetailDtoOut> getById(Long id) {
        try {
            Optional<Order> optional = orderRepos.findById(id);
            if (optional.isPresent()) {
                OrderDetailDtoOut result = mapper.map(optional.get(), OrderDetailDtoOut.class);
                return Optional.of(result);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Optional.empty();
    }

    @Override
    public Boolean remove(Long id) {
        try {
            orderRepos.deleteById(id);
        } catch (
                Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
