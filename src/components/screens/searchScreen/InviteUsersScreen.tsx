import MemareeInput from 'components/common/textAndInputs/MemareeInput';
import MemareeText from 'components/common/textAndInputs/MemareeText';
import * as Contacts from 'expo-contacts';
import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Switch, useTheme } from 'react-native-paper';
import { CustomTheme } from 'styles/theme/customThemeProps';
import { GroupPreviewStyle } from '../groups/style/GroupScreenStyle';
import { PreviewStyles } from 'styles';

import * as SMS from 'expo-sms';
import { log } from 'react-native-reanimated';
import { width } from '@fortawesome/free-solid-svg-icons/faChevronLeft';

const sendSMSMessages = async (phoneNumbers: string[]) => {

    console.log('phoneNumbers: ', phoneNumbers);
    const { result } = await SMS.sendSMSAsync(
        phoneNumbers,
        'Come join me on https://www.memaree.com',
        // {attachments: {uri: 'path/myfile.png', mimeType: 'image/png', filename: 'myfile.png'}},
    );
    console.log(result);
};

const Contact = ({ phoneNumberSearch, contact, onToggle }) => {
    const { colors }: CustomTheme = useTheme();

    const [isToggled, setIsToggled] = React.useState(false);

    if(phoneNumberSearch === ''){
    return (
        <View key={contact.id} style={[PreviewStyles.switchGroup, { marginTop: '0%', width:"100%"}]}>
            <View>
                <MemareeText style={{ color: colors.text }}>{contact.name}</MemareeText>
                <MemareeText style={{ color: colors.text }}>
                    {contact.phoneNumbers &&
                        contact.phoneNumbers.length > 0 &&
                        contact.phoneNumbers[0].number}
                </MemareeText>
            </View>
            <Switch
                value={isToggled}
                onValueChange={() => {
                    setIsToggled(!isToggled);
                    onToggle(contact.phoneNumbers[0].number);
                }}
                trackColor={{ false: colors.text, true: colors.tertiary }}
                thumbColor="white"
                ios_backgroundColor="white"
            />
        </View>
    ); 
    }else{
        const searchLowercase = phoneNumberSearch.toLowerCase();
        const nameLowercase = contact.name?.toLowerCase();
        const phoneNumberLowercase = contact.phoneNumbers?.[0]?.number?.toLowerCase();
    
        if (
          (nameLowercase && nameLowercase.includes(searchLowercase)) ||
          (phoneNumberLowercase && phoneNumberLowercase.includes(searchLowercase))
        ) {
            return (
              <View key={contact.id} style={[PreviewStyles.switchGroup, { marginTop: '0%', width: "100%" }]}>
                <View>
                  <MemareeText style={{ color: colors.text }}>{contact.name}</MemareeText>
                  <MemareeText style={{ color: colors.text }}>
                    {contact.phoneNumbers && contact.phoneNumbers.length > 0 && contact.phoneNumbers[0].number}
                  </MemareeText>
                </View>
                <Switch
                  value={isToggled}
                  onValueChange={() => {
                    setIsToggled(!isToggled);
                    onToggle(contact.phoneNumbers?.[0]?.number);
                  }}
                  trackColor={{ false: colors.text, true: colors.tertiary }}
                  thumbColor="white"
                  ios_backgroundColor="white"
                />
              </View>
            );
          } else {
            return null; 
          }
    }
};

const InviteUsers = () => {
    const [phoneNumber, setPhoneNumber] = React.useState('');

    const [contacts, setContacts] = React.useState([]);
    const [selectedContacts, setSelectedContacts] = React.useState([]);

    const { colors }: CustomTheme = useTheme();

    const onToggle = (number) => {
        if (selectedContacts.includes(number)) {
            setSelectedContacts(selectedContacts.filter((id) => id !== number));
        } else {
            setSelectedContacts([...selectedContacts, number]);
        }
    };

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers],
                });

                if (data.length > 0) {
                    const contact = data[0];
                    console.log(contact);
                    setContacts(data);
                } else {
                    console.log('No contacts found');
                }
            }
        })();
    }, []);

    const getContactsRow = () => {
        if (contacts !== undefined) {
            return contacts.map((contact) => {
                return <Contact key={contact.id} phoneNumberSearch = {phoneNumber} contact={contact} onToggle={onToggle}></Contact>;
            });
        }
    };

    const send = () => {
        sendSMSMessages(selectedContacts);
    };

    const pressable = selectedContacts.length <= 0;
    

    return (
        <View style={{flex:1, alignItems:'center'}}>
            <MemareeText>Invite User</MemareeText>
            <MemareeInput 
                onChangeText={setPhoneNumber} 
                value={phoneNumber} 
                cursorColor={colors.text}
                placeholder={`Enter a name or phone number`}
                placeholderTextColor={colors.text}
            />
            <ScrollView  style={{width:"92%"}}>{getContactsRow()}</ScrollView>
            <Button
                onPress={() => send()}
                disabled={pressable}
                labelStyle={{
                    color: pressable ? 'white' : 'black',
                    fontFamily: 'Outfit-Bold',
                }}
                style={[
                    GroupPreviewStyle.PreviewButton,
                    {
                        backgroundColor: pressable ? '#2F2F2F' : colors.tertiary,
                        borderColor: pressable ? '#2F2F2F' : colors.tertiary,
                    },
                ]}
            >
                Invite
            </Button>
        </View>
    );
};

export default InviteUsers;
