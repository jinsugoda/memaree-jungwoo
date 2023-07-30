import React from 'react';
import { ScrollView, View } from 'react-native';

// types
import { CustomTheme } from 'styles/theme/customThemeProps';

// 3rd party hooks
import { useTheme } from 'react-native-paper';

// custom components
import MemareeText from 'components/common/textAndInputs/MemareeText';

/*
Data Privacy and Collection
1. Collection of Information
2. Use of Information
3. Sharing of Information
4. Storage and Security
5. Third-Party Services
6. Changes to Privacy Practices
*/

const collectionOfInformationItems = `
a. Registration and profile information, such as your name, email address, username, password, profile picture, and other information you provide when creating an account or updating your profile;
b. User-generated content, including messages, photos, videos, and other materials that you share or post on the App;
c. Usage information, such as how you interact with the App, the content you view or engage with, and the frequency and duration of your activities;
d. Device information, including your device's unique identifier, operating system, browser type, and language;
e. Location information, which may include your device's GPS coordinates or other location data;
f. Log data, such as IP addresses, access times, pages viewed, and other usage data; and
g. Information from third parties, such as social media platforms, if you choose to link your account to those services.
`;

const useOfInformationItems = `
a. Provide, maintain, and improve the App and its features;
b. Personalize your experience and deliver content and recommendations that may be of interest to you;
c. Monitor and analyze trends, usage, and activities in connection with the App;
d. Communicate with you, including for marketing and promotional purposes;
e. Protect the security and integrity of the App and its users;
f. Enforce these Terms and our other policies; and
g. Comply with applicable laws and regulations.
`;

const sharingOfInformationItems = `
a. With your consent or at your direction;
b. With service providers that perform services on our behalf, including for hosting, analytics, and customer support;
c. In response to legal process or a request for information if we believe disclosure is in accordance with any applicable law, regulation, or legal requirement;
d. If we believe your actions are inconsistent with these Terms or our policies, or to protect the rights, property, and safety of Memaree or others;
e. In connection with a sale, merger, or other business transaction involving Memaree or its assets;
f. To enforce our rights or defend against legal claims; and
g. As otherwise permitted by applicable law.
`;

const privacyPolicy = [
    { type: 'title', text: 'Data Privacy and Collection' },

    { type: 'subtitle', text: '1. Collection of Information' },
    {
        type: 'text',
        text: 'By using the App, you acknowledge and agree that we may collect, use, and share certain information about you, including personally identifiable information and non-personal data. The types of information we may collect include:',
    },
    { type: 'list', text: collectionOfInformationItems },

    { type: 'subtitle', text: '2. Use of Information' },
    { type: 'text', text: 'We use the information we collect for various purposes, including to:' },
    { type: 'list', text: useOfInformationItems },

    { type: 'subtitle', text: '3. Sharing of Information' },
    {
        type: 'text',
        text: 'We may share your information with third parties in certain circumstances, such as:',
    },
    { type: 'list', text: sharingOfInformationItems },

    { type: 'subtitle', text: '4. Storage and Security' },
    {
        type: 'text',
        text: 'We take reasonable measures to protect the information we collect from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee the absolute security of your information.',
    },

    { type: 'subtitle', text: '5. Third-Party Services' },
    {
        type: 'text',
        text: 'The App may contain links to third-party websites, services, or applications that are not owned or controlled by us. We are not responsible for the privacy practices or the content of these third-party services, and you access and use them at your own risk. We also use Amazon Web Services and MongoDB Atlas cloud services that store, process, and transmit data. Please refer to their respective privacy policies for more information.',
    },

    { type: 'subtitle', text: '6. Changes to Privacy Practices' },
    {
        type: 'text',
        text: 'We may update our privacy practices from time to time. If we make material changes, we will notify you by posting an updated Privacy Policy or through other means as required by law. Your continued use of the App after any changes to our privacy practices constitutes your acceptance of the updated Privacy Policy.',
    },
];

const PrivacyPolicyScreen = () => {
    const { colors }: CustomTheme = useTheme();

    const Title = ({ text }) => {
        return <MemareeText style={{ color: colors.text, fontSize: 24 }}>{text}</MemareeText>;
    };

    const Subtitle = ({ text }) => {
        return <MemareeText style={{ color: colors.text, fontSize: 18 }}>{text}</MemareeText>;
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
            {privacyPolicy.map((item, index) => {
                if (item.type === 'title') {
                    return <Title key={index} text={item.text} />;
                } else if (item.type === 'subtitle') {
                    return <Subtitle key={index} text={item.text} />;
                } else if (item.type === 'text') {
                    return <Text key={index} text={item.text} />;
                } else if (item.type === 'list') {
                    return <List key={index} text={item.text} />;
                }
            })}
        </ScrollView>
    );
};
export default PrivacyPolicyScreen;
