'use client'

import React, {useState, useEffect} from 'react'
import styles from './styles.module.scss'
import { Formik, Form, Field } from 'formik'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { addOnePlantPost, deleteProductPost, productFormErrorSelector, updateProductPost } from '@/modules'
import { options } from './options'
import { InputField, AutocompleteInputField } from '@/components/formik'

export default function PlantForm({currentItem}: any) {
    const dispatch = useAppDispatch()

    const responseError = useAppSelector(productFormErrorSelector)

    const [deleteImages, setDeleteImages] = useState<string[]>([])
    const [uploadErrors, setUploadErrors] = useState<string[]>([])

    
    const submitHandler = (e: any) => {
        if (currentItem) {
            e.id = currentItem.id
            dispatch(addOnePlantPost(e))
        } else {
            dispatch(addOnePlantPost(e))
        }
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
                                } else if (width > 1000) {
                                    setUploadErrors(prev => [...prev, `Изображение ${file.name} должно быть меньше 1000 x 1000 px`])
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
        console.log('imagesArray', imagesArray)
        let dataTransfer = new DataTransfer()


        for (let i = 0; i < imagesArray.length; i++) {

            dataTransfer.items.add(imagesArray[i])
        }
        const imagesObj = dataTransfer.files
        console.log('imagesObj', imagesObj)

        setFieldValue("images", imagesObj)
        // setFieldValue("images", e.target.files)
    }

    return (
        <Formik
                onSubmit={submitHandler}
                // initialValues={{
                //     name: '', images: '', description: '',
                //     price: '', quantity: '', rootPacking: null, packageType: null, packageCount: '', seedlingHight: '', seedlingWidth: '', seedTrunkHeight: '', seedTrunkGirth: '',
                //     plantType: [], leafType: null, frostResistance: null, lightLevel: null, crownShape: [], floweringPeriod: [], careFeature: [], soil: [], deseaseResistance: null, permanentLeafColor: [], autumnLeafColor: [], flowerColor: [], trunkColor: [], plantHeight: '', plantWidth: '', plantTrunkHeight: '', plantTrunkGirth: '',
                // }}
                initialValues={{
                    name: currentItem?.name || '',
                    latinName: currentItem?.latinName || '',
                    oldImages: currentItem?.images || [],
                    images: [],
                    description: currentItem?.description || '',
                    price: currentItem?.price || '',
                    quantity: options.quantity.find(u => u.value === currentItem?.quantity) || null,
                    rootPacking: options.rootPackages.find(u => u.value === currentItem?.rootPacking) || null,
                    packageType: options.packageTypes.find(u => u.value === currentItem?.packageType) || null,
                    packageCount: currentItem?.packageCount || '', seedlingHight: currentItem?.seedlingHight || '',
                    seedlingWidth: currentItem?.seedlingWidth || '', seedTrunkHeight: currentItem?.seedTrunkHeight || '',
                    seedTrunkGirth: currentItem?.seedTrunkGirth || '',
                    plantType: options.plantTypes.filter(u => currentItem?.plantType.includes(u.value)) || null,
                    leafType: options.leafTypes.find(u => u.value === currentItem?.leafType) || null,
                    frostResistance: options.frostResistances.find(u => u.value === currentItem?.frostResistance) || null,
                    lightLevel: options.lightLevels.find(u => u.value === currentItem?.lightLevel) || null,
                    crownShape: options.crownShapes.filter(u => currentItem?.crownShape.includes(u.value)) || null,
                    floweringPeriod: options.months.filter(u => currentItem?.floweringPeriod.includes(u.value)) || null,
                    careFeature: options.careFeatures.filter(u => currentItem?.careFeature.includes(u.value)) || null,
                    soil: options.soils.filter(u => currentItem?.soil.includes(u.value)) || null,
                    deseaseResistance: options.deseaseResistances.find(u => u.value === currentItem?.deseaseResistance) || null,
                    permanentLeafColor: options.colors.filter(u => currentItem?.permanentLeafColor.includes(u.value)) || null,
                    autumnLeafColor: options.colors.filter(u => currentItem?.autumnLeafColor.includes(u.value)) || null,
                    flowerColor: options.colors.filter(u => currentItem?.flowerColor.includes(u.value)) || null,
                    trunkColor: options.colors.filter(u => currentItem?.trunkColor.includes(u.value)) || null,
                    plantHeight: currentItem?.plantHeight || '',
                    plantWidth: currentItem?.plantWidth || '',
                    plantTrunkHeight: currentItem?.plantTrunkHeight || '',
                    plantTrunkGirth: currentItem?.plantTrunkGirth || '',
                }}
                // initialValues={{
                //     name: 'saad', images: [], description: 'afsd', oldImages: currentItem?.images || [],
                //     price: 123, quantity: 12, rootPacking: {value: 'closed', label: 'Закрытая'}, packageType: {value: 'container', label: 'Контейнер'}, packageCount: 12, seedlingHight: 145, seedlingWidth: 153, seedTrunkHeight: 586, seedTrunkGirth: 200,
                //     plantType: [{value: 'trees', label: 'Деревья'}, {value: 'shrubs', label: 'Кустарники'}], leafType: {value: 'coniferous', label: 'Хвоя'}, frostResistance: {value: -45, label: 'до -45'}, lightLevel: {value: 'medium', label: 'Полутень'}, crownShape: [{value: 'spherical', label: 'Шаровидная'}, {value: 'umbrellaShaped', label: 'Зонтичная'}], floweringPeriod: [{value: 'april', label: 'Апрель'}, {value: 'may', label: 'Май'}], careFeature: [{value: 'unpretentious', label: 'Неприхотливое'}, {value: 'soil', label: 'Требовательное к почве'}], soil: [{value: 'loamy', label: 'Суглинистая'}, {value: 'calcareous', label: 'Известковая'}], deseaseResistance: {value: 'high', label: 'Высокая'}, permanentLeafColor: [{value: 'orange', label: 'Оранжевый'}, {value: 'brown', label: 'Коричневый'}], autumnLeafColor: [{value: 'orange', label: 'Оранжевый'}, {value: 'brown', label: 'Коричневый'}], flowerColor: [{value: 'orange', label: 'Оранжевый'}, {value: 'brown', label: 'Коричневый'}], trunkColor: [{value: 'orange', label: 'Оранжевый'}, {value: 'brown', label: 'Коричневый'}], plantHeight: 25, plantWidth: 8, plantTrunkHeight: 10, plantTrunkGirth: 500,
                // }}
            >
                {({handleSubmit, setFieldValue, values, touched, errors}) => {
                    return (
                        <Form onSubmit={handleSubmit} className={styles.form} onClick={e => e.stopPropagation()}>
                            <h1 className={styles.title}>{currentItem ? "Редактировать растение" : "Добавить растение в библиотеку"}</h1>
                            <div className={styles.formContainer}>
                                <div className={styles.leftSide}>
                                    <div className={styles.section}>
                                        <h2 className={styles.sectionTitle}>Общая информация</h2>
                                        <div className={styles.horizon}>
                                            <div className={styles.inputWrapper}>
                                                <InputField name='name' label='Название растения' type='text' value={values.name} setFieldValue={setFieldValue}/>
                                            </div>
                                        </div>
                                        <div className={styles.horizon}>
                                            <div className={styles.inputWrapper}>
                                                <InputField name='latinName' label='Латинское название растения' type='text' value={values.name} setFieldValue={setFieldValue}/>
                                            </div>
                                        </div>
                                        <div className={styles.fileInputWrapper}>
                                        {values.oldImages && typeof values.oldImages === 'object' && (
                                                (values.oldImages.map((image: any, index: number) => (
                                                    <div key={index} className={styles.uploadedImgWrapper}>
                                                        <img src={image.Location} alt='img' className={styles.uploadedImg}/>
                                                        <div className={styles.imageDeleteBtn} onClick={() => {setFieldValue('oldImages', values.oldImages.filter((image: any, idx: number) => idx !== index)); setDeleteImages(prev => [...prev, image.Key])}}></div>
                                                    </div>
                                                )))
                                            )}
                                        </div>
                                        <div className={styles.fileInputWrapper}>
                                            <label htmlFor="images">Загрузить фотографии</label>
                                            <input type="file" name="images" id="images" multiple onChange={(e) => handleImageUpload(e, setFieldValue)}/>
                                            {values.images && typeof values.images === 'object' && (
                                                (Object.values(values.images).map((image: any, index) => (
                                                    <div key={index} className={styles.uploadedImgWrapper}>
                                                        <img src={URL.createObjectURL(image)} alt='img' className={styles.uploadedImg}/>
                                                        <div className={styles.imageDeleteBtn} onClick={() => setFieldValue('images', Object.values(values.images).filter((image: any, idx: number) => idx !== index))}></div>
                                                    </div>
                                                )))
                                            )}
                                        </div>
                                        <div>{uploadErrors.join(' ')}</div>
                                        <div className={styles.inputWrapper}>
                                            <InputField name="description" label="Описание растения" type="text" multiline rows={4} value={values.description} setFieldValue={setFieldValue} />
                                        </div>
                                    </div>
                                    <div className={styles.section}>
                                        <h2 className={styles.sectionTitle}>Информация о размещении</h2>
                                        <div className={styles.horizon}>
                                            <div className={styles.inputWrapper}>
                                                <InputField name="price" label="Цена ед. / ₽" type="number" value={values.price} setFieldValue={setFieldValue}/>
                                            </div>
                                            <div className={styles.inputWrapper}>
                                                {/* <InputField name="quantity" label="Колличество" type="number" value={values.quantity} setFieldValue={setFieldValue} /> */}
                                                <AutocompleteInputField value={values.quantity} setFieldValue={setFieldValue} options={options.quantity} name="quantity" label="Колличество" touched={touched} errors={errors}/>
                                            </div>
                                        </div>
                                        <div className={styles.horizon}>
                                            <div className={styles.inputWrapper}>
                                                <AutocompleteInputField value={values.rootPacking} setFieldValue={setFieldValue} options={options.rootPackages} label="Упаковка корневой системы" name='rootPacking' touched={touched} errors={errors}/>
                                            </div>
                                        </div>
                                        <div className={styles.horizon}>
                                            <div className={styles.inputWrapper}>
                                                <AutocompleteInputField value={values.packageType} setFieldValue={setFieldValue} name="packageType" label="Тип упаковки" options={options.packageTypes} disabled={values.rootPacking?.value !== 'closed'} touched={touched} errors={errors}/>
                                            </div>
                                            <div className={styles.inputWrapper}>
                                                <InputField value={values.packageCount} setFieldValue={setFieldValue} name="packageCount" label="Колличество единиц" type="number" disabled={values.rootPacking?.value !== 'closed'}/>
                                            </div>
                                        </div>
                                        <div className={styles.block}>
                                            <div className={styles.blockTitle}>Размер саженца</div>
                                            <div className={styles.horizon}>
                                                <div className={styles.inputWrapper}>
                                                    <InputField value={values.seedlingHight} setFieldValue={setFieldValue} name="seedlingHight" label="Высота саженца" type="number"/>
                                                    </div>
                                                <div className={styles.inputWrapper}>
                                                    <InputField value={values.seedlingWidth} setFieldValue={setFieldValue} name="seedlingWidth" label="Ширина саженца" type="number"/>
                                                </div>
                                            </div>
                                            <div className={styles.horizon}>
                                                <div className={styles.inputWrapper}>
                                                    <InputField value={values.seedTrunkHeight} setFieldValue={setFieldValue} name="seedTrunkHeight" label="Высота штамба" type="number"/>
                                                </div>
                                                <div className={styles.inputWrapper}>
                                                    <InputField value={values.seedTrunkGirth} setFieldValue={setFieldValue} name="seedTrunkGirth" label="Обхват ствола" type="number"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.rightSide}>
                                    <div className={styles.section}>
                                        <h2 className={styles.sectionTitle}>Характеристики</h2>
                                        <div className={styles.horizon}>
                                            <div className={styles.inputWrapper}>
                                                <AutocompleteInputField value={values.plantType} setFieldValue={setFieldValue} options={options.plantTypes} name="plantType" label="Тип растения" touched={touched} errors={errors} multiple/>
                                            </div>
                                            <div className={styles.inputWrapper}>
                                                <AutocompleteInputField value={values.crownShape} setFieldValue={setFieldValue} name="crownShape" label="Форма кроны" options={options.crownShapes} touched={touched} errors={errors} multiple/>
                                            </div>
                                        </div>
                                        <div className={styles.horizon}>
                                            <div className={styles.inputWrapper}>
                                                <AutocompleteInputField value={values.leafType} setFieldValue={setFieldValue} name="leafType" label="Тип листвы" options={options.leafTypes} touched={touched} errors={errors}/>
                                            </div>
                                            <div className={styles.inputWrapper}>
                                                <AutocompleteInputField value={values.lightLevel} setFieldValue={setFieldValue} name="lightLevel" label="Светолюбивость" options={options.lightLevels} touched={touched} errors={errors}/>
                                            </div>
                                            <div className={styles.inputWrapper}>
                                                <AutocompleteInputField value={values.frostResistance} setFieldValue={setFieldValue} name="frostResistance" label="Морозостойкость" options={options.frostResistances} touched={touched} errors={errors}/>
                                            </div>
                                        </div>
                                        <div className={styles.horizon}>
                                            <div className={styles.inputWrapper}>
                                                <AutocompleteInputField value={values.floweringPeriod} setFieldValue={setFieldValue} name="floweringPeriod" label="Срок цветения" options={options.months} touched={touched} errors={errors} multiple/>
                                            </div>
                                            <div className={styles.inputWrapper}>
                                                <AutocompleteInputField value={values.careFeature} setFieldValue={setFieldValue} name="careFeature" label="Особенности ухода" options={options.careFeatures} touched={touched} errors={errors} multiple/>
                                            </div>
                                        </div>
                                        <div className={styles.horizon}>
                                            <div className={styles.inputWrapper}>
                                                <AutocompleteInputField value={values.soil} setFieldValue={setFieldValue} name="soil" label="Почва" options={options.soils} touched={touched} errors={errors} multiple/>
                                            </div>
                                            <div className={styles.inputWrapper}>
                                                <AutocompleteInputField value={values.deseaseResistance} setFieldValue={setFieldValue} name="deseaseResistance" label="Устойчивость к болезням" options={options.deseaseResistances} touched={touched} errors={errors}/>
                                            </div>
                                        </div>
                                        <div className={styles.block}>
                                            <div className={styles.blockTitle}>Окраска</div>
                                            <div className={styles.block}>
                                                <div className={styles.blockTitle}>Листьев</div>
                                                <div className={styles.horizon}>
                                                    <div className={styles.inputWrapper}>
                                                        <AutocompleteInputField value={values.permanentLeafColor} setFieldValue={setFieldValue} name="permanentLeafColor" label="Постоянная" options={options.colors} touched={touched} errors={errors} multiple/>
                                                    </div>
                                                    <div className={styles.inputWrapper}>
                                                        <AutocompleteInputField value={values.autumnLeafColor} setFieldValue={setFieldValue} name="autumnLeafColor" label="Осенняя" options={options.colors} touched={touched} errors={errors} multiple/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.horizon}>
                                                <div className={styles.inputWrapper}>
                                                    <AutocompleteInputField value={values.flowerColor} setFieldValue={setFieldValue} name="flowerColor" label="Цветков" options={options.colors} touched={touched} errors={errors} multiple/>
                                                </div>
                                                <div className={styles.inputWrapper}>
                                                    <AutocompleteInputField value={values.trunkColor} setFieldValue={setFieldValue} name="trunkColor" label="Ствола" options={options.colors} touched={touched} errors={errors} multiple/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.block}>
                                            <div className={styles.blockTitle}>Размер взрослого растения</div>
                                            <div className={styles.horizon}>
                                                <div className={styles.inputWrapper}>
                                                    <InputField value={values.plantHeight} setFieldValue={setFieldValue} name="plantHeight" label="Высота растения (м.)" type="number"/>
                                                </div>
                                                <div className={styles.inputWrapper}>
                                                    <InputField value={values.plantWidth} setFieldValue={setFieldValue} name="plantWidth" label="Ширина растения (м.)" type="number"/>
                                                </div>
                                            </div>
                                            <div className={styles.horizon}>
                                                <div className={styles.inputWrapper}>
                                                    <InputField value={values.plantTrunkHeight} setFieldValue={setFieldValue} name="plantTrunkHeight" label="Высота штамба (м.)" type="number"/>
                                                </div>
                                                <div className={styles.inputWrapper}>
                                                    <InputField value={values.plantTrunkGirth} setFieldValue={setFieldValue} name="plantTrunkGirth" label="Обхват ствола (см.)" type="number"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.rightSideBottom}>
                                        {/* {currentItem && <input type="submit" id="delete" value="Удалить" className={[styles.deleteBtn, styles.submitBtn].join(' ')}/>} */}
                                        {currentItem && <div className={styles.deleteBtn} onClick={() => dispatch(deleteProductPost(currentItem._id))}>Удалить</div>}
                                        <input type="submit" id="submitButton" value={currentItem ? "Сохранить" : "Добавить в каталог"} className={styles.submitBtn}/>
                                    </div>
                                    {responseError && <div>{responseError}</div>}
                                </div>
                            </div>
                        </Form>
                    )
                }}

            </Formik>
    )
}