import React, { useState } from 'react';
import { Card, Typography, InputNumber, Button, Progress, Statistic, Row, Col, Layout, List } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Content, Header } = Layout;

const ProductionStation = ({
  stationName,
  totalOrderQuantity,
  previousStationCompleted,
  inputProduct,
  outputProducts,
  currentWorkOrder
}) => {
  const [producedQuantities, setProducedQuantities] = useState(
    outputProducts.map(() => 0)
  );

  const [currentProductions, setCurrentProductions] = useState(
    outputProducts.map(() => 0)
  );

  const handleProduction = (index) => {
    const newProducedQuantities = [...producedQuantities];
    const newValue = newProducedQuantities[index] + currentProductions[index];

    // Üretim miktarını kontrol et
    if (newValue >= 0 && newValue <= outputProducts[index].totalOrderQuantity) {
      newProducedQuantities[index] = newValue;
      setProducedQuantities(newProducedQuantities);
    } else {
      alert("Geçersiz değer! Üretilen miktar sıfırdan küçük veya toplam siparişi aşamaz.");
    }

    const newCurrentProductions = [...currentProductions];
    newCurrentProductions[index] = 0; // Input alanını sıfırla
    setCurrentProductions(newCurrentProductions);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#F5F5F5' }}>
      <Header style={{ background: '#001529', padding: '0 20px' }}>
        <Row justify="space-between" align="middle" style={{ height: '100%' }}>
          <Col>
            <Title level={3} style={{ color: '#FFFFFF', margin: 0 }}>{stationName}</Title>
          </Col>
          <Col>
            <Button icon={<ReloadOutlined />} onClick={() => window.location.reload()}>
              Yenile
            </Button>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: '20px' }}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card style={{ background: '#4096FF', color: '#FFFFFF' }}>
              <Title level={4} style={{ color: '#FFFFFF' }}>Mevcut İş Emri: {currentWorkOrder}</Title>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="Üretim Bilgileri" style={{ height: '100%' }}>
              {outputProducts.map((product, index) => {
                const progress = (producedQuantities[index] / product.totalOrderQuantity) * 100;

                return (
                  <div key={index} style={{ marginBottom: '20px' }}>
                    
                    <Title level={5}>{product.name}</Title>
                    <Text>Gideceği İstasyon: {product.nextStation}</Text>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Statistic title="Kalan Üretim" value={product.totalOrderQuantity - producedQuantities[index]} />
                      </Col>
                      <Col span={12}>
                        <Statistic title="Üretilen Miktar" value={producedQuantities[index]} />
                      </Col>
                    </Row>
                    <Progress percent={progress.toFixed(2)} style={{ margin: '20px 0' }} strokeColor="#4096FF" />
                    <Row gutter={16} align="middle">
                      <Col span={16}>
                        <InputNumber
                          min={-producedQuantities[index]} // Negatif üretimi sınırlamak
                          max={product.totalOrderQuantity - producedQuantities[index]}
                          value={currentProductions[index]}
                          onChange={(value) => {
                            const newCurrentProductions = [...currentProductions];
                            newCurrentProductions[index] = value || 0;
                            setCurrentProductions(newCurrentProductions);
                          }}
                          placeholder="Üretilecek miktar"
                          style={{ width: '100%' }}
                        />
                      </Col>
                      <Col span={8}>
                        <Button type="primary" onClick={() => handleProduction(index)} style={{ width: '100%' }}>
                          Kaydet
                        </Button>
                      </Col>
                    </Row>
                    <Text type="secondary" style={{ marginTop: '20px', display: 'block' }}>
                      {product.totalOrderQuantity - producedQuantities[index]} adet daha üretilmesi gerekiyor.
                    </Text>
                    <br />
                    <hr />
                  </div>
                );
              })}
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="Ürün Bilgileri" style={{ height: '100%' }}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Title level={5}>Girdi Ürünü:</Title>
                  <Text>{inputProduct}</Text>
                </Col>
                <Col span={24}>
                  <Title level={5}>Çıktı Ürünleri:</Title>
                  <List
                    size="small"
                    dataSource={outputProducts}
                    renderItem={item => (
                      <List.Item>
                        <Text>{item.name} - Gideceği İstasyon: {item.nextStation}</Text>
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ProductionStation;
