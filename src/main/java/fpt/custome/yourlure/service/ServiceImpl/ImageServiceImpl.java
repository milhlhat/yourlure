package fpt.custome.yourlure.service.ServiceImpl;

import fpt.custome.yourlure.dto.dtoInp.ImageDtoInput;
import fpt.custome.yourlure.entity.Campaign;
import fpt.custome.yourlure.entity.Image;
import fpt.custome.yourlure.entity.Product;
import fpt.custome.yourlure.repositories.ImageRepos;
import fpt.custome.yourlure.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

//TODO: xóa khi chốt
@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    private ImageRepos imageRepos;

    @Transactional
    @Override
    public Optional<Object> addImage(ImageDtoInput imageDtoInput) {
        try {
            Image image = Image.builder()
                    .linkImage(imageDtoInput.getLinkImage())
                    .product(Product.builder().productId(imageDtoInput.getProductId()).build())
                    .campaign(Campaign.builder().campaignId(imageDtoInput.getCampaignId()).build())
                    .build();
            imageRepos.save(image);
            return Optional.of("Thêm ảnh thành công");
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.of("Thêm ảnh thất bại");
        }
    }

    @Override
    public Optional<Object> delete(Long imageId) {
       try {
           imageRepos.deleteById(imageId);
           return Optional.of("Xóa ảnh thành công");
       }catch (Exception e){
           e.printStackTrace();
           return Optional.of("Xóa ảnh thất bại");
       }
    }

    @Override
    public Optional<Object> update(ImageDtoInput imageDtoInput, Long idProduct) {
        try {
            Image image = imageRepos.getById(idProduct);
            if (image != null){
                Image imgInput = Image.builder()
                        .linkImage(imageDtoInput.getLinkImage())
                        .product(Product.builder().productId(imageDtoInput.getProductId()).build())
                        .campaign(Campaign.builder().campaignId(imageDtoInput.getCampaignId()).build())
                        .build();
                imgInput.setImageId(idProduct);
                imageRepos.save(imgInput);
                return Optional.of("Cập nhật ảnh thành công");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.of("Cập nhật ảnh thất bại");
        }
        return Optional.of("Cập nhật ảnh thất bại");
    }
}
