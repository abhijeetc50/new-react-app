import React, { useEffect, useState, useCallback, useMemo } from 'react';
import styles from './style.css';
import RUG from 'react-upload-gallery'
import Compressor from 'compressorjs';
import { Form, Row, Col, Button, Input, Spin, Select } from 'antd';

// Add style manually
import 'react-upload-gallery/dist/style.css' // or scss

const initialFormValues = {
    name_en: null,
    name_ar: null,
    is_available: true,
    under_charity: false,
    under_promotion: false,
};

const LookbookDetails = (productData = null) => {
    const [form] = Form.useForm();
    const [compressedFile, setCompressedFile] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const upsertFormLayout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
    };

    const handleCourseImageUpload = (imageUrl) => {
        imageUrl.map((image) =>
            handleCompressedUpload(image.file)
        );
        console.log(compressedFile);
    };

    const handleCompressedUpload = async (e) => {
        const image = e;
        await new Compressor(image, {
            quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
            success: (compressedResult) => {
                // compressedResult has the compressed file.
                // Use the compressed file to upload the images to your server.        
                setCompressedFile(compressedResult)
            },
        });
    };

    const handleFormFinish = async (values) => {
        setIsLoading(true);

        const payload = {
            name_en: values.name_en,
            name_ar: values.name_ar,
            brand_id: values.brand_id,
            category_ids: values.category_ids || [],
        };

        setIsLoading(false);
    };

    const fetchBrands = useCallback(async () => {
        setIsLoading(true);

        setBrands([]);

        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchBrands();
    }, [fetchBrands]);

    const brandDropdownOptions = useMemo(
        () =>
            brands.map((brand) => ({
                label: brand.name,
                value: brand.external_id,
            })),
        [brands]
    );

    const categoryDropdownOptions = useMemo(
        () =>
          categories.map((category) => ({
            label: category.name ,
            value: category.external_id,
          })),
        [categories]
      );

    return (
        <>
            <div className={styles.formContainer}>
                <Spin size="large" spinning={isLoading} tip="loading">
                    <Form
                        {...upsertFormLayout}
                        form={form}
                        layout="vertical"
                        scrollToFirstError={true}
                        onFinish={handleFormFinish}
                        initialValues={initialFormValues}
                    >
                        <Row gutter={[8, 16]}>
                            <Col xs={24}>
                                <Form.Item
                                    id="name_ar"
                                    name="name_ar"
                                    label="name"
                                    rules=""
                                >
                                    <Input
                                        className={styles.inputFormItem}
                                        maxLength={40}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24}>
                                <Form.Item>
                                    <Row gutter={[8, 8]}>
                                        <Col>
                                            <Form.Item
                                                id="vat"
                                                name="vat"
                                                label="name"
                                                rules=""
                                            >
                                                <Input
                                                    className={styles.inputFormItem}
                                                    maxLength={40}
                                                    placeholder="placeholder"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col>
                                            <Form.Item id="brand_id" name="brand_id" label="name">
                                                <Select
                                                    allowClear
                                                    showArrow
                                                    showSearch
                                                    mode="single"
                                                    placeholder="placeholder"
                                                    maxTagCount={2}
                                                    options={brandDropdownOptions}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Col>
                            <Col xs={24}>
                                <Form.Item id="category_ids" name="category_ids"
                                    label="name">
                                    <Select
                                        allowClear
                                        showArrow
                                        showSearch
                                        mode="multiple"
                                        placeholder="placeholder"
                                        maxTagCount={2}
                                        options={categoryDropdownOptions}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24}>
                                <Row justify="center">
                                    <Col>
                                        <Button size="large" type="primary" className={styles.greenBtn} htmlType="submit">
                                            SUMIT
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Spin>
            </div>
            <RUG
                onChange={handleCourseImageUpload}
                sorting="true"
                rules={{
                    size: 2000
                }}
                accept={['jpg', 'jpeg']}
                onWarning={(type, rules) => {
                    switch (type) {
                        case 'accept':
                            console.log(`Only ${rules.accept.join(', ')}`)
                            break
                        case 'size':
                            console.log('max size <= ', rules.size)
                            break
                        default:
                    }
                }}
                onConfirmDelete={(currentImage, images) => {
                    return window.confirm('Are you sure you want to delete?')
                }}
                source={response => response.source} // response image source
            />
        </>
    );
};

export default LookbookDetails;