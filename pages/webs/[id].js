import App from "../../src/components/layout/app";
import { Form, Input, Row, Col, Button, Select } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import TextArea from "antd/lib/input/TextArea";
import { useState, useEffect } from "react";

const { Option } = Select;

const WebForm = () => {
  const [countries, setCountries] = useState([]);
  const [webId, setWebId] = useState(null);
  const router = useRouter();
  
  const [form] = Form.useForm();
  const navigation = [
    {
      key: "1",
      path: "/webs",
      breadcrumbName: "Webs",
    },
    {
      key: "2",
      path: `/webs/${webId}`,
      breadcrumbName: "Detallles de Web",
    },
  ];

  const getCountry = async (id) => {
    const payload = await axios
      .get("https://insightcron.com/countries/")
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      console.log(payload.data)
      setCountries(payload.data);
      getData(id);
    }
  };

  const onGenderChange = (value) => {
    form.setFieldsValue({ country: value });
  };

  const onFinish = async (values) => {
    const payload = await axios
      .put(`https://insightcron.com/webs/${webId}/`, values)
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      router.push("/webs");
    } else {
      alert("Error guardando");
    }
  };

  const getData = async (id) => {
    console.log("id recibe", id);
    const payload = await axios
      .get(`https://insightcron.com/webs/${id}/`)
      .catch((err) => console.log(err));

    if (payload && payload.data) {
      form.setFields([
        {
          name: "name",
          value: payload.data?.name,
        },
        {
          name: "country",
          value: payload.data?.country,
        },
        {
          name: "url",
          value: payload.data?.url,
        },
        {
          name: "comments",
          value: payload.data?.comments,
        },
      ]);
    }
  };

  useEffect(() => {
    const { id } = router.query;
    setWebId(id)
    getCountry(id);

  }, [router]);

  return (
    <App navigation={navigation}>
      <Row justify="center" style={{ "padding-top": "15px" }}>
        <Col md={24} lg={16}>
          <Form
            layout="vertical"
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            form={form}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={12}>
                <Form.Item
                  label={"Nombre de Intitución"}
                  name={"name"}
                  rules={[
                    {
                      required: true,
                      // message: "Por favor ingrese un nombre!",
                    },
                  ]}
                >
                  <Input
                    placeholder={"Nombre de Institución"}
                    type={"text"}
                    size="small"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={12}>
                <Form.Item
                  label={"Pais"}
                  name={"country"}
                  rules={[
                    {
                      required: true,
                      // message: "Por favor ingrese un nombre!",
                    },
                  ]}
                >
                  <Select
                    size="small"
                    onChange={onGenderChange}
                    placeholder="seleccionar país"
                  >
                    {countries.map((resp) => {
                      return <Option value={resp.id}>{resp.name}</Option>;
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label={"Url Web"}
                  name={"url"}
                  rules={[
                    {
                      required: true,
                      // message: "Por favor ingrese un nombre!",
                    },
                  ]}
                >
                  <Input
                    placeholder={"Introduzca la url"}
                    type={"text"}
                    size="small"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label={"Comentario"}
                  name={"comments"}
                  rules={[
                    {
                      required: true,
                      // message: "Por favor ingrese un nombre!",
                    },
                  ]}
                >
                  <TextArea
                    rows={1}
                    size="small"
                    placeholder={"Introduzca Comentarío"}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="center">
              <Col xs={24} sm={12} md={6}>
                <Button
                  type="primary"
                  block="true"
                  htmlType="buttom"
                  size="small"
                >
                  Editar
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </App>
  );
};

export default WebForm;
