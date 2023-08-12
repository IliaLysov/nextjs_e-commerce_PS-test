'use client'

import {useState, Fragment, useEffect} from 'react'
import { CompanyEnum, CompanyInterface, CompanyFormInterface } from '@/types/company'
import styles from './styles.module.scss'

import { Formik, Form, Field } from 'formik'
import { TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/app/store'
import * as Yup from 'yup'
import { companyFormErrorSelector, companyRegistrationPost, setCompanyFormError } from '@/modules'

export default function CompanyForm() {
    const dispatch = useAppDispatch()
    const [uploadErrors, setUploadErrors] = useState<string[]>([])

    const companyFormError = useAppSelector(companyFormErrorSelector)

    useEffect(() => {
        dispatch(setCompanyFormError(''))
    }, [])

    const submitHandler = (e: CompanyFormInterface) => {
        dispatch(companyRegistrationPost(e))
    }

    const companyFormSchema = Yup.object().shape({
        name: Yup.string()
            .min(1, 'Слишком короткое имя')
            .max(40, 'Слишком длинное имя')
            .required('Обязательный параметр'),
        latinName: Yup.string()
            .min(1, 'Слишком короткое имя')
            .max(40, 'Слишком длинное имя')
            .matches(/^[a-zA-Z- ]*$/, 'Поле должно быть заполнено латиницей')
            .required('Обязательный параметр'),
        description: Yup.string()
            .max(600, 'Слишком длинное описание'),
        email: Yup.string()
            .email('Неправильный email')
            .required('Обязательный параметр'),
        site: Yup.string()
            .url('Должно соответствовать примеру - https://plant-store.ru')
    })

    const initialValues: CompanyFormInterface = {
        name: '',
        latinName: '',
        description: '',
        email: '',
        site: '',
        whatsApp: '',
        telegram: '',
        logo: null,
    }

    const handleImageUpload = async (e: any, setFieldValue: any) => {
        setUploadErrors([])

        const filePromises = Object.values(e.target.files).map((file: any) => {
            return new Promise((resolve, reject) => {
                    if (file) {
                        const reader = new FileReader()
                        reader.onloadend = () => {
                            const image: any = new Image()
                            image.src = reader.result
        
                            image.onload = () => {
                                const {width, height} = image
                                const calculatedAspectRatio = width / height
                                if (calculatedAspectRatio !== 1) {
                                    setUploadErrors(prev => [...prev, `Изображение ${file.name} должно быть квадратным (1:1)`])
                                    resolve('')
                                } else if (width > 800) {
                                    setUploadErrors(prev => [...prev, `Изображение ${file.name} должно быть меньше 800 x 800 px`])
                                    resolve('')
                                } else {
                                    resolve(file)
                                }
                            }
                        }
                        reader.readAsDataURL(file)
                    }
                })

        })

        const resultsArray = await Promise.all(filePromises)
        const imagesArray: any = resultsArray.filter(e => e !== '')
        // console.log('imagesArray', imagesArray)
        let dataTransfer = new DataTransfer()


        for (let i = 0; i < imagesArray.length; i++) {

            dataTransfer.items.add(imagesArray[i])
        }
        const imagesObj = dataTransfer.files.length > 0 ? dataTransfer.files : null
        // console.log('imagesObj', imagesObj)

        setFieldValue("logo", imagesObj)
    }

    const InputWrapper = ({field, form, ...props}: any) => {
        return <TextField fullWidth variant="outlined" size="small" {...field} {...props} />
    }

    return (
        <Formik
            onSubmit={submitHandler}
            initialValues={initialValues}
            validationSchema={companyFormSchema}
        >
            {({handleSubmit, setFieldValue, values, touched, errors, isValid}) => {
                return (
                    <Form onSubmit={handleSubmit} className={styles.form}>
                        <h2 className={styles.title}>Регистрация питомника</h2>
                        <div className={styles.container}>
                            <div className={styles.top}>
                                <div className={styles.block}>
                                    <div className={styles.input}>
                                        <Field type='text' name={CompanyEnum.name} label='Имя питомника' error={touched.name && Boolean(errors.name)} helperText={touched.name && errors.name} component={InputWrapper}/>
                                    </div>
                                    <div className={styles.input}>
                                        <Field type='text' name={CompanyEnum.latinName} label='Имя питомника латиницей' error={touched.latinName && Boolean(errors.latinName)} helperText={touched.latinName && errors.latinName} component={InputWrapper}/>
                                    </div>
                                </div>
                                <div className={styles.logo}>
                                    {values.logo && <div className={styles.imageDeleteBtn} onClick={() => setFieldValue('logo', null)}></div>}
                                    <label htmlFor="images" className={styles.logoLabel}>
                                        {values.logo && typeof values.logo === 'object' ? (
                                                (Object.values(values.logo).map((image: any, index) => (
                                                    <Fragment key={index}>
                                                        <img src={URL.createObjectURL(image)} alt='img' className={styles.uploadedImg}/>
                                                    </Fragment>
                                                )))
                                            )
                                            :
                                            <div className={styles.logoText}>Загрузить логотип</div>
                                        }
                                    </label>
                                    <input type='file' name='images' id='images' className={styles.inputFile} onChange={(e) => handleImageUpload(e, setFieldValue)}/>
                                </div>
                            </div>
                            <div className={styles.uploadErrors}>{uploadErrors.join(' ')}</div>
                            <div className={styles.input}>
                                <Field type='text' name={CompanyEnum.email} label='Электронная почта питомника' error={touched.email && Boolean(errors.email)} helperText={touched.email && errors.email} component={InputWrapper}/>
                            </div>
                            <div className={styles.input}>
                                <Field type='text' name={CompanyEnum.site} label='Сайт питомника' error={touched.site && Boolean(errors.site)} helperText={touched.site && errors.site} component={InputWrapper}/>
                            </div>
                            <div className={styles.horizon}>
                                <p className={styles.contactsDescriptioon}>Если вы хотите получать уведомления в месседжере о взаимодействии пользователей с вашими товарами, заполнито одно или оба следующих поля</p>
                                <div className={styles.block}>
                                    <div className={styles.input}>
                                        <Field type='text' name={CompanyEnum.telegram} label='Telegram' error={touched.telegram && Boolean(errors.telegram)} helperText={touched.telegram && errors.telegram} component={InputWrapper}/>
                                    </div>
                                    <div className={styles.input}>
                                        <Field type='text' name={CompanyEnum.whatsApp} label='WhatsApp' error={touched.whatsApp && Boolean(errors.whatsApp)} helperText={touched.whatsApp && errors.whatsApp} component={InputWrapper}/>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.input}>
                                <Field type='text' name={CompanyEnum.description} label='Описание' multiline rows={4} error={touched.description && Boolean(errors.description)} helperText={touched.description && errors.description} component={InputWrapper}/>
                            </div>
                        </div>
                        <div className={styles.error}>{companyFormError}</div>
                        <button type='submit' className={[styles.submitBtn, isValid && styles.disable].join(' ')}>Подать заявку</button>
                    </Form>
                )
            }}

        </Formik>
    )
}