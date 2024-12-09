import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { addArticleRequest, getArticleDetailRequest } from "@/apis/article";
import useChannel from "@/hooks/useChannel";
import { useSearchParams } from "react-router-dom";
const { Option } = Select;

const Publish = () => {
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");
  const [form] = Form.useForm();
  // 回填数据
  useEffect(() => {
    function getInfo() {
      getArticleDetailRequest(articleId).then((res) => {
        form.setFieldsValue(res.data);
      });
    }
    if (articleId) {
      getInfo();
    }
  }, [articleId, form]);

  const [messageApi, contextHolder] = message.useMessage();
  // 获取频道列表
  const channelList = useChannel();
  // 获取封面信息
  const [fileList, setFileList] = useState([]);
  const onChange = (value) => {
    setFileList(value.fileList);
  };
  // 获取封面类型
  const [imageType, setImageType] = useState(0);
  const onRadioChange = (e) => {
    setImageType(e.target.value);
  };
  // 发布文章
  const onFinish = (formValue) => {
    if (fileList.length !== imageType)
      return messageApi.warning("封面类型和图片数量不一致");
    const { title, content, channel_id } = formValue;
    const data = {
      title,
      content,
      channel_id,
      cover: {
        type: imageType,
        image: fileList.map((item) => item.response.data.url),
      },
    };
    addArticleRequest(data).then((res) => {
      if (res.message === "OK") {
        messageApi.success("文章发布成功");
        form.resetFields();
        setFileList([]);
        setImageType(0);
      } else {
        messageApi.error(res.message);
      }
      // 发布成功后清空表单
    });
  };

  return (
    <div>
      {contextHolder}
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          form={form}
          labelCol={{ span: 1, offset: 5 }}
          wrapperCol={{ span: 12 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" allowClear />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" allowClear>
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onRadioChange}>
                <Radio value={0}>无图</Radio>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && (
              <Upload
                maxCount={imageType}
                name="image"
                action={"http://geek.itheima.net/v1_0/upload"}
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                onChange={onChange}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
