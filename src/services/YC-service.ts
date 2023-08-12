import EasyYandexS3 from 'easy-yandex-s3'

const s3 = new EasyYandexS3({
    auth: {
        accessKeyId: process.env.YANDEX_CLOUD_ID as string,
        secretAccessKey: process.env.YANDEX_CLOUD_KEY as string
    },
    Bucket: 'plant-store',
    debug: false
})

export default s3