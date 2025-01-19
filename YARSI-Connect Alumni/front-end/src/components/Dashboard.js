import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PieChart, BarChart } from "@mui/x-charts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getDashboardAdminUniv, getDashboardAdminProdi, getProfile } from "../api/Api";
import { useGlobal } from "../context/GlobalContext";

function Dashboard() {
  const { globalData } = useGlobal();
  const [dashboardData, setDashboardData] = useState(null);
  const [fullName, setFullName] = useState(globalData.role === "admin_universitas" ? "Admin Universitas" : "");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        let response;
        if (globalData.role === "admin_universitas") {
          response = await getDashboardAdminUniv();
        } else if (globalData.role === "admin_prodi") {
          response = await getDashboardAdminProdi();
        }

        if (response && response.data.status === "success") {
          setDashboardData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    const fetchProfileData = async () => {
      if (globalData.role === "admin_prodi") {
        try {
          const response = await getProfile();
          if (response && response.data.status === "success") {
            setFullName(response.data.data.fullName);
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    };

    fetchDashboardData();
    fetchProfileData();
  }, [globalData.role]);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <Container style={{ padding: "30px", borderRadius: "8px" }}>
        <h1 className="mb-5">Selamat Datang, {fullName}</h1>
        <Card
          sx={{ minWidth: 300, mb: 2, textAlign: "left", marginBottom: "20px" }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Dasbor
            </Typography>
          </CardContent>
        </Card>

        <Row>
          <Col>
            <Card sx={{ minWidth: 300, mb: 2 }}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  Jumlah Alumni
                </Typography>
                <Typography variant="h4" component="div">
                  {dashboardData.totalAlumni}
                </Typography>
              </CardContent>
            </Card>
          </Col>

          <Col>
            <Card sx={{ minWidth: 300, mb: 2 }}>
              <CardContent>
                {globalData.role === "admin_prodi" ? (
                  <>
                    <Typography variant="h6" component="div" gutterBottom>
                      Program Studi
                    </Typography>
                    <Typography variant="h5" component="div">
                      {dashboardData.studyProgram.name} ({dashboardData.studyProgram.code})
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h6" component="div" gutterBottom>
                      Jumlah Program Studi
                    </Typography>
                    <Typography variant="h4" component="div">
                      {dashboardData.totalStudyPrograms}
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card sx={{ minWidth: 400, minHeight: 300, mb: 2 }}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  Status Pekerjaan
                </Typography>
                <BarChart
                  xAxis={[
                    {
                      scaleType: "band",
                      data: dashboardData.employmentStatus.map(
                        (item) => item.label || "Unknown"
                      ),
                    },
                  ]}
                  series={[
                    {
                      data: dashboardData.employmentStatus.map(
                        (item) => item.value
                      ),
                    },
                  ]}
                  width={400}
                  height={300}
                />
              </CardContent>
            </Card>
          </Col>

          <Col>
            <Card sx={{ minWidth: 400, minHeight: 300, mb: 2 }}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  Bidang Pekerjaan
                </Typography>
                <BarChart
                  xAxis={[
                    {
                      scaleType: "band",
                      data: dashboardData.employmentField.map(
                        (item) => item.label || "Unknown"
                      ),
                    },
                  ]}
                  series={[
                    {
                      data: dashboardData.employmentField.map(
                        (item) => item.value
                      ),
                    },
                  ]}
                  width={400}
                  height={300}
                />
              </CardContent>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card sx={{ minWidth: 400, minHeight: 300, mb: 2 }}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  Waktu Mencari Pekerjaan
                </Typography>
                <PieChart
                  series={[
                    {
                      data: dashboardData.timeToJob.map((item, index) => ({
                        id: index,
                        value: item.value,
                        label: item.label,
                      })),
                    },
                  ]}
                  width={400}
                  height={300}
                />
              </CardContent>
            </Card>
          </Col>

          <Col>
            <Card sx={{ minWidth: 400, minHeight: 300, mb: 2 }}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  Kategori Perusahaan
                </Typography>
                <PieChart
                  series={[
                    {
                      data: dashboardData.companyCategories.map(
                        (item, index) => ({
                          id: item.key || index,
                          value: item.value,
                          label: item.label,
                        })
                      ),
                    },
                  ]}
                  width={400}
                  height={300}
                />
              </CardContent>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;