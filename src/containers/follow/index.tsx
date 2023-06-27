import BreadCrumb from '@/components/layout/BreadCrumb';
import useGetFollowings from '@/hooks/useGetFollowings';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useEffect } from 'react';
import FollowCard from '@/components/FollowCard';
import useGetFollowers from '@/hooks/useGetFollowers';

function Follow() {
  const { username, followtype } = useParams();
  const navigate = useNavigate();
  const { data: followingData } = useGetFollowings({ username: `${username}` });
  const { data: followerData } = useGetFollowers({ username: `${username}` });

  useEffect(() => {
    if (
      followtype &&
      !['followers', 'followings'].includes(followtype.toLowerCase())
    ) {
      // todo navigate no page found
    }
  }, [followtype]);

  const changeFollowType = (newType: 'followings' | 'followers') => {
    navigate(`/profile/${username}/${newType}`);
  };

  return (
    <div>
      <BreadCrumb />

      <Tabs
        isFitted
        defaultIndex={followtype?.toLowerCase() === 'followers' ? 0 : 1}
      >
        <TabList>
          <Tab
            onClick={() => {
              changeFollowType('followers');
            }}
          >
            Followers
          </Tab>
          <Tab
            onClick={() => {
              changeFollowType('followings');
            }}
          >
            Followings
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <TabPanel>
              {followerData?.map((following) => (
                <FollowCard data={following} key={following.id} />
              ))}
            </TabPanel>
          </TabPanel>

          <TabPanel>
            {followingData?.map((following) => (
              <FollowCard data={following} key={following.id} />
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default Follow;
