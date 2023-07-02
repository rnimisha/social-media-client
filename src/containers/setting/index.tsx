import withAuth from '@/common/hoc/withAuth';
import UpdateProfileForm from '@/components/form/UpdateProfileForm';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

function Setting() {
  return (
    <div>
      <Tabs isFitted>
        <TabList>
          <Tab>Update My Details</Tab>
          <Tab>Change Password</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UpdateProfileForm />
          </TabPanel>
          <TabPanel>form2</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default withAuth(Setting);
