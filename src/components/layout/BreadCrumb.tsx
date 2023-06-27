import { Card, Flex, IconButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { IoMdArrowRoundBack } from 'react-icons/io';

function BreadCrumb() {
  const navigate = useNavigate();

  const popPage = () => {
    if (document.referrer) {
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
