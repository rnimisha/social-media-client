import { Card, Flex, IconButton } from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { IoMdArrowRoundBack } from 'react-icons/io';

function BreadCrumb() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const popPage = () => {
    const paramsArray = Array.from(searchParams);
    if (paramsArray.length > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };
  return (
    <Card py="16px" pl="10px" mb="20px">
      <Flex>
        <IconButton
          onClick={popPage}
          variant="outline"
          colorScheme="twitter"
          aria-label="Send email"
          icon={<IoMdArrowRoundBack />}
        />
      </Flex>
    </Card>
  );
}

export default BreadCrumb;
