import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { CommentType } from '@/common/types';
import { BASEURL } from '@/constants';
import moment from 'moment';

type PropsType = {
  comment: CommentType;
};
function SingleComment({ comment }: PropsType) {
  return (
    <Flex mt="10px">
      {comment.commentBy && (
        <Flex flex="1" gap="2" alignItems="center" flexWrap="wrap">
          <Avatar
            name={comment.commentBy.name}
            src={`${BASEURL}/uploads/profile/${comment.commentBy.profilePic}`}
          />

          <Box>
            <Text color="gray" fontSize="0.7rem">
              {moment(comment.createdAt).fromNow()}
            </Text>
            <Text fontSize="0.9rem">{comment.description}</Text>
          </Box>
        </Flex>
      )}
    </Flex>
  );
}

export default SingleComment;
