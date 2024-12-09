import { Link } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Table,
  Tag,
  Space,
  Popconfirm,
  message,
} from "antd";
// import "moment/locale/zh-cn";
import { useNavigate } from "react-router-dom";
// 时间选择器中文显示
import locale from "antd/es/date-picker/locale/zh_CN";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import img404 from "@/assets/error.png";
import useChannel from "@/hooks/useChannel";
import { useState, useEffect } from "react";
import { getArticleListRequest, deleteArticleRequest } from "@/apis/article";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  const channelList = useChannel();
  const navigate = useNavigate();
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        return (
          <img src={cover.images[0] || img404} width={80} height={60} alt="" />
        );
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (status) =>
        status === 1 ? (
          <Tag color="warning">待审核</Tag>
        ) : (
          <Tag color="green">审核通过</Tag>
        ),
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => navigate(`/publish?id=${data.id}`)}
            />
            <Popconfirm
              description="是否确定删除该文章?"
              onConfirm={() => confirm(data.id)}
              okText="确定"
              cancelText="取消"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const confirm = (id) => {
    deleteArticleRequest(id).then((res) => {
      message.success("删除成功");
      setQueryParams({
        ...queryParams,
      });
    });
  };

  const [queryParams, setQueryParams] = useState({
    status: "",
    channel_id: "",
    begin_pubdate: "",
    end_pubdate: "",
    page: 1,
    pre_page: 10,
  });

  const [articleList, setArticleList] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    function getArticleList() {
      getArticleListRequest(queryParams).then((res) => {
        setArticleList(res.data.results);
        setTotal(res.data.total_count);
      });
    }
    getArticleList();
  }, [queryParams]);

  const onFinish = (formValue) => {
    console.log(formValue);

    // 讲收集到的数据放到请求参数当中
    setQueryParams({
      ...queryParams,
      channel_id: formValue.channel_id,
      status: formValue.status,

      begin_pubdate:
        formValue.date.length > 0 ? formValue.date[0].format("YYYY-MM-DD") : "",
      end_pubdate:
        formValue.date.length > 0 ? formValue.date[1].format("YYYY-MM-DD") : "",
    });
  };

  const onPageChange = (page) => {
    console.log(page);
    // 页码发生变化 把页码更新到请求参数当中
    setQueryParams({
      ...queryParams,
      page,
    });
  };

  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: null, date: [] }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 200 }}
              allowClear
            >
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${total} 条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={articleList}
          pagination={{
            total: total,
            pageSize: queryParams.pre_page,
            onChange: onPageChange,
          }}
        />
      </Card>
    </div>
  );
};

export default Article;
