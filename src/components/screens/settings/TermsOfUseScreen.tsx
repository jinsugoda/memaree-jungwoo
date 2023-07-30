import React from 'react';
import { ScrollView, View } from 'react-native';

// types
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useTheme } from 'react-native-paper';

// custom components
import MemareeText from 'components/common/textAndInputs/MemareeText';
import { GRAPHQL_ENDPOINT, GRAPHQL_ENDPOINT_HINT, VERSION } from '../../../../environment';

/*
1. Acceptance of Terms
2. Eligibility
3. Account Security
4. Content and Conduct
4.1 Prohibited Activities
You agree not to use the App to:
...

5. License to Use Content
6. Intellectual Property Rights
7. Termination
8. Disclaimers and Limitation of Liability
9. Governing Law
10. Changes to Terms
11. Indemnification
12. Dispute Resolution
13. Waiver and Severability
14. Entire Agreement
*/

const termsOfUse = [
    { type: 'title', text: 'Terms of Service' },

    { type: 'text', text: 'Last Updated: April 2nd, 2023' },
    {
        type: 'text',
        text: `
        Welcome to Memaree ("we", "us", "our", or the "App"), a social media mobile application designed to connect people and share content. By using or accessing the App, you agree to be bound by these Terms of Service ("Terms"). Please read them carefully.
    `,
    },

    { type: 'subtitle', text: '1. Acceptance of Terms' },
    {
        type: 'text',
        text: 'By creating an account or using the App, you agree to these Terms and our Privacy Policy, which is incorporated by reference. If you do not agree to these Terms, do not access or use the App.',
    },

    { type: 'subtitle', text: '2. Eligibility' },
    {
        type: 'text',
        text: `
        To use the App, you must be at least 13 years old. By creating an account, you represent that you are at least 13 years old and are not barred from using the App under applicable law.
    `,
    },

    { type: 'subtitle', text: '3. Account Security' },
    {
        type: 'text',
        text: `
        You are responsible for maintaining the confidentiality of your account information, including your password. You agree to notify us immediately of any unauthorized access or use of your account.
    `,
    },

    { type: 'subtitle', text: '4. Content and Conduct' },
    {
        type: 'text',
        text: `
        You are responsible for any content you post or share through the App, including text, photos, videos, and other material ("Content"). You represent that you have the necessary rights to post or share such Content and that the Content does not infringe on the rights of any third parties.
    `,
    },

    { type: 'subsubtitle', text: '4.1 Prohibited Activities' },
    {
        type: 'text',
        text: `
        You agree not to use the App to:
    `,
    },

    {
        type: 'list',
        text: `
        a. Post or share Content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, invasive of privacy, hateful, or racially, ethnically, or otherwise objectionable;
        b. Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity;
        c. Upload, post, or otherwise transmit unsolicited or unauthorized advertising, promotional materials, spam, or any other form of solicitation;
        d. Interfere with or disrupt the App or servers or networks connected to the App;
        e. Violate any applicable laws or regulations; or
        f. Encourage or engage in any illegal activity.
    `,
    },

    {
        type: 'text',
        text: `
        We reserve the right to remove or modify any Content that violates these Terms or is otherwise objectionable, at our sole discretion.
    `,
    },

    { type: 'subtitle', text: '5. License to Use Content' },
    {
        type: 'text',
        text: `
        By posting or sharing Content on the App, you grant us a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform the Content in connection with the App and our business, including for promoting and redistributing part or all of the App.
    `,
    },

    { type: 'subtitle', text: '6. Intellectual Property Rights' },
    {
        type: 'text',
        text: `
        The App and its content, features, and functionality are owned by Memaree and its licensors and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
    `,
    },

    { type: 'subtitle', text: '7. Termination' },
    {
        type: 'text',
        text: `
        We may terminate or suspend your account and access to the App at any time, for any reason, without notice or liability, including for violations of these Terms.
    `,
    },

    { type: 'subtitle', text: '8. Disclaimers and Limitation of Liability' },
    {
        type: 'text',
        text: `
        The App is provided on an "as is" and "as available" basis. We disclaim all warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement.In no event shall we be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including lost profits, arising out of or in connection with your use of the App, even if we have been advised of the possibility of such damages.
    `,
    },

    { type: 'subtitle', text: '9. Governing Law' },
    {
        type: 'text',
        text: `
        These Terms shall be governed by the laws of Canada, or the relevant provincial laws, without regard to its conflict of law provisions.
    `,
    },

    { type: 'subtitle', text: '10. Changes to Terms' },
    {
        type: 'text',
        text: `
        We reserve the right to update or modify these Terms at any time, and any changes will be effective upon posting. Your continued use of the App following the posting of any changes to the Terms constitutes acceptance of those changes.
    `,
    },

    { type: 'subtitle', text: '11. Indemnification' },
    {
        type: 'text',
        text: `
        You agree to indemnify, defend, and hold harmless Memaree, its affiliates, officers, directors, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including attorney's fees) arising from: (i) your use of and access to the App; (ii) your violation of any term of these Terms; (iii) your violation of any third party right, including without limitation any copyright, property, or privacy right; or (iv) any claim that your Content caused damage to a third party.
    `,
    },

    { type: 'subtitle', text: '12. Dispute Resolution' },
    {
        type: 'text',
        text: `
        Any disputes arising out of or relating to these Terms or your use of the App shall be resolved through binding arbitration under the rules of the British Columbia International Commercial Arbitration Centre in Vancouver, British Columbia, and judgment on the award rendered by the arbitrator(s) may be entered in any court having jurisdiction thereof. Notwithstanding the foregoing, either party may seek injunctive or other equitable relief in any court of competent jurisdiction to protect its intellectual property rights or to prevent irreparable harm.
    `,
    },

    { type: 'subtitle', text: '13. Waiver and Severability' },
    {
        type: 'text',
        text: `
        The failure of Memaree to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision. If any provision of these Terms is found by a court of competent jurisdiction to be invalid, the parties agree that the court should endeavor to give effect to the parties' intentions as reflected in the provision, and the other provisions of these Terms remain in full force and effect.
    `,
    },

    { type: 'subtitle', text: '14. Entire Agreement' },
    {
        type: 'text',
        text: `
        These Terms, together with our Privacy Policy, constitute the entire agreement between you and Memaree regarding your use of the App and supersede any prior agreements, oral or written, between you and Memaree concerning the App.15. Contact UsIf you have any questions or concerns about these Terms or the App, please contact us at contact@memaree.com.
    `,
    },
];

const TermsOfUseScreen = () => {
    const { colors }: CustomTheme = useTheme();

    const Title = ({ text }) => {
        return <MemareeText style={{ color: colors.text, fontSize: 24 }}>{text}</MemareeText>;
    };

    const Subtitle = ({ text }) => {
        return <MemareeText style={{ color: colors.text, fontSize: 18 }}>{text}</MemareeText>;
    };

    const Subsubtitle = ({ text }) => {
        return <MemareeText style={{ color: colors.text, fontSize: 16 }}>{text}</MemareeText>;
    };

    const Text = ({ text }) => {
        return <MemareeText style={{ color: colors.text, fontSize: 14 }}>{text}</MemareeText>;
    };

    const List = ({ text }) => {
        const lines = text.split('\n');
        return (
            <View style={{ marginLeft: 20 }}>
                {lines.map((line, index) => {
                    if (line === '') {
                        return null;
                    }
                    return (
                        <View key={index} style={{ flexDirection: 'row' }}>
                            <MemareeText
                                style={{ color: colors.text, fontSize: 14, marginLeft: 5 }}
                            >
                                {line}
                            </MemareeText>
                        </View>
                    );
                })}
            </View>
        );
    };

    return (
        <ScrollView style={{ padding: 10 }}>
            {termsOfUse.map((item, index) => {
                if (item.type === 'title') {
                    return <Title key={index} text={item.text} />;
                } else if (item.type === 'subtitle') {
                    return <Subtitle key={index} text={item.text} />;
                } else if (item.type === 'subsubtitle') {
                    return <Subsubtitle key={index} text={item.text} />;
                } else if (item.type === 'text') {
                    return <Text key={index} text={item.text} />;
                } else if (item.type === 'list') {
                    return <List key={index} text={item.text} />;
                }
            })}
            <View style={{ padding: 50, margin: 50 }}>
                <MemareeText style={{ color: colors.text }}>
                    {VERSION} : {GRAPHQL_ENDPOINT_HINT}
                </MemareeText>
            </View>
        </ScrollView>
    );
};
export default TermsOfUseScreen;
