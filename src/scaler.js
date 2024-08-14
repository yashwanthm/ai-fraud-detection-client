export default class StandardScaler {
    constructor(params) {
        this.mean = params.mean_;
        this.scale = params.scale_;
        this.withMean = params.with_mean;
        this.withStd = params.with_std;
    }

    transform(data) {
        if (data.length !== this.mean.length) {
            throw new Error("Input data does not match the number of features.");
        }

        return data.map((value, index) => {
            let transformedValue = value;

            if (this.withMean) {
                transformedValue -= this.mean[index];  // Subtract the mean
            }

            if (this.withStd) {
                transformedValue /= this.scale[index];  // Divide by the standard deviation (scale)
            }

            return transformedValue;
        });
    }
}

