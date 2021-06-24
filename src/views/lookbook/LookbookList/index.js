import React from 'react';
import './style.css';
import { Card } from 'antd';
import { Breadcrumb } from 'antd';
import { Typography } from 'antd';
import { Tag } from 'antd';

const { Title } = Typography;
const { Meta } = Card;

const LookbookList = () => {
    return (
        <>
            <Card
                style={{ width: 300 }}
                cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                }
            >
                <Title level={4}>Lookbook Title</Title>

                <Breadcrumb>
                    <Breadcrumb.Item>12 Products</Breadcrumb.Item>
                    <Breadcrumb.Item>17 Looks</Breadcrumb.Item>
                    <Breadcrumb.Item>Jun 21, 2021</Breadcrumb.Item>
                </Breadcrumb>
                <Tag>Nike</Tag>
                <Tag>Menswear</Tag>
            </Card>

        </>
    );
};

export default LookbookList;