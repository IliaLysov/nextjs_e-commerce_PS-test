export default class YCUploadDto {
    key: string = ''
    location: string = ''

    constructor(model: any) {
        this.key = model.Key
        this.location = model.Location
    }
}