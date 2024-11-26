import React, { useState, useEffect } from 'react';
import { Grid, Card,CardBody, CardFooter, Text, Button,  } from '@nextui-org/react';
import axios from 'axios';

interface DataItem {
  id: string;
  name: string;
  date: string;
  socialMediaLink: string;
}

const PaginationCardComponent: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<DataItem[]>('/api/data');
      setData(response.data);
    };
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleShowMore = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div>
        {currentItems.map((item) => (
          <Grid xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardBody>
                <h4>{item.name}</h4>
                <small>{item.date}</small>
              </CardBody>
              <CardFooter>
                <Button auto flat color="primary" onClick={() => window.open(item.socialMediaLink, '_blank')}>
                  View on Social Media
                </Button>
              </CardFooter>
            </Card>
          </Grid>
        ))}
      </div>
      {data.length > currentItems.length && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Button onClick={handleShowMore}>Show More</Button>
        </div>
      )}
    </>
  );
};

export default PaginationCardComponent;