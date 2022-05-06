import {
    Flex,
    VStack,
    Text,
    Spacer
} from "@chakra-ui/react"
import { Category, TeamMember } from "../../lib/models"

interface MembersTableProps {
    teamMembers?: TeamMember[]
    teamCategories?: Category[]
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
                            {member.name}
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
                            {category.name}
                        </Text>
                    ))}
                </VStack>
                <Spacer />
            </Flex>
        </>
    );
}