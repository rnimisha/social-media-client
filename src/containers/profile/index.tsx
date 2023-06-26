import withAuth from '@/common/hoc/withAuth';
import ProfileCard from '@/components/ProfileCard';
import useGetProfileDetail from '@/hooks/useGetProfileDetail';

import { useParams } from 'react-router-dom';

function Profile() {
  const { username } = useParams();

  const {
    data: profileDetails,
    isLoading,
    isError,
  } = useGetProfileDetail({
    username: `${username}`,
  });

  if (isError) return <div>Error...</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>{profileDetails && <ProfileCard userDetail={profileDetails} />}</div>
  );
}

export default withAuth(Profile);
