import { Pagination } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';

const PaginationPage = ({ totalPages }: { totalPages: number }) => {
    const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = Number(searchParams.get('page')) || 1;

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
   setSearchParams({ page: String(value) });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        shape="rounded"
        siblingCount={1}
        boundaryCount={1}
      />
    </div>
  );
};

export default PaginationPage;
