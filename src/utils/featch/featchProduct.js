let FetchProduct = {
	getProductById: (id) => {
        let rs={
            data:null,
            isLoading:false,
            success:true,
        }
        try {
            rs={ ...rs, isLoading: true };
            const response = await ProductAPI.getProductByID(id);
            if (response.error) {
              rs={ ...rs, isLoading: false };
              throw new Error(response.error);
            } else {
              rs({
                data: response,
                isLoading: true,
                success: true,
              });
            }
          } catch (error) {
            console.log("fail to fetch customer list");
          }
	},
};
export const { } = FetchProduct;
export default FetchProduct;