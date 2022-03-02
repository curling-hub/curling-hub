import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Center,
    Text,
    OrderedList,
    UnorderedList,
    ListItem,
} from '@chakra-ui/react'

interface TermsOfServiceModalProps {
    isOpen?: boolean
    onClose?: () => void
}

export default function TermsOfServiceModal(props: TermsOfServiceModalProps) {
    const { isOpen = false, onClose = (() => { }) } = props
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside' size='lg'>
                <Center>
                    <ModalContent h="360px" w={{ base: '350px', md: '500px', lg: '650px' }} mt="105px" bg="primary.white" borderRadius="20" shadow="dark-lg">
                        <ModalHeader>
                            <Center fontSize='3xl' fontWeight='bold'>
                                Terms of Service
                            </Center>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6} mx="15px">
                            <Text fontSize='xs' fontWeight='semibold'>
                                Effective Date / Last Updated: Last Update / Effective Date: February 14, 2022
                                These Terms of Use (“Terms”) govern your access to and use of the curlo.org  website (the “Site”), made available to you by Curlo  (“Organization,” “we,” “us,” or “our”).
                                BY ACCESSING OR USING THE SITE, YOU (“YOU”) AGREE THAT YOU HAVE READ AND UNDERSTAND THESE TERMS AND OUR PRIVACY POLICY.  IF YOU DO NOT AGREE WITH THESE TERMS OR OUR PRIVACY POLICY, DO NOT ACCESS OR USE THE SITE.
                                We may modify these Terms at any time.  All changes will be effective immediately upon posting to the Site.  Material changes will be conspicuously posted on the Site or otherwise communicated to you.  By using the Site after changes are posted, you agree to those changes.
                                <OrderedList>

                                    <ListItem>
                                        Privacy Policy.  We may collect certain information about you and about your use of the Site as described in our Privacy Policy, which is incorporated into these Terms.  The Privacy Policy describes our information collection, use, and sharing practices.  If you do not agree to any terms in our Privacy Policy, do not access or use the Site.
                                    </ListItem>
                                    <ListItem>
                                        Accounts. When you become a member and set up an online account with us, you must create a username and provide your name, e-mail address, member ID number, and postal code. You must provide accurate information when setting up an account and keep all account information current. You are responsible for maintaining the confidentiality of your password and account. You are fully responsible for all uses of your password and account, including any unauthorized use. You agree to: (a) keep your password confidential and not share it with anyone else, and (b) immediately notify us of any unauthorized use of your password or account. You acknowledge and agree that we are authorized to act on instructions received through use of your password and account, and that we may, but are not obligated to, deny access or block any transaction made through use of your password or account without prior notice if we believe your password and account are being used by someone other than you, or for any other reason.  When you register an account with us, you will be prompted to give your consent to our processing of your personal data. By indicating your consent, you expressly authorize the Organization to collect and process your personal data consistent with the purposes described in our Privacy Policy.
                                    </ListItem>
                                    <ListItem>
                                        Content.  The Site, including its text, audio, video, graphics, charts, photographs, interfaces, icons, software, computer code, data, trademarks, logos, slogans, documentation, other components and content, and the design, selection, and arrangement of content, and all intellectual property rights in the foregoing (collectively, the “Content”) are exclusively the property of the Organization or, as applicable, its vendors or licensors.  Except for the rights expressly granted to you in the next section, the Organization reserves all other rights in and to the Site and Content, including all intellectual property rights.
                                    </ListItem>
                                    <ListItem>
                                        Use Rights.  You may only use the Site or Content for your personal, non-exclusive use so long as you comply with these Terms, the Privacy Policy, all other terms posted throughout the Site as applicable to you (if any), and all applicable laws.  You may only use the Site and the Content for their intended purposes for which they are made available to you by the Organization.
                                    </ListItem>
                                    <ListItem>
                                        Use of Marks.  The Organization owns certain trademarks, names, logos, insignia, or service marks (“Marks”).  You do not have the right to use any Marks except as expressly agreed to in writing by the Organization.  In addition, the Site may contain third-party marks and third-party copyrighted materials, which are the property of their respective owners.  Nothing in these Terms grants to you any rights in or to those third-party marks or materials without such third-party's consent.
                                    </ListItem>
                                    <ListItem>
                                        Intellectual Property Rights.  The Site and Content are protected by copyright, trademark, and other intellectual property laws.  Any unauthorized use of any trademarks, trade dress, copyrighted materials, or any other intellectual property belonging to the Organization or any third party is strictly prohibited and may be prosecuted to the fullest extent of the law.
                                    </ListItem>
                                    <ListItem>
                                        Compliance with Laws.  In connection with your access to and use of the Site, you are responsible for complying with all applicable laws, regulations, and rules of all relevant jurisdictions, including all applicable rules regarding online conduct.
                                    </ListItem>
                                    <ListItem>
                                        Children. The Site is not directed at children under the age of thirteen (13) years old. If you are under thirteen (13) years old and want to register an account or become a member of the Organization, your parent or legal guardian must set up an account and membership on your behalf.
                                    </ListItem>
                                    <ListItem>
                                        Restrictions on Your Use of the Site.
                                        <UnorderedList>
                                            <ListItem>
                                                You will not copy, duplicate, sell, publish, post, license, rent, distribute, modify, translate, adapt, reverse-engineer, or create derivative works of the Site or Content without the Organization's prior written consent.
                                            </ListItem>
                                            <ListItem>
                                                You will not use the Site for unlawful purposes.
                                            </ListItem>
                                            <ListItem>
                                                You will not submit inaccurate, incomplete, or out-of-date information via the Site, commit fraud or falsify information in connection with your use of the Site.
                                            </ListItem>
                                            <ListItem>
                                                You will not engage in data mining or similar data gathering or extraction activities from the Site.  You will not use the Site to harvest email addresses, names or other information of the users of the Site or to spam other users of the Site.
                                            </ListItem>
                                            <ListItem>
                                                You will not access, use, or copy any portion of the Site or Content, through the use of indexing agents, spiders, scrapers, bots, web crawlers, or other automated devices or mechanisms.
                                            </ListItem>
                                            <ListItem>
                                                You will not use the Site to post, transmit, input, upload, or otherwise provide any information or material that contains any viruses, worms, Trojan horses, malware, ransomware, adware, or other harmful computer code that may disable, damage, impair, or otherwise interfere with the Site, the servers used to make the Site available, or any other network, computers, hardware, software or systems.
                                            </ListItem>
                                            <ListItem>
                                                You will not engage in activities that aim to render the Site or associated services inoperable or to make their use more difficult.
                                            </ListItem>
                                            <ListItem>
                                                You may not frame, mirror or circumvent the navigational structure of any part of the Site.
                                            </ListItem>
                                            <ListItem>
                                                You may not upload, distribute, transmit, or post anything to or through the Site that: (i) is fraudulent, libelous, obscene, pornographic, indecent, violent, offensive, hate speech, harassing, threatening, defamatory, harms another person, or the like; (ii) invades the privacy of another or includes the confidential or proprietary information of another; or (iii) is protected by intellectual property rights without the express prior written consent of the owner of such intellectual property rights.
                                            </ListItem>
                                            <ListItem>
                                                You may not engage in any conduct while using the Site that the Organization considers inappropriate, unauthorized, or contrary to the intended purpose of the Site.
                                            </ListItem>
                                        </UnorderedList>
                                    </ListItem>
                                    <ListItem>
                                        Feedback and Other Content Submitted By You.  If you submit comments or feedback to us regarding the Site or its Content, or any other comments, questions, requests, content or information that is not personal information ("Feedback"), we may use any comments and feedback that you send us in our discretion and without attribution or compensation to you.
                                    </ListItem>
                                    <ListItem>
                                        Social Media.  Links to the Organization's social media pages (e.g., Facebook, Twitter, YouTube, and Instagram) are included on the Site ("Social Media Pages").  Because anyone may post or tag on Social Media Pages, posts do not necessarily reflect the Organization's views.  We reserve the right to remove anything from our Social Media Pages, in our sole discretion.  We may also take steps to block users from access to our Social Media Pages who violate these Terms.  If we follow, like, re-tweet, favorite, share, or re-post an individual's content on our Social Media Pages, that is not an endorsement of that third party or any service or company they represent.
                                    </ListItem>
                                    <ListItem>
                                        NO WARRANTY.  THE SITE AND CONTENT ARE PROVIDED “AS IS,” “AS AVAILABLE,” AND WITHOUT ANY WARRANTY OF ANY KIND.  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE Organization EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND WITH RESPECT TO THE SITE AND CONTENT, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AND ANY WARRANTIES ARISING FROM STATUTE, SUCH AS COURSE OF PERFORMANCE, COURSE OF DEALING OR USAGE IN TRADE. THE ORGANIZATION MAKES COMMERCIALLY REASONABLE EFFORTS TO ENSURE THAT ALL CONTENT ON THE SITE IS ACCURATE AND RELIABLE, BUT NEITHER ACCURACY NOR RELIABILITY ARE GUARANTEED.  THE Organization DOES NOT WARRANT OR GUARANTEE THE QUALITY, COMPLETENESS, TIMELINESS, OR AVAILABILITY OF THE SITE OR CONTENT.  THE Organization DOES NOT WARRANT OR GUARANTEE THAT THE SITE OR CONTENT WILL BE UNINTERRUPTED OR ERROR-FREE, THAT ANY DEFECTS IN THE SITE OR CONTENT WILL BE CORRECTED, OR THAT THE SITE OR THE SERVERS THAT MAKE THE SITE AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL CONDITIONS OR COMPONENTS.
                                        WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, WE DO NOT WARRANT OR ENDORSE ANY THIRD-PARTY CONTENT.
                                    </ListItem>
                                    <ListItem>
                                        LIMITATION OF LIABILITY.  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL THE Organization OR ITS DIRECTORS, OFFICERS, OWNERS, EMPLOYEES, CONTRACTORS, REPRESENTATIVES, CONSULTANTS, VOLUNTEERS, AGENTS, SUPPLIERS, ATTORNEYS OR LICENSORS (TOGETHER, “THE Organization PARTY(IES)”) BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, EXEMPLARY, PUNITIVE, OR CONSEQUENTIAL LOSS OR DAMAGE, ARISING OUT OF OR IN CONNECTION WITH THE SITE OR CONTENT, OR YOUR ACCESS TO OR USE OF, OR INABILITY TO ACCESS OR USE, THE SITE OR CONTENT, REGARDLESS OF THE FORM OF ACTION, WHETHER THE CLAIM IS BASED IN CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, WARRANTY, OR OTHERWISE, AND EVEN IF A Organization PARTY HAS EXPRESS KNOWLEDGE OF THE POSSIBILITY OF THE LOSS OR DAMAGE. YOUR SOLE AND EXCLUSIVE REMEDY IS TO STOP ACCESSING AND USING THE SITE OR CONTENT.
                                        WITHOUT LIMITING THE FOREGOING, IN NO EVENT WILL THE AGGREGATE LIABILITY OF THE Organization PARTIES ARISING OUT OF OR IN CONNECTION WITH THE SITE OR CONTENT, OR YOUR ACCESS TO OR USE OF, OR INABILITY TO ACCESS OR USE, THE SITE OR CONTENT EXCEED $100 U.S.D., EVEN IF ANY REMEDY PROVIDED FAILS OF ITS ESSENTIAL PURPOSE.
                                        SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES, SO SOME OF THE ABOVE EXCLUSIONS AND LIMITATIONS MAY NOT APPLY TO YOU.
                                    </ListItem>
                                    <ListItem>
                                        INDEMNIFICATION.  YOU SHALL INDEMNIFY, DEFEND AND HOLD HARMLESS THE Organization PARTIES FROM AND AGAINST ALL LOSSES, CLAIMS, LIABILITIES, DEMANDS, COMPLAINTS, ACTIONS, DAMAGES, JUDGMENTS, SETTLEMENTS, FINES, PENALTIES, EXPENSES, AND COSTS (INCLUDING WITHOUT LIMITATION REASONABLE ATTORNEYS' FEES) THAT ARISE OUT OF OR IN CONNECTION WITH (A) YOUR VIOLATION OF APPLICABLE LAWS, (B) YOUR MISUSE OF THE SITE OR ANY CONTENT, AND (C) YOUR BREACH OF THESE TERMS OR ANY OTHER TERMS ON THE SITE.  WE RESERVE, AND YOU GRANT TO US, THE EXCLUSIVE RIGHT TO ASSUME THE DEFENSE AND CONTROL OF ANY MATTER SUBJECT TO INDEMNIFICATION BY YOU (SUBJECT TO YOUR CONTINUING INDEMNIFICATION).
                                    </ListItem>
                                    <ListItem>
                                        Third-Party Websites and Content.  The Site may link to, or be linked to, websites not maintained or controlled by the Organization.  Those links are provided as a convenience to the visitors of our Site.  The Organization is not responsible for examining or evaluating the content or accuracy of third-party websites linked through the Site.  The Organization does not warrant or endorse any third-party website or any products or services made available through those websites.  When leaving the Site, it is the terms and privacy policy of that third party that govern your use of third-party site (and such third-party's use or your personal information), not these Terms.
                                    </ListItem>
                                    <ListItem>
                                        The Site may also contain certain third-party Content.  We provide third-party content for your convenience, not as an endorsement.  The presence of third-party Content does not mean that the Organization has reviewed the third-party Content or that there is any association between the Organization and any third party.  You access third-party Content at your sole risk.  The Organization has no responsibility for any third-party Content.  Nothing in these Terms grants you any rights to any third-party Content.
                                    </ListItem>
                                    <ListItem>
                                        Linking to the Site.  If you would like to link to this Site then you must comply with the following guidelines:
                                        <UnorderedList>
                                            <ListItem>
                                                Do not incorporate any Site Content into your website (e.g., by in-lining, framing or creating other browser or border environments around Content). You may only link to this Site by providing an underlined, textual link from your Web site to the home page of the Site  (an “Authorized Link”). For example, curlo.org is  the only Authorized Link to the Site. “Home Page” means the introductory or main web page of the Site. No other link to the Site  is permitted without the express, prior written approval of the Organization.
                                            </ListItem>
                                            <ListItem>
                                                You may not present an Authorized Link to the home page in a manner that suggests the Organization has any relationship or affiliation with your site or endorses your site, products or services unless approved by the Organization.
                                            </ListItem>
                                            <ListItem>
                                                Your site must not present false information about the Organization, its products or services.
                                            </ListItem>
                                            <ListItem>
                                                You may not use any of the Organization's names, logos, designs, slogans, trademarks or service marks or any other words or codes identifying the Site in any "metatag" or other information used by search engines or other information location tools to identify and select sites, without the Organization's express, prior written permission for a particular use.
                                            </ListItem>
                                            <ListItem>
                                                Your site must not contain content that could be construed as distasteful, offensive or controversial.
                                            </ListItem>
                                            <ListItem>
                                                We prohibit unauthorized links to the Site and the framing of any information contained on the Site without the express, prior written approval of the Organization. Furthermore, you may not archive, cache, or mirror any  portions of the Site. We reserve the right to disable any unauthorized links or frames. The Organization hereby disclaims all liability for any material on other Web sites that may contain links to this Site.
                                            </ListItem>
                                            <ListItem>
                                                If you would like to use, reprint, frame, or redistribute any content on the Site other than as permitted herein, you must request permission from the  Organization by writing to curloratings@gmail.com.. Please include: (a) your name, e-mail address, and telephone number; (b) the name of your company or organization; (c) the Web site address(es) where the proposed use will occur; and (d) specific details about the contemplated linking or framing activities, including the content or Web page(s) of this Site  which you would like to use.
                                            </ListItem>
                                        </UnorderedList>
                                    </ListItem>
                                    <ListItem>
                                        Termination.  If you violate applicable laws or these Terms, you are immediately prohibited from further use of the Site or Content, and we may restrict your access to the Site or Content.  The Organization may suspend or terminate the Site or any Content, in whole or in part, at any time in its sole discretion for any reason.  The Organization shall not be liable to you or anyone else for any damages arising from or related to the Organization's suspension or termination of your access to the Site or the Content, or in the event the Organization modifies, discontinues or restricts the availability of the Site or the Content (in whole or in part).
                                    </ListItem>
                                    <ListItem>
                                        Site Unavailability.  Without limiting the generality of the previous section, the Site or Content may be unavailable or limited for various reasons, and we shall not be liable to you for any such unavailability, including without limitation (a) hardware, software, server, network, or telecommunications failures, (b) severe weather, war, riot, act of God, fire, earthquake, strike, labor shortage, etc., (c) regulatory restrictions and other acts of government, (d) interruptions due to utility and power companies, and (e) interruptions due to hacking or other malicious intrusion.
                                    </ListItem>
                                    <ListItem>
                                        Cooperation with Law Enforcement.  The Organization will cooperate with law enforcement if you are suspected of having violated applicable laws.  YOU WAIVE AND HOLD THE Organization AND THE Organization PARTIES HARMLESS FOR ANY COOPERATION WITH, OR DISCLOSURE OF YOUR INFORMATION TO, LAW ENFORCEMENT RELATING TO YOUR SUSPECTED VIOLATION OF APPLICABLE LAWS.
                                    </ListItem>
                                    <ListItem>
                                        Disputes.  These Terms, and your access to and use of the Site, are governed by the laws of the State of Tennessee, without regards to its conflict of laws principles.  Venue is exclusively in the state or federal courts, as applicable, located in Crossville, Tennessee.  The parties expressly agree to the exclusive jurisdiction of those courts.  Any cause of action or other claim brought by you with respect to the Site or Content must be commenced within one year after the cause of action or claim arises.
                                    </ListItem>
                                    <ListItem>
                                        Assignment.  We may assign our rights and delegate our duties under these Terms at any time to any party without notice to you.  You may not assign your rights or delegate your duties under these Terms without our prior written consent.  These Terms inure to the benefit of the Organization’s successors and assigns.
                                    </ListItem>
                                    <ListItem>
                                        Entire Agreement.  These Terms, the Privacy Policy, and any terms posted throughout the Site (if any) are the entire agreement between you and the Organization with respect to your access to and use of the Site.  In the event of conflict between these Terms and our Privacy Policy, our Privacy Policy will control.
                                    </ListItem>
                                    <ListItem>
                                        Waiver.  The Organization's failure to enforce any provision of these Terms will not constitute a waiver of that provision or any other provision.  Any waiver of any provision of these Terms will be effective only if in writing and signed by the Organization.
                                    </ListItem>
                                    <ListItem>
                                        Severability.  If any provision of these Terms is held invalid, void, or unenforceable, that provision will be severed from the remaining provisions and the remaining provisions will remain in full force and effect.  The headings in these Terms are for convenience only and do not affect the interpretation of these Terms.
                                    </ListItem>
                                    <ListItem>
                                        Contact Us.  Please direct any questions and concerns regarding these Terms to us at: curloratings@gmail.com
                                    </ListItem>
                                </OrderedList>
                            </Text>
                        </ModalBody>
                    </ModalContent>
                </Center>
            </Modal>
        </>
    )
}
