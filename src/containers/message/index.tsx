import { Box, Button, Flex, Textarea } from '@chakra-ui/react';

function Index() {
  return (
    <Flex height="86vh">
      <Box flex="1.5" p={4} overflowY="scroll">
        list of people
      </Box>
      <Box
        flex="4"
        p={4}
        overflowY="scroll"
        position="relative"
        height="100%"
        backgroundColor="pink.500"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box flex="1" overflowY="auto" pr={10}>
          chat messages
        </Box>
        <Flex
          align="center"
          justify="space-between"
          mt="auto"
          position="sticky"
          bottom={0}
          p={4}
        >
          <Textarea
            flex="1"
            height="90px"
            resize="none"
            placeholder="Write something..."
          />
          <Button
            ml={4}
            px={4}
            h={8}
            colorScheme="teal"
            borderRadius="md"
            onClick={() => console.log('click')}
          >
            Send
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Index;

// <Flex height="86vh">
//   <Box flex="1.5" p={4} overflowY="scroll">
//     <input placeholder="Search for friends" className="chatMenuInput" />
//     {/* Chat Menu */}
//   </Box>
//   <Box flex="4" p={4} overflowY="scroll" position="relative">
//     <Box flex="1" overflowY="auto" pr={10}>
//       {/* Chat Box Top */}
//     </Box>
//     <Flex align="center" justify="space-between" mt={2}>
//       <Textarea
//         flex="1"
//         height="90px"
//         resize="none"
//         placeholder="Write something..."
//       />
//       <Button
//         ml={4}
//         px={4}
//         h={8}
//         colorScheme="teal"
//         borderRadius="md"
//         onClick={() => console.log('click')}
//       >
//         Send
//       </Button>
//     </Flex>
//   </Box>
// </Flex>;
