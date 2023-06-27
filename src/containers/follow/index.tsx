import BreadCrumb from '@/components/layout/BreadCrumb';
import useGetFollowings from '@/hooks/useGetFollowings';
import { useParams } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useEffect } from 'react';
import FollowCard from '@/components/FollowCard';
import useGetFollowers from '@/hooks/useGetFollowers';

function Follow() {
  const { username, followtype } = useParams();
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

  return (
    <div>
      <BreadCrumb />

      <Tabs
        isFitted
        defaultIndex={followtype?.toLowerCase() === 'followers' ? 0 : 1}
      >
        <TabList>
          <Tab>Followers</Tab>
          <Tab>Followings</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <TabPanel>
              {followerData?.map((following) => (
                <FollowCard
                  data={following}
                  type="followings"
                  key={following.id}
                />
              ))}
            </TabPanel>
          </TabPanel>

          <TabPanel>
            {followingData?.map((following) => (
              <FollowCard
                data={following}
                type="followings"
                key={following.id}
              />
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default Follow;
