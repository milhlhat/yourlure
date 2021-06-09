package fpt.custome.yourlure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class MySwaggerConfig {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
//                .paths(paths())
                .build()
                .apiInfo(apiEndPointsInfo());
    }

    private ApiInfo apiEndPointsInfo() {
        return new ApiInfoBuilder().title("YourLure REST API")
                .description("Mồi Lure Management REST API")
                .contact(new Contact("sonph", "facebook.com/sn.pham.3", "https://www.facebook.com/messages/t/100008052330586"))
                .version("1.0.0")
                .build();
    }

//    private Predicate<String> paths() {
//        return or(
//                regex("/product.*"),
//                regex("/order.*"),
//                regex("/cart.*"),
//                regex("/cart.*"));
//    }
}
