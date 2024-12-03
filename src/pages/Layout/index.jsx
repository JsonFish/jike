import { Layout, Menu, Popconfirm, Avatar } from "antd";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { clearToken, getUserInfo } from "@/store/modules/user";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const { Header, Sider } = Layout;

const items = [
  {
    label: "首页",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "文章管理",
    key: "/article",
    icon: <DiffOutlined />,
  },
  {
    label: "创建文章",
    key: "/publish",
    icon: <EditOutlined />,
  },
];

const GeekLayout = () => {
  const navigate = useNavigate();
  const onMenuClick = (route) => {
    navigate(route.key);
  };

  const location = useLocation();
  const selectkey = location.pathname;

  const dispatch = useDispatch();
  const logoutConfirm = () => {
    dispatch(clearToken());
    navigate("/login");
  };
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);
  const name = useSelector((state) => state.user.userInfo.name);
  const photo = useSelector((state) => state.user.userInfo.photo);
  return (
    <Layout className="min-h-screen">
      <Header className="p-0">
        <div className="flex justify-center items-center w-52 h-20 ">
          <span className="text-2xl text-white">极客园</span>
        </div>
        <div className="absolute right-0 top-0 pr-5 text-white">
          <Avatar src={photo} className="mr-1" />
          <span className="mr-5">{name}</span>
          <span>
            <Popconfirm
              title="是否确认退出登录？"
              okText="退出"
              cancelText="取消"
              onConfirm={() => logoutConfirm()}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[selectkey]}
            onClick={onMenuClick}
            defaultSelectedKeys={["1"]}
            items={items}
          ></Menu>
        </Sider>
        <Layout className="p-4">
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};
export default GeekLayout;
