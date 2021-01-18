import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';

class CustomUpload extends React.Component {
    state = {
        fileList: [],
    };

    handleChange = (info: any) => {
        let fileList = [...info.fileList];

        fileList = fileList.slice(-2);
        fileList = fileList.map(file => {
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });
        this.setState({ fileList });
    };

    render() {
        const props = {
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange: this.handleChange,
            multiple: true,
        };
        return (
            <Upload {...props} fileList={this.state.fileList}>
                <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
        );
    }
}

export default CustomUpload
