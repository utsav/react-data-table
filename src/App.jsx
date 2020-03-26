import React, { useState, useEffect } from 'react';
import DataTable from './components/DataTable';
import Layout from './components/Layout';
import s from './App.module.scss';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_TABLE_DATA_API)
      .then((res) => res.json())
      .then((response) => {
        setData(response || []);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return null;

  return (
    <Layout>
      <DataTable
        primaryColumn="id"
        columns={[
          {
            id: 'title',
            label: 'Title',
            customRow: (row) => (
              <div className={s.customRow}>
                <img className={s.img} src={row.thumbnailUrl} alt={row.title} />
                <span>{row.title}</span>
              </div>
            ),
            numeric: false,
          },
          { id: 'url', label: 'Url', numeric: false },
        ]}
        rows={data}
      />
    </Layout>
  );
};

export default App;
