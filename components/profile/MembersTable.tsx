import {
    Flex,
    VStack,
    Text,
    Spacer
} from "@chakra-ui/react"
import { TeamMembers } from '../../lib/models/teams'
import { TeamCategories } from '../../lib/models/teams'

interface MembersTableProps {
    teamMembers?: TeamMembers[]
    teamCategories?: TeamCategories[]
}

export default function MembersTable(props: MembersTableProps) {

    const {
        teamMembers = [],
        teamCategories = []
    } = props

    return (
        <>
            <Flex align="start" w="100%">
                <Spacer />
                <VStack align="center" minW="110px" spacing="4px">
                    <Text
                        fontSize="1.5em"
                        fontWeight="bold"
                    >Curlers</Text>
                    {teamMembers.map((member, i) => (
                        <Text key={`${i}`}>
                            {member.memberName}
                        </Text>
                    ))}
                </VStack>
                <Spacer />
                <VStack align="center" spacing="4px">
                    <Text
                        fontSize="1.5em"
                        fontWeight="bold"
                    >Categories</Text>
                    {teamCategories.map((category, i) => (
                        <Text key={`${i}`}>
                            {category.categoryName}
                        </Text>
                    ))}
                </VStack>
                <Spacer />
            </Flex>
        </>
    );
}