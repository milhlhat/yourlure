let FormatUtils = {
	convertToVND: (num) => {
        let result = Number(num).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }) + "\u20AB";
		return result;
	},
};
export const {convertToVND } = FormatUtils;
export default FormatUtils;
