import { ColumnsType } from 'antd/es/table';
import { useContext, useEffect, useState } from 'react';
import { message } from 'antd';
import { ApiContext } from '../providers/ApiProvider';

const useTableData = (
  tableName: string,
  startingColumns?: [],
  where?: string,
  refetch?: boolean,
) => {
  const { query } = useContext(ApiContext);
  const [data, setData] = useState<any[]>(startingColumns || []);
  const [columns, setColumns] = useState<ColumnsType<any>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const tableData = await query(`SELECT * FROM ${tableName}`);
        const tableData = await query(
          `SELECT * FROM ${tableName}${where ? ` WHERE ${where}` : ''}`,
        );

        console.log('tableData', tableData.data);

        // date type is a string in the format 'YYYY-MM-DDTHH:MM:SS.MMMZ'
        const newData = tableData.data.map((record: any) => {
          const newRecord = { ...record };
          Object.keys(newRecord).forEach((key) => {
            if (typeof newRecord[key] === 'string') {
              if (newRecord[key].match(/T\d{2}:\d{2}:\d{2}.\d{3}Z/)) {
                newRecord[key] = new Date(newRecord[key]).toLocaleString();
              }
            }
          });
          return newRecord;
        });
        setData(newData);

        if (newData.length > 0) {
          setColumns(
            Object.keys(newData[0]).map((key) => ({
              title: key,
              dataIndex: key,
              key,
            })),
          );
        } else {
          setColumns([]);
        }
      } catch (error: any) {
        console.log('error', error);
        message.error(JSON.stringify(error.response.data));
      }
    };
    fetchData();
  }, [query, tableName, where, refetch]);

  return { data, columns };
};

export default useTableData;
